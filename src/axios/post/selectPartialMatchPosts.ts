import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostSelectPartialMatchResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const selectPartialMatch = (token: string, likeString: string) => {
	return new Promise<AxiosResponse<PostSelectPartialMatchResponse>>(
		(resolve, rejects) => {
			axios
				.request({
					method: ENDPOINTS.postSelectPartialMatch.method,
					url: ENDPOINTS.postSelectPartialMatch.url,
					data: {},
					params: {
						likeString: likeString,
					},
					headers: {
						Authorization: BEARER_TOKEN_HEADER + token,
						"Content-Type": ENDPOINT_CONTENT_TYPE,
					},
					withCredentials: true,
				})
				.then((response: AxiosResponse<PostSelectPartialMatchResponse>) => {
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
		}
	);
};
