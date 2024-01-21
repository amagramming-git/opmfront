import { useAppDispatch, useAppSelector } from "@/store/hook";
import { CSSProperties, useEffect, useState } from "react";
import { Alert, CloseButton } from "react-bootstrap";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";

const HeaderOffcanvasFlash = () => {
	const HeaderAlertFlashState = useAppSelector((state) => state.headerAlert);
	const dispatch = useAppDispatch();

	const sleep = (waitTime: number) =>
		new Promise((resolve) => setTimeout(resolve, waitTime));
	const [hiddenCheckString, setHiddenCheckString] = useState("");

	// hiddenSecondが設定された際に削除予約を行う
	useEffect(() => {
		if (HeaderAlertFlashState.hiddenSecond !== 0) {
			sleep(HeaderAlertFlashState.hiddenSecond * 1000).then(() => {
				setHiddenCheckString(HeaderAlertFlashState.hiddenSecondTimeStamp);
			});
		}
	}, [HeaderAlertFlashState.hiddenSecond]);

	// 削除予約と、現在のAlertが一致している場合は削除を実施する
	useEffect(() => {
		if (hiddenCheckString == HeaderAlertFlashState.hiddenSecondTimeStamp) {
			dispatch(headerAlertFlashSlice.actions.hidden());
			dispatch(headerAlertFlashSlice.actions.resetHiddenSecond());
		}
	}, [hiddenCheckString]);

	const alertStyle: CSSProperties = {
		position: "fixed",
		zIndex: 10,
		textAlign: "center",
		top: "1%",
		left: "50%",
		transform: "translateX(-50%)",
		width: "80%",
	};
	const closeButtonStype: CSSProperties = {
		position: "fixed",
		zIndex: 15,
		textAlign: "right",
		top: "3%",
		right: "1%",
	};
	return (
		<>
			<Alert
				className="pb-0"
				style={alertStyle}
				variant={HeaderAlertFlashState.variant}
			>
				<p>{HeaderAlertFlashState.message}</p>
				<CloseButton
					style={closeButtonStype}
					onClick={() => {
						dispatch(headerAlertFlashSlice.actions.hidden());
					}}
				></CloseButton>
			</Alert>
		</>
	);
};

export default HeaderOffcanvasFlash;
