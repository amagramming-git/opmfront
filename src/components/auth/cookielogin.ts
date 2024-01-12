import { ENDPOINTS, ENDPOINT_CONTENT_TYPE } from "@/config/endpointConfig";
import axios, { AxiosResponse } from "axios";
import { errorLogger } from "../util/logger";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";

export const cookielogin = (token: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.customerMe.method,
				url: ENDPOINTS.customerMe.url,
				data: {},
				headers: {
					Authorization: BEARER_TOKEN_HEADER + token,
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
			})
			.then((response) => {
				if (response.data.result == "0") {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "cookielogin認証エラー");
				rejects(e);
			});
	});
};
