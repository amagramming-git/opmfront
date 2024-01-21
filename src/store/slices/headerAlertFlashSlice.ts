import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderAlertFlashState {
	viewflag: boolean;
	variant: string;
	message: string;
	hiddenSecond: number;
	hiddenSecondTimeStamp: string;
}

const initialState: HeaderAlertFlashState = {
	viewflag: false,
	variant: "danger",
	message: "",
	hiddenSecond: 0,
	hiddenSecondTimeStamp: new Date().toISOString(),
};

const headerAlertFlashSlice = createSlice({
	name: "alertViewSlice",
	initialState,
	reducers: {
		viewDanger: (state, action: PayloadAction<string>) => ({
			...state,
			viewflag: true,
			variant: "danger",
			message: action.payload,
			hiddenSecond: 0,
		}),
		viewSuccess: (state, action: PayloadAction<string>) => ({
			...state,
			viewflag: true,
			variant: "success",
			message: action.payload,
			hiddenSecond: 3,
			hiddenSecondTimeStamp: new Date().toISOString(),
		}),
		setHiddenSecond: (state, action: PayloadAction<number>) => ({
			...state,
			hiddenSecond: action.payload,
			hiddenSecondTimeStamp: new Date().toISOString(),
		}),
		resetHiddenSecond: (state) => ({
			...state,
			hiddenSecond: 0,
			hiddenSecondTimeStamp: new Date().toISOString(),
		}),
		hidden: (state) => ({
			viewflag: false,
			variant: "danger",
			message: "",
			hiddenSecond: 0,
			hiddenSecondTimeStamp: new Date().toISOString(),
		}),
	},
});

export default headerAlertFlashSlice;
