// info about the user ways to change his profile and stuff
import { Form } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import {
  CheckIcon,
  CrossXWithCircle,
  PlusSmallIcon,
  TrashIcon,
} from "../Icons";
import { useRef, useState } from "react";
import Input from "./Input";
import ProfileImage from "../ProfileImage";
import Modal from "../Modal";
import useFetch from "../../hooks/Fetch";
import Button from "../button";

const Info = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [image, setImage] = useState();
  const [imageForAPI, setImageForAPI] = useState();
  const imageSelectRef = useRef();
  const [showImageModal, setShowImageModal] = useState();
  const [error, setError] = useState({
    api: {
      image: null,
      form: null,
    },
  });
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState({
    form: false,
    image: false,
  });

  // handle changing of inputs
  const handleChange = (e) => {
    let removeErrorOnType = {};
    removeErrorOnType = {
      ...error,
      [e.target.name]: null,
      api: { ...error.api, form: null },
    };
    console.log(removeErrorOnType);
    setLoading({ ...loading, form: false });
    setError(removeErrorOnType);
    // state bindings
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  // submit form to change user info
  const changeName = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, form: true });
    const nonEmptyValues = Object.entries(userInfo)
      .filter(([key, value]) => value !== "" && key != "confirmPassword")
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    // basic checking for errors in form
    const newErrors = {};

    if (Object.keys(nonEmptyValues).length === 0) {
      newErrors.api = { form: "please input atleast one status to change" };
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (userInfo.email === user.email) {
      newErrors.email = "use an email different from your current email";
    }
    if (
      userInfo.username
        .toString()
        .toLocaleLowerCase()
        .includes(user.username.toLocaleLowerCase())
    ) {
      newErrors.username =
        "use a username different from your current username";
    }

    setError(newErrors);

    // sending request to the server
    if (Object.keys(newErrors).length === 0) {
      const nonEmptyValues = Object.entries(userInfo)
        .filter(([key, value]) => value !== "" && key != "confirmPassword")
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      const request = await useFetch({
        url: "http://localhost:3000/api/user/update",
        props: {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token.access_token}`,
          },
          body: JSON.stringify(nonEmptyValues),
        },
        dispatch: dispatch,
      });
      if (request) {
        setLoading({ ...loading, form: false });
      }
      // check for errors
      const response = await request.json();
      if (!request.ok) {
        setError({
          ...error,
          api: {
            ...error.api,
            form: response.error,
          },
        });
      }
      console.log("data updated", response);
      if (request.ok) {
        dispatch({ type: "UPDATE USER", payload: response });
      }
    }
  };
  // get image
  const getImage = async (e) => {
    imageSelectRef.current.click();
  };
  // change image
  const changeImage = async () => {
    setLoading({ ...loading, image: true });
    setShowStatus(true);
    setShowImageModal(false);
    if (image) {
      const formData = new FormData();
      formData.append("profile-picture", imageForAPI);

      const response = await useFetch({
        url: "http://localhost:3000/api/user/update",
        props: {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token.access_token}`,
          },
          body: formData,
        },
        dispatch: dispatch,
      });
      const data = await response.json();
      if (response) {
        setLoading({ ...loading, image: false });
        setTimeout(() => {
          setShowStatus(false);
        }, 5000);
      }
      console.log("image from fetch", data);
      if (response.ok) {
        setError({
          ...error,
          api: {
            ...error.api,
            image: null,
          },
        });
        dispatch({
          type: "UPDATE USER",
          payload: { profilePic: data.profilePic },
        });
        console.log("image updated ", data.profilePic);
      } else {
        setError({
          ...error,
          api: {
            ...error.api,
            image: data.error,
          },
        });
      }
    }
  };
  const { user, dispatch } = useAuthContext();
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="h-full bg-slate-200 dark:bg-slate-800 flex flex-col lg:grid grid-cols-3 gap-4 p-2">
      {/* profile image and ways to change or delete them */}
      <div className="flex  flex-col justify-center shadow space-y-10 bg-white dark:bg-slate-700 rounded-lg p-4">
        <div className="flex justify-center flex-wrap mt-6 items-center space-x-2">
          <ProfileImage image={user.profilePic} style={"h-32 w-32"} />
          <div className="self-end mb-8 ">
            <p className="text-xl capitalize font-semibold">{user.username}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        {/* hidden fields */}
        <div className="flex justify-center space-x-4 ">
          <input
            ref={imageSelectRef}
            placeholder="+"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(await readFileAsync(file));
                setImageForAPI(file);
                setShowImageModal(true);
              }
            }}
          />
          {/* modal */}
          <Modal ismodalOpen={showImageModal} setModal={setShowImageModal}>
            <div className="h-[800px] w-full">
              <img className="h-[89%] w-full " src={image} alt="image" />
              <p>Are you sure you want to do this</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowImageModal(false);
                  }}
                  className="flex items-center capitalize btn text-red-500"
                >
                  <CrossXWithCircle className={"h-10 fill-red-500 w-10"} />
                  cancel
                </button>
                <button
                  onClick={changeImage}
                  className="flex items-center capitalize text-green-600 btn"
                >
                  <CheckIcon className={"h-10 w-10 text-green-500"} />
                  Continue
                </button>
              </div>
            </div>
          </Modal>
          <button onClick={getImage}>
            <PlusSmallIcon
              className={"h-10 w-10 rounded-full p-2 bg-slate-300"}
            />
          </button>
          <button>
            <TrashIcon
              className={
                " h-10 w-10 rounded-full p-2 bg-slate-300 text-red-500"
              }
            />
          </button>
        </div>
        {/* conditions for uploading profile */}
        <div className="bg-slate-200 p-4 flex-col rounded-lg text-gray-500  leading-relaxed capitalize">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, optio.
          </p>
          <p>
            maximum upload size is <span className="font-bold">1MB</span>
          </p>
        </div>
        {/* status of changes */}
        {loading.image
          ? "loading..."
          : showStatus && (
              <div
                className={`p-4 rounded-lg ${
                  error.api.image
                    ? "bg-red-600  text-white "
                    : "text-white  bg-teal-500"
                }`}
              >
                {error.api.image
                  ? `an Error occured ${error.api.image}`
                  : "changes saved"}
              </div>
            )}
      </div>
      {/* edit your profile section */}
      <div className="col-span-2 flex-col flex bg-white rounded-lg  shadow">
        <p className="text-2xl font-bold w-full capitalize leading-loose  py-5 bg-slate-100 text-center">
          Edit your profile
        </p>
        <Form
          onSubmit={changeName}
          className="p-2 flex flex-col  items-center  space-y-8"
        >
          <Input
            error={error.username}
            name="username"
            label="name"
            type="text"
            value={userInfo.username}
            onChange={handleChange}
          />
          <Input
            error={error.email}
            name="email"
            label="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <div className="flex flex-col w-full sm:w-fit space-y-4 items-center flex-wrap">
            <Input
              error={error.password}
              name="password"
              label="password"
              type="password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <Input
              error={error.confirmPassword}
              name="confirmPassword"
              label="confirm password"
              type="password"
              value={userInfo.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error.api && error.api.form && (
            <div className="text-red-400 mt-4">{error.api.form} </div>
          )}
          <Button role="primary" disabled={loading.form}>
            update profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}

export default Info;
