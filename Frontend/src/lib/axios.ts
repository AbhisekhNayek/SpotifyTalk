import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const mode = import.meta.env.VITE_MODE;

console.log("Running in mode:", mode);

export const axiosInstance = axios.create({
	baseURL,
});
