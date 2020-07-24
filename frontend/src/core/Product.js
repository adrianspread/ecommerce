import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {read, listRelated} from './apiCore';
import Card from './Card';


const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const location = props.match.params.productId;
    console.log("location: ", location);


    const loadSingleProduct = productId => {
        read(productId).then(data=> {
            if(data.error){
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props])

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)} className="container-fluid">
            <div className="product-continer">
                <div className="show-product margin">
                    {product && product.description && <Card product={product} showViewProductButton={false}/>}
                </div>
                <div className="related-product">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p,i)=>(
                        <div className="mb-3" key={i} >
                            <Card product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );

}



export default Product;
