import { setCookie } from "typescript-cookie";

export const logout = () => {
	setCookie("token", "");
	setCookie("XSRF-TOKEN", "");
	window.sessionStorage.setItem("XSRF-TOKEN", "");
};
