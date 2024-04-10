import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import GuestLayout from "./layouts/GuestLayout";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import Chat from "./components/Chat";
import Status from "./components/Status";
import ChatLayout from "./layouts/ChatLayout";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SocialMedia from "./pages/SocialMedia";
import  UseCLientSocket  from "./hooks/socket/ClientSocket";
import UseAuthContext from "./hooks/useAuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
function App() {
  // useEffect(() => {
  // useCLientSocket();
  // });

  const { user } = UseAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={!user ? <GuestLayout /> : <MainLayout />}>
        <Route index element={<SocialMedia />} />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="signup"
          element={!user ? <SignUp /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="settings"
          element={
            <PrivateRoute user={user}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute user={user}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="chat"
          element={
            <PrivateRoute user={user}>
              <ChatLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Welcome />} />
          <Route path=":id" element={<Chat />} />
        </Route>
      </Route>,
      <Route
        path="status"
        element={
          <PrivateRoute user={user}>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Status />} />
      </Route>,
      // <Route path="/" element={<GuestLayout />}></Route>,
      // <Route path="user">
      //   <Route index path="login" element={<Login />} />,
      //   <Route path="signup" element={<SignUp />} />,
      // </Route>,
    ])
  );

  return (
    <div>
      <UseCLientSocket>
        <RouterProvider router={router} />
      </UseCLientSocket>
    </div>
  );
}

export default App;
