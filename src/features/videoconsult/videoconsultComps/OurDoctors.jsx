import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "../css/OurDoctors/doctor.css";

const doctors = [
  {
    id: 1,
    name: "Dr.Sanjay Meena",
    specialization: "Dermatologist",
    experience: "7 years experience",
    consults: "2773 consults done",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  },
  {
    id: 2,
    name: "Dr.Ayush Gupta",
    specialization: "Cardiologist",
    experience: "12 years experience",
    consults: "18265 consults done",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzSsLqbqLrsWnEKeZLieZ5epfdNaN5vnD2p66vgviTow&s",
  },
  {
    id: 3,
    name: "Dr.Pushpa Gour",
    specialization: "Gynecologist",
    experience: "32 years experience",
    consults: "59665 consults done",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
  {
    id: 4,
    name: "Dr.Sahil Tiwari",
    specialization: "Addiction Psychiatrist",
    experience: "7 years experience",
    consults: "37181 consults done",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
  },
  {
    id: 5,
    name: "Dr.Rahul Sharma",
    specialization: "Neurologist",
    experience: "15 years experience",
    consults: "25000 consults done",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnTBpZCVX0WwsZwjGPKfGJQQvR0cQ517DnB-UqNWqeGg&s",
  },
  {
    id: 6,
    name: "Dr.Priya Singh",
    specialization: "Dentist",
    experience: "10 years experience",
    consults: "15000 consults done",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8SYfYyikF5jo6bvbHGRC0f1Dhq59jhTP0BahyqUWH7A&s=10",
  },
];

function OurDoctors() {
  const [start, setStart] = useState(0);

  const visibleCards = 4;

  const next = () => {
    if (start + visibleCards < doctors.length) {
      setStart(start + 1);
    }
  };

  const prev = () => {
    if (start > 0) {
      setStart(start - 1);
    }
  };

  return (
    <div className="container my-5 position-relative">

      <h1 className="fw-bold mb-4">Our Doctors</h1>

      {start > 0 && (
        <button className="slider-btn left-btn" onClick={prev}>
          <FaChevronLeft />
        </button>
      )}

      {start + visibleCards < doctors.length && (
        <button className="slider-btn right-btn" onClick={next}>
          <FaChevronRight />
        </button>
      )}

      <div className="row g-4">

        {doctors.slice(start, start + visibleCards).map((doctor) => (
          <div className="col-lg-3" key={doctor.id}>

            <Link
              to={`/doctor/${doctor.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="doctor-card">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                />

                <div>

                  <h6 className="doctor-name">
                    {doctor.name}
                  </h6>

                  <p className="doctor-speciality">
                    {doctor.specialization}
                  </p>

                  <p className="doctor-text">
                    {doctor.experience}
                  </p>

                  <p className="doctor-text">
                    {doctor.consults}
                  </p>

                </div>

              </div>
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}

export default OurDoctors;