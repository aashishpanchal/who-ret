import TableEmpty from "./table-empty";
import { Table, flexRender } from "@tanstack/react-table";
import {
  CircularProgress,
  TableCell,
  TableRow,
  TableBody as MUITableBody,
} from "@mui/material";

type Props = {
  emptyMsg?: boolean;
  loading?: boolean;
  colLength: number;
};

export default function TableBody<Data extends object>(
  props: Table<Data> & Props
) {
  const { loading, emptyMsg, colLength, getRowModel } = props;
  return (
    <MUITableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={colLength} sx={{ py: 3 }} align="center">
            <CircularProgress size={30} />
          </TableCell>
        </TableRow>
      ) : emptyMsg ? (
        <TableRow>
          <TableCell colSpan={colLength} sx={{ py: 3 }}>
            <TableEmpty />
          </TableCell>
        </TableRow>
      ) : (
        getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <TableCell key={cell.id} {...meta}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      )}
    </MUITableBody>
  );
}
