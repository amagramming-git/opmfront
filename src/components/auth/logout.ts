export const Logout = () => {
	window.sessionStorage.setItem("token", "");
	window.sessionStorage.setItem("XSRF-TOKEN", "");
};
