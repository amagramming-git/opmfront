import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { errorLogger } from "../util/logger";
import { ENDPOINTS, ENDPOINT_CONTENT_TYPE } from "@/config/endpointConfig";
import {
	BASIC_AUTH_HEADER,
	JWT_TOKEN_COOKIE_NAME,
	RESPONSE_AUTH_HEADER,
} from "@/config/authConfig";

export const login = (email: string, password: string) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.customerGet.method,
				url: ENDPOINTS.customerGet.url,
				data: {},
				headers: {
					Authorization:
						BASIC_AUTH_HEADER + window.btoa(email + ":" + password),
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response) => {
				Cookies.set(
					JWT_TOKEN_COOKIE_NAME,
					response.headers[RESPONSE_AUTH_HEADER]
				);
				if (response.data.result == "0") {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "login認証エラー");
				rejects(e);
			});
	});
};
