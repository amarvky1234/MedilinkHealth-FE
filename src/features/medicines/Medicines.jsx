import React from "react";
import MedicineNavbar from "./ordermedicine/MedicineNavbar";
import SwiperSection from "./ordermedicine/SwiperSection";
import FooterComp from "../../components/FooterComp";
import MedicineInputSection from "./ordermedicine/MedicineInputSection";
import MedicineHealthProduct from "./ordermedicine/MedicineHealthProduct";

function Medicines() {
    return(
        <>
            <MedicineNavbar></MedicineNavbar>
            <MedicineInputSection />
            <SwiperSection />
            <MedicineHealthProduct />
            <FooterComp />
        </>
    )
}

export default Medicines;