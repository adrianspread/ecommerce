import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {getProducts} from './apiCore';
import Card from './Card';


const Product = () =>{
    return (
        <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

            <p>product page</p>  
        </Layout>
    );

}

export default Product;
