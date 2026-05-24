import React from "react";
import { Atom } from "react-loading-indicators";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Atom
        color="#FBBF24"
        size="large"
        text="Loading..."
        textColor="#FBBF24"
      />
    </div>
  );
};

export default Loader;
