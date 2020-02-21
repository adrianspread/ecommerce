import { API } from "../config";
import queryString from "query-string";

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


export const list = params => {
    const query = queryString.stringify(params)
    console.log("query: ", query);
    return fetch(`${API}/products/search?${query}`, {
    method: "GET"
  })
    .then(response => {
        console.log("response from products!!!: ", response);
      return response.json();
    })
    .catch(err => console.log(err));
};


export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const listRelated = (productId) => {
  // const productId = queryString.stringify(params)
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const getBraintreeClientToken = (userId, token) => {
  // const productId = queryString.stringify(params)
  console.log("in getBraintreeClientToken");
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
        console.log("in getBraintreeClientToken response: ", response);
        return response.json();
    })
    .catch(err => console.log(err));
};
