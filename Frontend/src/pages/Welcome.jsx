import { Link } from "react-router-dom"
export default function Welcome(){
    return(
       <div className="hidden w-full h-full md:grid place-items-center">
            <div className="text-center">
                <h1 className="text-7xl">Welcome Back !!! </h1>
                <p className="text-lg text-slate-800 mb-4">Happy to see you back again, start messaging directly</p>
                <Link to="/chat" as={"button"} className="text-white px-4 py-2 bg-primary">start chats</Link>
            </div>
       </div>
    )
}