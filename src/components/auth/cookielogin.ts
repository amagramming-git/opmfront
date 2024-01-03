import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "typescript-cookie";

export const cookielogin = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		const axiosConfig: AxiosRequestConfig<any> = {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			data: {},
			withCredentials: true,
		};
		axios
			.get(`http://127.0.0.1:8080/customer/me`, axiosConfig)
			.then((response) => {
				const xsrftokenSession = window.sessionStorage.getItem("XSRF-TOKEN");
				if (!xsrftokenSession) {
					const xsrftokenCookie = getCookie("XSRF-TOKEN");
					if (xsrftokenCookie) {
						window.sessionStorage.setItem("XSRF-TOKEN", xsrftokenCookie);
					} else {
						throw new Error("XSRF-TOKENが取得できません");
					}
				}
				resolve(response);
			})
			.catch((e) => {
				console.log("cookielogin認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
