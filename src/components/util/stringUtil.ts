export const replaceWhitespaceChar = (str: string) => {
	const newStr = str.replace(/\s+/g, "");
	if (!newStr) {
		return "無題";
	} else {
		return newStr;
	}
};
export const getTheFirstChar = (str: string, wordCount: number) => {
	if (str.length == 0) {
		return "無題";
	} else if (str.length <= wordCount) {
		return str;
	} else if (str.length > wordCount) {
		return str.slice(0, wordCount) + "...";
	}
};
