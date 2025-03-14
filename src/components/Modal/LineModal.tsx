import { FC } from "react";
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

export type LineModalProps = {
  openModal: boolean;
  editLine: TableLine | null;
  setOpenModal: (value: boolean) => void;
  setEditLine: (value: TableLine | null) => void;
};

const LineModal: FC<LineModalProps> = ({
  openModal,
  editLine,
  setOpenModal,
  setEditLine,
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

  const onSubmit = (data: Omit<TableLine, "id">) => {
    console.log(data);
    if (editLine) {
      handleUpdate({ ...editLine, ...data });
    } else {
      handleCreate(data);
    }
  };

  const handleCreate = (data: Omit<TableLine, "id">) => {
    console.log(data);
  };

  const handleUpdate = (data: TableLine) => {
    console.log(data);
  };

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
          <DialogTitle>{editLine ? "Редактировать" : "Добавить"}</DialogTitle>
          <DialogContent>
            <Controller
              name="companySigDate"
              control={control}
              defaultValue={editLine?.companySigDate || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Дата"
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
              defaultValue={editLine?.companySignatureName || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Наименование"
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
              defaultValue={editLine?.documentName || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Название документа"
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
              defaultValue={editLine?.documentStatus || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Статус документа"
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
              defaultValue={editLine?.documentType || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Тип документа"
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
              defaultValue={editLine?.employeeNumber || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Номер сотрудника"
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
              defaultValue={editLine?.employeeSigDate || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Дата сотрудника"
                  fullWidth
                  margin="normal"
                  error={!!errors.employeeSigDate}
                  helperText={errors.employeeSigDate?.message}
                />
              )}
            />
            <Controller
              name="employeeSignatureName"
              control={control}
              defaultValue={editLine?.employeeSignatureName || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Название документа"
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
              Отмена
            </Button>
            <Button type="submit" color="primary">
              {editLine ? "Сохранить" : "Добавить"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default LineModal;
