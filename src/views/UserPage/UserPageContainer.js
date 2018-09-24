import React, { Component } from 'react';

import { VariableConsumer } from '../../AppEntry';

import UserPage from './UserPage';

class UserPageContainer extends Component {
	render() {
		return (
			<VariableConsumer>
				{(props) => <UserPage {...props} {...this.props}/>}
			</VariableConsumer>
		);
	}
}

export default UserPageContainer;
