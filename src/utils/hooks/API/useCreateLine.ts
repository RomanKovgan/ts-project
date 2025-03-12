import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";

export const useCreateLine = () => {
  const queryClient = useQueryClient();
  const { mutate: createLine, isPending: isLoadingCreatedLines } = useMutation({
    mutationFn: (data) => {
      return axios.post(
        routes.createLinePath(),
        data,
        commonHeadersWithToken()
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allLines"] }),
  });
  return { createLine, isLoadingCreatedLines };
};
