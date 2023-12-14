import { login } from "@/components/auth/login";
import { Customer } from "@/types/customer";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const currentCustomer: Customer = { email: email, password: password };
		login(currentCustomer);
	};

	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	return (
		<div className="App">
			<h1>ログイン</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						value={email}
						onChange={handleChangeEmail}
					/>
				</div>
				<div>
					<label htmlFor="password">パスワード</label>
					<input
						id="password"
						name="password"
						value={password}
						onChange={handleChangePassword}
						type="password"
					/>
				</div>
				<div>
					<button type="submit">ログイン</button>
				</div>
			</form>
		</div>
	);
};

export default Home;
