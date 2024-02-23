import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostInsertResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const insertPost = (content: string, token: string) => {
	return new Promise<AxiosResponse<PostInsertResponse>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postInsert.method,
				url: ENDPOINTS.postInsert.url,
				data: { content: content },
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response: AxiosResponse<PostInsertResponse>) => {
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
