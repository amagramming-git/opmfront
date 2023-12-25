import { useSelector } from "react-redux";
import { HeaderAlertState } from "./headerAlertSlice";

export const useHeaderAlertState = () => {
	return useSelector((state: { headerAlert: HeaderAlertState }) => state);
};
