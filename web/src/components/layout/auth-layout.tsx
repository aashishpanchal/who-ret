import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

export default function AuthLayout({}: Props) {
  const { auth } = useAppSelector((state) => state);
  if (auth.isAuth) return <Navigate to={`/admin`} replace />;
  return <Outlet />;
}
