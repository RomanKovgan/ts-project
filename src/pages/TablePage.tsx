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

const TablePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editLine, setEditLine] = useState<TableLine | null>(null);
  const { lines } = useGetTableData();

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div>
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
                  <IconButton onClick={() => setEditLine(line)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(line.id)}>
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
      />
    </div>
  );
};

export default TablePage;
