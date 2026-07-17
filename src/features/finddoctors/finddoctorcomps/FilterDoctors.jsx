import React, { useState } from "react";
import "../css/filterdoctors.css";
import caret from "../../../../src/assets/caret-down-bold-svgrepo-com.svg";
import { SparkleIcon } from "lucide-react";

function FilterDoctor({ filters, setFilters }) {
    const [open, setOpen] = useState("");

    const handleToggle = (name) => {
        setOpen(open === name ? "" : name)
    }

    const hasActiveFilters =
        filters.gender ||
        filters.experience ||
        filters.fee ||
        filters.sortBy;

    return (
        <div className="filterdoc">
            <div className="filter-mar d-flex">

                {/* Gender Filter */}
                <div className="border filter-box">
                    <p onClick={() => handleToggle("gender")}>
                        {filters.gender || "Gender"}
                        <img
                            src={caret}
                            alt=""
                            className="filter-img"
                            style={{
                                transform:
                                    open === "gender"
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                            }}
                        />
                    </p>

                    {open === "gender" && (
                        <div className="filter-dropdown">
                            <p className="filter-option"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        gender: "Male",
                                    });
                                    setOpen("");
                                }}
                            >
                                Male
                            </p>

                            <p className="filter-option"
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        gender: "Female",
                                    });
                                    setOpen("");
                                }}
                            >
                                Female
                            </p>
                        </div>
                    )}
                </div>

                {/* Patient Filter */}
                <div className="border filter-box">
                    <p onClick={() => handleToggle("patient")}>
                        Patient Stories
                        <img
                            src={caret}
                            alt=""
                            className="filter-img"
                            style={{
                                transform:
                                    open === "patient"
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                            }}
                        />
                    </p>

                    {open === "patient" && (
                        <div className="filter-dropdown">
                            <p className="filter-option">
                                30+ Patient Stories
                            </p>

                            <p className="filter-option">
                                220+ Patient Stories
                            </p>
                        </div>
                    )}
                </div>


                {/* Experience Filter */}
                <div className="border filter-box">
                    <p onClick={() => handleToggle("experience")}
                    >
                        {filters.experience
                            ? `${filters.experience}+ Years of experience`
                            : "Experience"}
                        <img
                            src={caret}
                            alt=""
                            className="filter-img"
                            style={{
                                transform:
                                    open === "experience"
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                            }}
                        />
                    </p>

                    {open === "experience" && (
                        <div className="filter-dropdown">
                            {[5, 10, 15, 20].map((year) => (
                                <p className="filter-option"
                                    key={year}
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            experience: year,
                                        });
                                        setOpen("");
                                    }}
                                >
                                    {year}+ Years of experience
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Other Filters */}
                <div className="border filter-box">
                    <p onClick={() => handleToggle("all")}>
                        All Filters
                        <img
                            src={caret}
                            alt=""
                            className="filter-img"
                            style={{
                                transform:
                                    open === "all"
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                            }}
                        />
                    </p>
                </div>

                {/* Large All Filters Panel */}
                {open === "all" && (
                    <div className="all-filter-dropdown">

                        <div className="filter-column">
                            <h6>Associated with top hospitals</h6>

                            <label>
                                <input type="checkbox" />
                                Apollo White Dental
                            </label>
                        </div>

                        <div className="filter-column">
                            <h6>Fees</h6>

                            <label>
                                <input
                                    type="radio"
                                    name="fee"
                                    checked={filters.fee === "0-500"}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            fee: "0-500",
                                        })
                                    }
                                />
                                ₹0 - ₹500
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="fee"
                                    checked={filters.fee === "500+"}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            fee: "500+",
                                        })
                                    }
                                />
                                Above ₹500
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="fee"
                                    checked={filters.fee === "1000+"}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            fee: "1000+",
                                        })
                                    }
                                />
                                Above ₹1000
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="fee"
                                    checked={filters.fee === "1300+"}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            fee: "1300+",
                                        })
                                    }
                                />
                                Above ₹1300
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="fee"
                                    checked={filters.fee === ""}
                                    onChange={() =>
                                        setFilters({
                                            ...filters,
                                            fee: "",
                                        })
                                    }
                                />
                                All
                            </label>
                        </div>

                        <div className="filter-column">
                            <h6>Availability</h6>

                            <label>
                                <input type="radio" name="availability" />
                                Available in next 4 hours
                            </label>

                            <label>
                                <input type="radio" name="availability" />
                                Available Today
                            </label>

                            <label>
                                <input type="radio" name="availability" />
                                Available Tomorrow
                            </label>

                            <label>
                                <input type="radio" name="availability" />
                                Available in next 7 days
                            </label>
                        </div>

                        <div className="filter-column">
                            <h6>Consult type</h6>

                            <label>
                                <input type="checkbox" />
                                Video consult
                            </label>
                        </div>

                    </div>
                )}

                {/* reset filter */}
                {hasActiveFilters && (
                    <p
                        className="reset-filter"
                        onClick={() => {
                            setFilters({
                                gender: "",
                                experience: 0,
                                fee: "",
                                sortBy: "",
                            });
                            setOpen("");
                        }}
                    >
                        Reset Filters
                    </p>
                )}

                {/* Sort By */}

                <div className="sort-wrapper">

                    <span className="sort-label">
                        Sort By
                    </span>

                    <div className="border filter-box sort-box">

                        <p onClick={() => handleToggle("sort")}>

                            {filters.sortBy === "feeHigh"
                                ? "Consultation Fee - High to Low"
                                : filters.sortBy === "feeLow"
                                    ? "Consultation Fee - Low to High"
                                    : filters.sortBy === "experienceHigh"
                                        ? "Experience - High to Low"
                                        : filters.sortBy === "stories"
                                            ? "Number of Patient Stories"
                                            : "Relevance"}

                            <img
                                src={caret}
                                className="filter-img"
                                style={{
                                    transform:
                                        open === "sort"
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)"
                                }}
                            />

                        </p>

                        {open === "sort" && (

                            <div className="filter-dropdown sort-dropdown">
                                <p
                                    className="filter-option"
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            sortBy: "experienceHigh",
                                        });
                                        setOpen("");
                                    }}
                                >
                                    Experience - High to Low
                                </p>

                                <p
                                    className="filter-option"
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            sortBy: "feeHigh",
                                        });
                                        setOpen("");
                                    }}
                                >
                                    Consultation Fee - High to Low
                                </p>

                                <p
                                    className="filter-option"
                                    onClick={() => {
                                        setFilters({
                                            ...filters,
                                            sortBy: "feeLow",
                                        });
                                        setOpen("");
                                    }}
                                >
                                    Consultation Fee - Low to High
                                </p>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default FilterDoctor;