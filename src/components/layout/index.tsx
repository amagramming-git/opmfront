import Link from "next/link";
import { Container, Button, Navbar } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useHeaderAlertState } from "@/store/slices/headerAlertSelector";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import HeaderAlert from "./HeaderAlert";

const Layout = (props: any) => {
	const [flg, setFlg] = useState(false);
	const state = useHeaderAlertState().headerAlert;
	const dispatch = useDispatch();
	const onClickView = () => {
		dispatch(headerAlertSlice.actions.view("ああああ"));
	};
	const onClickHidden = () => {
		dispatch(headerAlertSlice.actions.hidden());
	};

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
				{state.viewflag ? (
					<HeaderAlert variant={state.variant} message={state.message} />
				) : (
					<></>
				)}
			</header>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
