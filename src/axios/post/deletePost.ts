import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostDeleteIdResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const deletePost = (token: string, postId: number) => {
	return new Promise<AxiosResponse<PostDeleteIdResponse>>(
		(resolve, rejects) => {
			axios
				.request({
					method: ENDPOINTS.postDeleteId.method,
					url: ENDPOINTS.postDeleteId.url.replace("{id}", String(postId)),
					data: {},
					headers: {
						Authorization: BEARER_TOKEN_HEADER + token,
						"Content-Type": ENDPOINT_CONTENT_TYPE,
					},
					withCredentials: true,
				})
				.then((response: AxiosResponse<PostDeleteIdResponse>) => {
					if (response.data.result == API_RESULT_SUCCESS) {
						resolve(response);
					} else {
						throw new Error(response.data.messages[0].message);
					}
				})
				.catch((e) => {
					errorLogger(e, "ERROR:deletePost");
					rejects(e);
				});
		}
	);
};
