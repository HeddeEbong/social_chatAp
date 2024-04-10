const useFetch = async ({ url, props, dispatch }) => {
  let data = await fetch(url, props);
  // check if data has error
  if (!data.ok) {
    const res = await data.json();
    // check if token has expired
    if (
      res.error == "request not authorised" ||
      res.message == "jwt expired" ||
      res.message == "jwt deformed"
    ) {
      const refresh_token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")).refresh_token
        : undefined;
      // check for refresh token or fetch new one
      if (!localStorage.getItem("token")) {
        dispatch({ type: "LOGOUT" });
      } else {
        await fetch(
          `http://${document.location.hostname}:3000/api/user/refresh_token`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ token: refresh_token }),
          }
        )
          .then(async (res) => {
            if (!res.ok) {
              const { error } = await res.json();
              if (error == "a token is required") {
                console.log("no token in storage");
                dispatch({ type: "LOGOUT" });
              }
              return;
            }
            const access_token = await res.json();
            dispatch({ type: "UPDATE USER", payload: { access_token } });
            localStorage.setItem(
              "token",
              JSON.stringify({ refresh_token, access_token })
            );
          })
          .catch((err) => console.log(err.message));
      }
      // redo the fetch using the new access token
      data = await fetch(url, props);
    }
  }
  return data;
};

export default useFetch;
