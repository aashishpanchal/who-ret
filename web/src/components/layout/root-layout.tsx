import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useState } from "react";
import { ROLE } from "@/constants";
import { styled, Box } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

const LayoutContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 260,
  },
}));

export default function RootLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const { auth } = useAppSelector((state) => state);

  if (!auth.isAuth) return <Navigate to="/login" replace />;
  else if (![ROLE.ADMIN, ROLE.WHOLESELLER].includes(auth?.user?.role))
    return <Navigate to="/login" replace />;

  const onClose = () => setIsOpen(false);

  return (
    <>
      <LayoutContainer className={"flex max-w-full pt-[64px]"}>
        <Box component="main" className="flex flex-col w-full">
          <Outlet />
        </Box>
      </LayoutContainer>
      <Navbar onSidebarOpen={() => setIsOpen(true)} />
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </>
  );
}
