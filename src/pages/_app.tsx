import * as React from "react";
import { AppProps } from "next/app";
import { Html, Head } from "next/document";

import "../styles/globals.css";
import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
