import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetTableData } from "../utils/hooks/API/useGetTableData";
import { Delete, Edit } from "@mui/icons-material";
import { TableLine } from "../types/types";
import { useState } from "react";
import { format } from "date-fns";
import LineModal from "../components/Modal/LineModal";
import { useCreateLine } from "../utils/hooks/API/useCreateLine";
import { useDeleteLine } from "../utils/hooks/API/useDeleteLine";
import { useUpdateLine } from "../utils/hooks/API/useUpdateLine";
import Header from "../components/Header";

const TablePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editLine, setEditLine] = useState<TableLine | null>(null);
  const { lines } = useGetTableData();
  const { createLine } = useCreateLine(setOpenModal);
  const { deleteLine } = useDeleteLine();
  const { updateLine } = useUpdateLine(setEditLine);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Наименование </TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>Статус документа</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Номер сотрудника</TableCell>
              <TableCell>Дата сотрудника</TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(true)}
                >
                  Добавить
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lines?.map((line) => (
              <TableRow key={line.id}>
                <TableCell>
                  {format(line.companySigDate, "dd.MM.yyyy")}
                </TableCell>
                <TableCell>{line.companySignatureName}</TableCell>
                <TableCell>{line.documentName}</TableCell>
                <TableCell>{line.documentStatus}</TableCell>
                <TableCell>{line.documentType}</TableCell>
                <TableCell>{line.employeeNumber}</TableCell>
                <TableCell>
                  {format(line.employeeSigDate, "dd.MM.yyyy")}
                </TableCell>
                <TableCell>{line.employeeSignatureName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditLine(line);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteLine(line.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LineModal
        openModal={openModal}
        setEditLine={setEditLine}
        setOpenModal={setOpenModal}
        editLine={editLine}
        createLine={createLine}
        updateLine={updateLine}
      />
    </div>
  );
};

export default TablePage;
