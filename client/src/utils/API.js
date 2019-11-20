import axios from "axios";

export default {
  // Logins a user
  login: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  // Creates a user
  signUp: function(userData) {
    return axios.post("/api/users", userData);
  }
};
