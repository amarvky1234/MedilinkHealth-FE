import React from "react";
import heroImage from "../../../assets/images/videoconsult-heroimgpng.png";

function VideoConsultNavbar() {
  return (
      <div style={{backgroundColor:"#F8E9E6"}} >
        <div className="row align-items-center container p-4" style={{ margin:"10px 50px 50px 50px"}}>

          <div className="col-lg-6">
            <h1>
              Skip the travel! <br />
              Take Online Doctor Consultation
            </h1>

            <p>
              Private consultation + Audio call · Starts at ₹199
            </p>

            <button className="btn btn-primary">
              Consult Now
            </button>
          </div>
          <div className="col-lg-6 text-center">
            <img
              src={heroImage}
              className="img-fluid"
              alt="doctor"
            />
          </div>

        </div>
      </div>
  );
}

export default VideoConsultNavbar;

