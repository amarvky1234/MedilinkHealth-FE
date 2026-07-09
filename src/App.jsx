import React, { useState } from "react"
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import FooterComp from "./components/FooterComp";

function App() {
  return(
    <div className="d-flex justify-content-center">
      <div>
        <Navbar></Navbar>
        <HomePage></HomePage>
        {/* <Outlet></Outlet> */}
      </div>
    </div>
  )
}

export default App;
