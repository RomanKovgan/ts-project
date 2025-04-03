export type TableLine = {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

export type TableLinesResponse = {
  data: TableLine[];
};

export type FormValues = Omit<TableLine, "id">;

export type ErrorResponseType = {
  errorStatus: number;
  message: string;
  errorId: string;
};
