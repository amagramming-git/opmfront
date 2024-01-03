import axios, { AxiosResponse } from "axios";

export const cookielogin = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.post(
				`http://127.0.0.1:8080/customer/me`,
				{},
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					data: {},
				}
			)
			.then((response) => {
				resolve(response);
			})
			.catch((e) => {
				console.log("cookielogin認証エラー");
				console.log(e);
				rejects(e);
			});
	});
};
