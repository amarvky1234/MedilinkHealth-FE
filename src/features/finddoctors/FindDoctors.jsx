import React from "react";
import FindandBook from "./finddoctorcomps/FindandBook";
import FooterComp from "../../components/FooterComp";
import Navbar from "../../components/Navbar";
import SafteyData from "./finddoctorcomps/SafteyData";

function FindDoctors() {
    return(
        <div>
            <Navbar />
            <FindandBook />
            <SafteyData />
            <FooterComp />
        </div>
    )
}

export default FindDoctors;