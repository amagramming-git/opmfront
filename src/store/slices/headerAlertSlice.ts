import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HeaderAlertState = {
	viewflag: boolean;
	variant: string;
	message: string;
};

export const initialState: HeaderAlertState = {
	viewflag: false,
	variant: "danger",
	message: "",
};

const headerAlertSlice = createSlice({
	name: "alertViewSlice",
	initialState,
	reducers: {
		view: (state, action: PayloadAction<string>) => ({
			viewflag: true,
			variant: "danger",
			message: action.payload,
		}),
		hidden: (state) => ({
			viewflag: false,
			variant: "danger",
			message: "",
		}),
	},
});

export default headerAlertSlice;
