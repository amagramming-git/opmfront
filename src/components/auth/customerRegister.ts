import axios, { AxiosResponse } from "axios";
import { errorLogger } from "../util/logger";
import { ENDPOINTS, ENDPOINT_CONTENT_TYPE } from "@/config/endpointConfig";

export const customerRegister = (
	email: string,
	username: string,
	password: string
) => {
	return new Promise<AxiosResponse<any, any>>((resolve, rejects) => {
		axios
			.request({
				method: ENDPOINTS.customerRegister.method,
				url: ENDPOINTS.customerRegister.url,
				data: { email: email, username: username, password: password },
				headers: {
					"Content-Type": ENDPOINT_CONTENT_TYPE,
				},
				withCredentials: true,
			})
			.then((response) => {
				if (response.data.result == "0") {
					resolve(response);
				} else {
					throw new Error(response.data.message.message);
				}
			})
			.catch((e) => {
				errorLogger(e, "singupエラー");
				rejects(e);
			});
	});
};
