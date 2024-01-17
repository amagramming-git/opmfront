import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostUpdateResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const updatePost = (token: string, postId: number, content: string) => {
	return new Promise<AxiosResponse<PostUpdateResponse>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postUpdateId.method,
				url: ENDPOINTS.postUpdateId.url.replace("{id}", String(postId)),
				data: { content: content },
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response: AxiosResponse<PostUpdateResponse>) => {
				if (response.data.result == API_RESULT_SUCCESS) {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "insertPostにてエラーが発生しました。");
				rejects(e);
			});
	});
};
