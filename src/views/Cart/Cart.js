import React, { Component } from 'react';

import { VariableConsumer } from "../../AppEntry";
import { PanelHeader } from 'components';
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Table,
	Row,
	Col,
	Button
} from "reactstrap";
import { thead, tbody } from "variables/general";
import knowjs from 'know-js';
import Web3 from 'web3';
import axios from 'axios'

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			paymentMethod: [
				{ name: 'KN Pay', id: 'kn' },
				{ name: 'ETH Pay', id: 'eth' },
			],
			selectedMethod: 'kn',
			requesting: false
		};
	}

	renderItems(chosenProducts, updateChosenProducts, total) {
		return <Card>
			<CardHeader>
				<CardTitle tag="h4" className="float-left">Checkout</CardTitle>
				<CardTitle tag="h4" className="float-right">{chosenProducts.length + ' item(s) in the cart'}</CardTitle>
			</CardHeader>
			<CardBody>
				<Table responsive>
					<thead className="text-primary">
					<tr>
						<th>Product</th>
						<th>Name</th>
						<th>Avail.</th>
						<th>Unit price</th>
						<th>Qty</th>
						<th>Total</th>
					</tr>
					</thead>
					<tbody>
					{chosenProducts.map((prod) =>
						<tr key={prod._id}>
							<td><img width="100" src={prod.image} alt=""/></td>
							<td className="product-name">{prod.name}</td>
							<td>{prod.quantity}</td>
							<td>{prod.price} KN</td>
							<td>
								<button type="button" className="cart-quality-change-btn-left"
												onClick={() => updateChosenProducts('subtract', prod)}>
									-
								</button>
								<input className="span1 cart-quality-change-input" style={{ maxWidth: 32 }} placeholder="1"
											 id="appendedInputButtons"
											 size="16" type="text" value={prod.purchased} readOnly/>
								<button type="button" className="cart-quality-change-btn-right"
												onClick={() => updateChosenProducts('add', prod)}>
									+
								</button>
							</td>
							<td>{prod.price * prod.purchased} KN</td>
							<td>
								<button className="btn btn-mini btn-danger" type="button"
												onClick={() => updateChosenProducts('delete', prod)}>
									<span className="now-ui-icons ui-1_simple-remove"/>
								</button>
							</td>
						</tr>
					)}
					</tbody>
				</Table>
				<CardTitle tag="h4" className="float-left">Total: {total} KN</CardTitle>
				<Button disabled={chosenProducts.length === 0}
								color="primary"
								className="shopBtn btn-large pull-right"
								onClick={() => {
									this.setState({ step: 1 });
								}}
				>Next</Button>
			</CardBody>
		</Card>
	}

	handleChoosePaymentMethod = (method) => {
		this.setState({ selectedMethod: method.id });
	};

	renderPayment(chosenProducts, total) {
		return <Card>
			<CardHeader>
				<CardTitle tag="h4" className="float-left">Choose payment method</CardTitle>
				<CardTitle tag="h4" className="float-right">{chosenProducts.length + ' item(s) in the cart'}</CardTitle>
			</CardHeader>
			<CardBody style={{ marginTop: '50px' }}>
				{
					this.state.paymentMethod.map((method, index) => {
						return <div key={index}
												className={`payment-method ${method.id === this.state.selectedMethod ? 'selected-method' : ''}`}
												onClick={this.handleChoosePaymentMethod.bind(this, method)}
						>
							<span>{method.name}</span>
						</div>
					})
				}
				<CardTitle tag="h4" className="float-left">Total: {total} KN</CardTitle>
				<Button disabled={chosenProducts.length === 0}
								onClick={() => this.setState(prevState => ({ step: prevState.step + 1 }))}
								color="primary"
								className="shopBtn btn-large pull-right">Process</Button>
			</CardBody>
		</Card>
	}

	renderProcessPayment = (chosenProducts, total, updateAlertMessage, updateChosenProducts) => {
		return <div className="row">
			<table className="table table-bordered">
				<tbody>
				<tr>
					<td className="cart-detail">
						<h3>
							You have:
							<strong style={{ color: 'red' }}>
								{chosenProducts.length} item(s) with a total of {total} KN
							</strong>
						</h3>
					</td>
				</tr>

				</tbody>
			</table>
			<table className="table table-bordered">
				<tbody>
				<tr>
					<td>
						{this.state.selectedMethod === 'kn' &&
						<form className="form-inline">
							<label style={{ minWidth: 159 }}> Your phrase: </label>
							<input type="text" className="input-large"
										 id="input-passphrase"
										 style={{ width: '50%', minWidth: 400 }}
										 placeholder="Your Passphrase"
										 ref={(node) => this.passphraseInput = node}
							/>
						</form>
						}
						<Button color="primary"
										onClick={() => this.transfer(chosenProducts, total, updateAlertMessage, updateChosenProducts)}
										className="shopBtn btn-large pull-right"
										disabled={this.state.requesting}
						>
							{this.state.selectedMethod === 'kn' ? 'Pay with KN' : 'Pay with Etherium'}
							<span className="icon-arrow-right"></span>
						</Button>

					</td>
				</tr>

				</tbody>
			</table>
		</div>
	};

	async getFromNode(url) {
		try {
			const response = await axios.get(url)
			return response.data
		} catch (err) {
			return err.response.data
		}
	}

	async postTransaction(transaction, updateAlertMessage, total, group) {
		try {
			let senderAddress = knowjs.crypto.getAddress(transaction.senderPublicKey)
			let data = await this.getFromNode('http://35.200.156.138:4003/api/v1/accounts?address=' + senderAddress)

			if (data.success) {
				let senderAccount = data;
				if (senderAccount.account.balance <= total) {
					updateAlertMessage('danger', 'Not enough money');

				} else {
					let data;
					try {
						let response = await axios.post('http://35.200.156.138:4003/api/v2/transactions', {
							transactions: Array.isArray(transaction) ? transaction : [transaction]
						});
						data = response.data
					} catch (err) {
						updateAlertMessage('danger', err);
						data = err.response.data
					}
					if (data && data.data && data.data.accept.length) {
						let tx = data.data.accept[0];
						return {
							senderId: senderAccount.account.address,
							recipientId: transaction.recipientId,
							sha256: tx,
							metadata: {
								amount: transaction.amount,
								fee: transaction.fee,
								shopName: group[0].shop.name,
								arraySold: group,
								time: Date.now()
							}
						}
					} else {
						throw new Error('error')
					}
				}
			} else {

				throw new Error('error')
			}
		} catch (error) {

			return null
		}
	}

	async payByEth(grouped, total, updateAlertMessage, updateChosenProducts) {
		if (typeof window.web3 !== 'undefined') {
			if (window.web3.currentProvider && window.web3.currentProvider.isMetaMask === false) {
				updateAlertMessage('danger', 'Please intall metamask')
				return
			}
		} else {
			updateAlertMessage('danger', 'Web3 not available')
			return
		}
		// if (window.web3.currentProvider.publicConfigStore._state.networkVersion === "1") {
		if (typeof window.web3.eth.defaultAccount !== 'undefined') {
			let web3 = new Web3(window.web3.currentProvider);
			web3.eth.sendTransaction({
				from: window.web3.eth.defaultAccount,
				to: this.state.ethAddress,
				value: window.web3.toWei((total / 10000).toString())
			}).then((res) => {
				updateAlertMessage('danger', res.state ? 'Successful' : 'Failed');
			})
		} else {
			updateAlertMessage('danger', 'You have not log in metamask. Please log in metamask');
		}
		// } else {
		// 	this.setState({
		// 		sendEthErr: 'Please choose main ETH as your default Provider'
		// 	})
		// }
	}

	async transfer(chosenProducts, total, updateAlertMessage, updateChosenProducts) {

		if (chosenProducts.length === 0) {
			updateAlertMessage('danger', 'No chosen item');
			return
		}

		let senderPassphrase = this.state.selectedMethod === 'kn' ? this.passphraseInput.value : '';
		if (!senderPassphrase && this.state.selectedMethod === 'kn') {
			updateAlertMessage('danger', 'Please enter your passphrase');
			return
		}

		let grouped = {};

		chosenProducts.forEach((item) => {
			if (Array.isArray(grouped[item.shop.wallet])) {
				grouped[item.shop.wallet].push(item);
			} else {
				grouped[item.shop.wallet] = [];
				grouped[item.shop.wallet].push(item);
			}
		});
		this.setState({
			requesting: true
		});
		if (this.state.selectedMethod !== 'kn') {
			await this.payByEth(grouped, total, updateAlertMessage, updateChosenProducts)
			this.setState({
				requesting: false
			})
			return;
		}

		const t = Object.keys(grouped).map(async groupKey => {

			let price = 0;
			grouped[groupKey].forEach((e) => {
				price += e.purchased * parseFloat(e.price);
			});

			let knowAmount = price * 100000000;
			let transaction = knowjs.transaction.createTransaction(groupKey, knowAmount, null, senderPassphrase)
			try {
				let data = await this.postTransaction(transaction, updateAlertMessage, knowAmount, grouped[groupKey]);
				if (!data) return;
				await axios.post('http://35.189.40.93:5000/api/v1/kdsp', data);
				updateChosenProducts('removeAll');
			} catch (error) {
				console.log(error)
			}
		});
		await Promise.all(t);
		this.setState({
			requesting: false
		})
		updateAlertMessage('success', 'Transaction success')
	}

	render() {
		return (
			<div>
				<PanelHeader size="sm"/>
				<div style={{ marginTop: 30 }}>
					<VariableConsumer>
						{
							({ chosenProducts, updateChosenProducts, updateAlertMessage }) => {
								let total = 0;
								chosenProducts.forEach((e) => {
									total = total + e.purchased * parseFloat(e.price)
								});
								return <div className="content container" style={{ marginTop: '10px' }}>
									<Row>
										<Col xs={12}>
											{
												this.state.step === 0 ?
													this.renderItems(chosenProducts, updateChosenProducts, total) :
													this.state.step === 1 ? this.renderPayment(chosenProducts, total) :
														this.renderProcessPayment(chosenProducts, total, updateAlertMessage, updateChosenProducts)
											}
										</Col>
									</Row>
								</div>
							}
						}
					</VariableConsumer>
				</div>
			</div>
		);
	}
}

export default Cart;
