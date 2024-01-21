import PaginationLayout from "@/components/layout/PaginationLayout";
import { deletePost } from "@/api/post/deletePost";
import { getMyPostsPaging } from "@/api/post/getMyPostsPaging";
import { selectPartialMatchPaging } from "@/api/post/selectPartialMatchPostsPaging";
import {
	getTheFirstChar,
	replaceWhitespaceChar,
} from "@/components/util/stringUtil";
import { JWT_TOKEN_COOKIE_NAME } from "@/config/authConfig";
import { useAppDispatch } from "@/store/hook";
import headerAlertFlashSlice from "@/store/slices/headerAlertFlashSlice";
import { Post } from "@/types/post";
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
	Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

type FormInputs = {
	likeString: string;
};
const mypost = () => {
	const dispatch = useAppDispatch();
	const [posts, setPosts] = useState<Post[]>([]);
	const [endPage, setEndPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [likeString, setLikeString] = useState("");
	const [isPostDeleteZero, setIsPostDeleteZero] = useState(false);
	const { register, handleSubmit } = useForm<FormInputs>();

	useEffect(() => {
		if (!isPostDeleteZero && posts.length == 0 && currentPage != 1) {
			setIsPostDeleteZero(true);
			setCurrentPage((prev) => {
				return prev - 1;
			});
			return;
		}
		const jwtToken = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (jwtToken) {
			if (likeString == "") {
				getMyPostsPaging(jwtToken, 9, (currentPage - 1) * 9)
					.then((res) => {
						setPosts(res.data.body.posts);
						setEndPage(Math.ceil(res.data.body.count / 9));
						setIsPostDeleteZero(false);
					})
					.catch((e) => {
						dispatch(
							headerAlertFlashSlice.actions.viewDanger(
								"次のエラーが発生しました : " + e.message
							)
						);
					});
			} else {
				selectPartialMatchPaging(jwtToken, likeString, 9, (currentPage - 1) * 9)
					.then((res) => {
						setPosts(res.data.body.posts);
						setEndPage(Math.ceil(res.data.body.count / 9));
						setIsPostDeleteZero(false);
					})
					.catch((e) => {
						dispatch(
							headerAlertFlashSlice.actions.viewDanger(
								"次のエラーが発生しました : " + e.message
							)
						);
					});
			}
		} else {
			dispatch(
				headerAlertFlashSlice.actions.viewDanger("再度ログインしてください。")
			);
		}
	}, [currentPage, likeString, posts.length]);

	const onSubmit = (data: FormInputs) => {
		setCurrentPage(1);
		setLikeString(data.likeString);
	};

	const clickHandlerDeletePost = (postid: number) => {
		dispatch(headerAlertFlashSlice.actions.hidden());
		const token = Cookies.get(JWT_TOKEN_COOKIE_NAME);
		if (token) {
			deletePost(token, postid)
				.then((res) => {
					dispatch(headerAlertFlashSlice.actions.viewSuccess("削除しました。"));
					setPosts((prev) => {
						var newPosts = prev.filter(function (prev) {
							return prev.id != postid;
						});
						return newPosts;
					});
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
					<PaginationLayout
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						endPage={endPage}
					/>
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
