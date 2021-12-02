import axios from "axios";

/**
 * API for connecting to the backend for mixology. Primarily used for
 fetching data.
 */
export default axios.create({
    baseURL: "https://mixologyv2.herokuapp.com",

});
