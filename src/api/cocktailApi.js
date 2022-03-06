import axios from "axios";

/*
 * API for connecting to the backend for mixology. Primarily used for
 fetching data.
 */
export default axios.create({
    baseURL: "https://5078-2604-3d08-627e-b100-89cb-2685-45c5-aa57.ngrok.io",

});
