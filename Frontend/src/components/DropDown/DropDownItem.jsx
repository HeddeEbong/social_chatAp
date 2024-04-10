const DropDownItem = ({children}) => {
    return ( 
        <div className="hover:bg-gray-100 w-full  active:text-teal-400  cursor-pointer capitalize rounded-md">{children}</div>
     );
}
 
export default DropDownItem;