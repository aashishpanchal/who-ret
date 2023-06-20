import { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableContainer,
} from "@mui/material";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Pagination, TableBody, TableHeader } from "./components";
import { useSearchParams } from "react-router-dom";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  loading?: boolean;
  count?: number;
  renderTableToolbar?: React.ReactNode;
};

export default function DataTable<Data extends object>({
  columns,
  data,
  loading,
  count = 0,
  renderTableToolbar,
}: DataTableProps<Data>) {
  const [dense, setDense] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const emptyMsg = useMemo(() => data.length === 0, [data]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    if (sorting.length !== 0) {
      setSearchParams((prev) => {
        if (sorting.length !== 0) {
          const { desc, id } = sorting[0];
          const field = id.split("_")[0];
          const sort = desc ? "-" + field : field;
          prev.set("sort", sort);
          return prev;
        } else if (searchParams.has("sort")) prev.delete("sort");
        return prev;
      });
    }
  }, [sorting]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {renderTableToolbar}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHeader {...table} />
            <TableBody
              {...table}
              loading={loading}
              emptyMsg={emptyMsg}
              colLength={columns.length}
            />
          </Table>
          <Pagination count={count} />
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={(e) => setDense(e.target.checked)}
          />
        }
        label="Dense padding"
      />
    </Box>
  );
}
