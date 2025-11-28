import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';
import LoadingSpinner from "../components/Spinner";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, fetchProductsByQuery } from "../features/items/itemsSlice";
import ErrorBox from "../components/ErrorBox";

function ProductsList() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialQuery = searchParams.get("q") || "";
    const { query, list, loadingList, errorList } = useSelector(state => state.items);

    useEffect(() => {
        dispatch(setQuery(initialQuery));
    }, []);

    // Fetch products when query changes
    useEffect(() => {
            setSearchParams(query ? { q: query } : {});
            dispatch(fetchProductsByQuery(query));
    }, [query, dispatch, setSearchParams]);

    const clearFilter = () => {
        dispatch(setQuery(""));
        setSearchParams({});
    };

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query || ""}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    className="form-control rounded-pill me-2"
                    style={{ maxWidth: "400px" }}
                />
                <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={clearFilter}
                >
                    Clear
                </button>
            </div>

            {loadingList ? (
                <div className="d-flex justify-content-center align-items-center vh-50">
                    <LoadingSpinner />
                </div>
            ) : errorList ? (
                <ErrorBox message={errorList} />
            ) : list.length > 0 ? (
                <div className="d-flex flex-wrap gap-4 justify-content-center">
                    {list.map(product => (
                        <div key={product.id} className="flex-shrink-0" style={{ maxWidth: "20em" }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <ErrorBox message={"No products found."} />
            )}
        </div>
    );
}

export default ProductsList;
