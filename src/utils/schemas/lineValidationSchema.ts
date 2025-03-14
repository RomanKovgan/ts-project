import * as yup from "yup";

export const lineSchema = yup.object({
  companySigDate: yup.string().required("Дата обязательнf").min(10, "10min"),
  companySignatureName: yup.string().required("Дата обязательнf"),
  documentName: yup.string().required("Дата обязательнf"),
  documentStatus: yup.string().required("Дата обязательнf"),
  documentType: yup.string().required("Дата обязательнf"),
  employeeNumber: yup.string().required("Дата обязательнf"),
  employeeSigDate: yup.string().required("Дата обязательнf"),
  employeeSignatureName: yup.string().required("Дата обязательнf"),
});
