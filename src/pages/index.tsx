import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { insertPost } from "@/api/post/insertPost";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import WelcomePage from "@/components/pageTemplate/WelcomePage";

type FormInputs = {
	content: string;
};

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const loginCustomerState = useAppSelector((state) => state.loginCustomer);
	const { register, handleSubmit, setValue } = useForm<FormInputs>();

	const onSubmit = (data: FormInputs) => {
		dispatch(headerAlertFlashSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			insertPost(data.content, token)
				.then((res) => {
					dispatch(headerAlertFlashSlice.actions.viewSuccess("保存しました。"));
					setValue("content", "");
				})
				.catch((e) => {
					dispatch(
						headerAlertFlashSlice.actions.viewDanger(
							"次のエラーが発生しました : " + e.message
						)
					);
				});
		} else {
			dispatch(
				headerAlertFlashSlice.actions.viewDanger("再度ログインしてください。")
			);
		}
	};

	return (
		<>
			{loginCustomerState.auth ? (
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
			) : (
				<WelcomePage />
			)}
		</>
	);
};

export default Home;
