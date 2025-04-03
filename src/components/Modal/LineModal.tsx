import { FC, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormValues, TableLine } from "../../types/types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLineSchema } from "../../utils/schemas/lineValidationSchema";
import { formatDate } from "../../utils/formatDateISO";
import { useTranslation } from "react-i18next";
type LineModalProps = {
  openModal: boolean;
  editLine: TableLine | null;
  setOpenModal: (value: boolean) => void;
  setEditLine: (value: TableLine | null) => void;
  createLine: (value: Omit<TableLine, "id">) => void;
  updateLine: (value: TableLine) => void;
  fields: (keyof FormValues)[];
};

const LineModal: FC<LineModalProps> = ({
  openModal,
  editLine,
  setOpenModal,
  setEditLine,
  createLine,
  updateLine,
  fields,
}) => {
  const schema = useLineSchema();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    const erEl = document.querySelector(`[data-field=${firstError}]`);
    if (erEl) {
      erEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      (erEl as HTMLInputElement).focus();
    }
  }, [errors]);

  const onSubmit = async (data: Omit<TableLine, "id">) => {
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
        maxWidth="md"
        fullWidth
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            maxHeight: "80vh",
          }}
        >
          <DialogTitle>
            {editLine ? t("modal.edit") : t("modal.add")}
          </DialogTitle>
          <DialogContent dividers>
            {fields.map((fieldName) => (
              <Controller
                key={fieldName}
                name={fieldName}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={t(`modal.${fieldName}`)}
                    data-field={fieldName}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    margin="normal"
                    type={fieldName.includes("Date") ? "date" : "text"}
                    slotProps={{
                      inputLabel: {
                        shrink: fieldName.includes("Date") ? true : undefined,
                      },
                    }}
                  />
                )}
              />
            ))}
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
