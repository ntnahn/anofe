import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { PanelHeader } from 'components';

class Login extends Component {
	state = {
		username: '',
		password: '',
		requesting: false
	};

	componentDidMount() {
		window.addEventListener('keyup', this.handleEnter)
	}

	handleEnter = (e) => {
		console.log(e.keyCode);
		if (e.keyCode === 13) {
			this.onClickLogin()
		}
	}

	componentWillUnmount() {
		window.removeEventListener('keyup', this.handleEnter)
	}

	onChangeUsername = (event) => {
		this.setState({
			username: event.target.value
		})
	};

	onChangePassword = (event) => {
		this.setState({
			password: event.target.value
		})
	};

	onClickLogin = () => {
		this.setState({
			requesting: true
		}, () => {
      this.props.history.push('/dashboard');
		})
	};

	render() {
		return (
			<div style={{ textAlign: 'center', background: 'white', height: 'calc(100vh - 70px)' }}>
				<PanelHeader size="sm"/>
				<div style={{ marginTop: 20 }}>
					<h3 style={{ marginBottom: 5 }}>Login as shop</h3>
					<form style={{ maxWidth: 400, padding: 20, margin: '0px auto', display: 'flex', flexDirection: 'column' }}>
						<label htmlFor="username">Username</label>
						<input id="username"
									 value={this.state.username}
									 onChange={this.onChangeUsername}
									 style={{
										 margin: '10px 0',
										 borderRadius: 3,
										 outline: 'none',
										 border: '1px solid rgba(0,0,0,0.3)',
										 padding: 5
									 }}/>
						<label htmlFor="password">Password</label>
						<input id="password"
									 value={this.state.password}
									 onChange={this.onChangePassword}
									 style={{
										 margin: '10px 0',
										 borderRadius: 3,
										 outline: 'none',
										 border: '1px solid rgba(0,0,0,0.3)',
										 padding: 5
									 }}/>
						<Button color="primary" onClick={this.onClickLogin}
										style={{ width: '80%', margin: '15px auto' }}>Login</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
