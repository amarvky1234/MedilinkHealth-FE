import { useGetDoctorQuery } from "../../../services/doctorService";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../css/searchdoctors.css";

function SearchDoctors() {
    const [showAllDoctors, setShowAllDoctors] = useState(false);

    const navigate = useNavigate();
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);
    

    const [location, setLocation] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    


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

    const { data } = useGetDoctorQuery({
        search: debouncedSearch,
        location,
        page: 1
    });

    const doctors = data?.doctors || [];


    const filteredLocations = locations.filter((city) =>
        city.toLowerCase().includes(location.toLowerCase())
    );

    // const searchText = search.replace(/^dr\.?\s*/i, "").toLowerCase();

    // const filteredDoctors = doctors.filter((doctor) => {

    //     const doctorName = doctor.name.toLowerCase();

    //     const cityMatch = location
    //         ? doctor.city.toLowerCase().startsWith(location.toLowerCase())
    //         : true;

    //     const searchMatch = search
    //         ? doctor.specialization
    //             .toLowerCase()
    //             .includes(searchText) ||
    //         doctorName.includes(searchText)
    //         : true;

    //     return cityMatch && searchMatch;
    // });

    const filteredDoctors = doctors;

    const visibleDoctors = showAllDoctors
        ? filteredDoctors
        : filteredDoctors.slice(0, 3);

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
        <div className="container text-center p-2">

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
                                className="l-focus w-100"
                                placeholder="Location"
                                value={location}
                                onFocus={() =>
                                    setShowLocationDropdown(true)
                                }
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setShowLocationDropdown(true);
                                }}
                            />

                            {showLocationDropdown && (

                                <div className="location-dropdown">

                                    {filteredLocations.length > 0 ? (

                                        filteredLocations.map((city) => (

                                            <div
                                                key={city}
                                                className="location-item"
                                                onClick={() => {
                                                    setLocation(city);
                                                    setShowLocationDropdown(false);
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
                                type="text"
                                name="search"
                                className="l-focus w-100"
                                placeholder="Search doctors or speciality..."
                                value={search}
                                onFocus={() => setShowDropdown(true)}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setShowDropdown(true);
                                    setShowAllDoctors(false);
                                }}
                            />

                            {showDropdown && (
                                <div className="search-dropdown">

                                    {search === "" ? (
                                        <>
                                            <div className="dropdown-title">
                                                Common Specialities
                                            </div>

                                            {specialities.map((item) => (
                                                <div
                                                    key={item}
                                                    className="search-item"
                                                    onClick={() => {
                                                        navigate(
                                                            `/mydoctors?location=${encodeURIComponent(location)}&search=${encodeURIComponent(item)}`
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-search me-2"></i>
                                                    {item}
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

                                            {filteredDoctors.length > 3 && !showAllDoctors && (
                                                <div
                                                    className="see-all-item"
                                                    onClick={() => setShowAllDoctors(true)}
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
