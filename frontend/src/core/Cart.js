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
                <h3>
                    Your basket has {items.length} items.
                </h3>
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
            <h3>
                Your basket is empty. <br/>
                <Link to="/shop">Continue Shopping</Link>
            </h3>
        )
    }

    return (
        <Layout title="Shopping Basket" description="Manage your real-world-changing energy in your basket" className="container-fluid">

        <div className="card-container">
            <div className="col-6 margin">
                <h2 className="mb-4">Your card summary</h2>
                <hr/>
                <Checkout products={items} setRun={setRun}/>
            </div>
            <div className="col-6">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>

        </div>

        </Layout>
    );
}

export default Cart;
