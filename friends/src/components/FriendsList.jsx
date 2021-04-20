import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialFormVals = {
	id: null,
	name: "",
	age: "",
	email: "",
};

const FriendsList = () => {
	const [friendsList, setFriendsList] = useState([]);
	const [friendFormVals, setFriendFormVals] = useState(initialFormVals);

	const { name, age, email } = friendFormVals;

	useEffect(() => {
		axiosWithAuth()
			.get("/api/friends")
			.then((res) => {
				setFriendsList(res.data);
			})
			.catch((err) => console.log(err));
	}, [friendsList]);

	const handleChange = (e) => {
		setFriendFormVals({
			...friendFormVals,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newFriend = {
			id: Date.now(),
			name,
			age,
			email,
		};

		axiosWithAuth()
			.post("/api/friends", newFriend)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setFriendFormVals(initialFormVals);
	};

	const removeFriend = (id) => {
		axiosWithAuth()
			.delete(`/api/friends/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<ul>
				{friendsList.map((friend) => (
					<div key={friend.id} style={{ display: "flex" }}>
						<li>
							{friend.name} {friend.age} {friend.email}
						</li>
						<button onClick={() => removeFriend(friend.id)}>
							Remove Friend
						</button>
					</div>
				))}
			</ul>
			<div>
				<h2>Add New Friend</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Name
						<input
							name="name"
							value={name}
							onChange={handleChange}
						/>
					</label>
					<label>
						Age
						<input name="age" value={age} onChange={handleChange} />
					</label>
					<label>
						Email
						<input
							name="email"
							value={email}
							onChange={handleChange}
						/>
					</label>
					<button>Add New Friend</button>
				</form>
			</div>
		</div>
	);
};

export default FriendsList;
