import axios, { AxiosResponse } from "axios";
import {
	API_RESULT_SUCCESS,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
} from "@/config/endpointConfig";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";
import { errorLogger } from "../util/logger";

export const selectMinePost = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.postSelectMine.method,
				url: ENDPOINTS.postSelectMine.url,
				data: {},
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response) => {
				if (response.data.result == API_RESULT_SUCCESS) {
					resolve(response);
				} else {
					throw new Error(response.data.message.message);
				}
			})
			.catch((e) => {
				errorLogger(e, "selectMinePostにてエラーが発生しました。");
				rejects(e);
			});
	});
};
