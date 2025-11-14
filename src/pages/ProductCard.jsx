import React from 'react';
import './ProductCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router";

function ProductCard({ product }) {
    return (
        <div className='card'>
            <img className="card-img-top" src={product.thumbnail} alt={product.title}/>
            <div className="card-body">
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className='fw-bold' >{product.title}</h3>
                </Link>
                <h5>{product.price}$</h5>
                <p className='text'>
                    {product.description}
                </p>
            </div>
        </div>
    );
}


export default ProductCard;