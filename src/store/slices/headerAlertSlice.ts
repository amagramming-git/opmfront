import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderAlertState {
	viewflag: boolean;
	variant: string;
	message: string;
}

const initialState: HeaderAlertState = {
	viewflag: false,
	variant: "danger",
	message: "",
};

const headerAlertSlice = createSlice({
	name: "alertViewSlice",
	initialState,
	reducers: {
		viewDanger: (state, action: PayloadAction<string>) => ({
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
