import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const login = (email: string, password: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.get(`http://localhost:8080/customer/get`, {
				headers: {
					Authorization: "Basic " + window.btoa(email + ":" + password),
					"Content-Type": "application/json",
				},
				data: {},
				withCredentials: true,
			})
			.then((response) => {
				Cookies.set("token", response.headers["authorization"]);
				resolve(response);
			})
			.catch((e) => {
				console.log("login認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
