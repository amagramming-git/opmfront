import { login } from "@/components/auth/login";
import { Button, Form, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type FormInputs = {
	email: string;
	password: string;
};

const signin = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		login(data.email, data.password)
			.then((res) => {
				console.log(res);
				console.log(window.sessionStorage);
				router.push("/");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<Container>
				<Row>
					<h1 className="mt-3 mb-3">Sign in</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								{...register("email")}
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								{...register("password")}
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Sign in
						</Button>
					</Form>
				</Row>
			</Container>
		</>
	);
};

export default signin;
