import React, {useEffect, useState} from "react";
import {getCategories, list} from './apiCore';
import Card from './Card';



const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data})
            }
        })
    }

   useEffect(()=>{
       loadCategories()
   }, [])

   const searchData = () => {
       console.log(search, category);
       if(search) {
           list({search: search || undefined, category: category}).then(data).then(response=> {
               if(response.error){
                   console.log(response.error);
               } else (
                   setData({...data, results: response, searched: true})
               )
           });
       }
   }

   const searchSubmit = (e) => {
       e.preventDefault()
       searchData();
   };

   const handleChange = (name) => (event) => {
       setData({...data, [name]: event.target.value, searched: false});
   };


   const searchMessage = (searched, results) => {
       if(searched && results.length > 0) {
           return `Found ${results.length} products`;
       }
       if(searched && results.length < 1) {
           return `No products found`;
       }
   }

   const searchedProducts = (results = []) => {
       return (
           <div>
               <h2 className="mt-4 mb-4">
                   {searchMessage(searched, results)}
               </h2>
               <div className="product-search-container-div">
                       {results.map((product, i) => (
                           <div className="search-card-container">
                               <Card product={product} key={i} />
                           </div>
                           )
                       )}
               </div>
           </div>
       )
   }

  const searchForm = () => {
      return (
          <form onSubmit={searchSubmit}>
              <span className="input-group-text">
                  <div className="input-group input-group-lg">

                      <div className="input-group-prepend">
                          <select className="btn mr-2" onChange={handleChange("category")}>
                              <option value="All">Pick Category</option>
                              {categories.map((c, i)=>(
                                  <option key={i} value={c._id}>{c.name}</option>
                              ))}
                          </select>
                      </div>
                      <input type="search"
                       className="form-control"
                       onChange={handleChange('search')}
                       placeholder="Search by name"
                       />
                  </div>
                  <div className="btn input-group-append" style={{border: 'none'}}>
                      <button className="btn input-group-text">Search</button>
                  </div>
               </span>
          </form>
      )

  }

    return (
        <div className="search-container">
             <div className="search-bar">
                {searchForm()}
             </div>
             <div className="product-search-container">
                {searchedProducts(results)}
             </div>
        </div>
    )
}


export default Search;
