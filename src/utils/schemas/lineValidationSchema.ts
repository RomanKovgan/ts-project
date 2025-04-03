import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const useLineSchema = () => {
  const { t } = useTranslation();
  return yup.object({
    companySigDate: yup
      .string()
      .required(t("errors.validation.modalLine.companySigDate")),
    companySignatureName: yup
      .string()
      .required(t("errors.validation.modalLine.companySignatureName")),
    documentName: yup
      .string()
      .required(t("errors.validation.modalLine.documentName")),
    documentStatus: yup
      .string()
      .required(t("errors.validation.modalLine.documentStatus")),
    documentType: yup
      .string()
      .required(t("errors.validation.modalLine.documentType")),
    employeeNumber: yup
      .string()
      .required(t("errors.validation.modalLine.employeeNumber")),
    employeeSigDate: yup
      .string()
      .required(t("errors.validation.modalLine.employeeSigDate")),
    employeeSignatureName: yup
      .string()
      .required(t("errors.validation.modalLine.employeeSignatureName")),
  });
};
