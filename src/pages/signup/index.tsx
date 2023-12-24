import { Button, Container, Form, Row } from "react-bootstrap";

const signup = () => {
	return (
		<Container>
			<Row>
				<h1 className="mt-3 mb-3">Sign up</h1>
				<Form>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formUsername">
						<Form.Label>User Name</Form.Label>
						<Form.Control type="email" placeholder="Enter UserName" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Sign up
					</Button>
				</Form>
			</Row>
		</Container>
	);
};

export default signup;
