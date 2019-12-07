import axios from "axios";

export default {
  // Logins a user
  login: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  // Creates a user
  signUp: function(userData) {
    return axios.post("/api/users", userData);
  },
  getItems: function() {
    return axios.get("/api/items");
  },
  itemSearch: function(query) {
    return axios.post("/api/items/search/", query);
  },
  categorySearch: function(query) {
    return axios.post("/api/items/category/", query);
  }
};
