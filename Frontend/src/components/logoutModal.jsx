import { useState } from "react";
import Modal from "./Modal";
import useAuthContext from "../hooks/useAuthContext";
const LogoutModal = ({ btn, style }) => {
  const [askLogout, setAskLogout] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    socket.disconnect();
    localStorage.removeItem("user");
  };
  return (
    <div>
      <Modal
        title={"Logout"}
        ismodalOpen={askLogout}
        style={
          "!top-[50%]  !left-[50%] !translate-x-[-50%] !translate-y-[-50%]"
        }
        setModal={setAskLogout}
        footer={
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => setAskLogout(false)}
              className="p-2 rounded-lg bg-gray-200 text-gray-900  capitalize px-5"
            >
              no
            </button>
            <button
              onClick={logout}
              className="bg-red-600 rounded-lg p-2 text-white px-5"
            >
              Yes
            </button>
          </div>
        }
      >
        <div className="space-y-2 flex flex-col bg-white p-2 rounded-md ">
          <h1 className="capitalize text-lg font-semibold">
            are you sure you want to logout?
          </h1>
        </div>
      </Modal>
      <button
        title="logout"
        onClick={() => setAskLogout(true)}
        className={
          btn
            ? `p-2 rounded-lg bg-gray-200 text-gray-900  capitalize px-3`
            : `${style}`
        }
      >
        logout
      </button>
    </div>
  );
};

export default LogoutModal;
