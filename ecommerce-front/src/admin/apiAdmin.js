import { API } from "../config";

export const createCategory = (userId, token, category) => {
  console.log("createCategory!!!!!");
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      console.log("response from fetch/createCategory: ", response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  console.log("createProduct!!!!!");
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      console.log("response from fetch/createProduct: ", response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
