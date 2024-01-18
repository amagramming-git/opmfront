import { BLANK_VIEW_STRING, OVERFLOW_VIEW_STRING } from "@/config/utilConfig";

export const replaceWhitespaceChar = (str: string) => {
	const newStr = str.replace(/\s+/g, "");
	if (!newStr) {
		return BLANK_VIEW_STRING;
	} else {
		return newStr;
	}
};
export const getTheFirstChar = (str: string, wordCount: number) => {
	if (str.length == 0) {
		return BLANK_VIEW_STRING;
	} else if (str.length <= wordCount) {
		return str;
	} else if (str.length > wordCount) {
		return str.slice(0, wordCount) + OVERFLOW_VIEW_STRING;
	}
};
