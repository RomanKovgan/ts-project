import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import routes from "../../routes";
import { commonHeadersWithToken } from "../../../constants/HeadersAPI";
import { TableLine } from "../../../types/types";
import { useContext } from "react";
import { AlertContext } from "../../context";
import { AlertMode } from "../../../enums";
import { TFunction } from "i18next";

export const useCreateLine = (
  setOpenModal: (value: boolean) => void,
  t: TFunction
) => {
  const { addAlert } = useContext(AlertContext);
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
        .then(() => setOpenModal(false))
        .then(() => addAlert(t("alerts.createLine"), AlertMode.Success)),
    onError: () => {
      addAlert(t("alerts.defaultError"), AlertMode.Error);
    },
  });
  return { createLine, isLoadingCreatedLines };
};
