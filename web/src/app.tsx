import appRouter from "@/app-routes";
import Loader from "./components/loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRefresh } from "./hooks/useRefresh";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  const { loading } = useRefresh();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {loading ? <Loader /> : <RouterProvider router={appRouter} />}
      <ToastContainer />
    </LocalizationProvider>
  );
}
