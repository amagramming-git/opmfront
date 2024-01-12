import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../util/logger";
import { Post } from "@/types/post";

export type GetMinePostResponse = {
	result: string;
	messages: [
		{
			message: string;
		}
	];
	body: {
		posts: Post[];
	};
};

export const getMinePost = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postGetMine.method,
				url: ENDPOINTS.postGetMine.url,
				data: {},
				// params: {
				// 	aaa: "aaaa",
				// },
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response: AxiosResponse<GetMinePostResponse>) => {
				console.log(response);
				if (response.data.result == API_RESULT_SUCCESS) {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "selectMinePostにてエラーが発生しました。");
				rejects(e);
			});
	});
};