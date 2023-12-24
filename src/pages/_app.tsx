import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import Layout from "@/components/layout";
import { cookielogin } from "@/components/auth/cookielogin";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();
	// React初回マウント時にCookieが存在すれば自動的にログインを実施する
	React.useEffect(() => {
		const jwtToken = window.sessionStorage.getItem("token");

		if (jwtToken) {
			console.log("自動ログイン:", jwtToken);
			cookielogin(jwtToken)
				.then((res) => {
					console.log(res);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, []);
	return (
		<>
			<Head>
				<title>OpenMemo</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
