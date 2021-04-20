import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormVals = { username: "", password: "" };

const Login = () => {
	const [loginFormVals, setLoginFormVals] = useState(initialFormVals);
	const { push } = useHistory();

	const handleChange = (e) => {
		setLoginFormVals({
			...loginFormVals,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post("/api/login", loginFormVals)
			.then((res) => {
				localStorage.setItem("token", res.data.payload);
				push("/friendslist");
			})
			.catch((err) => console.log({ err }));
		setLoginFormVals(initialFormVals);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					name="username"
					value={loginFormVals.username}
					onChange={handleChange}
				/>
			</label>
			<label>
				Password:
				<input
					name="password"
					value={loginFormVals.password}
					onChange={handleChange}
				/>
			</label>
			<button>Submit</button>
		</form>
	);
};

export default Login;
