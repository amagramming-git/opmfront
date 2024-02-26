import { selectByPrimaryKey } from "@/axios/post/selectByPrimaryKeyPost";
import Link from "next/link";
import { updatePost } from "@/axios/post/updatePost";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import utilStyles from "@/styles/utils.module.css";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormInputs = {
	content: string;
};
const MyPostUpdate = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue } = useForm<FormInputs>();
	const params = useParams();
	const [postid, setPostid] = useState("");

	useEffect(() => {
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (!token) {
			dispatch(
				headerAlertFlashSlice.actions.viewDanger("再度ログインしてください。")
			);
		} else {
			if (params) {
				setPostid(params.postid as string);
				selectByPrimaryKey(token, Number(params.postid))
					.then((res) => {
						setValue("content", res.data.body.post.content);
					})
					.catch((e) => {
						dispatch(
							headerAlertFlashSlice.actions.viewDanger(
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
		dispatch(headerAlertFlashSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			updatePost(token, Number(postid as string), data.content)
				.then((res) => {
					router.push("/mypost");
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
		<Container>
			<Row>
				<div className="d-flex flex-column align-items-start">
					<h1 className="mt-3 mb-3">メモる</h1>
					<div className="d-flex align-items-start">
						<Link href={"/"} className={utilStyles.defaultLink}>
							<Button variant="outline-secondary" className="mb-2 me-2">
								新規メモ画面へ
							</Button>
						</Link>
						<Link href={"/mypost"} className={utilStyles.defaultLink}>
							<Button variant="outline-secondary" className="mb-2 me-2">
								メモ一覧画面へ
							</Button>
						</Link>
					</div>
				</div>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="content">
						{/* <Form.Label>メモの更新</Form.Label> */}
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

export default MyPostUpdate;
