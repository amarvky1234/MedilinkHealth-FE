import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDoctorQuery } from "../../services/doctorService";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import FindandBook from "./finddoctorcomps/FindandBook";
import SearchDoctors from "./finddoctorcomps/SearchDoctors";
import FooterComp from "../../components/FooterComp";

import "./css/mydoctors.css";
import FilterDoctor from "./finddoctorcomps/FilterDoctors";
import Login from "../loginandsignup/Login";

function MyDoctors() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [openContact, setOpenContact] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "");

    const [filters, setFilters] = useState({
        gender: "",
        experience: 0,
        fee: "",
        sortBy: "",
    });
    const loadingMore = useRef(false);

    const { data, isFetching, isLoading, error } = useGetDoctorQuery({
        search,
        location,
        gender: filters.gender,
        experience: filters.experience,
        fee: filters.fee,
        sortBy: filters.sortBy,
        page
    });

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setLocation(searchParams.get("location") || "");
    }, [searchParams]);

    useEffect(() => {
        if (!data?.doctors) return;

        if (page === 1) {
            setAllDoctors(data.doctors);
        } else {
            setAllDoctors(prev => {
                const ids = new Set(prev.map(d => d._id));

                return [
                    ...prev,
                    ...data.doctors.filter(d => !ids.has(d._id))
                ];
            });
        }
    }, [data, page]);

    useEffect(() => {
        setPage(1);
        setAllDoctors([]);

    }, [search, location]);

    useEffect(() => {

        if (!isFetching) {
            loadingMore.current = false;
        }

    }, [isFetching]);
    useEffect(() => {
        const handleScroll = () => {
            if (loadingMore.current) return;
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
                if (page < data?.totalPages) {
                    loadingMore.current = true;
                    setPage(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [page, data?.totalPages]);


    if (isLoading) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    if (error) {
        return (
            <>
            <h2 className="text-center mt-5">Please Login to fetch the Doctors.</h2>
            <div className="container w-50">
                <Login />
            </div>
            </>            
        );
    }

    return (

        <div className="min-vh-100 d-flex flex-column">
            <div className="position-fixed bg-white w-100"
                style={{ zIndex: 2000 }}
            >
                <Navbar />
            </div>
            <div className="position-fixed bg-white w-100" style={{ marginTop: "70px", zIndex: "2000" }}>
                <SearchDoctors />
            </div>
            <div style={{ marginTop: "30px" }}>
                <div className="container-fluid p-0">
                    <FilterDoctor
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            </div>

            <main className="flex-grow-1" style={{ marginTop: "100px" }}>

                <div className="container">

                    {(location || search) && (
                        <div className="mb-4">

                            <h3 className="fw-bold">
                                {search || "All Doctors"} {location && `in ${location}`}
                            </h3>

                            <p className="text-muted mb-0">
                                {allDoctors.length} Doctor{allDoctors.length !== 1 ? "s" : ""} Found
                            </p>

                        </div>
                    )}

                    {allDoctors.length === 0 ? (
                        <div className="text-center mt-5">
                            <h3>No doctors found</h3>
                            <p>
                                No doctors available for{" "}
                                <strong>{search}</strong>
                                {location && <> in <strong>{location}</strong></>}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="row g-4">
                                {allDoctors.map((doctor, index) => (

                                    <div
                                        className="col-12"
                                        key={doctor._id + index}
                                    >
                                        <div
                                            className="border-bottom"
                                            style={{ cursor: "pointer" }}
                                        // onClick={() => navigate(`/doctor/${doctor._id}`)}
                                        >

                                                <div className="row align-items-center">

                                                    {/* Left Image */}
                                                    <div className="col-md-2 text-center">
                                                        <div className="doctor-image-wrapper">

                                                            <img
                                                                src={doctor.photo}
                                                                alt={doctor.name}
                                                                className="mydoctor-photo"
                                                            />

                                                            <p
                                                                className="view-profile"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                View Profile
                                                            </p>

                                                        </div>
                                                    </div>

                                                    {/* Middle */}
                                                    <div className="col-md-7">
                                                        <h3 className="mydoctor-name">
                                                            {doctor.name}
                                                        </h3>

                                                        <p className="mydoctor-speciality">
                                                            {doctor.specialization}
                                                        </p>

                                                        <p className="">
                                                            {doctor.gender}
                                                        </p>

                                                        <p className="mydoctor-exp">
                                                            {doctor.experience} Years experience overall
                                                        </p>

                                                        <p className="mydoctor-hospital">
                                                            <strong>{doctor.city}</strong> • {doctor.hospital}
                                                        </p>

                                                        <p className="mydoctor-fee">
                                                            ₹{doctor.consultationFee} Consultation fee
                                                        </p>
                                                        <div>
                                                            {openContact === doctor._id && (
                                                                <div className="contact-panel">

                                                                    <div className="contact-title">
                                                                        Contact Clinic
                                                                    </div>

                                                                    <div className="contact-phone">
                                                                        <span className="phone-label">Phone number</span>

                                                                        <a
                                                                            href={`tel:${doctor.phone}`}
                                                                            className="phone-number"
                                                                        >
                                                                            {doctor.phone}
                                                                        </a>
                                                                    </div>

                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                    {/* Right */}
                                                    <div className="col-md-3 text-center">
                                                        <p className="available">
                                                            <i className="bi bi-calendar3 me-2"></i>
                                                            Available Today
                                                        </p>

                                                        <button
                                                            className="btn btn-info text-white w-100 mb-3"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/doctor/${doctor._id}`);
                                                            }}
                                                        >
                                                            Book Clinic Visit
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-primary w-100 mt-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setOpenContact(
                                                                    openContact === doctor._id ? null : doctor._id
                                                                )
                                                            }}
                                                        >
                                                            <i className="bi bi-telephone-fill me-2"></i>
                                                            Contact Clinic
                                                        </button>
                                                    </div>

                                                </div>

                                        </div>
                                    </div>

                                ))}
                            </div>

                            {isFetching && page > 1 && (
                                <div className="text-center my-4">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2">Loading more doctors...</p>
                                </div>
                            )}
                        </>
                    )}

                </div>

            </main>
            <FooterComp />

        </div>

    );
}

export default MyDoctors;