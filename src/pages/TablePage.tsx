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
import { FormValues, TableLine } from "../types/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import LineModal from "../components/Modal/LineModal";
import { useCreateLine } from "../utils/hooks/API/useCreateLine";
import { useDeleteLine } from "../utils/hooks/API/useDeleteLine";
import { useUpdateLine } from "../utils/hooks/API/useUpdateLine";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes";
import { TableSkeleton } from "../components/Skeleton/Skeleton";
import { useTableHeaderTranslations } from "../utils/hooks/useTableHeaderTranslations";

const TablePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editLine, setEditLine] = useState<TableLine | null>(null);
  const [fields, setFields] = useState<(keyof FormValues)[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getTableHeader } = useTableHeaderTranslations();
  const { lines, isLoadingLines } = useGetTableData();
  const { createLine } = useCreateLine(setOpenModal, t);
  const { deleteLine } = useDeleteLine(t);
  const { updateLine } = useUpdateLine(setEditLine, t);

  useEffect(() => {
    if (lines) {
      const keyRow = Object.keys(lines[0]) as (keyof FormValues)[];
      const rowsWithoutId = keyRow
        .filter((item: string) => item !== "id")
        .sort((a, b) => a.localeCompare(b));
      setFields(rowsWithoutId);
    }
  }, [lines]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(routes.loginPagePath());
    }
  }, [navigate]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header />
        {isLoadingLines ? (
          <TableSkeleton />
        ) : (
          lines && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {fields.map((fieldName) => (
                      <TableCell key={fieldName}>
                        {getTableHeader(fieldName)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenModal(true)}
                      >
                        {t("table.add")}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lines.map((line) => (
                    <TableRow key={line.id}>
                      {fields.map((fieldName) => {
                        if (fieldName.includes("SigDate")) {
                          return (
                            <TableCell key={`${line.id}-${fieldName}`}>
                              {format(
                                line[fieldName as keyof TableLine],
                                "dd.MM.yyyy"
                              )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={`${line.id}-${fieldName}`}>
                            {line[fieldName as keyof TableLine]}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton onClick={() => setEditLine(line)}>
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
          )
        )}
        {fields && (
          <LineModal
            openModal={openModal}
            setEditLine={setEditLine}
            setOpenModal={setOpenModal}
            editLine={editLine}
            createLine={createLine}
            updateLine={updateLine}
            fields={fields}
          />
        )}
      </div>
    </>
  );
};

export default TablePage;
