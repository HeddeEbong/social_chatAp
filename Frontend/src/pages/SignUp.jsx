import {useState} from 'react'
import {Form, Link} from 'react-router-dom'
import {UseSignUp} from '../hooks/useSignUp';

function SignUp() {
    const {error, isPending, signup} = UseSignUp();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handlesubmit = (e) => {
        e.preventDefault();
        signup({email, password, username});
    };
    return (
        <div className={`${error&& "border-2 border-r-red-600"}  place-self-center max-w-[32rem]  bg-white   p-5 shadow-lg rounded-lg px-4 `}>
            <h1 className='text-center  text-slate-500 uppercase font-bold text-lg'>register</h1>
            <Form className="grid px-4 gap-4 my-2 " onSubmit={handlesubmit}>
                <div className={"grid gap-2"}>
                    <label htmlFor="username">User Name:</label>
                    <input
                        required
                        className="focus:ring-blue-600 border-slate-300 p-3 rounded-lg focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        name="userName"
                        id="userName"
                        placeholder={"Enter username"}
                    />
                </div>
                <div className={"grid gap-2"}>

                    <label htmlFor="number">Email:</label>
                    <input
                        required
                        className="focus:ring-blue-600 border-slate-300 p-3 rounded-lg focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        name="email"
                        id="email"
                        placeholder={"Enter email"}
                    />
                </div>
                <div className={"grid gap-2"}>
                    <label htmlFor="password">Password:</label>
                    <input
                        required
                        className="focus:ring-blue-600 border-slate-300 p-3 rounded-lg focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder={"Enter password"}
                    />
                </div>
                <button
                    className="rounded-lg uppercase tracking-wider active:ring-blue-600 active:ring-2 active:border-white bg-blue-600 py-2 mt-4 text-white"
                    disabled={isPending}
                >
                   create account
                </button>
            </Form>
            {error && <div className="text-red-400 text-center">{error}</div>}
            <div>
                <p className={"text-sm  px-4 py-3"}>
                    already have an accout? <Link className="text-blue-600 mx-1" to={"/login"}>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
