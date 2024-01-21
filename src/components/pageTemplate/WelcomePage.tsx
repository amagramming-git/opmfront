import { useRouter } from "next/router";
import { Button, Container, Row } from "react-bootstrap";

const WelcomePage = () => {
	const router = useRouter();

	return (
		<Container>
			<Row>
				<h1 className="mt-3 mb-3 text-center">Open Memo📝</h1>
				<p className="text-center">
					こちらはメモアプリです。
					<br />
					機能が追加され次第こちらで紹介します。
					<br />
					こちら開発中のアプリケーションです。
					<br />
					何らかの損害や問題が発生しても、開発者は一切の責任を負いません。
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
	);
};

export default WelcomePage;
