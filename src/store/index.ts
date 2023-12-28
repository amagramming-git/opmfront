import { configureStore } from "@reduxjs/toolkit";
import headerAlertSlice from "./slices/headerAlertSlice";
import loginCustomerSlice from "./slices/loginCustomerSlice";

const store = configureStore({
	reducer: {
		headerAlert: headerAlertSlice.reducer,
		loginCustomer: loginCustomerSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
