import {
	PostSelectByPrimaryKeyResponse,
	selectByPrimaryKey,
} from "@/api/post/selectByPrimaryKeyPost";
import { updatePost } from "@/api/post/updatePost";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormInputs = {
	content: string;
};
const mypostupdate = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue } = useForm<FormInputs>();
	const params = useParams();
	const [postid, setPostid] = useState("");

	useEffect(() => {
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (!token) {
			dispatch(
				headerAlertSlice.actions.viewDanger("再度ログインしてください。")
			);
		} else {
			if (params) {
				setPostid(params.postid as string);
				selectByPrimaryKey(token, Number(params.postid))
					.then((res: AxiosResponse<PostSelectByPrimaryKeyResponse>) => {
						setValue("content", res.data.body.post.content);
					})
					.catch((e) => {
						dispatch(
							headerAlertSlice.actions.viewDanger(
								"次のエラーが発生しました : " + e.message
							)
						);
					});
			} else {
				router.push("/");
			}
		}
	}, []);

	const onSubmit = (data: FormInputs) => {
		dispatch(headerAlertSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			updatePost(token, Number(postid as string), data.content)
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

export default mypostupdate;
