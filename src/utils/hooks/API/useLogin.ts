import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse, useNavigate } from "react-router-dom";
import routes from "../../routes";
import { commonHeaders } from "../../../constants/HeadersAPI";

const API = "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login";

export type UserType = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending: isLoadingLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({
    mutationFn: (data: UserType) => {
      return axios.post(API, JSON.stringify(data), commonHeaders());
    },
    onSuccess(res) {
      console.log(res.data);
      localStorage.setItem("token", res.data.data.token);
      navigate(routes.tablePagePath());
    },
    onError: (error: AxiosError<ErrorResponse>): void => {
      console.log(error);
    },
  });
  return { login, isLoadingLogin, isSuccessLogin };
};
