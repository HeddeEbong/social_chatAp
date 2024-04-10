import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
  if (user) {
    return user ? children : <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
