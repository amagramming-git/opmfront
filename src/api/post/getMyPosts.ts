import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
	PostGetMineResponse,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../../components/util/logger";

export const getMyPosts = (token: string) => {
	return new Promise<AxiosResponse<PostGetMineResponse>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postGetMine.method,
				url: ENDPOINTS.postGetMine.url,
				data: {},
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response: AxiosResponse<PostGetMineResponse>) => {
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
