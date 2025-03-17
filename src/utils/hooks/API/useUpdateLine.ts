import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { TableLine } from "../../../types/types";

export const useUpdateLine = (
  setEditLine: (value: TableLine | null) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: updateLine } = useMutation({
    mutationFn: ({ id, ...rest }: TableLine) => {
      return axios.post(
        routes.updateLinePath(id),
        rest,
        commonHeadersWithToken()
      );
    },
    onSuccess: () =>
      queryClient
        .invalidateQueries({ queryKey: ["allLines"] })
        .then(() => setEditLine(null)),
  });
  return { updateLine };
};
