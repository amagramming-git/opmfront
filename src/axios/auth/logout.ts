import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import Cookies from "js-cookie";

export const logout = () => {
	// 現在axiosは使用していないが、将来的に使用する可能性があるため、当ディレクトリに配置する。
	Cookies.remove(JWT_TOKEN_COOKIE_NAME);
};
