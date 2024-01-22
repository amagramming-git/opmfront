import { loginWithPassword } from "@/api/auth/loginWithPassword";
import { Button, Form, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import loginCustomerSlice from "@/store/slices/loginCustomerSlice";
import {
	CUSTOMER_EMAIL_VALIDATION,
	CUSTOMER_PASSWORD_VALIDATION,
} from "@/config/validationConfig";

type FormInputs = {
	email: string;
	password: string;
};

const SignIn = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		loginWithPassword(data.email, data.password)
			.then((res) => {
				if (res.data.body.email !== undefined) {
					dispatch(
						loginCustomerSlice.actions.loginCustomer({
							auth: true,
							customer: {
								id: res.data.body.id,
								email: res.data.body.email,
								username: res.data.body.username,
							},
						})
					);
				} else {
					throw new Error("システムエラー");
				}
				router.push("/");
			})
			.catch((e) => {
				dispatch(
					headerAlertFlashSlice.actions.viewDanger(
						"次のエラーが発生しました : " + e.message
					)
				);
			});
	};

	return (
		<>
			<Container>
				<Row>
					<h1 className="mt-3 mb-3">ログイン</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3" controlId="formEmail">
							<Form.Label>Email address</Form.Label>
							<Controller
								name="email"
								control={control}
								rules={CUSTOMER_EMAIL_VALIDATION}
								render={({ field }) => (
									<Form.Control
										{...field}
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
								rules={CUSTOMER_PASSWORD_VALIDATION}
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
							ログイン
						</Button>
					</Form>
				</Row>
			</Container>
		</>
	);
};

export default SignIn;
