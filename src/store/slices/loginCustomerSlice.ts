import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginCustomerState {
	auth: boolean;
	id: number;
	email: string;
	username: string;
}

const initialState: LoginCustomerState = {
	auth: false,
	id: 0,
	email: "",
	username: "",
};

const loginCustomerSlice = createSlice({
	name: "loginCustomerSlice",
	initialState,
	reducers: {
		loginCustomer: (state, action: PayloadAction<LoginCustomerState>) => ({
			auth: true,
			id: action.payload.id,
			email: action.payload.email,
			username: action.payload.username,
		}),
		logoutCustomer: (state) => ({
			auth: false,
			id: 0,
			email: "",
			username: "",
		}),
	},
});

export default loginCustomerSlice;
