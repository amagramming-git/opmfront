import { Alert, Container } from "react-bootstrap";

interface Props {
	variant: string;
	message: string;
}

const HeaderAlert = (props: Props) => {
	return (
		<Container>
			<Alert className="mt-4" variant={props.variant}>
				{props.message}
			</Alert>
		</Container>
	);
};

export default HeaderAlert;
