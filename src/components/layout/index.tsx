import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Container, Button, Navbar } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";
import { cookielogin } from "@/components/auth/cookielogin";
import HeaderAlert from "./HeaderAlert";

const Layout = (props: any) => {
	const headerAlertState = useAppSelector((state) => state.headerAlert);
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const dispatch = useAppDispatch();

	// React初回マウント時にCookieが存在すれば自動的にログインを実施する
	useEffect(() => {
		const jwtToken = window.sessionStorage.getItem("token");
		if (jwtToken) {
			cookielogin(jwtToken)
				.then((res) => {
					dispatch(
						loginCustomerSlice.actions.loginCustomer({
							auth: true,
							id: res.data.id,
							email: res.data.email,
							username: res.data.username,
						})
					);
				})
				.catch((e) => {
					console.log(e);
					dispatch(
						headerAlertSlice.actions.viewDanger(
							"次のエラーが発生しました : " + e.message
						)
					);
				});
		}
	}, []);

	// 後でいらなくなる部分
	const onClickView = () => {
		dispatch(headerAlertSlice.actions.viewDanger("ああああ"));
	};
	const onClickHidden = () => {
		dispatch(headerAlertSlice.actions.hidden());
	};
	const onClickLoginCustomer = () => {
		console.log(loginCustomerState);
	};

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
											Sign Out
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
											Sign in
										</Button>
									</Link>
									<Link href={"/signup"} className={utilStyles.defaultLink}>
										<Button variant="primary" className="me-2">
											Sign Up
										</Button>
									</Link>
								</>
							)}
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Button onClick={onClickView} variant="primary" className="me-2">
					onClickView
				</Button>
				<Button onClick={onClickHidden} variant="primary" className="me-2">
					onClickHidden
				</Button>
				<Button
					onClick={onClickLoginCustomer}
					variant="primary"
					className="me-2"
				>
					onClickLoginCustomer
				</Button>
				{headerAlertState.viewflag && (
					<HeaderAlert
						variant={headerAlertState.variant}
						message={headerAlertState.message}
					/>
				)}
			</header>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
