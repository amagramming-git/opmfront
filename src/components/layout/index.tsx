import Link from "next/link";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Layout = (props: any) => {
	return (
		<>
			<header>
				<Navbar className="bg-body-tertiary">
					<Container>
						<Navbar.Brand>
							<Link href={"/"}>ホーム</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Navbar.Text>
								Signed in as: <a href="#login">Mark Otto</a>
							</Navbar.Text>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<main>
				<Container>{props.children}</Container>
			</main>
		</>
	);
};

export default Layout;
