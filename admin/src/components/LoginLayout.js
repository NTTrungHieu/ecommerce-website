import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center login">
        <div className="bg-white rounded-3 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
