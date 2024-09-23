import React from "react";
import { Header } from "../header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FavoriteProvider } from "../../context/favorite";
const Root = () => {


  return (
    <FavoriteProvider>
      <Header  />
      <Outlet />
      <Toaster />
    </FavoriteProvider>
  );
};

export default Root;
