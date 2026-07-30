import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAddDoctorMutation } from "../../services/doctorService";

function DoctorRegister() {
    const [doctor, setDoctor] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        hospital: "",
        city: "",
        consultationFee: "",
        photo: "",
        gender: "",
    });
    const [addDoctorFn] = useAddDoctorMutation();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setDoctor({
            ...doctor,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(doctor).forEach((key) => {
            formData.append(key, doctor[key]);
        });

        console.log([...formData.entries()]);

        try {
            // const res = await addDoctorFn(formData).unwrap();
            // console.log(res);

            const res = await addDoctorFn(formData).unwrap();

            localStorage.setItem("doctorId", res.doctor._id);

            alert("Doctor Registered Successfully");

            window.location.href = `http://localhost:3300/google/connect/${res.doctor._id}`;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="card shadow-lg border-0 rounded-4 p-4">
                            <h3 className="text-center mb-4">Doctor Registration</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Name */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Doctor Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="enter name"
                                            value={doctor.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="email address"
                                            value={doctor.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            placeholder="mobile number"
                                            value={doctor.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Gender</label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={doctor.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Specialization */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Specialization</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="specialization"
                                            placeholder="enter your specialization"
                                            value={doctor.specialization}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Experience (Years)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="experience"
                                            placeholder="what your experience"
                                            value={doctor.experience}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Qualification */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Qualification</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="qualification"
                                            placeholder="enter qualification"
                                            value={doctor.qualification}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Hospital */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Hospital</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="hospital"
                                            placeholder="Hospital Name"
                                            value={doctor.hospital}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* City */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            placeholder="which city"
                                            value={doctor.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Consultation Fee */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Consultation Fee (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="consultationFee"
                                            placeholder="enter fee"
                                            value={doctor.consultationFee}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Photo URL */}
                                    <div className="col-md-12 mb-4">
                                        <label className="form-label">Upload Photo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary w-100">
                                            Register Doctor
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorRegister;