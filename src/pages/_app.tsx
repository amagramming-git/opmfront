import * as React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/layout";
import store from "@/store";
import "@/styles/globals.css";

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
