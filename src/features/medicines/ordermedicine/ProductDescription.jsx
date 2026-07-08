import React, {useState} from "react";

import PopularProducts from "./PopularProducts";

import "./css/productdesc.css";
import { popularProducts } from "../../../utils/info";

const images = []

function ProductDescription() {
    popularProducts.forEach((item) => images.push(item.pictures))
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return (
        <>
            <div className="container my-4">

                <nav className="mb-3">
                    Home &gt; Hand Wash
                </nav>

                <div className="row">

                    <div className="col-lg-5">
                        <div className="d-flex">

                            <div className="me-3">

                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        className="thumbnail mb-2"
                                        onClick={() => setSelectedImage(img)}
                                        alt=""
                                    />
                                ))}

                            </div>

                            <div className="gallery-card">

                                <img
                                    src={selectedImage}
                                    className="main-image"
                                    alt=""
                                />

                                <div className="p-3">

                                    <h3>₹80</h3>

                                    <div className="row mt-3">

                                        <div className="col">
                                            <small>PACK SIZE</small>

                                            <div className="border p-2">
                                                100 ml
                                            </div>
                                        </div>

                                        <div className="col">
                                            <small>UNIT COUNT</small>

                                            <div className="border p-2">
                                                250ML
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="content-scroll">

                            <h2>
                                Apollo Pharmacy Hand Wash Aqua Blue Pump
                            </h2>

                            <p>
                                Manufactured By Apollo Pharmacy
                            </p>

                            <hr />

                            <h4>Highlights</h4>

                            <ul>
                                <li>Helps protect against germs.</li>
                                <li>Skin friendly formulation.</li>
                            </ul>

                            <hr />

                            <h4>Description</h4>

                            <p>
                                Long description here...
                            </p>

                            <hr />

                            <h4>Uses</h4>

                            <p>
                                Usage instructions...
                            </p>

                            <hr />

                            <h4>Safety Information</h4>

                            <p>
                                Safety instructions...
                            </p>

                            <hr />

                            <h4>Storage</h4>

                            <p>
                                Store in cool dry place.
                            </p>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductDescription;