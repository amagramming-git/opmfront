import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Container, Button, Navbar } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import HeaderAlert from "./HeaderAlert";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const Layout = (props: any) => {
	const state = useAppSelector((state) => state.headerAlert);
	const dispatch = useAppDispatch();
	const [flg, setFlg] = useState(false);

	const onClickView = () => {
		dispatch(headerAlertSlice.actions.view("ああああ"));
	};
	const onClickHidden = () => {
		dispatch(headerAlertSlice.actions.hidden());
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
							{flg ? (
								<>
									<Link href={"/signout"} className={utilStyles.defaultLink}>
										<Button variant="outline-secondary" className="me-2">
											Sign Out
										</Button>
									</Link>
									<Navbar.Text>
										<a href="#profile">Mark Otto</a>
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
				{state.viewflag && (
					<HeaderAlert variant={state.variant} message={state.message} />
				)}
			</header>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
