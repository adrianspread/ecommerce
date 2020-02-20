import React, {useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from "moment"
import {addItem, updateItem, removeItem} from './cartHelpers'

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
    }) => {


    // const [locationChange, setLocationChange] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


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

    const addToCart = ()=> {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            console.log("shouldRedirect true");
            return <Redirect to="/cart"/>
        }
    }

    const showAddToCart = (showAddToCartButton)=> {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-primary mt-2 mb-2">
                    Add to card
                </button>
            )

        )
    }

    const showStock = (quantity) => {
        return quantity.quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span>Out Of Stock</span>
    }

    const handleChange = productId => event => {
      // setRun(!run); // run useEffect in parent Cart
      setCount(event.target.value < 1 ? 1 : event.target.value);
      if (event.target.value >= 1) {
        updateItem(productId, event.target.value);
      }
    };

    const showCartUpdateOptions = cardUpdate => {
        return cartUpdate && <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            Adjust Quantity
                        </span>

                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
                    </div>
                </div>
            </div>
    }

    const showRemoveButton = showRemoveProductButton => {
        console.log("in show remove button");
        return (
            !showAddToCartButton && (
                <button onClick={() => removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                    Remove Product
                </button>
            )

        )
    }

    return (
            <div className="card">
                <div className="card-header name">
                    {product.name}
                </div>
                <div className="card-body">
                {shouldRedirect(redirect)}

                <ShowImage item={product} url="product"/>
                   <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                   <p className="black-10">${product.price}</p>
                   <p className="black-9">Category: {product.category && product.category.name}</p>
                   <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

                   {showStock(product)}
                   <br/>
                   {showViewButton(showViewProductButton)}
                   {showAddToCart(showAddToCartButton)}
                   {showRemoveButton(showRemoveProductButton)}
                   {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    )
}


export default Card;
