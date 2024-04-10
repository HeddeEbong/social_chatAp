import { useState } from "react";
import UseAuthContext from "./useAuthContext";

export const UseSignUp = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = UseAuthContext();

  const signup = async ({ email, password, username }) => {
    setError(null);
    setIsPending(true);
    const response = await fetch(
      `http://${window.location.hostname}:3000/api/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      }
    );
    console.log(response.ok, response.status);
    const userDetais = await response.json();
    if (!response.ok) {
      console.log(userDetais);
      setError(userDetais.error);
      setIsPending(false);
    }
    if (response.ok) {
      const {
        email,
        username,
        profilePic,
        _id,
        access_token,
        refresh_token,
      } = userDetais;
      // save token to localhost and update auth context
      localStorage.setItem("user", JSON.stringify(userDetais));
      // updating
      dispatch({ type: "LOGIN", payload: userDetais });
      setIsPending(false);
    }
  };

  //   return all props
  return { isPending, error, signup };
};
