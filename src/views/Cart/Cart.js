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

class Cart extends Component {
	render() {
		return (
			<div>
				<PanelHeader size="sm"/>
				<div style={{marginTop:30}}>
					<VariableConsumer>
						{
							({ chosenProducts, updateChosenProducts }) => {
								let total = 0;
								chosenProducts.forEach((e) => {
									total = total + e.purchased * parseFloat(e.price)
								});
								return <div className="content container" style={{marginTop: '10px'}}>
									<Row>
										<Col xs={12}>
											<Card>
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
																		<input className="span1" style={{ maxWidth: 120 }} placeholder="1"
																					 id="appendedInputButtons"
																					 size="16" type="text" value={prod.purchased} readOnly/>
																		<div className="input-append" style={{ marginLeft: 2 }}>
																			<button className="btn btn-mini" type="button"
																							onClick={() => updateChosenProducts('subtract', prod)}
																			>
																				-
																			</button>
																			<button className="btn btn-mini" type="button"
																							onClick={() => updateChosenProducts('add', prod)}
																			>
																				+
																			</button>
																			<button className="btn btn-mini btn-danger" type="button"
																							onClick={() => updateChosenProducts('delete', prod)}>
																				<span className="now-ui-icons ui-1_simple-remove"/>
																			</button>
																		</div>
																	</td>
																	<td>{prod.price * prod.purchased} KN</td>
																</tr>
															)}
														</tbody>
													</Table>
													<CardTitle tag="h4" className="float-left">Total: 10</CardTitle>
													<Button disabled={chosenProducts.length === 0} href="/final"
																	color="primary"
																	className="shopBtn btn-large pull-right">Next</Button>
												</CardBody>
											</Card>
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
