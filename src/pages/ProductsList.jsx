import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';
import { getProducts, getProductsByQuery } from '../services/ItemsService';
import LoadingSpinner from "../components/Spinner";
import { useSearchParams } from "react-router";
import ErrorBox from "../components/ErrorBox";

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        getProducts()
            .then(json => setProducts(json.products))
            .catch((error) => <ErrorBox message={error} />);
    }, []);

    useEffect(() => {
        setSearchParams(searchQuery ? { q: searchQuery } : {});

        if (searchQuery.trim().length === 0) {
            getProducts().then(json => setProducts(json.products));
        } else {
            getProductsByQuery(searchQuery)
                .then(data => setProducts(data.products))
                .catch(console.error);
        }
    }, [searchQuery, setSearchParams]);

    const clearFilter = () => {
        setSearchQuery("");
        setSearchParams({});
    };

    return (
        <div>
            <div className="mt-4">
                <div className="d-flex justify-content-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control rounded-pill me-2"
                            style={{ maxWidth: "400px" }}
                        />
                        <button
                            variant="outline-secondary"
                            className="btn btn-outline-secondary rounded-pill"
                            onClick={clearFilter}
                        >
                            Clear
                        </button>
                </div>

                <div className="d-flex flex-wrap gap-4 justify-content-center">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product.id} className="flex-shrink-0" style={{ maxWidth: "20em" }}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center vh-50">
                            <LoadingSpinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductsList;
