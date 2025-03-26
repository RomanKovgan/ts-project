import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { TableLine } from "../../../types/types";
import { AlertMode } from "../../../enums";
import { TFunction } from "i18next";
import { useContext } from "react";
import { AlertContext } from "../../context";

export const useUpdateLine = (
  setEditLine: (value: TableLine | null) => void,
  t: TFunction
) => {
  const queryClient = useQueryClient();
  const { addAlert } = useContext(AlertContext);
  const { mutate: updateLine } = useMutation({
    mutationFn: ({ id, ...rest }: TableLine) => {
      return axios.post(
        routes.updateLinePath(id),
        rest,
        commonHeadersWithToken()
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["allLines"] }).then(() => {
        setEditLine(null);
        addAlert(t("alerts.updateLine"), AlertMode.Success);
      }),
    onError: () => {
      addAlert(t("errors.defaultError"), AlertMode.Error);
    },
  });
  return { updateLine };
};
