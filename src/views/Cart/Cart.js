import React, { Component } from 'react';

import { VariableConsumer } from "../../AppEntry";
import { PanelHeader } from 'components';
import {Button} from 'reactstrap'

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
								return <div className="row content">
									<div className="span12">

										<div className="well well-small" style={{ display: 'table', width: '100%' }}>
											<h1>Check Out
												<small
													className="pull-right item-count">{chosenProducts.length + ' item(s) in the cart'}</small>
											</h1>
											<hr className="soften"/>

											<table className="table table-bordered table-condensed">
												<thead>
												<tr>
													<th>Product</th>
													<th>Name</th>
													<th>Avail.</th>
													<th>Unit price</th>
													<th>Qty</th>
													<th>Total</th>
												</tr>
												</thead>
												<tbody id="cart-table-body">
												{chosenProducts.map((prod) =>
													<tr key={prod._id}>
														<td><img width="100" src={prod.image} alt=""/></td>
														<td className="product-name">{prod.name}</td>
														<td>{prod.quantity}</td>
														<td>{prod.price} KN</td>
														<td>
															<input className="span1" style={{ maxWidth: 34 }} placeholder="1"
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
																	<span className="now-ui-icons ui-1_simple-remove"></span>
																</button>
															</div>
														</td>
														<td>{prod.price * prod.purchased} KN</td>
													</tr>
												)}
												<tr>
													<td colSpan="6" className="alignR totalInCart">Total products: <span></span></td>
												</tr>
												</tbody>
											</table>
											<br/>
											<Button disabled={chosenProducts.length === 0} href="/final"
															color="primary"
												 className="shopBtn btn-large pull-right">Next <span
												className="icon-arrow-right"></span></Button>
										</div>
									</div>
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
