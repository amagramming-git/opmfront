import axios, { AxiosRequestConfig } from "axios";

export const cookielogin = (token: string) => {
	return new Promise((resolve, rejects) => {
		const axiosConfig: AxiosRequestConfig<any> = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			data: {},
		};
		axios
			.get(`http://127.0.0.1:8080/customer/me`, axiosConfig)
			.then((response) => {
				resolve(response);
			})
			.catch((e) => {
				console.log("認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
