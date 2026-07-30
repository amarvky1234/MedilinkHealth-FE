import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
    useGetDoctorProfileQuery,
    useUpdateScheduleMutation,
} from "../../services/doctorService";
import Swal from "sweetalert2";

function DoctorSchedule() {

    const { data, isLoading } = useGetDoctorProfileQuery();

    const [updateSchedule] = useUpdateScheduleMutation();

    const [workingHours, setWorkingHours] = useState({
        start: "",
        end: "",
    });

    const [slotDuration, setSlotDuration] = useState(20);

    const [workingDays, setWorkingDays] = useState([]);

    const [breakStart, setBreakStart] = useState("");

    const [breakEnd, setBreakEnd] = useState("");

    useEffect(() => {

        if (data?.doctor) {

            const doctor = data.doctor;

            setWorkingHours({
                start: doctor.workingHours.start,
                end: doctor.workingHours.end,
            });

            setSlotDuration(doctor.slotDuration);

            setWorkingDays(doctor.workingDays);

            if (doctor.breaks.length > 0) {

                setBreakStart(doctor.breaks[0].start);

                setBreakEnd(doctor.breaks[0].end);

            }

        }

    }, [data]);

    const handleDayChange = (day) => {

        if (workingDays.includes(day)) {

            setWorkingDays(
                workingDays.filter((d) => d !== day)
            );

        } else {

            setWorkingDays([
                ...workingDays,
                day,
            ]);

        }

    };

    const handleSave = async () => {

        try {

            await updateSchedule({

                workingHours,

                slotDuration,

                workingDays,

                breaks: [
                    {
                        start: breakStart,
                        end: breakEnd,
                    },
                ],

            }).unwrap();

            Swal.fire({
                icon: "success",
                title: "Schedule Updated",
                text: "Doctor schedule saved successfully.",
            });

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: err?.data?.message || "Something went wrong.",
            });

        }

    };

    if (isLoading) {

        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        );

    }

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">
                            Doctor Schedule
                        </h4>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">

                                <label>
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={workingHours.start}
                                    onChange={(e) =>
                                        setWorkingHours({
                                            ...workingHours,
                                            start: e.target.value,
                                        })
                                    }
                                />

                            </div>

                            <div className="col-md-6">

                                <label>
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={workingHours.end}
                                    onChange={(e) =>
                                        setWorkingHours({
                                            ...workingHours,
                                            end: e.target.value,
                                        })
                                    }
                                />

                            </div>

                        </div>

                        <div className="mt-4">

                            <label>
                                Slot Duration
                            </label>

                            <select
                                className="form-select"
                                value={slotDuration}
                                onChange={(e) =>
                                    setSlotDuration(
                                        Number(e.target.value)
                                    )
                                }
                            >

                                <option value={10}>
                                    10 Minutes
                                </option>

                                <option value={15}>
                                    15 Minutes
                                </option>

                                <option value={20}>
                                    20 Minutes
                                </option>

                                <option value={30}>
                                    30 Minutes
                                </option>

                                <option value={45}>
                                    45 Minutes
                                </option>

                                <option value={60}>
                                    60 Minutes
                                </option>

                            </select>

                        </div>

                        <div className="mt-4">

                            <h5>
                                Working Days
                            </h5>

                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ].map((day) => (

                                <div
                                    className="form-check"
                                    key={day}
                                >

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={workingDays.includes(day)}
                                        onChange={() =>
                                            handleDayChange(day)
                                        }
                                    />

                                    <label className="form-check-label">
                                        {day}
                                    </label>

                                </div>

                            ))}

                        </div>

                        <div className="row mt-4">

                            <div className="col-md-6">

                                <label>
                                    Break Start
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={breakStart}
                                    onChange={(e) =>
                                        setBreakStart(e.target.value)
                                    }
                                />

                            </div>

                            <div className="col-md-6">

                                <label>
                                    Break End
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={breakEnd}
                                    onChange={(e) =>
                                        setBreakEnd(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-success mt-4"
                            onClick={handleSave}
                        >

                            Save Schedule

                        </button>

                    </div>

                </div>

            </div>

        </>
    );
}

export default DoctorSchedule;