import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../services/ItemsService";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../features/items/itemsSlice";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const {selectedItem, loadingItem, errorItem} = useSelector(state => state.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedItem) setImage(selectedItem.images[0]);
    }, [selectedItem])

    if (loadingItem)
        return (
            <div className="d-flex mt-5 justify-content-center align-items-center">
                <Spinner />
            </div>
        );

    if (errorItem) return <ErrorBox message={errorItem} />;

    if (!selectedItem) return <ErrorBox message={"Product not found"} />;

    return (
        <div className="container mt-4">

            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                {"<- Back"}
            </button>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <img
                        src={image}
                        alt={selectedItem.title}
                        className="img-fluid rounded my-3 shadow-sm"
                        style={{ width: "360px", height: "100%" }}
                    />

                    <div className="d-flex gap-2 flex-wrap">
                        {selectedItem.images?.map((imgSrc, index) => (
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
                    <h2>{selectedItem.title}</h2>
                    <h5 className="text-success">{selectedItem.price}$</h5>
                    <p>{selectedItem.description}</p>

                    <p><b>Category:</b> {selectedItem.category}</p>
                    <p><b>Brand:</b> {selectedItem.brand}</p>
                    <p><b>Stock:</b> {selectedItem.stock}</p>
                    <p><b>Rating:</b> {selectedItem.rating}</p>
                </div>
            </div>

        </div>
    );

}
