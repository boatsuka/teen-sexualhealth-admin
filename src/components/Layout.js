import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layouts() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Box component={"main"} sx={{ flexGrow: 1, p: 8 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layouts;
