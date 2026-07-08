import React, { useRef, useState } from "react";
import "./css/inputsection.css";

function MedicineInputSection() {
    const inputRef = useRef(null);
    return(
        <div
            className="search-box p-2 border w-50"
            style={{ margin: "20px 20px 20px 150px" }}
            onClick={() => inputRef.current.focus()}
            >
            <i className="bi bi-search me-2"></i>
            <input
                ref={inputRef}
                type="text"
                name="searchInput"
                placeholder="Search for medicine, health products and more"
                className="search-input w-75"
            />
        </div>
    )
}

export default MedicineInputSection;