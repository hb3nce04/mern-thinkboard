import axios from "axios";

const BASE_URL =
	import.meta.env.MODE === "dev" ? "http://localhost:3000/api" : "/api";
export const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json"
	}
});
