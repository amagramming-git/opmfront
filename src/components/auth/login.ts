import axios, { AxiosRequestConfig } from "axios";
import { Customer } from "@/types/customer";

export const login = ({ email, password }: Customer) => {
	const axiosConfig: AxiosRequestConfig<any> = {
		headers: {
			Authorization: "Basic " + window.btoa(email + ":" + password),
			"Content-Type": "application/json",
		},
		data: {},
	};
	axios
		.get(`http://127.0.0.1:8080/customer/get`, axiosConfig)
		.then((response) => {
			console.log(response);
			window.sessionStorage.setItem("token", response.headers["authorization"]);
			window.sessionStorage.setItem(
				"XSRF-TOKEN",
				response.headers["x-xsrf-token"]
			);
			console.log(window.sessionStorage);
		});
};
