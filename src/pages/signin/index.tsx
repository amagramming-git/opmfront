import { login } from "@/components/auth/login";
import { Button, Form, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";

type FormInputs = {
	email: string;
	password: string;
};

const signin = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		login(data.email, data.password)
			.then((res) => {
				if (res.data.email !== undefined) {
					dispatch(
						loginCustomerSlice.actions.loginCustomer({
							auth: true,
							id: res.data.id,
							email: res.data.email,
							username: res.data.username,
						})
					);
				} else {
					throw new Error("システムエラー");
				}
				router.push("/");
			})
			.catch((e) => {
				dispatch(
					headerAlertSlice.actions.viewDanger(
						"次のエラーが発生しました : " + e.message
					)
				);
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

							<Controller
								name="email"
								control={control}
								rules={{
									required: "こちらは入力が必須です。",
								}}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="email"
										placeholder="Enter email"
										value={field.value || ""}
										isInvalid={errors.email && true}
									/>
								)}
							/>
							{errors.email && (
								<Form.Control.Feedback type="invalid">
									{errors.email.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Controller
								name="password"
								control={control}
								rules={{
									required: "こちらは入力が必須です。",
									maxLength: {
										value: 16,
										message: "最大16文字まで入力可能です。",
									},
								}}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="password"
										placeholder="Password"
										isInvalid={errors.password && true}
										value={field.value || ""}
									/>
								)}
							/>
							{errors.password && (
								<Form.Control.Feedback type="invalid">
									{errors.password.message}
								</Form.Control.Feedback>
							)}
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
