import { Header } from "../Header";
import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
