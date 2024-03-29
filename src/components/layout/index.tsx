import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Button, Navbar, Offcanvas, Nav } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";
import { loginWithJwttoken } from "@/axios/auth/loginWithJwttoken";
import { logout } from "@/axios/auth/logout";
import Cookies from "js-cookie";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import HeaderOffcanvasFlash from "./HeaderAlertFlash";
import { usePathname, useSearchParams } from "next/navigation";

const Layout = (props: any) => {
	const dispatch = useAppDispatch();
	const HeaderAlertFlashState = useAppSelector((state) => state.headerAlert);
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const [isLoading, setIsLoading] = useState(true);

	// React初回マウント時にCookieが存在すれば自動的にログインを実施する
	useEffect(() => {
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			loginWithJwttoken(jwtToken)
				.then((res) => {
					if (res.data.body.email !== undefined) {
						dispatch(
							loginCustomerSlice.actions.loginCustomer({
								auth: true,
								customer: {
									id: res.data.body.id,
									email: res.data.body.email,
									username: res.data.body.username,
								},
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
						headerAlertFlashSlice.actions.viewDanger(
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
		dispatch(headerAlertFlashSlice.actions.hidden());
	}, [pathname, searchParams]);

	return (
		<>
			{HeaderAlertFlashState.viewflag && <HeaderOffcanvasFlash />}
			<header>
				<Navbar
					expand={!isLoading && !loginCustomerState.auth}
					className="bg-body-tertiary"
				>
					<Container>
						<Navbar.Brand>
							<Link href={"/"} className={utilStyles.defaultLink}>
								Open Memo📝
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							{!isLoading && !loginCustomerState.auth ? (
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
							) : (
								<>
									<Navbar.Offcanvas placement="end">
										<Offcanvas.Header closeButton>
											<Offcanvas.Title>メニュー</Offcanvas.Title>
										</Offcanvas.Header>
										<Offcanvas.Body>
											<Nav className="justify-content-end flex-grow-1 pe-3">
												{/* <Nav.Link href="#profile">プロフィール</Nav.Link> */}
												<Nav.Link href="/">HOME</Nav.Link>
												<Nav.Link href="/mypost">メモ一覧</Nav.Link>
												<Nav.Link href="/signout">ログアウト</Nav.Link>
											</Nav>
										</Offcanvas.Body>
									</Navbar.Offcanvas>
								</>
							)}
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<main>{!isLoading && props.children}</main>
		</>
	);
};

export default Layout;
