import { createPortal } from "react-dom";
import { XCircleIcon } from "../components/Icons";

export default function Modal({
  children,
  ismodalOpen,
  setModal,
  timed,
  title,
  footer,
  profilePic
}) {
  if (timed) {
    setTimeout(() => {
      setModal(false);
    }, timed);
  }

  return (
    <div>
      {ismodalOpen &&
        createPortal(
          <>
            {/* <div className="h-full w-full inset-0  bg-black"></div>
            <div className={``}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(false);
                }}
                className=""
              >
                <XCircleIcon className={"text-gray-500"} />
              </div>
              <div className="">{children}</div>
            </div> */}
            {/* <!-- Modal backdrop --> */}
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"></div>

            {/* <!-- Modal container --> */}
            <div className={`modal-container fixed  top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center`}>
              <div className={`bg-white rounded-lg shadow-lg p-4 ${profilePic&& 'h-[95vh]'} w-full sm:w-[80%]  md:w-1/2 max-h-screen  overflow-y-auto`}>
                {/* <!-- Modal header --> */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <button
                    onClick={() => setModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircleIcon className={"h-5 w-5"} />
                  </button>
                </div>

                {/* <!-- Modal content --> */}
                <div className={`mt-4 text-center ${profilePic&& 'lg:h-[92vh]'}`}>{children}</div>

                {/* <!-- Modal footer --> */}
                <div>{footer && footer}</div>
              </div>
            </div>
          </>,
          document.getElementById("modal")
        )}
    </div>
  );
}
