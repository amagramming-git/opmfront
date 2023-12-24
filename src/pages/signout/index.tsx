import { Container, Row, Button } from "react-bootstrap";

const signout = () => {
	return (
		<Container>
			<Row>
				<h1 className="mt-3 mb-3">Sign out</h1>
				<Button variant="secondary" type="submit">
					Sign out
				</Button>
			</Row>
		</Container>
	);
};

export default signout;
