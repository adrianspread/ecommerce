import React, {useEffect, useState} from "react";
import {getCategories} from './apiCore';
import Card from './Card';



const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, result, searched} = data

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


   const searchSubmit = () => {

   }

   const handleChange = () => {

   }

  const searchForm = () => {
      return (
          <form onSubmit={searchSubmit}>
              <span className="input-group-text">
                  <div className="input-group input-group-lg">

                      <div className="input-group-prepend"></div>
                      <input type="search"
                       className="form-control"
                       onChange={handleChange('search')}
                       placeholder="Search by name"
                       />
                  </div>
               </span>
          </form>
      )

  }

    return (
        <div className="row">
             <div className="container">{searchForm()}</div>
        </div>
    )
}


export default Search;
