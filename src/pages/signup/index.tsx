import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { registerCustomer } from "@/api/auth/registerCustomer";
import { useAppDispatch } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";

type FormInputs = {
	email: string;
	username: string;
	password: string;
};

const signup = () => {
	const dispatch = useAppDispatch();
	const [flg, setFlg] = useState(true);
	const { register, handleSubmit } = useForm<FormInputs>();
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
							<Form.Control
								{...register("email")}
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formUsername">
							<Form.Label>User Name</Form.Label>
							<Form.Control
								{...register("username")}
								placeholder="Enter UserName"
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
							Sign up
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
