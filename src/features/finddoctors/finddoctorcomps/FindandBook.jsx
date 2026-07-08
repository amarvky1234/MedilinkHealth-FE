import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/findandbook.css";

function FindandBook() {
    const [location, setLocation] = useState("");
    const [search, setSearch] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

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
        "Plastic Surgeon",
        "Physiotherapist",
        "Diabetologist",
        "Sexologist",
        "Ayurveda",
        "Homeopathy"
    ];

    const filteredLocations = locations.filter((city) =>
        city.toLowerCase().includes(location.toLowerCase())
    );

    const filteredSpecialities = specialities.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {

    const handleClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
            setShowLocationDropdown(false);
        }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
        document.removeEventListener("mousedown", handleClick);
    };

    }, []);

    const services = [
        {
            icon: "bi bi-chat-left-text",
            title: "Consult with a doctor",
            path: "/video"
        },
        {
            icon: "bi bi-cart3",
            title: "Order Medicines",
            path: "/medicine",
        },
        {
            icon: "bi bi-file-earmark-medical",
            title: "View medical records",
        },
        {
            icon: "bi bi-capsule",
            title: "Book test",
            badge: "New",
        },
        {
            icon: "bi bi-book",
            title: "Read articles",
        },
        {
            icon: "bi bi-briefcase",
            title: "For healthcare providers",
        },
    ];

    return (
        <div className="hero-section">

            {/* Background Image */}
            <div className="hero-banner">

                <div className="container text-center pt-5">

                    <h1 className="display-3 fw-bold text-white">
                        Your home for health
                    </h1>

                    <h2 className="text-white fw-bold mt-5">
                        Find and Book
                    </h2>


                    <div className="row justify-content-center mt-4">

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
                                {/* Location */}
                                <div
                                    className="d-flex align-items-center px-3 position-relative"
                                    style={{
                                        width: "33.33%",
                                        borderRight: "1px solid #ddd",
                                        height: "100%",
                                    }}
                                >
                                    <i className="bi bi-geo-alt me-2"></i>

                                    <input
                                        type="text"
                                        className="l-focus w-100"
                                        value={location}
                                        placeholder="Location"
                                        onFocus={() => setShowLocationDropdown(true)}
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
                                                        className="search-item"
                                                        onClick={() => {
                                                            setLocation(city);
                                                            setShowLocationDropdown(false);
                                                        }}
                                                    >
                                                        <div>
                                                            <i className="bi bi-geo-alt me-2"></i>
                                                            {city}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="search-item">
                                                    No location found
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </div>

                                {/* Search */}
                                <div
                                    className="d-flex align-items-center px-3 position-relative"
                                    style={{
                                        width: "66.67%",
                                        height: "100%",
                                    }}
                                >
                                    <i className="bi bi-search me-2"></i>

                                    <input
                                        type="text"
                                        className="l-focus w-100"
                                        placeholder="Search doctors, clinics, hospitals, etc."
                                        value={search}
                                        onFocus={() => setShowDropdown(true)}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                    />

                                    {showDropdown && (
                                        <div className="search-dropdown">

                                            <div className="dropdown-title">
                                                Common Specialities
                                            </div>

                                            {(search ? filteredSpecialities : specialities).length > 0 ? (
                                                (search ? filteredSpecialities : specialities).map((item) => (
                                                    <div
                                                        key={item}
                                                        className="search-item"
                                                        onClick={() => {
                                                            setSearch(item);
                                                            setShowDropdown(false);

                                                            navigate(
                                                                `/mydoctors?location=${location}&speciality=${item}`
                                                            );
                                                        }}
                                                    >
                                                        <div>
                                                            <i className="bi bi-search me-2"></i>
                                                            {item}
                                                        </div>

                                                        <small>SPECIALITY</small>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="search-item">
                                                    No speciality found
                                                </div>
                                            )}

                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="popular-search mt-3 w-100 text-start">

                                <span>Popular searches :</span>

                                <Link>Dermatologist</Link>

                                <Link>Pediatrician</Link>

                                <Link>Gynecologist/Obstetrician</Link>

                                <Link>Others</Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Navigation */}

            <div className="service-bar">

                <div className="container">

                    <div className="row text-center">

                        {services.map((item, index) => (

                            <div
                                className="col-md-2 py-2 service-item"
                                key={index}
                            >

                                <Link to={item.path} className="text-decoration-none" target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="position-relative d-inline-block">

                                        <i className={`${item.icon} fs-2 text-white`}></i>

                                        {item.badge && (
                                            <span className="badge bg-success position-absolute top-0 start-100 translate-middle">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>

                                    <div className="text-white mt-2">
                                        {item.title}
                                    </div>
                                </Link>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default FindandBook;