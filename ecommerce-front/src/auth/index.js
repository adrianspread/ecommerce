import { API } from "../config";

export const signup = user => {
  // console.log(user.name, user.email, user.password);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      // console.log("response from fetch/signup: ", response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signin = user => {
  // console.log(user.name, user.email, user.password);
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      // console.log("response from fetch/signup: ", response);
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
