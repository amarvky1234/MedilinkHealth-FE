import { useParams } from "react-router-dom";
import { useGetDoctorQuery } from "../../services/doctorService";
import Navbar from "../../components/Navbar";

import "./css/doctordetails.css";

function DoctorDetails() {

    const { id } = useParams();

    const { data = [], isLoading } = useGetDoctorQuery();

    if (isLoading) return <h2>Loading...</h2>;

    const doctor = data.find((item) => item._id === id);

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
                                        className="form-control mb-3"
                                    />

                                    <label>Select Time</label>

                                    <select className="form-select mb-3">

                                        <option>10:00 AM</option>
                                        <option>12:00 PM</option>
                                        <option>02:00 PM</option>
                                        <option>04:00 PM</option>
                                        <option>07:00 PM</option>

                                    </select>

                                    <button className="btn btn-primary w-100">
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