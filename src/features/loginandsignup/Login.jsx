import React, { useState } from "react";
import { useLoginMutation } from "../../services/authService";
import { useSendOTPMutation } from "../../services/otpService";
import { useNavigate } from "react-router-dom";

function Login() {
    const [userData, setUserData] = useState({});
    const [useOtpLogin, setUseOtpLogin] = useState(false);
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [otpPending, setOtpPending] = useState(false);
    const [loginFn] = useLoginMutation();
    const [sendOTPFn] = useSendOTPMutation();
    const navigate = useNavigate();

    const handleResendOtp = async () => {
        const emailInput = document.querySelector('input[name="email"]');
        const email = emailInput?.value?.trim();

        if (!email) {
            setMessage("Please enter your email or mobile number.");
            return;
        }

        try {
            const otpRes = await sendOTPFn(email).unwrap();
            if (otpRes?.isSent) {
                setOtpStep(true);
                setOtpPending(true);
                setOtp("");
                setMessage("A new OTP has been sent. Please enter the latest code.");
            } else {
                setMessage("Unable to resend OTP. Please try again.");
            }
        } catch (error) {
            console.log(error);
            setMessage("Unable to resend OTP. Please try again.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const payload = Object.fromEntries(form.entries());
        const email = payload.email;

        if (useOtpLogin) {
            if (!otpStep) {
                if (!email) {
                    setMessage("Please enter your email or mobile number.");
                    return;
                }

                try {
                    const otpRes = await sendOTPFn(email).unwrap();
                    if (otpRes?.isSent) {
                        setOtpStep(true);
                        setOtpPending(true);
                        setMessage("OTP sent successfully. Please enter the code below.");
                    } else {
                        setMessage("Unable to send OTP. Please try again.");
                    }
                } catch (error) {
                    console.log(error);
                    setMessage("Unable to send OTP. Please try again.");
                }
                return;
            }

            if (!otp) {
                setMessage("Please enter the OTP.");
                return;
            }

            try {
                const loginRes = await loginFn({ email, otp }).unwrap();
                setUserData(loginRes);

                if (loginRes?.token) {
                    localStorage.setItem("token", loginRes.token);
                    setOtpPending(false);
                    setMessage("OTP verified successfully.");
                    navigate("/mydoctors");
                } else if (loginRes?.msg === "failed") {
                    setMessage("Invalid OTP. Please try again.");
                } else {
                    setMessage("OTP login could not be completed. Please try again.");
                }
            } catch (error) {
                console.log(error);
                setMessage("Invalid OTP or login failed. Please try again.");
            }
            return;
        }

        try {
            const data = await loginFn(payload).unwrap();
            setUserData(data);

            if (data?.token) {
                localStorage.setItem("token", data.token);
                navigate("/mydoctors");
            } else if (data?.msg === "Email OTP verification pending" || data?.requiresOtp) {
                setUseOtpLogin(true);
                setOtpStep(true);
                setOtpPending(true);
                setOtp("");
                setMessage("Your account is not verified yet. Please verify your email with the OTP sent to you.");
            } else if (data?.msg === "failed") {
                setMessage("Invalid username or password.");
            }
        } catch (error) {
            console.log(error);
            setMessage("Unable to log in right now. Please try again.");
        }
    };

    return (
        <div className="card shadow-sm p-4">
            {message && (
                <div className={`card mb-3 ${message.includes("Invalid") || message.includes("Unable") ? "border-danger" : "border-success"}`}>
                    <div className={`card-body text-center ${message.includes("Invalid") || message.includes("Unable") ? "text-danger" : "text-success"}`}>
                        <p className="card-text mb-0">{message}</p>
                    </div>
                </div>
            )}
            {useOtpLogin && otpPending && !otpStep && (
                <div className="card border-warning mb-3">
                    <div className="card-body text-warning text-center">
                        <p className="card-text mb-0">Your email OTP verification is pending.</p>
                    </div>
                </div>
            )}
            {userData?.msg === "failed" && (
                <div className="card border-danger mb-3">
                    <div className="card-body text-danger text-center">
                        <h5 className="card-title">Login Failed</h5>
                        <p className="card-text mb-0">Invalid username or password!</p>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mobile Number / Email ID</label>
                    <input type="text" name="email" className="form-control" />
                </div>
                {!useOtpLogin && (
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                )}
                {useOtpLogin && otpStep && (
                    <div className="mb-3">
                        <label className="form-label">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            className="form-control"
                            placeholder="Enter the OTP sent to your email"
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-link p-0 mt-2"
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </button>
                    </div>
                )}
                <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Remember me for 30 days
                    </label>
                </div>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="otpLogin"
                        checked={useOtpLogin}
                        onChange={(event) => {
                            setUseOtpLogin(event.target.checked);
                            setOtpStep(false);
                            setOtp("");
                            setOtpPending(false);
                            setMessage("");
                        }}
                    />
                    <label className="form-check-label" htmlFor="otpLogin">
                        Login with OTP instead of password
                    </label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        {useOtpLogin ? (otpStep ? "Verify OTP" : "Send OTP") : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;