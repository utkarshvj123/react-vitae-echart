import { type MRT_ColumnDef } from "mantine-react-table";
import {
  agricultureData,
  getYearlyCropProductionExtremes,
} from "../../common/commonFuction";
export type CropData = {
  year: string;
  maximumProduction: string;
  minimumProduction: string;
};

export const columns: MRT_ColumnDef<CropData>[] = [
  {
    accessorKey: "year",
    header: "Year",
    enableSorting: false,
    enableGlobalFilter: false,
    enableColumnFilterModes: false,
    mantineTableHeadCellProps: {
      align: "center",
    },
    mantineTableBodyCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "maximumProduction",
    header: "Crop with maximum production",
    enableSorting: false,
    mantineTableHeadCellProps: {
      align: "center",
    },
    mantineTableBodyCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "minimumProduction",
    header: "Crop with minumum production",
    enableSorting: false,
    mantineTableHeadCellProps: {
      align: "center",
    },
    mantineTableBodyCellProps: {
      align: "center",
    },
  },
];
export const data: CropData[] =
  getYearlyCropProductionExtremes(agricultureData);
