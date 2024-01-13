import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../util/logger";
import { Post } from "@/types/post";

export type PostSelectByPrimaryKeyResponse = {
	result: string;
	messages: [
		{
			message: string;
		}
	];
	body: {
		post: Post;
	};
};

export const selectByPrimaryKey = (token: string, postId: number) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postSelectByPrimaryKey.method,
				url: ENDPOINTS.postSelectByPrimaryKey.url.replace(
					"{id}",
					String(postId)
				),
				data: {},
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response: AxiosResponse<PostSelectByPrimaryKeyResponse>) => {
				if (response.data.result == API_RESULT_SUCCESS) {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "postSelectByPrimaryKeyにてエラーが発生しました。");
				rejects(e);
			});
	});
};
