import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
import useFetch from "./Fetch";
const useGetProfile = (name) => {
  const { user, dispatch } = useAuthContext();
  const {access_token} = user;
  const [profilePic, setProfilePic] = useState("");

  const getProfile = async () => {
    try {
      const response = await useFetch({
        url: `http://${location.hostname}:3000/api/profilePic/get/${
          name ? name : user.username
        }`,
        props: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
        dispatch:dispatch
      });
      if (!response.ok) {
          return null
      }
      if (response.ok) {
        const url = await response.json();
        return url;
      }
    } catch (err) {
      console.log("error from image", err);
      return null;
    }
  };
  const res = getProfile();
  res.then((value) => {
    setProfilePic(value);
  });

  return profilePic;
};

export default useGetProfile;
