import { useNavigate } from "react-router-dom";
import routes from "../routes";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate(routes.loginPagePath());
  };
  return logout;
};
