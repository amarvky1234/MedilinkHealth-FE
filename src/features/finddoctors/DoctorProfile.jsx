import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorProfileQuery } from "../../services/doctorService";
import Navbar from "../../components/Navbar";

function DoctorProfile() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const {
        data,
        isLoading,
        isError
    } = useGetDoctorProfileQuery();

    if (isLoading) {
        return (
            <div className="container mt-5 text-center">
                <h5>Loading...</h5>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    Unable to load profile.
                </div>
            </div>
        );
    }

    const doctor = data?.doctor;

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">
                            Doctor Profile
                        </h4>
                    </div>

                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img
                                    src={`http://localhost:3300${doctor.photo}`}
                                    alt=""
                                    className="img-fluid rounded-circle border border-3 shadow"
                                    style={{
                                        width: "170px",
                                        height: "170px",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>

                            <div className="col-md-9">
                                <h3>{doctor.name}</h3>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="badge bg-success">
                                        {doctor.specialization}
                                    </span>

                                    {
                                        doctor.googleConnected &&
                                        <span className="badge bg-primary">
                                            Google Calendar Synced
                                        </span>
                                    }
                                </div>
                                <hr />
                                <p>
                                    <i className="bi bi-envelope-fill me-2 text-primary"></i>
                                    {doctor.email}
                                </p>

                                <p>
                                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                                    {doctor.phone}
                                </p>

                                <p>
                                    <i className="bi bi-hospital me-2 text-primary"></i>
                                    {doctor.hospital}
                                </p>

                                <p>
                                    <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                                    {doctor.city}
                                </p>

                                <p>
                                    <i className="bi bi-currency-rupee me-2 text-primary"></i>
                                    {doctor.consultationFee}
                                </p>
                            </div>
                        </div>

                        <hr />
                        <div className="card mb-4">
                            <div className="card-body">

                                <h5 className="mb-3">
                                    <i className="bi bi-clock-history me-2"></i>
                                    Availability
                                </h5>

                                <p>
                                    <strong>Working Hours:</strong>{" "}
                                    {doctor.workingHours.start} - {doctor.workingHours.end}
                                </p>

                                <p>
                                    <strong>Slot Duration:</strong>{" "}
                                    {doctor.slotDuration} Minutes
                                </p>

                                <p>
                                    <strong>Working Days:</strong>{" "}
                                    {doctor.workingDays.join(", ")}
                                </p>

                                {
                                    doctor.breaks?.length > 0 && (
                                        <p>
                                            <strong>Break:</strong>{" "}
                                            {doctor.breaks[0].start} - {doctor.breaks[0].end}
                                        </p>
                                    )
                                }
                                <button
                                    className="btn btn-outline-secondary w-100 mb-3"
                                    onClick={() => navigate("/doctor-edit")}
                                >
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Profile
                                </button>

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => navigate("/doctor-schedule")}
                                >
                                    <i className="bi bi-calendar-week me-2"></i>
                                    Manage Schedule
                                </button>
                            </div>
                        </div>
                        <h5 className="mb-3">
                            <i className="bi bi-google me-2"></i>
                            Google Calendar Integration
                        </h5>

                        {
                            doctor.googleConnected ? (

                                <div className="card border-success">

                                    <div className="card-body">

                                        <h6 className="text-success">
                                            ✅ Google Calendar Connected
                                        </h6>

                                        <p className="mb-3">
                                            <strong>Connected Account:</strong><br />
                                            {doctor.googleCalendarEmail}
                                        </p>

                                        <button
                                            className="btn btn-success w-100"
                                            disabled
                                        >
                                            ✓ Google Calendar Connected
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <div className="card border-warning">

                                    <div className="card-body">

                                        <h6 className="text-warning">
                                            ⚠ Google Calendar Not Connected
                                        </h6>
                                        <p>
                                            Connect your Google Calendar to automatically block booked appointments and avoid scheduling conflicts.
                                        </p>
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => {
                                                window.location.href =
                                                    `http://localhost:3300/google/connect?token=${token}`;
                                            }}
                                        >
                                            Connect Google Calendar
                                        </button>

                                    </div>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorProfile;