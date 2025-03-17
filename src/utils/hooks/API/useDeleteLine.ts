import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { emptyData } from "../../../constants/emptyData";

export const useDeleteLine = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteLine } = useMutation({
    mutationFn: (id: string) => {
      return axios.post(
        routes.deleteLinePath(id),
        emptyData,
        commonHeadersWithToken()
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allLines"] }),
  });
  return { deleteLine };
};
