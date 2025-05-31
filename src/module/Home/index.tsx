import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { columns, data } from "./TableFormat";

const Home = () => {
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    mantinePaginationProps: {
      radius: "xl",
      size: "md",
      position: "center",
      color: "rgb(84, 112, 198)",
    },
    mantineTableHeadCellProps: {},
    paginationDisplayMode: "pages",
    enablePagination: true,
    enableTopToolbar: false,
  });

  return <MantineReactTable table={table} />;
};

export default Home;
