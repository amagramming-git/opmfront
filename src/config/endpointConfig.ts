const ENDPOINT_PROTOCOL = process.env.NEXT_PUBLIC_ENDPOINT_PROTOCOL;
const ENDPOINT_HOST = process.env.NEXT_PUBLIC_ENDPOINT_HOST;
const ENDPOINT_BASE = ENDPOINT_PROTOCOL + "://" + ENDPOINT_HOST;
export const ENDPOINTS = {
	customerGet: {
		url: ENDPOINT_BASE + "/customer/get",
		method: "get",
	},
	customerMe: {
		url: ENDPOINT_BASE + "/customer/me",
		method: "get",
	},
	customerRegister: {
		url: ENDPOINT_BASE + "/customer/register",
		method: "post",
	},
	postInsert: {
		url: ENDPOINT_BASE + "/post",
		method: "post",
	},
	postGetMine: {
		url: ENDPOINT_BASE + "/post/getmine", //"/post/mine",
		method: "get",
	},
	postSelect: {
		url: ENDPOINT_BASE + "/post/select", //"/post/mine",
		method: "get",
	},
};

export const ENDPOINT_CONTENT_TYPE = "application/json";
export const API_RESULT_SUCCESS = "0";
export const API_RESULT_ERROR = "1";
