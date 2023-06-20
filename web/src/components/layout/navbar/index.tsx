import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useState, useRef } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaCircle } from "react-icons/fa";
import AccountPopover from "./popover";

export default function Navbar(props: { onSidebarOpen: () => void }) {
  const { onSidebarOpen } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <AppBar
        sx={{
          left: {
            lg: 260,
          },
          width: {
            lg: "calc(100% - 260px)",
          },
          boxShadow: "none",
          bgcolor: "white",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <HiMenuAlt1 />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="https://picsum.photos/200/300"
          >
            <FaCircle />
          </Avatar>
        </Toolbar>
      </AppBar>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
}
