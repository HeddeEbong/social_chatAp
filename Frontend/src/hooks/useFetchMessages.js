import useAuthContext from "./useAuthContext";
import useFetch from "./Fetch";
const useFetchMessages = (dispatch) => {
  const { user, dispatch: logout } = useAuthContext();

  const fetchMessage = async () => {
    if (user) {
      const { access_token } = user;
      const response = await useFetch({
        url: `http://${location.hostname}:3000/api/messages`,
        props: {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
        dispatch: logout,
      });

      const messages = await response.json();
      // storing to local state
      if (response.ok) {
        dispatch({ type: "MESSAGES", payload: messages });
      }
    }
  };

  return fetchMessage;
};

export default useFetchMessages;
