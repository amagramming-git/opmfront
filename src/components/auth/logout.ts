export const logout = () => {
	window.sessionStorage.setItem("token", "");
	window.sessionStorage.setItem("XSRF-TOKEN", "");
};
