export const Logout = () => {
	console.log(sessionStorage.getItem("Authorization"));

	window.sessionStorage.setItem("token", "");
	window.sessionStorage.setItem("userdetails", "");
	window.sessionStorage.setItem("XSRF-TOKEN", "");
};
