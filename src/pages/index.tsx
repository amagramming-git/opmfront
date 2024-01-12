import { insertPost } from "@/components/post/insert";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Cookies from "js-cookie";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";

type FormInputs = {
	content: string;
};

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const router = useRouter();
	const { register, handleSubmit, setValue } = useForm<FormInputs>();

	const [hiddenSecond, setHiddenSecond] = useState(0);

	useEffect(() => {
		const sleep = (waitTime: number) =>
			new Promise((resolve) => setTimeout(resolve, waitTime));
		if (hiddenSecond >= 1) {
			sleep(1000).then(() => {
				setHiddenSecond((prev) => prev - 1);
			});
		} else {
			dispatch(headerAlertSlice.actions.hidden());
		}
	}, [hiddenSecond]);

	const onSubmit = (data: FormInputs) => {
		dispatch(headerAlertSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			insertPost(data.content, token)
				.then((res) => {
					dispatch(headerAlertSlice.actions.viewSuccess("保存しました。"));
					setHiddenSecond(2);
					setValue("content", "");
				})
				.catch((e) => {
					dispatch(
						headerAlertSlice.actions.viewDanger(
							"次のエラーが発生しました : " + e.message
						)
					);
				});
		} else {
			dispatch(
				headerAlertSlice.actions.viewDanger("再度ログインしてください。")
			);
		}
	};

	return (
		<>
			{!loginCustomerState.auth ? (
				<Container>
					<Row>
						<h1 className="mt-3 mb-3 text-center">Open Memo📝</h1>
						<p className="text-center">
							こちらはメモアプリです。
							<br />
							機能が追加され次第こちらで紹介します。
						</p>
						<div className="d-flex justify-content-center">
							<Button
								variant="secondary"
								onClick={() => {
									router.push("/signin");
								}}
								className="me-2"
							>
								ログインページへ
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									router.push("/signup");
								}}
								className="ms-2"
							>
								新規登録ページへ
							</Button>
						</div>
					</Row>
				</Container>
			) : (
				<Container>
					<Row>
						<h1 className="mt-2">メモる</h1>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3" controlId="content">
								<Form.Label>メモ内容</Form.Label>
								<Form.Control
									{...register("content")}
									as="textarea"
									placeholder="メモ内容"
									rows={16}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Save
							</Button>
						</Form>
					</Row>
				</Container>
			)}
		</>
	);
};

export default Home;
