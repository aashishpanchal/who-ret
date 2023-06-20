import { useState } from "react";
import { ORDER_STATUS } from "@/constants";
import { useParams } from "react-router-dom";
import { BsPrinterFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { StyledMenu } from "@/components/styles";
import { tabFilter } from "@/utils/string-utils";
import { DateFormat } from "@/components/table/rows";
import LoadingBtn from "@/components/buttons/loading-btn";
import { Container, Grid, MenuItem, Typography } from "@mui/material";

type Props = {};

export default function OrderDetails({}: Props) {
  const [status, setStatus] = useState<string>(ORDER_STATUS.PENDING);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => setAnchorEl(null);

  const onChange = (value: string) => {
    setStatus(value);
    setAnchorEl(null);
  };

  const { id } = useParams();

  return (
    <Container className="mt-10">
      <div className="flex flex-wrap justify-between items-center">
        <span>
          <Typography variant="h5">Order #{id}</Typography>
          <DateFormat
            value={new Date().toString()}
            format="lll"
            color="GrayText"
          />
        </span>
        <div className="flex flex-end space-x-3">
          <LoadingBtn
            id="customized-button"
            aria-controls={open ? "customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            size="small"
            color="inherit"
            disableElevation
            onClick={handleClick}
            endIcon={<FaChevronDown />}
            sx={{ textTransform: "capitalize", bgcolor: "white" }}
          >
            {tabFilter(status)}
          </LoadingBtn>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
          >
            {Object.values(ORDER_STATUS).map((value, index) => (
              <MenuItem
                key={index}
                onClick={() => onChange(value)}
                sx={{ textTransform: "capitalize" }}
                selected={value === status}
              >
                {tabFilter(value)}
              </MenuItem>
            ))}
          </StyledMenu>
          <LoadingBtn
            variant="contained"
            size="small"
            color="inherit"
            startIcon={<BsPrinterFill />}
          >
            Print
          </LoadingBtn>
        </div>
      </div>

      <Grid container mt={4}>
        <Grid item xs={8}>
          <div>
            <Typography>Details</Typography>
          </div>
        </Grid>
        <Grid item>
          <div></div>
        </Grid>
      </Grid>
    </Container>
  );
}
