import { useEffect } from "react"
export default function  CloseClickOutside(refItem=null,fnx=()=>{},closeRef){
    useEffect(()=>{
        const listener=(e)=>{
            if(!refItem || refItem.current.contains(e.target) || closeRef.current.contains(e.target)) return;
            fnx();
        }
        document.addEventListener("mousedown",listener);
        return ()=>{
            document.removeEventListener("mousedown",listener)
        }
        

    },[refItem])
} 