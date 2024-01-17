import axios, { AxiosResponse } from "axios";
import {
	CustomerMeResponse,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
} from "@/config/endpointConfig";
import { errorLogger } from "../../components/util/logger";
import { BEARER_TOKEN_HEADER } from "@/config/authConfig";

export const loginWithJwttoken = (token: string) => {
	return new Promise<AxiosResponse<CustomerMeResponse>>((resolve, rejects) => {
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
			.then((response: AxiosResponse<CustomerMeResponse>) => {
				if (response.data.result == "0") {
					resolve(response);
				} else {
					throw new Error(response.data.messages[0].message);
				}
			})
			.catch((e) => {
				errorLogger(e, "ERROR:loginWithCookie");
				rejects(e);
			});
	});
};
