import { deletePost } from "@/components/post/delete";
import { GetMinePostResponse, getMinePost } from "@/components/post/getMine";
import {
	PostSelectPartialMatchResponse,
	selectPartialMatch,
} from "@/components/post/selectPartialMatch";
import {
	getTheFirstChar,
	replaceWhitespaceChar,
} from "@/components/util/stringUtil";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch } from "@/store/hook";
import headerAlertSlice from "@/store/slices/headerAlertSlice";
import { Post } from "@/types/post";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardGroup,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormInputs = {
	likeString: string;
};
const mypost = () => {
	const dispatch = useAppDispatch();
	const [posts, setPosts] = useState<Post[]>([]);
	const { register, handleSubmit } = useForm<FormInputs>();

	useEffect(() => {
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			getMinePost(jwtToken)
				.then((res: AxiosResponse<GetMinePostResponse>) => {
					setPosts(res.data.body.posts);
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
	}, []);
	const onSubmit = (data: FormInputs) => {
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			selectPartialMatch(jwtToken, data.likeString)
				.then((res: AxiosResponse<PostSelectPartialMatchResponse>) => {
					setPosts(res.data.body.posts);
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
	const clickHandlerDeletePost = (postid: number) => {
		dispatch(headerAlertSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			deletePost(token, postid)
				.then((res) => {
					dispatch(headerAlertSlice.actions.viewSuccess("削除しました。"));
					setPosts((prev) => {
						var newPosts = prev.filter(function (prev) {
							return prev.id != postid;
						});
						return newPosts;
					});
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
			<Container>
				<Row className="align-items-start">
					<h1 className="mt-3 mb-3">メモ一覧</h1>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-2" controlId="formEmail">
							<Form.Control
								type="search"
								placeholder="キーワードを入力"
								{...register("likeString")}
								aria-label="Search"
							/>
						</Form.Group>
						<Button className="mb-2" variant="outline-success" type="submit">
							検索
						</Button>
					</Form>
					<CardGroup>
						{posts.map((post) => (
							<Col sm={4} className="mb-2" key={post.id}>
								<Card className="me-2 h-100">
									<Card.Body>
										<Card.Title>
											<Link href={`/mypost/${post.id}`}>
												{getTheFirstChar(
													replaceWhitespaceChar(post.content),
													16
												)}
											</Link>
										</Card.Title>
										<Card.Text>
											{getTheFirstChar(replaceWhitespaceChar(post.content), 64)}
										</Card.Text>
									</Card.Body>
									<Card.Footer>
										<Card.Text className="d-flex justify-content-between">
											<small className="text-muted">
												{post.updatedAt.split("T")[0]}
											</small>
											<Button
												onClick={() => {
													clickHandlerDeletePost(post.id);
												}}
												className="btn-sm"
												variant="danger"
											>
												削除
											</Button>
										</Card.Text>
									</Card.Footer>
								</Card>
							</Col>
						))}
					</CardGroup>
				</Row>
			</Container>
		</>
	);
};

export default mypost;
