import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import { PanelHeader } from "components";

// import icons from "variables/icons";
import {VariableConsumer} from '../../AppEntry'

const dummyData = [
	{
		_id: 5545,
		name: 'name1',
		image: require('assets/img/bg1.jpg'),
		price: 45,
		quantity: 12,
		shop: {
			name: 'shop1',
			address: 'sadsadqewqewqewqewq',
			wallet: '0x121465256465456'
		}
	},
	{
		_id: 123,
		name: 'name1',
		image: require('assets/img/bg1.jpg'),
		price: 45,
		quantity: 12,
		shop: {
			name: 'shop1',
			address: 'sadsadqewqewqewqewq',
			wallet: '0x121465256465456'
		}
	},
	{
		_id: 543545,
		name: 'name1',
		image: require('assets/img/bg1.jpg'),
		price: 45,
		quantity: 12,
		shop: {
			name: 'shop1',
			address: 'sadsadqewqewqewqewq',
			wallet: '0x121465256465456'
		}
	},
	{
		_id: 7687,
		name: 'name1',
		image: require('assets/img/bg1.jpg'),
		price: 45,
		quantity: 12,
		shop: {
			name: 'shop1',
			address: 'sadsadqewqewqewqewq',
			wallet: '0x121465256465456'
		}
	},
	{
		_id: 243223,
		name: 'name1',
		image: require('assets/img/bg1.jpg'),
		price: 45,
		quantity: 12,
		shop: {
			name: 'shop1',
			address: 'sadsadqewqewqewqewq',
			wallet: '0x121465256465456'
		}
	}
];

class Shop extends React.Component {

	render() {
		return (
			<div>
				<PanelHeader size="sm"/>
				<div className="content container">
					<Row>
						<Col md={12}>
							<Card>
								<CardHeader>
									<h5 className="title">Items</h5>
									<p className="category">
									</p>
								</CardHeader>
								<CardBody className="all-icons">
									<Row>
										{dummyData.map((data, key) => {
											return (
												<Col
													lg={4}
													md={6}
													sm={6}
													xs={6}
													className="font-icon-list"
													key={key}
												>
													<div className="font-icon-detail" style={{ padding: 5 }}>
														<div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
															<div>
																<img src={data.image} alt="Product sell"/>
															</div>
															<div className="info" style={{ marginTop: 5 }}>
																<div style={{ fontSize: 20, marginTop: 5 }}><strong>{data.name}</strong></div>
																<div style={{ fontSize: 14, marginTop: 5, textAlign: 'right' }}>From
																	: {data.shop.name}</div>
																<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
																	<span>Price: <strong>{data.price}</strong> KN</span>
																	<span>Quantity: {data.quantity}</span>
																</div>
																<div style={{ marginTop: 5 }}>
																	<VariableConsumer>
																		{({updateChosenProducts}) => <Button color="primary"
																																			 onClick={() => updateChosenProducts('add',data)}>Add to cart</Button>}
																	</VariableConsumer>
																</div>
															</div>
														</div>
													</div>
												</Col>
											);
										})}
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Shop;
