import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const login = (email: string, password: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
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
				window.sessionStorage.setItem(
					"token",
					response.headers["authorization"]
				);
				window.sessionStorage.setItem(
					"XSRF-TOKEN",
					response.headers["x-xsrf-token"]
				);
				console.log(response);
				resolve(response);
			})
			.catch((e) => {
				console.log("認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
