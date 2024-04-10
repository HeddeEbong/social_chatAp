import { useState } from "react";
import Modal from "./Modal";
import { UserIcon } from "../components/Icons";
import useGetProfile from "../hooks/getProfile";

function ProfileImage({ image, style, modalEnabled }) {
  if (image !== null) {
    if (typeof image == "object") {
      image = useGetProfile(image.username);
    }
  }

  const [ismodalOpen, setIsModalOpen] = useState();
  return (
    <div>
      <div
        onClick={(e) => {
          if (modalEnabled) {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(true);
          }
        }}
        className={`h-10 w-10 rounded-full ${
          modalEnabled && "cursor-pointer"
        }  ${style} rounded-full overflow-hidden `}
      >
        {image ? (
          <img
            className="object-cover object-center rounded-full h-full w-full"
            src={image}
            alt="profile picture"
          />
        ) : (
          <UserIcon
            className={
              "h-full w-full bg-black text-white shadow rounded-full white border"
            }
          />
        )}
      </div>

      {modalEnabled && (
        <Modal
          title={"profile image"}
          profilePic={true}
          ismodalOpen={ismodalOpen}
          setModal={setIsModalOpen}
        >
          <div className={`${image && " "} `}>
            {image ? (
              <img
                className="h-full w-full object-cover object-center rounded-md"
                src={image}
                alt="profile picture"
              />
            ) : (
              <div>No image found here</div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProfileImage;
