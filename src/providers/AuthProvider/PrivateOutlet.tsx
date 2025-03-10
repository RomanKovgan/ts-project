import { Navigate, Outlet } from "react-router-dom";
import routes from "../../utils/routes";

export const PrivateOutlet = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};
