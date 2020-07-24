import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="On this page you can plant the trees! Every tree you plant gets own id assigned to your account :)"
      className="container-fluid"
    >
      <Search />


      <h2 className="mb-4" style={{marginLeft: "20px"}}>Most Popular:</h2>
      <div className="product-search-container">
          <div className="product-search-container-div">
            {productsBySell.map((product, i) => (
              <div className="search-card-container" key={i}>
                <Card product={product} />
              </div>
          ))}
          </div>
      </div>

      <h2 className="mb-4" style={{marginLeft: "20px"}}>Newest:</h2>
      <div className="product-search-container">
          <div className="product-search-container-div">
              {productsByArrival.map((product, i) => (
                  <div className="search-card-container" key={i}>
                    <Card product={product} />
                  </div>
              ))}

          </div>
      </div>
    </Layout>
  );
};

export default Home;
