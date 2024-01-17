import { Post } from "@/types/entity/post";

export const ENDPOINT_CONTENT_TYPE = "application/json";
export const API_RESULT_SUCCESS = "0";
export const API_RESULT_ERROR = "1";

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
	postGetMine: {
		url: ENDPOINT_BASE + "/post/getmine",
		method: "get",
	},
	postGetMinePaging: {
		url: ENDPOINT_BASE + "/post/getminepaging",
		method: "get",
	},
	postSelectByPrimaryKeyId: {
		url: ENDPOINT_BASE + "/post/selectbyprimarykey/{id}",
		method: "get",
	},
	postSelectPartialMatch: {
		url: ENDPOINT_BASE + "/post/selectpartialmatch",
		method: "get",
	},
	postSelectPartialMatchPaging: {
		url: ENDPOINT_BASE + "/post/selectpartialmatchpaging",
		method: "get",
	},
	postInsert: {
		url: ENDPOINT_BASE + "/post/insert",
		method: "post",
	},
	postUpdateId: {
		url: ENDPOINT_BASE + "/post/update/{id}",
		method: "put",
	},
	postDeleteId: {
		url: ENDPOINT_BASE + "/post/delete/{id}",
		method: "delete",
	},
};

export interface EndpointResponse {
	result: string;
	messages: [
		{
			message: string;
		}
	];
}

export interface CustomerGetResponse extends EndpointResponse {
	body: {
		id: number;
		email: string;
		username: string;
	};
}
export interface CustomerMeResponse extends EndpointResponse {
	body: {
		id: number;
		email: string;
		username: string;
	};
}
export interface CustomerRegisterResponse extends EndpointResponse {
	body: {
		registerCount: number;
	};
}
export interface PostGetMineResponse extends EndpointResponse {
	body: {
		posts: Post[];
		count: number;
	};
}
export interface PostGetMinePagingResponse extends EndpointResponse {
	body: {
		posts: Post[];
		count: number;
	};
}
export interface PostSelectByPrimaryKeyResponse extends EndpointResponse {
	body: {
		post: Post;
	};
}
export interface PostSelectPartialMatchResponse extends EndpointResponse {
	body: {
		posts: Post[];
		count: number;
	};
}
export interface PostSelectPartialMatchPagingResponse extends EndpointResponse {
	body: {
		posts: Post[];
		count: number;
	};
}
export interface PostInsertResponse extends EndpointResponse {
	body: {
		insertCount: number;
	};
}
export interface PostUpdateResponse extends EndpointResponse {
	body: {
		updateCount: number;
	};
}
export interface PostDeleteIdResponse extends EndpointResponse {
	body: {
		deleteCount: number;
	};
}
