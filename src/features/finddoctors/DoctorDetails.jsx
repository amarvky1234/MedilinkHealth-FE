import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../services/doctorService";
import { useBookAppointmentMutation } from "../../services/appointmentService";
import Navbar from "../../components/Navbar";

import "./css/doctordetails.css";
import { useState } from "react";

function DoctorDetails() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [bookAppointment] = useBookAppointmentMutation();

    const handleBook = async () => {
        try {
                await bookAppointment({
                    doctorId: doctor._id,
                    appointmentDate: date,
                    appointmentTime: time
                }).unwrap();

                alert(`Appointment Confirmed!

                    Doctor: ${doctor.name}
                    Hospital: ${doctor.hospital}
                    Date: ${date}
                    Time: ${time}`);
                            } catch (err) {
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

        </>
    );
}

export default DoctorDetails;