import React, { useState } from "react";
import { popularProducts } from "../../../utils/info";

import "./css/popularproduct.css";
import { Link } from "react-router-dom";

function PopularProducts() {
    const [start, setStart] = useState(0);

    const productCards = popularProducts.slice(start, start + 5);

    const next = () => {
        if (start < popularProducts.length - 5) {
            setStart(start + 1);
        }
    };

    const prev = () => {
        if (start > 0) {
            setStart(start - 1);
        }
    };

    return (
        <div className="position-relative p-3">
            <p>Popular Products</p>

            {start > 0 && (
                <button
                    className="btn btn-light rounded-circle shadow position-absolute"
                    onClick={prev}
                    style={{
                        width: "38px",
                        height: "38px",
                        left: "-12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10
                    }}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
            )}

            <div className="row row-cols-5 g-0">
                {productCards.map((item) => (
                    <div className="col" key={item.id}>
                        <Link to={item.path} 
                            className="text-decoration-none" 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="card product-card h-100 border-0">
                            <img
                                src={item.image}
                                className="img-product card-img-top"
                                alt=""
                            />

                            <div className="card-body">
                                <p className="product-desc">{item.desc}</p>
                                <h5 className="product-price">₹{item.price}</h5>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>


            {start < popularProducts.length - 5 && (
                <button
                    className="btn btn-light rounded-circle shadow position-absolute"
                    onClick={next}
                    aria-label="next"
                    title="Next"
                    style={{
                        width: "38px",
                        height: "38px",
                        right: "-12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10
                    }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            )}

        </div>
    )
}

export default PopularProducts;