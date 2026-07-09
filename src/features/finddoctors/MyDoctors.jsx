import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDoctorQuery } from "../../services/doctorService";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import FindandBook from "./finddoctorcomps/FindandBook";
import SearchDoctors from "./finddoctorcomps/SearchDoctors";
import FooterComp from "../../components/FooterComp";

import "./css/mydoctors.css";

function MyDoctors() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [allDoctors, setAllDoctors] = useState([]);
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    // Filter doctors
    // const filteredDoctors = data.filter((doctor) => {

    //     const cityMatch = location
    //         ? doctor.city.toLowerCase() === location.toLowerCase()
    //         : true;

    //     const searchMatch = search
    //         ? doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    //         doctor.specialization.toLowerCase().includes(search.toLowerCase())
    //         : true;

    //     return cityMatch && searchMatch;
    // });

    const { data, isFetching, isLoading, error } = useGetDoctorQuery({
        search,
        location,
        page
    });
    useEffect(() => {

        if (data?.doctors) {

            if (page === 1) {
                setAllDoctors(data.doctors);
            } else {
                setAllDoctors(prev => [...prev, ...data.doctors]);
            }

        }

    }, [data]);

    useEffect(() => {

        setPage(1);
        setAllDoctors([]);

    }, [search, location]);

    useEffect(() => {

        const handleScroll = () => {

            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {

                if (page < data?.totalPages) {
                    setPage(prev => prev + 1);
                }

            }

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [page, data]);

    if (isLoading) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center mt-5">Error fetching doctors.</h2>;
    }

    return (

        <div className="min-vh-100 d-flex flex-column">
            <Navbar />

            <main className="flex-grow-1">
                <div>
                    <SearchDoctors />
                </div>

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
                                {allDoctors.map((doctor) => (

                                    <div
                                        className="col-12"
                                        key={doctor._id}
                                    >
                                        <div
                                            className="mydoctor-card"
                                            style={{ cursor: "pointer" }}
                                        // onClick={() => navigate(`/doctor/${doctor._id}`)}
                                        >
                                            <div className="">

                                                <div className="row align-items-center">

                                                    {/* Left Image */}
                                                    <div className="col-md-2 text-center">
                                                        <img
                                                            src={doctor.photo}
                                                            alt={doctor.name}
                                                            className="mydoctor-photo"
                                                        />

                                                        <p
                                                            className="view-profile"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/doctor/${doctor._id}`);
                                                            }}
                                                        >
                                                            View Profile
                                                        </p>
                                                    </div>

                                                    {/* Middle */}
                                                    <div className="col-md-7">
                                                        <h3 className="mydoctor-name">
                                                            {doctor.name}
                                                        </h3>

                                                        <p className="mydoctor-speciality">
                                                            {doctor.specialization}
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
                                                        <hr />

                                                        <div className="mydoctor-rating">

                                                            <span className="rating-box">

                                                                👍 96%

                                                            </span>

                                                            <span className="story">

                                                                50 Patient Stories

                                                            </span>

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
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Contact Clinic
                                                        </button>
                                                    </div>

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