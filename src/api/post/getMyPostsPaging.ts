import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostGetMinePagingResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const getMyPostsPaging = (
	token: string,
	limit: number,
	offset: number
) => {
	return new Promise<AxiosResponse<PostGetMinePagingResponse>>(
		(resolve, rejects) => {
			axios
				.request({
					method: ENDPOINTS.postGetMinePaging.method,
					url: ENDPOINTS.postGetMinePaging.url,
					data: {},
					params: {
						limit: limit,
						offset: offset,
					},
					headers: {
						Authorization: BEARER_TOKEN_HEADER + token,
						"Content-Type": ENDPOINT_CONTENT_TYPE,
					},
					withCredentials: true,
				})
				.then((response: AxiosResponse<PostGetMinePagingResponse>) => {
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
		}
	);
};
