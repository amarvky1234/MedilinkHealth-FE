import { useParams } from "react-router-dom";
import { useGetDoctorByIdQuery } from "../../services/doctorService";
import { useBookAppointmentMutation } from "../../services/appointmentService";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { getDoctorImage } from "../../utils/imageHelper";

import "./css/doctordetails.css";
import { useState } from "react";

function DoctorDetails() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [success, setSuccess] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [bookAppointment] = useBookAppointmentMutation();

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    const convertTo24Hour = (time12) => {
        const [time, period] = time12.split(' ');
        let [hours, minutes] = time.split(':');

        if(period === 'PM' && hours !== '12') {
            hours = parseInt(hours) + 12;
        } else if (period === 'AM' && hours === '12') {
            hours = '00';
        }

        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    const isTimePast = (timeStr) => {
        if(date !== getTodayDate()) return false; // Only disable for today
        
        const currentTime = getCurrentTime();
        const timeIn24 = convertTo24Hour(timeStr);
        return timeIn24 <= currentTime;
    };

    const handleBook = async () => {
        if (!date || !time) {
            alert("Please select date and time.");
            return;
        }

        try {
            await bookAppointment({
                doctorId: doctor._id,
                appointmentDate: date,
                appointmentTime: time,
            }).unwrap();

            Swal.fire({
                icon: "success",
                title: "Appointment Confirmed!",
                html: `
                    <b>Doctor:</b> ${doctor.name}<br>
                    <b>Hospital:</b> ${doctor.hospital}<br>
                    <b>Date:</b> ${date}<br>
                    <b>Time:</b> ${time}
                `,
                confirmButtonText: "OK",
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: err?.data?.message || "Please try again.",
            });
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
                                        src={getDoctorImage(doctor.photo)}
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
                                        min={getTodayDate()}
                                        onChange={(e) => {
                                            setDate(e.target.value)
                                            setTime("")
                                        }}
                                    />

                                    <label>Select Time</label>

                                    <select className="form-select mb-3"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    >
                                        <option>select time</option>
                                        <option
                                            value="10:00 AM"
                                            disabled={isTimePast("10:00 AM")}
                                        >
                                            10:00 AM
                                        </option>
                                        <option
                                            value="12:00 PM"
                                            disabled={isTimePast("12:00 PM")}
                                        >
                                            12:00 AM
                                        </option>
                                        <option
                                            value="02:00 PM"
                                            disabled={isTimePast("02:00 PM")}
                                        >
                                            02:00 PM
                                        </option>
                                        <option
                                            value="04:00 PM"
                                            disabled={isTimePast("04:00 PM")}
                                        >
                                            04:00 PM
                                        </option>
                                        <option
                                            value="07:00 PM"
                                            disabled={isTimePast("07:00 PM")}
                                        >
                                            07:00 PM
                                        </option>

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