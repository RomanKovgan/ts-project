import { useGetTableData } from "../utils/hooks/API/useGetTableData";

const TablePage = () => {
  const { lines } = useGetTableData();
  console.log(lines);

  return <div>Table</div>;
};

export default TablePage;
