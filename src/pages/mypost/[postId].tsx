import { updatePost } from "@/components/post/update";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormInputs = {
	content: string;
};
const postId = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const { register, handleSubmit, setValue } = useForm<FormInputs>();
	useEffect(() => {
		console.log(router.query);
		if (!router.query.content) {
			// 値を取得する
		} else {
			setValue("content", router.query.content as string);
		}
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (!token) {
			dispatch(
				headerAlertSlice.actions.viewDanger("再度ログインしてください。")
			);
		}
	}, []);
	const onSubmit = (data: FormInputs) => {
		dispatch(headerAlertSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			updatePost(token, Number(router.query.postId as string), data.content)
				.then((res) => {
					router.push("/mypost");
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
		<Container>
			<Row>
				<h1 className="mt-2">メモの更新</h1>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="content">
						<Form.Label>メモの更新</Form.Label>
						<Form.Control
							{...register("content")}
							as="textarea"
							placeholder="メモ内容"
							rows={16}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						更新
					</Button>
				</Form>
			</Row>
		</Container>
	);
};

export default postId;
