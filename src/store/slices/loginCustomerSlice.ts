import { Customer } from "@/types/customer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginCustomerState {
	auth: boolean;
	customer: Customer;
}

const initialState: LoginCustomerState = {
	auth: false,
	customer: {
		id: 0,
		email: "",
		username: "",
	},
};

const loginCustomerSlice = createSlice({
	name: "loginCustomerSlice",
	initialState,
	reducers: {
		loginCustomer: (state, action: PayloadAction<LoginCustomerState>) => ({
			auth: true,
			customer: {
				id: action.payload.customer.id,
				email: action.payload.customer.email,
				username: action.payload.customer.username,
			},
		}),
		logoutCustomer: (state) => ({
			auth: false,
			customer: {
				id: 0,
				email: "",
				username: "",
			},
		}),
	},
});

export default loginCustomerSlice;
