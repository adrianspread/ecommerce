import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment } from './apiCore';
import Card from './Card';
import {Link} from 'react-router-dom'
import {isAuthenticated} from "../auth";
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from './cartHelpers';

const Checkout = ({products, setRun, run = undefined}) => {
    const [data, setData] = useState({
        success: false,
        successPay: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })



    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            } else {
                setData({
                    ...data, clientToken: data.clientToken
                })
                console.log("instance: ", data.instance);
            }
        });
    }

    useEffect(()=> {
        getToken(userId, token)
    }, [])


    const getTotal = () => {
        return products && products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

   const showCheckout = () => {
       return (
           isAuthenticated() ? (
               <div>{showDropIn()}</div>
           ) : (
               <Link to={"/signin"}><button className="btn btn-primary">Sign in to checkout</button></Link>
           )
       )
   }

    const buy = ()=> {
        // send the nonce to your server nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(
            data => {
                nonce = data.nonce;
                const paymentData ={
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                console.log("userId, token, paymentData: ",userId, token, paymentData);
                processPayment(userId, token, paymentData)
                .then(response => {
                    // console.log(response)
                    setData({
                        ...data, success: response.success, successPay: true
                    });
                    // empty card
                    emptyCart(()=>{
                        console.log("payment success empty cart");
                    })
                    // create order
                    setRun(!run);
                })
                .catch(error=> {console.log(error)})
            }).catch(error => {
                    console.log("dropin error: ", error);
                    setData({
                        ...data, error: error.message
                    });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error:''})}>
           {data.clientToken !== null && products.length > 0 ? (
               <div>
                   <DropIn options={{
                       authorization: data.clientToken
                   }} onInstance={instance => data.instance = instance} />

                   <button onClick={buy} className="btn btn-success btn-block">Pay</button>
               </div>
           ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks, You are making this planet more green <img src="./ecology.svg" alt="bla" style={{width: "30px"}}/>
        </div>
    )

    return (
        <div>
            <h2>Total: €{getTotal()}</h2>
            {showSuccess(data.successPay)}
            {showError(data.error)}
            {showCheckout(data.success)}
        </div>
    )

}

export default Checkout;
