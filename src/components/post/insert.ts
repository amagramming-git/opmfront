import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const insertPost = (content: string, token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.post(
				`http://localhost:8080/post`,
				{ content: content },
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					withCredentials: true,
					data: {},
				}
			)
			.then((response) => {
				if (response.data.result == "0") {
					resolve(response);
				} else {
					throw new Error(response.data.message.message);
				}
			})
			.catch((e) => {
				console.log("insertPostにてエラーが発生しました。");
				console.log(e);
				rejects(e);
			});
	});
};
