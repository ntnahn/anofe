import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// import "assets/css/bootstrap-reponsive.css";
// import "assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.css";
import "assets/css/demo.css";
// import "assets/css/bootstrap.css";

import indexRoutes from "routes/index.jsx";

import AppEntry from './AppEntry';

const hist = createBrowserHistory();

ReactDOM.render(
	<AppEntry>
		<Router history={hist}>
			<Switch>
				{indexRoutes.map((prop, key) => {
					return <Route path={prop.path} key={key} component={prop.component}/>;
				})}
			</Switch>
		</Router>
	</AppEntry>,
	document.getElementById("root")
);
