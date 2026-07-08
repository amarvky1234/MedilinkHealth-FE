import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSendOTPMutation, useVerifyOTPMutation } from "../../services/otpService";

function OTP({ email, onVerified }) {
    const [otp, setOtp] = useState("");
    const [verifyOTPFn] = useVerifyOTPMutation();
    const [sendOTPFn] = useSendOTPMutation();

    const handleResendOTP = async () => {
        try {
            await sendOTPFn(email).unwrap();
        } catch (error) {
            console.log("Something went wrong... Please! Resend OTP again");
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        try {
            const data = await verifyOTPFn({
                email,
                otp
            }).unwrap();

            console.log(data);
            if (data?.isVerified) {
                onVerified(true);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return(
        <div className="container py-3">
            <div className="card shadow border-0">
                <div className="card-body">
                    <h3>Check Your Email and Verify the OTP</h3>
                    <label>OTP</label><br />
                    <input type="text" name="otp" className="form-control"
                        placeholder="Please enter the 6 digit OTP here to verify" onChange={(e) => setOtp(e.target.value)}/>
                    <button className="btn btn-success my-2 me-2" onClick={handleVerifyOTP}>Verify</button>
                    <button className="btn btn-secondary" onClick={handleResendOTP}>Resend OTP</button>
                </div>
            </div>
        </div>
    )
}

export default OTP;