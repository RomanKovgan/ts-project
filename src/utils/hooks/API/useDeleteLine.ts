import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { emptyData } from "../../../constants/emptyData";
import { TFunction } from "i18next";
import { AlertMode } from "../../../enums";
import { useContext } from "react";
import { AlertContext } from "../../context";

export const useDeleteLine = (t: TFunction) => {
  const queryClient = useQueryClient();
  const { addAlert } = useContext(AlertContext);
  const { mutate: deleteLine } = useMutation({
    mutationFn: (id: string) => {
      return axios.post(
        routes.deleteLinePath(id),
        emptyData,
        commonHeadersWithToken()
      );
    },
    onSuccess: () =>
      queryClient
        .invalidateQueries({ queryKey: ["allLines"] })
        .then(() => addAlert(t("alerts.deleteLine"), AlertMode.Success)),
    onError: () => {
      addAlert(t("alerts.defaultError"), AlertMode.Error);
    },
  });
  return { deleteLine };
};
