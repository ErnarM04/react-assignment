import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../services/ItemsService";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((data) => {
                setProduct(data);
                setImage(data.images?.[0]);
                console.log(data);
            })
            .catch(() => setError("Failed to load product"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="d-flex mt-5 justify-content-center align-items-center">
                <Spinner />
            </div>
        );

    if (error) return <ErrorBox message={error} />;

    if (product.message) return <ErrorBox message={"Product not found"} />;

    return (
        <div className="container mt-4">

            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                {"<- Back"}
            </button>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <img
                        src={image}
                        alt={product.title}
                        className="img-fluid rounded my-3 shadow-sm"
                        style={{ width: "360px", height: "100%" }}
                    />

                    <div className="d-flex gap-2 flex-wrap">
                        {product.images?.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`Thumbnail ${index}`}
                                className="thumbnail rounded"
                                onClick={() => setImage(imgSrc)}
                                style={{
                                    cursor: "pointer",
                                    width: "60px",
                                    height: "60px",
                                    border: "grey solid 1px",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <h2>{product.title}</h2>
                    <h5 className="text-success">{product.price}$</h5>
                    <p>{product.description}</p>

                    <p><b>Category:</b> {product.category}</p>
                    <p><b>Brand:</b> {product.brand}</p>
                    <p><b>Stock:</b> {product.stock}</p>
                    <p><b>Rating:</b> {product.rating}</p>
                </div>
            </div>

        </div>
    );

}
