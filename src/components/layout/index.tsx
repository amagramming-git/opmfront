import Link from "next/link";
import { Alert, Container, Button, Navbar } from "react-bootstrap";
import utilStyles from "@/styles/utils.module.css";
import { useState } from "react";

const Layout = (props: any) => {
	const [flg, setFlg] = useState(false);
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
			</header>
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
