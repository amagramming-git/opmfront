import { getMinePost } from "@/components/post/getMine";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

const mypost = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			getMinePost(jwtToken)
				.then((res) => {
					console.log(res);
				})
				.catch((e) => {
					dispatch(
						headerAlertSlice.actions.viewDanger(
							"次のエラーが発生しました : " + e.message
						)
					);
				});
		} else {
			dispatch(
				headerAlertSlice.actions.viewDanger("再度ログインしてください。")
			);
		}
	}, []);
	return (
		<>
			<Container>
				<Row>
					<h1 className="mt-3 mb-3">メモ一覧</h1>
					{[].map((expand) => (
						<></>
					))}
				</Row>
			</Container>
		</>
	);
};

export default mypost;
