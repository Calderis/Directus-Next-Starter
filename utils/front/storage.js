import axios from "axios";

const isMounted = () => typeof window !== "undefined";

module.exports = {
  getUser: () =>
    new Promise((resolve, reject) => {
      let storedUser = null;
      // Check in session storage
      if (isMounted()) storedUser = sessionStorage.getItem("user");

      // Does sessionStorage has user saved ?
      if (storedUser) resolve(JSON.parse(storedUser));
      else { // Ask API
        axios.get("/api/users/me")
          .then(({ data }) => {
            // Save in localstorage
            sessionStorage.setItem("user", JSON.stringify(data));
            resolve(data);
          })
          .catch(console.error);
      }
    }),
}
