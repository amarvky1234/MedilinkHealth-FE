import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../services/doctorService";
import { useBookAppointmentMutation } from "../../services/appointmentService";
import Navbar from "../../components/Navbar";

import "./css/doctordetails.css";
import { useState } from "react";
import { toast } from "react-toastify";

function DoctorDetails() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [success, setSuccess] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [bookAppointment] = useBookAppointmentMutation();

    const handleBook = async () => {
        if (!date || !time) {
            alert("Please select date and time.");
            return;
        }

        try {
            await bookAppointment({
                doctorId: doctor._id,
                appointmentDate: date,
                appointmentTime: time
            }).unwrap();

            setBookingDetails({
                date,
                time,
            });
            console.log("before toaster");
            toast.success("Appointment booked successfully!");
            console.log("after toaster");

            setSuccess(true);

            // Optional: Clear the form
            setDate("");
            setTime("");
        } catch (err) {
            setSuccess(false);
            //alert("Booking failed");
            alert("Booking failed");
        }
    };

    const { id } = useParams();

    const {
        data: doctor,
        isLoading,
        error,
    } = useGetDoctorByIdQuery(id);

    if (isLoading) return <h2>Loading...</h2>;

    if (error) return <h2>Error...</h2>;

    if (!doctor) return <h2>Doctor Not Found</h2>;


    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-body">


                        <div className="row">

                            <div className="col-md-8">

                                <div className="d-flex">

                                    <img
                                        src={doctor.photo}
                                        alt={doctor.name}
                                        className="doctor-img"
                                    />

                                    <div className="ms-4">

                                        <h2>{doctor.name}</h2>

                                        <h5 className="text-secondary">
                                            {doctor.specialization}
                                        </h5>

                                        <p>
                                            {doctor.experience} Years Experience
                                        </p>

                                        <p>
                                            {doctor.qualification}
                                        </p>

                                        <p>
                                            <b>Hospital :</b> {doctor.hospital}
                                        </p>

                                        <p>
                                            <b>City :</b> {doctor.city}
                                        </p>

                                        <h4 className="text-primary">
                                            ₹{doctor.consultationFee}
                                        </h4>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-4">

                                <div className="border rounded p-4">

                                    <h4>Book Appointment</h4>

                                    <hr />

                                    <label>Select Date</label>

                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control mb-3"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />

                                    <label>Select Time</label>

                                    <select className="form-select mb-3"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    >

                                        <option>10:00 AM</option>
                                        <option>12:00 PM</option>
                                        <option>02:00 PM</option>
                                        <option>04:00 PM</option>
                                        <option>07:00 PM</option>

                                    </select>

                                    <button className="btn btn-primary w-100"
                                        onClick={handleBook}
                                    >
                                        Book Appointment
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {success && (
                <div className="alert alert-success mt-3">
                    <h5>Appointment Confirmed 🎉</h5>

                    <p>
                        <strong>Doctor:</strong> {doctor.name}
                    </p>

                    <p>
                        <strong>Hospital:</strong> {doctor.hospital}
                    </p>

                    <p>
                        <strong>Date:</strong> {bookingDetails?.date}
                    </p>

                    <p>
                        <strong>Time:</strong> {bookingDetails?.time}
                    </p>
                </div>
            )}
        </>
    );
}

export default DoctorDetails;