import axios, { AxiosHeaderValue, AxiosRequestConfig } from "axios";
import { Customer } from "@/types/customer";

export const login = ({ email, password }: Customer) => {
	const axiosConfig: AxiosRequestConfig<any> = {
		headers: {
			Authorization: "Basic " + window.btoa(email + ":" + password),
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Credentials": "true",
		},
		data: {},
	};
	axios
		.get(`http://127.0.0.1:8080/customer/get`, axiosConfig)
		.then((response) => {
			console.log(response);
			window.sessionStorage.setItem("token", response.data.token);
			console.log(window.sessionStorage.getItem("XSRF-TOKEN"));
		});
};
