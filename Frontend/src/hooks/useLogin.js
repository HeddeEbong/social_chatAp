import { useState } from "react";
import useAuthContext from "./useAuthContext";

const API_URL = `http://${window.location.hostname}:3000/api/user/login`;

export const UseLogin = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch, auth } = useAuthContext();

  const login = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const userDetais = await response.json();
    if (!response.ok) {
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
      let user = { email, username, profilePic, _id };

      localStorage.setItem("user", JSON.stringify(userDetais));
      localStorage.setItem(
        "token",
        JSON.stringify({ access_token, refresh_token })
      );
      dispatch({ type: "LOGIN", payload: userDetais });
      setIsPending(false);
    }
  };

  return { isPending, error, login };
};

