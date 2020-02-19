import { API } from "../config";


export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getFilteredProducts = (skip, limit, filters = {}) => {
  console.log("createFilteredProducts!!!!!");
  const data = {
      limit, skip, filters
  }

  return fetch(`${API}/products/by/search/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log("response from fetch/products/by/search/: ", response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
