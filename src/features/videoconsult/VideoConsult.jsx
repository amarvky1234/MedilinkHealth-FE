import React from "react";
import VideoConsultNavbar from "./videoconsultComps/VideoConsultNavbar";
import Navbar from "../../components/Navbar";
import Specialities from "./videoconsultComps/Specialities";
import HealthConcerns from "./videoconsultComps/HealthConcerns";
import FooterComp from "../../components/FooterComp";
import Offers from "./videoconsultComps/Offers";
import OurDoctors from "./videoconsultComps/OurDoctors";
import HowItWorks from "./videoconsultComps/HowItWorks";
import Dashboard from "./videoconsultComps/Dashboard";

function VideoConsult() {
    return(
        <>
            <Navbar></Navbar>  
            <VideoConsultNavbar></VideoConsultNavbar>
            <Specialities></Specialities>
            <HealthConcerns></HealthConcerns>
            <Offers></Offers>
            <OurDoctors></OurDoctors>
            <HowItWorks></HowItWorks>
            <Dashboard></Dashboard>

            <FooterComp></FooterComp>
        </>
    )
}

export default VideoConsult;