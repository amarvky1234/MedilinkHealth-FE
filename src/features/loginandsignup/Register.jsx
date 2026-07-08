import React, { useState } from "react";
import { useSendOTPMutation } from "../../services/otpService";
import { useAddUserMutation } from "../../services/userService";

function Register({ onSendOtp }) {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [addUserFn] = useAddUserMutation();
    const [sendOTPFn] = useSendOTPMutation();

    const handleSendOtp = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match.");
            return; // Stops the API call
        }

        setError("");

        const form = new FormData(event.target);
        const payload = Object.fromEntries(form.entries());

        try {
            await addUserFn(payload).unwrap();

            const res = await sendOTPFn(email).unwrap();
            console.log(res)
            if (res?.isSent) {
                onSendOtp(true, email);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <div className="card shadow-sm p-4">
            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}
            
            <form onSubmit={(ev) => {handleSendOtp(ev)}} encType="application/json">
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmpassword"
                        className="form-control"
                        placeholder="Confirm password"
                        onChange={(ev) => setConfirmPassword(ev.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Send OTP</button>
                </div>
            </form>
        </div>
    )
}

export default Register;