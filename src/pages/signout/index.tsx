import { logout } from "@/api/auth/logout";
import { Container, Row, Button } from "react-bootstrap";
import { useAppDispatch } from "@/store/hook";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";
import { useRouter } from "next/router";

const signout = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const onClickLogout = () => {
		logout();
		dispatch(loginCustomerSlice.actions.logoutCustomer());
		router.push("/");
	};
	return (
		<Container>
			<Row>
				<h1 className="mt-3 mb-3">ログアウト</h1>
				<Button onClick={onClickLogout} variant="secondary" type="submit">
					ログアウト
				</Button>
			</Row>
		</Container>
	);
};

export default signout;
