import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse, useNavigate } from "react-router-dom";
import routes from "../../routes";
import { commonHeaders } from "../../../constants/HeadersAPI";
import { useContext } from "react";
import { AlertContext } from "../../context";
import { TFunction } from "i18next";
import { AlertMode } from "../../../enums";

export type UserType = {
  username: string;
  password: string;
};

export const useLogin = (t: TFunction) => {
  const navigate = useNavigate();

  const { addAlert } = useContext(AlertContext);
  const {
    mutate: login,
    isPending: isLoadingLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({
    mutationFn: (data: UserType) => {
      return axios.post(
        routes.loginPath(),
        JSON.stringify(data),
        commonHeaders()
      );
    },
    onSuccess(res) {
      if (res.data.error_text === "Access deny") {
        addAlert(t("errors.loginError"), AlertMode.Error);
        return;
      }
      localStorage.setItem("token", res.data.data.token);
      navigate(routes.tablePagePath());
    },
    onError: (error: AxiosError<ErrorResponse>): void => {
      console.log(error);
      addAlert(t("errors.defaultError"), AlertMode.Error);
    },
  });
  return { login, isLoadingLogin, isSuccessLogin };
};
