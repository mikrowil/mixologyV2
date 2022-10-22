import axios from "axios";

/*
 * API for connecting to the backend for mixology. Primarily used for
 fetching data.
 */
export default axios.create({
    baseURL: "https://77d9-2604-3d08-627e-b100-f022-7695-32f8-c879.ngrok.io",

});
