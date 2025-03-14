import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { TableLinesResponse } from "../../../types/types";

export const useGetTableData = () => {
  const {
    data: lines,
    isFetching: isLoadingLines,
    isSuccess: isLinesReceived,
  } = useQuery({
    queryKey: ["allLines"],
    queryFn: () =>
      axios.get<TableLinesResponse>(
        routes.getAllDataPath(),
        commonHeadersWithToken()
      ),
    select: ({ data }) => data.data,
  });
  return {
    lines,
    isLoadingLines,
    isLinesReceived,
  };
};
