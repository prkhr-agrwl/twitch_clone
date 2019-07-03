import React from "react";
import { Router, Route } from "react-router-dom";

import Header from "./Header.js";

import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";

import history from "../history";

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<Header />
				<div>
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" exact component={StreamCreate} />
					<Route
						path="/streams/show/:id"
						exact
						component={StreamShow}
					/>
					<Route
						path="/streams/edit/:id"
						exact
						component={StreamEdit}
					/>
					<Route
						path="/streams/delete"
						exact
						component={StreamDelete}
					/>
				</div>
			</Router>
		</div>
	);
};

export default App;
