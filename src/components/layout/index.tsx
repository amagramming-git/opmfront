import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Container, Button, Navbar } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";
import { cookielogin } from "@/components/auth/cookielogin";
import HeaderAlert from "./HeaderAlert";
import { logout } from "../auth/logout";
import Cookies from "js-cookie";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";

const Layout = (props: any) => {
	const headerAlertState = useAppSelector((state) => state.headerAlert);
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);

	// React初回マウント時にCookieが存在すれば自動的にログインを実施する
	useEffect(() => {
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			cookielogin(jwtToken)
				.then((res) => {
					if (res.data.email !== undefined) {
						dispatch(
							loginCustomerSlice.actions.loginCustomer({
								auth: true,
								id: res.data.id,
								email: res.data.email,
								username: res.data.username,
							})
						);
						setIsLoading(false);
					} else {
						setIsLoading(false);
						throw new Error("システムエラー");
					}
				})
				.catch((e) => {
					logout();
					dispatch(
						headerAlertSlice.actions.viewDanger(
							"次のエラーが発生しました : " + e.message
						)
					);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}, []);

	// URLが変更された際に実行される処理
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		dispatch(headerAlertSlice.actions.hidden());
	}, [pathname, searchParams]);

	return (
		<>
			<header>
				<Navbar className="bg-body-tertiary">
					<Container>
						<Navbar.Brand>
							<Link href={"/"} className={utilStyles.defaultLink}>
								Open Memo📝
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							{loginCustomerState.auth ? (
								<>
									<Link href={"/signout"} className={utilStyles.defaultLink}>
										<Button variant="outline-secondary" className="me-2">
											ログアウト
										</Button>
									</Link>
									<Navbar.Text>
										<a href="#profile">{loginCustomerState.username}</a>
									</Navbar.Text>
								</>
							) : (
								<>
									<Link href={"/signin"} className={utilStyles.defaultLink}>
										<Button variant="outline-secondary" className="me-2">
											ログイン
										</Button>
									</Link>
									<Link href={"/signup"} className={utilStyles.defaultLink}>
										<Button variant="primary" className="me-2">
											新規登録
										</Button>
									</Link>
								</>
							)}
						</Navbar.Collapse>
					</Container>
				</Navbar>
				{headerAlertState.viewflag && (
					<HeaderAlert
						variant={headerAlertState.variant}
						message={headerAlertState.message}
					/>
				)}
			</header>
			<main>{!isLoading && props.children}</main>
		</>
	);
};

export default Layout;
