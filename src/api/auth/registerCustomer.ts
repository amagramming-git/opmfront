import axios, { AxiosResponse } from "axios";
import { errorLogger } from "../../components/util/logger";
import {
	CustomerRegisterResponse,
	ENDPOINTS,
	ENDPOINT_CONTENT_TYPE,
} from "@/config/endpointConfig";

export const registerCustomer = (
	email: string,
	username: string,
	password: string
) => {
	return new Promise<AxiosResponse<CustomerRegisterResponse>>(
		(resolve, rejects) => {
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
				.then((response: AxiosResponse<CustomerRegisterResponse>) => {
					if (response.data.result == "0") {
						resolve(response);
					} else {
						throw new Error(response.data.messages[0].message);
					}
				})
				.catch((e) => {
					errorLogger(e, "ERROR:registerCustomer");
					rejects(e);
				});
		}
	);
};
