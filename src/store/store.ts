import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import headerAlertSlice, {
	initialState as headerAlertState,
} from "./slices/headerAlertSlice";

const store = configureStore({
	reducer: {
		headerAlert: headerAlertSlice.reducer,
	},
});

const preloadedState = () => {
	return { headerAlert: headerAlertState };
};

export type StoreState = ReturnType<typeof preloadedState>;
export type ReduxStore = Store<StoreState>;

export default store;
