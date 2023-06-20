import "./index.css";
import React from "react";
import App from "./app.tsx";
import ReactDOM from "react-dom/client";
import { Providers } from "./redux/providers.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import QueryProvider from "./components/query-provider.tsx";
import { oldMaterialTheme } from "./themes/old-material-theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={oldMaterialTheme}>
      <CssBaseline />
      <Providers>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Providers>
    </ThemeProvider>
  </React.StrictMode>
);
