import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { registerCustomer } from "@/api/auth/registerCustomer";
import { useAppDispatch } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import {
	CUSTOMER_EMAIL_VALIDATION,
	CUSTOMER_PASSWORD_VALIDATION,
	CUSTOMER_USERNAME_VALIDATION,
} from "@/config/validationConfig";

type FormInputs = {
	email: string;
	username: string;
	password: string;
};

const signup = () => {
	const dispatch = useAppDispatch();
	const [flg, setFlg] = useState(true);

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		registerCustomer(data.email, data.username, data.password)
			.then((res) => {
				setFlg(false);
			})
			.catch((e) => {
				dispatch(
					headerAlertFlashSlice.actions.viewDanger(
						"次のエラーが発生しました : " +
							(e.response.data.message[0].message || e.message)
					)
				);
			});
	};

	return (
		<Container>
			<Row>
				<h1 className="mt-3 mb-3">新規登録</h1>
				{flg ? (
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
						<Form.Group className="mb-3" controlId="formUsername">
							<Form.Label>Username</Form.Label>
							<Controller
								name="username"
								control={control}
								rules={CUSTOMER_USERNAME_VALIDATION}
								render={({ field }) => (
									<Form.Control
										{...field}
										placeholder="Enter username"
										value={field.value || ""}
										isInvalid={errors.username && true}
									/>
								)}
							/>
							{errors.username && (
								<Form.Control.Feedback type="invalid">
									{errors.username.message}
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
							新規登録
						</Button>
					</Form>
				) : (
					<>
						<p>登録に成功しました。</p>
						<Link href={"/signin"}>
							<Button variant="primary" onClick={() => {}}>
								ログインページへ
							</Button>
						</Link>
					</>
				)}
			</Row>
		</Container>
	);
};

export default signup;
