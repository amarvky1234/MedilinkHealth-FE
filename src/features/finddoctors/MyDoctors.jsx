import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDoctorQuery } from "../../services/doctorService";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import FindandBook from "./finddoctorcomps/FindandBook";
import SearchDoctors from "./finddoctorcomps/SearchDoctors";
import FooterComp from "../../components/FooterComp";


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

    const { data ,isFetching, isLoading, error } = useGetDoctorQuery({
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
        <>
            <Navbar />

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
                                    className="col-12 col-md-6 col-xl-4"
                                    key={doctor._id}
                                >
                                    <div
                                        className="card h-100 shadow-sm"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/doctor/${doctor._id}`)}
                                    >
                                        <div className="card-body d-flex flex-column">

                                            <div className="d-flex align-items-center mb-3 gap-3">
                                                <img
                                                    src={doctor.photo}
                                                    alt={doctor.name}
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                        borderRadius: "50%",
                                                        width: "100px",
                                                        height: "100px"
                                                    }}
                                                />

                                                <div>
                                                    <h5 className="card-title mb-1">
                                                        {doctor.name}
                                                    </h5>

                                                    <p className="text-muted mb-0">
                                                        {doctor.specialization}
                                                    </p>
                                                </div>
                                            </div>

                                            <p><strong>Email:</strong> {doctor.email}</p>

                                            <p><strong>Phone:</strong> {doctor.phone}</p>

                                            <p><strong>Experience:</strong> {doctor.experience} Years</p>

                                            <p><strong>Qualification:</strong> {doctor.qualification}</p>

                                            <p><strong>Hospital:</strong> {doctor.hospital}</p>

                                            <p><strong>City:</strong> {doctor.city}</p>

                                            <div className="mt-auto pt-3 border-top">
                                                <strong>
                                                    Consultation Fee :
                                                    <span className="text-primary">
                                                        {" "}₹{doctor.consultationFee}
                                                    </span>
                                                </strong>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <div className="d-flex justify-content-center align-items-center gap-3 my-5">

                            <button
                                className="btn btn-outline-primary"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                            <span className="fw-bold">
                                Page {data?.page} of {data?.totalPages}
                            </span>

                            <button
                                className="btn btn-primary"
                                disabled={page === data?.totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>

                        </div> */}
                        {isFetching && page > 1 && (
                            <div className="text-center my-4">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-2">Loading more doctors...</p>
                            </div>
                        )}
                    </>
                )}

            </div>

            <div className="mt-4">
                <FooterComp />
            </div>
        </>
    );
}

export default MyDoctors;