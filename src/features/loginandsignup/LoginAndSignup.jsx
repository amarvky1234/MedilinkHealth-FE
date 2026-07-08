import React, { useState } from "react";
import { Link} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import OTP from "./OTP";
import Navbar from "../../components/Navbar";

function LoginAndSignup() {
    const [activeTab, setActiveTab] = useState("login");
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [email, setEmail] = useState("");

    const handleIsVerified = (verified) => {
        setIsVerified(verified);
        setIsOTPSent(false);
        setActiveTab("login");
    }

    const handleSendOtp = (isSent, email) => {
        setIsOTPSent(isSent);
        setEmail(email);
        setIsVerified(false);
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />
            <div className="flex-grow-1 d-flex justify-content-center align-items-center px-3 py-4">
                <div className="w-100" style={{ maxWidth: "450px" }}>
                    <ul className="nav nav-tabs justify-content-center mb-4" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                                id="pills-login-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-login"
                                type="button"
                                role="tab"
                                aria-controls="pills-login"
                                aria-selected={activeTab === "login"}
                                onClick={() => {
                                    setIsOTPSent(false);
                                    setActiveTab("login");
                                }}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                                id="pills-register-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-register"
                                type="button"
                                role="tab"
                                aria-controls="pills-register"
                                aria-selected={activeTab === "register"}
                                onClick={() => {
                                    setIsOTPSent(false);
                                    setActiveTab("register");
                                }}
                            >
                                Register
                            </button>
                        </li>
                    </ul>

                    {(!isOTPSent || isVerified) && (
                        <div className="tab-content" id="pills-tabContent">
                            <div className={`tab-pane fade ${activeTab === "login" ? "show active" : ""}`} id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                                <Login />
                            </div>
                            <div className={`tab-pane fade ${activeTab === "register" ? "show active" : ""}`} id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                                <Register onSendOtp={handleSendOtp} />
                            </div>
                        </div>
                    )}
                    {isOTPSent && (
                        <div>
                            <OTP email={email} onVerified={handleIsVerified} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginAndSignup;