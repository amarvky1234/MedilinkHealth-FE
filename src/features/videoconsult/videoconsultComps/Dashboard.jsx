import React from "react";

function Dashboard() {
  const stats = [
    { id: 1, value: "2,00,000+", label: "Happy Users" },
    { id: 2, value: "20,000+", label: "Verified Doctors" },
    { id: 3, value: "25+", label: "Specialities" },
    { id: 4, value: "4.5 / 5", label: "App Rating" },
  ];

  return (
    <div className="container-fluid bg-dark text-white py-5 mb-5">
      <div className="container">
        <div className="row text-center">

          {stats.map((stat) => (
            <div
              key={stat.id}
              className="col-6 col-md-3 mb-4 mb-md-0"
            >
              <p className="fw-bold display-6 mb-2">
                {stat.value}
              </p>

              <p className="text-light mb-0">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;