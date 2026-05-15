import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <RouterProvider router={routes} />
        <ToastContainer position="top-center" />
      </div>
    </AuthProvider>
  );
};

export default App;
