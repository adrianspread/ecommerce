import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import Card from './Card';
import {getCategories, getFilteredProducts} from "./apiCore";
import Checkbox from './Checkbox';
import RadioBox from './RadioBox'
import {prices} from "./fixedPrices";

const Shop =() => {
    const [myFilters, setMyFilters] =  useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);



    const init = () => {
      getCategories().then(data => {
        console.log("in getCategories!!!");
        if (data.error) {
          console.log("error in get categories");
          setError({error: data.error });
        } else {
          console.log("else in get categories");
          setCategories(data);
        }
      });
    };

    const loadFilteredResults = (newFilters) => {
        // console.log("newFilters", newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data=> {
            if(data.error) {
                setError(data.error);
            } else {
                console.log("data: ", data.data);
                setFilteredResults(data.data)
                setSize(data.size);
                setSkip(0);
            }
        });
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data=> {
            if(data.error) {
                setError(data.error);
            } else {
                console.log("data: ", data.data);
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    }


    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    useEffect(()=>{
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    },[]);

   const handleFilters = (filters, filterBy) => {
       // console.log(filters, filterBy);
       const newFilters = {...myFilters}
       newFilters.filters[filterBy] = filters;

       if(filterBy == "price") {
           let priceValues = handlePrice(filters)
           newFilters.filters[filterBy] = priceValues;
       }


       loadFilteredResults(myFilters.filters);
       setMyFilters(newFilters);
   }

   const handlePrice = value => {
       const data = prices;
       let array = [];
       for(let key in data) {
           if(data[key]._id === parseInt(value)) {
               array = data[key].array
           }
       }
       return array;
   };


   // const filters = 1;
    return (
        <Layout title="Plantation Page" description="Choose which tree you want to plant. Every single tree grabs 6-7kg carbon from the air per year." className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")}/>
                    </ul>
                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")}/>
                    </div>
                </div>

                <div className="col-9">
                   <div className="row">
                       {filteredResults.map((product, i) => (
                           <div className="col-4 mb-3"  key={i}>
                               <Card product={product} />
                           </div>
                       ))}
                   </div>
                   <div style={{display: "flex", width: "100%", justifyContent:"center"}}>
                       {loadMoreButton()}
                   </div>
                </div>


            </div>
        </Layout>
    );
}

export default Shop;



// <div className="col-8">
//     <h2 className="mb-4">Products</h2>
//     <div className="row">
        // {filteredResults.map((product, i) => (
        //     <div key={i} className="col-4 mb-3">
        //         <Card product={product} />
        //     </div>
        // ))}
//     </div>
// </div>
