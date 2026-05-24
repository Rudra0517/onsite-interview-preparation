import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/loader/Loader";

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <>
          <RouterProvider router={routes} />
          <ToastContainer position="top-center" />
        </>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
