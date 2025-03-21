import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { TableLine } from "../../../types/types";

export const useCreateLine = (setOpenModal: (value: boolean) => void) => {
  const queryClient = useQueryClient();
  const { mutate: createLine, isPending: isLoadingCreatedLines } = useMutation({
    mutationFn: (data: Omit<TableLine, "id">) => {
      return axios.post(
        routes.createLinePath(),
        data,
        commonHeadersWithToken()
      );
    },
    onSuccess: () =>
      queryClient
        .invalidateQueries({ queryKey: ["allLines"] })
        .then(() => setOpenModal(false)),
  });
  return { createLine, isLoadingCreatedLines };
};
