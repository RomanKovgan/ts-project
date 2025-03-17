import * as yup from "yup";

export const lineSchema = yup.object({
  companySigDate: yup.string().required("Дата подписи компании обязательна"),
  companySignatureName: yup.string().required("Наименование обязательно"),
  documentName: yup.string().required("Название документа обязательно"),
  documentStatus: yup.string().required("Статус документа обязателен"),
  documentType: yup.string().required("Тип документа обязателен"),
  employeeNumber: yup.string().required("Номер сотрудника обязателен"),
  employeeSigDate: yup.string().required("Дата подписи сотрудника обязательна"),
  employeeSignatureName: yup
    .string()
    .required("Название документа обязательно"),
});
