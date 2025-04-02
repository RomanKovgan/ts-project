import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const useLoginSchema = () => {
  const { t } = useTranslation();
  return yup.object({
    username: yup
      .string()
      .min(1, t("errors.validation.login.username.min", { count: 1 }))
      .required(t("errors.validation.login.username.requared")),
    password: yup
      .string()
      .min(6, t("errors.validation.login.password.min", { count: 6 }))
      .required(t("errors.validation.login.password.required")),
  });
};
