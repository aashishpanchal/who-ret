import nav from "./nav";
import { useEffect } from "react";
import { ROLE } from "@/constants";
import Logo from "@/components/logo";
import { useAppSelector } from "@/redux/hooks";
import { Box, Drawer, List } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { adminNavList, wholesellerNavList } from "../routes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const { user } = useAppSelector((state) => state.auth);

  const isTabletMid = useMediaQuery(
    (theme: any) => {
      return theme.breakpoints.up("lg");
    },
    {
      defaultMatches: true,
      noSsr: false,
    }
  );

  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      onClose?.();
    }
  }, [location.pathname]);

  const content = (
    <Box className="bg-sidebar flex h-full text-white flex-col">
      <Box className="px-2">
        <Link to="/admin">
          <Logo />
        </Link>
      </Box>
      <hr className="border-gray-400 mb-2" />
      <Box className="h-full overflow-auto">
        <List component="nav">
          {nav(user?.role === ROLE.ADMIN ? adminNavList : wholesellerNavList)}
        </List>
      </Box>
    </Box>
  );

  if (isTabletMid)
    return (
      <Drawer
        open
        anchor="left"
        variant="permanent"
        PaperProps={{
          className: "w-[260px]",
        }}
      >
        {content}
      </Drawer>
    );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={isOpen}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
