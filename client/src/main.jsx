import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AllRoutes from "./routes/AllRoutes";
import AuthProvider from "./customProvider/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  </QueryClientProvider>
);
