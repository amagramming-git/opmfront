import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const cookielogin = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		const axiosConfig: AxiosRequestConfig<any> = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			data: {},
		};
		axios
			.get(`http://127.0.0.1:8080/customer/get`, axiosConfig)
			.then((response) => {
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
