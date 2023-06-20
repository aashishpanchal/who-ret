import { Paper, Typography } from "@mui/material";

export default function TableEmpty() {
  return (
    <Paper sx={{ boxShadow: "none" }}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Data not exits in database
      </Typography>
      <Typography variant="body2" align="center">
        Please add new records.
      </Typography>
    </Paper>
  );
}
