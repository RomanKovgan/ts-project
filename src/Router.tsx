import { FC } from "react";
import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TablePage from "./pages/TablePage";
import { PrivateOutlet } from "./providers/AuthProvider/PrivateOutlet";
import routes from "./utils/routes";

export const Router: FC = () => {
  return (
    <BrowserRouter basename="/ts-project/">
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route element={<PrivateOutlet />}>
          <Route path={"/"} element={<TablePage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.loginPagePath()} />} />
      </Routes>
    </BrowserRouter>
  );
};
