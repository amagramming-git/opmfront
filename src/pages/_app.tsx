import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import store from "@/store";
import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Provider store={store}>
			<Head>
				<title>OpenMemo</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
