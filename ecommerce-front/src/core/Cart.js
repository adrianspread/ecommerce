import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {getCart} from './cartHelpers';
import Card from './Card';
import {Link} from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState(0);
    const [run, setRun] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setItems(getCart());
            } catch (e) {
                console.log(e);
            }
        })();
    }, [run]);

    console.log("items in state: ", items.length);
    // console.log("getCart: ", getCart());
    const showItems = items => {
        return (
            <div>
                <h2>
                    Your basket has {items.length} items.
                </h2>
                {items && items.map((product, i)=>(
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        )
    }


    const noItemsMessage = () => {
        return (
            <h2>
                Your basket is epty. <br/>
                <Link to="/shop">Continue Shopping</Link>
            </h2>
        )
    }

    return (
        <Layout title="Shopping Cart" description="Manage products in your cart" className="container-fluid">

        <div className="row">
            <div className="col-6">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-6">
                <h3 className="mb-4">Your card summary</h3>
                <hr/>
                <Checkout products={items}/>
            </div>
        </div>

        </Layout>
    );
}

export default Cart;
