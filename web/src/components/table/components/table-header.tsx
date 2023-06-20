import { visuallyHidden } from "@mui/utils";
import { Table, flexRender } from "@tanstack/react-table";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
} from "@mui/material";

export default function TableHeader<Data extends object>(props: Table<Data>) {
  const { getHeaderGroups } = props;

  return (
    <TableHead>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const meta: any = header.column.columnDef.meta;
            return (
              <TableCell
                key={header.id}
                align={meta?.numeric ? "right" : "left"}
                padding={meta?.disablePadding ? "none" : "normal"}
                sortDirection={header.column.getIsSorted() ? "asc" : false}
              >
                <TableSortLabel
                  active={header.column.getIsSorted() ? true : false}
                  direction={
                    header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? "desc"
                        : "asc"
                      : "asc"
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    <Box component="span" sx={visuallyHidden}>
                      {header.column.getIsSorted() === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
}
