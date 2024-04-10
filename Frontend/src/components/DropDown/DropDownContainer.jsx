import closeClickOutside from "../../hooks/closeClickOutside";
import DropDownItem from "./DropDownItem";

function DropDownContainer({
  items,
  ContainerRef,
  setShowDropDown,
  className,
  closeRef
}) {

  closeClickOutside(ContainerRef,()=>{setShowDropDown(false)},closeRef)

  return (
    <ul
      ref={ContainerRef}
      className={`dropDownContainer bg-white p-3  z-[2] left-0 top-8  text-center border-2 absolute min-w-max rounded-md shadow-md ${className}`}
    >
      {items.map((i, index) => {
        return <DropDownItem key={index}>{i}</DropDownItem>;
      })}
    </ul>
  );
}

export default DropDownContainer;
