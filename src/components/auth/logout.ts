import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import Cookies from "js-cookie";

export const logout = () => {
	Cookies.remove(JWT_TOKEN_COOKIE_NAME);
};
