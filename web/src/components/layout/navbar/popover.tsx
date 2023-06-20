import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TOKEN } from "@/constants";
import { FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logoutFn } from "@/http/apis/auth-api";
import { setAuth } from "@/redux/features/authSlice";
import { getToken, removeTokens } from "@/utils/token";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function AccountPopover(props: {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
}) {
  const { anchorEl, onClose, open } = props;
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function onLogout() {
    const token = getToken(TOKEN.REFRESH);

    if (token) {
      try {
        const {
          data: { user },
        } = await logoutFn(token);
        removeTokens();
        dispatch(setAuth(user));
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "200px" },
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Typography variant="overline" fontSize={"small"}>
          {user.role}
        </Typography>
        <Typography color="text.secondary" variant="body2" fontSize={"small"}>
          {user.name || "no name"}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => console.log("singout")}>
          <ListItemIcon>
            <FaLock />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <FiLogOut />
          </ListItemIcon>
          <ListItemText>logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
