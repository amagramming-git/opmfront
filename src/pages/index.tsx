import { insertPost } from "@/components/post/insert";
import type { NextPage } from "next";
import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import { useAppDispatch } from "@/store/hook";
import Cookies from "js-cookie";

type FormInputs = {
	content: string;
};

const Home: NextPage = () => {
	const dispatch = useAppDispatch();

	const [flg, setFlg] = useState(false);
	const { register, handleSubmit, setValue } = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		dispatch(headerAlertSlice.actions.hidden());
		const token = Cookies.get("token");
		if (token) {
			insertPost(data.content, token)
				.then((res) => {
					dispatch(headerAlertSlice.actions.viewSuccess("保存しました。"));
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
			{flg ? (
				<Container>
					<Row>
						<h1 className="mt-3 mb-3 text-center">Open Memo📝</h1>
						<p className="text-center">
							こちらはメモアプリです。
							<br />
							機能が追加され次第こちらで紹介します。
						</p>
					</Row>
				</Container>
			) : (
				<Container>
					<Row>
						<h1>メモる</h1>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									{...register("content")}
									as="textarea"
									placeholder="Memo Content"
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
