import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from "moment"

const Card = ({product, showViewProductButton = true}) => {
    const [locationChange, setLocationChange] = useState(false)



    const showViewButton = (showViewProductButton)=>{
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-1">
                    <button className="btn btn-outline-primary mr-2">
                        View Product
                    </button>
                 </Link>
            )
        )
    };

    const showAddToCardButton = ()=> {
        return (
            <button className="btn btn-outline-primary mt-2 mb-2">
                Add to card
            </button>
        )
    }

    const showStock = (quantity) => {
        return quantity.quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span>Out Of Stock</span>
    }

    return (
            <div className="card">
                <div className="card-header name">
                    {product.name}
                </div>
                <div className="card-body">
                <ShowImage item={product} url="product"/>
                   <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                   <p className="black-10">${product.price}</p>
                   <p className="black-9">Category: {product.category && product.category.name}</p>
                   <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

                   {showStock(product)}
                   <br/>
                   {showViewButton(showViewProductButton)}
                   {showAddToCardButton()}
                </div>
            </div>
    )
}


export default Card;
