import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "components";

import { callAPI } from "../../apiCaller";

import userBackground from "assets/img/bg5.jpg";
import userAvatar from "assets/img/mike.jpg";

class UserPage extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			shopId: '',
			shopName: '',
			address: '',
			password: '',
			ethAddress: '',
			knAddress: '',
			isNew: false,
		};
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.loadUserInfo();
			this.setState({
				isNew: false
			})
		} else {
			this.setState({
				isNew: true
			})
		}
	}

	loadUserInfo() {
		// todo: call api to get user info and fill to form
	}

	onChangeName = (e) => {
		this.setState({
			name: e.target.value
		})
	};
	// onLastNameChange = (e) => {
	//   this.setState({
	//     lastName: e.target.value
	//   })
	// };
	onEthAddressChange = (e) => {
		this.setState({
			ethAddress: e.target.value
		})
	};
	onKnAddressChange = (e) => {
		this.setState({
			knAddress: e.target.value
		})
	};

	onChangeShopName = (event) => {
		this.setState({
			shopName: event.target.value
		})
	};

	onChangePassword = (event) => {
		this.setState({
			password: event.target.value
		})
	};

	onChangeAddress = (event) => {
		this.setState({
			address: event.target.value
		})
	};

	updateProfile = () => {
		const str = this.state.isNew ? 'api/shop/create' : `api/shop/${this.state.shopId}`;
		callAPI(str, 'post', {
			name: this.state.name,
			password: this.state.isNew ? this.state.password : undefined,
			shop: this.state.shopName,
			address: this.state.address,
			wallet: this.state.knAddress,
			eth: this.state.ethAddress,
		}).then((res) => {
			if (res.success){

			}
		})
	};

	render() {
		return (
			<div>
				<PanelHeader size="sm"/>
				<div className="content">
					<Row>
						<Col md={12} xs={12}>
							<Card>
								<CardHeader>
									<h5 className="title">{this.state.isNew ? 'Create shop' : 'Edit Profile'}</h5>
								</CardHeader>
								<CardBody>
									<form>
										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "User Name",
													inputProps: {
														type: "text",
														placeholder: "Username",
														value: this.state.name,
														onChange: this.onChangeName
													}
												}
											]}
										/>

										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "Password",
													inputProps: {
														type: "password",
														placeholder: "Password",
														value: this.state.password,
														onChange: this.onChangePassword
													}
												}
											]}
										/>

										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "Shop name",
													inputProps: {
														type: "text",
														placeholder: "Shop name",
														value: this.state.shopName,
														onChange: this.onChangeShopName
													}
												}
											]}
										/>
										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "Shop address",
													inputProps: {
														type: "text",
														placeholder: "Shop address",
														value: this.state.address,
														onChange: this.onChangeAddress
													}
												}
											]}
										/>

										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "ETH Wallet Address",
													inputProps: {
														type: "text",
														placeholder: "Your ETH Wallet Address",
														value: this.state.ethAddress,
														onChange: this.onEthAddressChange
													}
												}
											]}
										/>
										<FormInputs
											ncols={["col-md-12"]}
											proprieties={[
												{
													label: "KN Wallet Address",
													inputProps: {
														type: "text",
														placeholder: "Your KN Wallet Address",
														value: this.state.knAddress,
														onChange: this.onKnAddressChange
													}
												}
											]}
										/>
									</form>
									<Col md={12} xs={12}>
										<Button color="primary"
														onClick={this.updateProfile}>{this.state.isNew ? 'Create' : 'Update'}</Button>
									</Col>
								</CardBody>
							</Card>
						</Col>
						{/*<Col md={4} xs={12}>*/}
						{/*<Card className="card-user">*/}
						{/*<div className="image">*/}
						{/*<img src={userBackground} alt="..." />*/}
						{/*</div>*/}
						{/*<CardBody>*/}
						{/*<CardAuthor*/}
						{/*avatar={userAvatar}*/}
						{/*avatarAlt="..."*/}
						{/*title="Mike Andrew"*/}
						{/*description="michael23"*/}
						{/*/>*/}
						{/*<p className="description text-center">*/}
						{/*"Lamborghini Mercy <br />*/}
						{/*Your chick she so thirsty <br />*/}
						{/*I'm in that two seat Lambo"*/}
						{/*</p>*/}
						{/*</CardBody>*/}
						{/*<hr />*/}
						{/*<CardSocials*/}
						{/*size="lg"*/}
						{/*socials={[*/}
						{/*{*/}
						{/*icon: "fab fa-facebook-f",*/}
						{/*href: "https://www.facebook.com/"*/}
						{/*},*/}
						{/*{*/}
						{/*icon: "fab fa-twitter",*/}
						{/*href: "https://www.facebook.com/"*/}
						{/*},*/}
						{/*{*/}
						{/*icon: "fab fa-google-plus-g",*/}
						{/*href: "https://plus.google.com/discover"*/}
						{/*}*/}
						{/*]}*/}
						{/*/>*/}
						{/*</Card>*/}
						{/*</Col>*/}
					</Row>
				</div>
			</div>
		);
	}
}

export default UserPage;
