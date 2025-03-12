import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";

export const useGetTableData = () => {
  const {
    data: lines,
    isFetching: isLoadingLines,
    isSuccess: isLinesReceived,
  } = useQuery({
    queryKey: ["allLines"],
    queryFn: () => axios.get(routes.getAllDataPath(), commonHeadersWithToken()),
    select: ({ data }) => data.data,
  });
  return {
    lines,
    isLoadingLines,
    isLinesReceived,
  };
};
