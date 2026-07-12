import React from "react";
import FindandBook from "./finddoctorcomps/FindandBook";
import FooterComp from "../../components/FooterComp";
import Navbar from "../../components/Navbar";
import SafteyData from "./finddoctorcomps/SafteyData";

function FindDoctors() {
    return(
        <div >
            <div className="position-fixed top-0 start-0  bg-white w-100 "
                style={{ zIndex:"1000"}}
            >
                <Navbar />
            </div>
            <FindandBook />
            <SafteyData />
            <FooterComp />
        </div>
    )
}

export default FindDoctors;