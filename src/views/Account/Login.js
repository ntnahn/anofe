import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { PanelHeader } from 'components';
import { VariableConsumer } from "../../AppEntry";
import {callAPI} from "../../apiCaller";

class Login extends Component {
	state = {
		username: '',
		password: '',
		requesting: false
	};

	componentDidMount() {
		window.addEventListener('keyup', this.handleEnter)
		if ( localStorage.getItem('user') ) {
			this.props.history.push('/dashboard/product');
		}
	}

	handleEnter = (e) => {
		if (e.keyCode === 13) {
			this.onClickLogin()
		}
	};

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

	onClickLogin = (updateAlertMessage) => {
		this.setState({
			requesting: true
		}, () => {
      callAPI('/api/shop/login', 'post', {
      	name: this.state.username,
				password: this.state.password
			}).then(res => {
				if ( res && res.success ) {
					console.log(res.data);
					localStorage.setItem('user', JSON.stringify(res.data));
          setTimeout(() => {
            window.location.href = '/dashboard/product';
					}, 1000);
				} else {
					updateAlertMessage && updateAlertMessage('warning', 'Username or password is not correct');
          this.setState({requesting: false})
				}
			}).catch(error => {
				updateAlertMessage && updateAlertMessage('warning', 'Username or password is not correct');
        this.setState({requesting: false})
			});
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
										 padding: 5,
										 textAlign:'center'
									 }}/>
						<label htmlFor="password">Password</label>
						<input id="password"
									 type="password"
									 value={this.state.password}
									 onChange={this.onChangePassword}
									 style={{
										 margin: '10px 0',
										 borderRadius: 3,
										 outline: 'none',
										 border: '1px solid rgba(0,0,0,0.3)',
										 padding: 5,

										 textAlign:'center'
									 }}/>
						<VariableConsumer>
              {
                ({ updateAlertMessage }) => {
                  return <Button disabled={this.state.requesting} color="primary" onClick={()=>this.onClickLogin(updateAlertMessage)}
																style={{ width: '80%', margin: '15px auto' }}>Login</Button>
                }
              }
						</VariableConsumer>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
