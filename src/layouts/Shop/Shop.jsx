import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header, Footer } from "components";

import userRoutes from "routes/user.jsx";
import { Alert } from "reactstrap";
import { VariableConsumer } from "../../AppEntry";

var ps;

class Shop extends React.Component {
	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps = new PerfectScrollbar(this.refs.mainPanel);
			document.body.classList.toggle("perfect-scrollbar-on");
		}
	}

	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.body.classList.toggle("perfect-scrollbar-on");
		}
	}

	componentDidUpdate(e) {
		if (e.history.action === "PUSH") {
			this.refs.mainPanel.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
		}
	}

	render() {
		console.log('userRoutes', userRoutes);
		return (
			<div className="wrapper">
				<div className="main-panel" ref="mainPanel" style={{ width: '100%', position: 'relative' }}>
					<Header {...this.props} />
					<Switch>
						{userRoutes.map((prop, key) => {
							if (prop.redirect)
								return <Redirect from={prop.path} to={prop.pathTo} key={key}/>;
							return (
								<Route path={prop.path} component={prop.component} key={key}/>
							);
						})}
					</Switch>
					<VariableConsumer>
						{({ alertMessage, alertType }) => <Alert color={alertType}
																										 isOpen={Boolean(alertMessage)}>{alertMessage}</Alert>}
					</VariableConsumer>
					<Footer fluid/>
				</div>
			</div>
		);
	}
}

export default Shop;
