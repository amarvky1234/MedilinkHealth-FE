import React from "react";
import { BsCursor } from "react-icons/bs";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaPrescription } from "react-icons/fa6";

import "../css/HowItWorks/works.css";

function HowItWorks() {
  return (
    <div className="container py-5">

      <h1 className="text-center fw-bold mb-5">
        How it works
      </h1>

      <div className="position-relative">

        {/* Horizontal Line */}
        <div className="process-line"></div>

        <div className="row text-center">

          {/* Step 1 */}
          <div className="col-md-4 position-relative">

            <div className="process-icon">
              <BsCursor size={40} />
            </div>

            <p className="mt-4">
              Select a speciality or symptom
            </p>

          </div>

          {/* Step 2 */}
          <div className="col-md-4 position-relative">

            <div className="process-icon">
              <BiMessageRoundedDetail size={40} />
            </div>

            <p className="mt-4">
              Audio/video call with a verified doctor
            </p>

          </div>

          {/* Step 3 */}
          <div className="col-md-4 position-relative">

            <div className="process-icon">
              <FaPrescription size={35} />
            </div>

            <p className="mt-4">
              Get a digital prescription & free follow-up
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HowItWorks;