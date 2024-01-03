import axios, { AxiosResponse } from "axios";
import { getCookie } from "typescript-cookie";

export const customerRegister = (
	email: string,
	username: string,
	password: string
) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.post(
				`http://127.0.0.1:8080/customer/register`,
				{ email: email, username: username, password: password },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			)
			.then((response) => {
				if (response.data.result == "0") {
					const xsrftoken = getCookie("XSRF-TOKEN");
					if (xsrftoken) {
						window.sessionStorage.setItem("XSRF-TOKEN", xsrftoken);
					} else {
						throw new Error("XSRF-TOKENが取得できません");
					}
					resolve(response);
				} else {
					throw new Error(response.data.message.message);
				}
			})
			.catch((e) => {
				console.log("singup");
				console.log(e);
				rejects(e);
			});
	});
};
