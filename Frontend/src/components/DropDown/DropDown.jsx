import { useRef, useState } from "react";
import DropDownContainer from "./DropDownContainer";

function DropDown({ children, className, DropDownToggler }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const toggleRef = useRef();
  const ContainerRef = useRef();

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        ref={toggleRef}
        onClick={(e) => {
          e.stopPropagation();
          if (!children) {
            throw Error("must have atleast 2 dropdown components");
          }

          setShowDropDown(!showDropDown);
        }}
      >
        {DropDownToggler}
      </div>
      {showDropDown && (
        <DropDownContainer
          closeRef={toggleRef}
          setShowDropDown={setShowDropDown}
          showDropDown={showDropDown}
          ContainerRef={ContainerRef}
          className={className}
          items={children}
        />
      )}
    </div>
  );
}

export default DropDown;
