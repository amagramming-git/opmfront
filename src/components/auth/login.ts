import axios, { AxiosResponse } from "axios";
import { setCookie, getCookie } from "typescript-cookie";

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
				setCookie("token", response.headers["authorization"]);
				const xsrftoken = getCookie("XSRF-TOKEN");
				if (xsrftoken) {
					window.sessionStorage.setItem("XSRF-TOKEN", xsrftoken);
				} else {
					throw new Error("XSRF-TOKENが取得できません");
				}
				resolve(response);
			})
			.catch((e) => {
				console.log("login認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
