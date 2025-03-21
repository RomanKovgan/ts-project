import { FC, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TableLine } from "../../types/types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { lineSchema } from "../../utils/schemas/lineValidationSchema";
import { formatDate } from "../../utils/formatDateISO";
import { useTranslation } from "react-i18next";

export type LineModalProps = {
  openModal: boolean;
  editLine: TableLine | null;
  setOpenModal: (value: boolean) => void;
  setEditLine: (value: TableLine | null) => void;
  createLine: (value: Omit<TableLine, "id">) => void;
  updateLine: (value: TableLine) => void;
};

const LineModal: FC<LineModalProps> = ({
  openModal,
  editLine,
  setOpenModal,
  setEditLine,
  createLine,
  updateLine,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lineSchema),
    defaultValues: {
      companySigDate: "",
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: "",
      employeeSignatureName: "",
    },
  });

  useEffect(() => {
    if (editLine) {
      reset({
        companySigDate: formatDate(editLine.companySigDate),
        companySignatureName: editLine.companySignatureName,
        documentName: editLine.documentName,
        documentStatus: editLine.documentStatus,
        documentType: editLine.documentType,
        employeeNumber: editLine.employeeNumber,
        employeeSigDate: formatDate(editLine.employeeSigDate),
        employeeSignatureName: editLine.employeeSignatureName,
      });
    } else {
      reset({
        companySigDate: "",
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: "",
        employeeSignatureName: "",
      });
    }
  }, [editLine, reset]);

  const onSubmit = (data: Omit<TableLine, "id">) => {
    if (editLine) {
      handleUpdate({ ...data, id: editLine.id });
    } else {
      handleCreate(data);
    }
  };

  const handleCreate = (data: Omit<TableLine, "id">) => {
    createLine(data);
  };

  const handleUpdate = (data: TableLine) => {
    updateLine(data);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={openModal || !!editLine}
        onClose={() => {
          setOpenModal(false);
          setEditLine(null);
          reset();
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <DialogTitle>
            {editLine ? t("modal.edit") : t("modal.add")}
          </DialogTitle>
          <DialogContent>
            <Controller
              name="companySigDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.companySigDate")}
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  fullWidth
                  margin="normal"
                  error={!!errors.companySigDate}
                  helperText={errors.companySigDate?.message}
                />
              )}
            />
            <Controller
              name="companySignatureName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.companySignatureName")}
                  fullWidth
                  margin="normal"
                  error={!!errors.companySignatureName}
                  helperText={errors.companySignatureName?.message}
                />
              )}
            />
            <Controller
              name="documentName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.documentName")}
                  fullWidth
                  margin="normal"
                  error={!!errors.documentName}
                  helperText={errors.documentName?.message}
                />
              )}
            />
            <Controller
              name="documentStatus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.documentStatus")}
                  fullWidth
                  margin="normal"
                  error={!!errors.documentStatus}
                  helperText={errors.documentStatus?.message}
                />
              )}
            />
            <Controller
              name="documentType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.documentType")}
                  fullWidth
                  margin="normal"
                  error={!!errors.documentType}
                  helperText={errors.documentType?.message}
                />
              )}
            />
            <Controller
              name="employeeNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.employeeNumber")}
                  fullWidth
                  margin="normal"
                  error={!!errors.employeeNumber}
                  helperText={errors.employeeNumber?.message}
                />
              )}
            />
            <Controller
              name="employeeSigDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.employeeSigDate")}
                  type="date"
                  fullWidth
                  margin="normal"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  error={!!errors.employeeSigDate}
                  helperText={errors.employeeSigDate?.message}
                />
              )}
            />
            <Controller
              name="employeeSignatureName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("modal.employeeSignatureName")}
                  fullWidth
                  margin="normal"
                  error={!!errors.employeeSignatureName}
                  helperText={errors.employeeSignatureName?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-around",
              flexShrink: 0,
              padding: "10px 16px ",
            }}
          >
            <Button
              onClick={() => {
                setOpenModal(false);
                setEditLine(null);
                reset();
              }}
            >
              {t("modal.cancel")}
            </Button>
            <Button type="submit" color="primary">
              {editLine ? t("modal.save") : t("modal.add")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default LineModal;
