import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ConsultDoctor() {
    const [check, setCheck] = useState(true);
    const [test, setTest] = useState(true);
    const [pText, setPText] = useState("");
    const [mText, setMText] = useState("");
    
    const location = useLocation();

    
    return (
        <>
            <div>
                <Link to="/">
                    <img src="https://previews.123rf.com/images/azaman357/azaman3571606/azaman357160600012/58688096-healthcare-icon-for-people.jpg"
                        width="50px" height="50px"
                        alt=""
                    />
                </Link>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h3>Consult with a Doctor</h3>
                        <Link to="/" className="text-decoration-none fs-3">X</Link>
                    </div>
                    <div className="container" style={{marginLeft:"150px"}}>
                        <div>
                            <div>Speciality</div>
                            <div className="border border-primary my-1 p-2 d-flex rounded" style={{width:"300px"}}>
                                <i class="bi bi-check-circle-fill text-primary"></i>
                                <span style={{marginLeft: "5px"}}>{location.state?.speciality}</span>
                                <span style={{marginLeft:"auto"}}>₹{location.state?.price}</span>
                            </div>
                        </div>

                        <label htmlFor=""
                            className={check || pText.length > 0 ? "text-dark" : "text-danger"}
                        >
                            Patient name
                        </label><br />
                        <input type="text" name="patientname"
                            onChange={(e) => {
                                setPText(e.target.value)
                                setCheck(false)
                                }}
                        /><br />
                        <label htmlFor="" className={test || mText.length > 0 ? "text-dark" : "text-danger"}>Mobile number</label><br />
                        <input type="text" name="mobilenumber"
                            onChange={(e) => {
                                setMText(e.target.value)
                                setTest(false)
                            }} 
                        /><br />
                        <p className="text-muted">A verification code will be sent to this number.</p>
                        <button className={pText.length > 0 && mText.length > 0
                            ? "btn btn-primary w-50" : "btn btn-primary w-50 disabled"
                        }
                        >
                            Continue
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ConsultDoctor;