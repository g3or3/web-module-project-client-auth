import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const logout = () => {
		localStorage.removeItem("token");
	};

	return (
		<Router>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/friendslist">Friends List</NavLink>
			<NavLink to="/login" onClick={logout}>
				Logout
			</NavLink>
			<PrivateRoute exact path="/friendslist" component={FriendsList} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
}

export default App;
