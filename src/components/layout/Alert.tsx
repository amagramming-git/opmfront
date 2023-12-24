import { Alert, Container } from "react-bootstrap";

const HeaderAlert = (props: any) => {
	return (
		<Container>
			<Alert className="mt-4" variant="danger">
				This is a danger alert—check it out!
			</Alert>
		</Container>
	);
};

export default Alert;
