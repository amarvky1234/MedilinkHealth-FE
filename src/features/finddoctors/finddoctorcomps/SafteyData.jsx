import React from "react";
import { Link } from "react-router-dom";

function SafteyData() {
    return (
        <>
            <div style={{ backgroundColor: "#F0F0F5", height: "720px" }}>
                <div className="d-flex justify-content-evenly" style={{paddingTop:"100px"}}>
                    <div>
                        <h1>Safety of your data is our </h1>
                        <h1 className="fw-bold">top priority.</h1>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-check fs-2" style={{ color: "#199FD9" }}></i>
                            Multi-level security checks
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-check fs-2" style={{ color: "#199FD9" }}></i>
                            Multiple data backups
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <i className="bi bi-check fs-2" style={{ color: "#199FD9" }}></i>
                            Stringent data privacy policies
                        </div>
                        <Link className="border-link text-decoration-none p-2 px-4 text-white"
                            style={{ border: "1px solid #199FD9", background: "#199FD9", fontSize:"20px" }}>
                            Read more
                        </Link>
                    </div>
                    <div>
                        <img src="https://www.practostatic.com/web-assets/home/assets/images/security_1.4f45ac92aba979dac915f864df632d90.png"
                            width="250px" height="250px" alt="" />
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-2 m-5 p-5">
                    <div>
                        <img src="https://www.practostatic.com/web-assets/home/assets/images/security_2.654a7085bfa74c726f26b64edaafd9a5.png" alt="" />
                        <p className="w-50">256-bit encryption</p>
                    </div>
                    <div>
                        <img src="https://www.practostatic.com/web-assets/home/assets/images/security_3.a73921ca6e980ed186518d7cb0ce64bf.png" alt="" />
                        <p className="w-75">ISO 27001 certified</p>
                    </div>
                    <div>
                        <img src="https://www.practostatic.com/web-assets/home/assets/images/security_4.216e25d35038f0e7f6d8a514727fa67a.png" alt="" />
                        <p className="mb-0">HIPAA </p>
                        <p className="w-75">compliant data centers</p>
                    </div>
                    <div>
                        <img src="https://www.practostatic.com/web-assets/home/assets/images/security_5.cf6e04c57178071a67c219b43066ffcf.png" alt="" />
                        <p className="w-50">DSCI member</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SafteyData;