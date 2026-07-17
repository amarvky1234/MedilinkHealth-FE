import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDoctorsQuery } from "../../../services/doctorService";

import "../css/searchdoctors.css";

const locations = [
    "Hyderabad",
    "Bengaluru",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Visakhapatnam",
    "Vijayawada",
    "Warangal",
    "Nagpur",
    "Bhopal",
    "Indore",
    "Patna",
    "Coimbatore",
    "Kochi",
    "Mysuru"
];

const specialities = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Neurologist",
    "Gynecologist",
    "Orthopedic",
    "Pediatrician",
    "General Physician",
    "ENT Specialist",
    "Psychiatrist",
    "Urologist",
    "Oncologist",
    "Nephrologist",
    "Pulmonologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Ophthalmologist",
    "Radiologist",
    "Rheumatologist",
    "Plastic Surgeon"
];

function SearchDoctors() {
    const navigate = useNavigate();
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAllDoctors, setShowAllDoctors] = useState(false);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const [searchInput, setSearchInput] = useState("");
    const [locationInput, setLocationInput] = useState("");

    const filteredLocations = locations.filter((city) =>
        city.toLowerCase().includes((locationInput || "").toLowerCase())
    );

    const { data, } = useSearchDoctorsQuery(
        {
            search: searchInput,
            location: locationInput,
        },
        {
            skip: !searchInput.trim() && !locationInput.trim(),
        }
    );

    const filteredDoctors = data?.doctors || [];

    const visibleDoctors = showAllDoctors ? filteredDoctors : filteredDoctors.slice(0, 3);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
                setShowLocationDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div className="container text-center p-2 mb-2">

            <div className="row justify-content-center">

                <div className="col-lg-8 d-flex flex-column align-items-center">

                    <div
                        ref={dropdownRef}
                        className="d-flex align-items-center shadow position-relative"
                        style={{
                            width: "75%",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            height: "55px",
                            overflow: "visible",
                        }}
                    >

                        {/* LOCATION */}

                        <div
                            className="d-flex align-items-center px-3 position-relative"
                            style={{
                                width: "33%",
                                borderRight: "1px solid #ddd",

                            }}
                        >

                            <i className="bi bi-geo-alt me-2"></i>

                            <input
                                type="text"
                                name="location"
                                className="l-focus w-100 pe-4"
                                placeholder="Location"
                                value={locationInput}
                                onFocus={() =>
                                    setShowLocationDropdown(true)
                                }
                                onChange={(e) => {
                                    setLocationInput(e.target.value);
                                    setShowLocationDropdown(true);
                                }}
                            />
                            {locationInput && (
                                <i
                                    className="bi bi-x-circle-fill position-absolute"
                                    style={{
                                        right: "10px",
                                        cursor: "pointer",
                                        color: "#888"
                                    }}
                                    onClick={() => {
                                        setLocationInput("");
                                        // navigate(
                                        //     `/mydoctors?search=${encodeURIComponent(searchInput)}`
                                        // );
                                    }}
                                ></i>
                            )}

                            {showLocationDropdown && (

                                <div className="location-dropdown">

                                    {filteredLocations.length > 0 ? (

                                        filteredLocations.map((city) => (

                                            <div
                                                key={city}
                                                className="location-item"
                                                onClick={() => {
                                                    setLocationInput(city);
                                                    setShowLocationDropdown(false);
                                                    searchInputRef.current?.focus();
                                                    setShowDropdown(true);
                                                    navigate(
                                                        `/mydoctors?location=${encodeURIComponent(city)}&search=${encodeURIComponent(searchInput)}`
                                                    );
                                                }}
                                            >
                                                <i className="bi bi-geo-alt-fill"></i>

                                                <div className="location-info">

                                                    <h6>{city}</h6>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <div className="search-item">
                                            No Location Found
                                        </div>

                                    )}

                                </div>

                            )}

                        </div>
                        {/* SEARCH */}

                        <div
                            className="d-flex align-items-center px-3 position-relative"
                            style={{
                                width: "67%",
                                height: "100%",
                            }}
                        >
                            <i className="bi bi-search me-2"></i>

                            <input
                                ref={searchInputRef}
                                type="text"
                                name="search"
                                className="l-focus w-100 pe-4"
                                placeholder="Search doctors or speciality..."
                                value={searchInput}
                                onFocus={() => setShowDropdown(true)}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    setShowDropdown(true);
                                    setShowAllDoctors(false);
                                }}
                            />
                            {searchInput && (
                                <i
                                    className="bi bi-x-circle-fill position-absolute"
                                    style={{
                                        right: "12px",
                                        cursor: "pointer",
                                        color: "#888"
                                    }}
                                    onClick={() => {
                                        setSearchInput("");
                                        setShowDropdown(false);
                                        // navigate(
                                        //     `/mydoctors?location=${encodeURIComponent(locationInput)}`
                                        // );
                                    }}
                                ></i>
                            )}

                            {showDropdown && (
                                <div className="search-dropdown">

                                    {searchInput === "" ? (
                                        <>
                                            <div className="dropdown-title">
                                                Common Specialities
                                            </div>

                                            {specialities.map((item) => (
                                                <div
                                                    key={item}
                                                    className="search-item"
                                                    onClick={() => {
                                                        setSearchInput(item);
                                                        setShowDropdown(false);
                                                        navigate(
                                                            `/mydoctors?location=${encodeURIComponent(locationInput)}&search=${encodeURIComponent(item)}`
                                                        );
                                                    }}
                                                >
                                                    <div className="search-left">
                                                        <div className="search-icon">
                                                            <i className="bi bi-search"></i>
                                                        </div>

                                                        <span>{item}</span>
                                                    </div>

                                                    <span className="search-type">
                                                        SPECIALITY
                                                    </span>
                                                </div>
                                            ))}
                                        </>
                                    ) : filteredDoctors.length > 0 ? (
                                        <>
                                            {visibleDoctors.map((doctor) => (

                                                <div
                                                    key={doctor._id}
                                                    className="doctor-search-item"
                                                    onClick={() => {
                                                        setShowDropdown(false);

                                                        navigate(`/doctor/${doctor._id}`);
                                                    }}
                                                >

                                                    <img
                                                        src={doctor.photo}
                                                        alt={doctor.name}
                                                        className="doctor-search-img"
                                                    />

                                                    <div className="doctor-search-info">

                                                        <h6>{doctor.name}</h6>

                                                        <p>{doctor.specialization}</p>

                                                        <small>{doctor.hospital}</small>

                                                        <div className="doctor-city">

                                                            <i className="bi bi-geo-alt-fill me-1"></i>

                                                            {doctor.city}

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                            {filteredDoctors.length > 3 && !showAllDoctors &&(
                                                <div
                                                    className="see-all-item"
                                                    onClick={() => {
                                                        setShowAllDoctors(true);
                                                        navigate(
                                                            `/mydoctors?location=${encodeURIComponent(locationInput)}&search=${encodeURIComponent(searchInput)}`
                                                        );
                                                    }}
                                                >
                                                    See All ({filteredDoctors.length})
                                                </div>
                                            )}

                                        </>
                                    ) : (

                                        <div className="text-center p-3">
                                            <i className="bi bi-search fs-3 text-secondary"></i>
                                            <div className="mt-2">
                                                No doctors found
                                            </div>
                                        </div>

                                    )}

                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
export default SearchDoctors;
