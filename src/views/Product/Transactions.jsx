import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
// react plugin used to create charts
// function that returns a color based on an interval of numbers

import { PanelHeader } from "components";

import { thead, tbody } from "variables/general";
import { Link } from "react-router-dom";
import {callAPI} from "../../apiCaller";

const dummyHeadData = [
  'ID',
  'Timestamp',
  'Sender',
  'Recipient',
  'Amount',
  'Fee'
];

class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      loading: true,
      message: '',
      modal: false,
      transaction: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(transaction) {
    this.setState({
      modal: !this.state.modal,
      transaction: transaction
    });
  }

  handleRemoveProduct = (item) => {
    console.log('remove product', item);
  };

  loadTransactions() {
    callAPI('http://35.189.40.93:5000/api/v1/kdsp', 'get').then(res => {
      if ( res.statusCode === 200 ) {
        this.setState({
          transactions: res.data
        })
      }
      this.setState({loading: false});
    }).catch(error => {
      this.setState({loading: false});
    });
  }

  componentDidMount() {
    this.loadTransactions();
  }

  getShortText(text, numberText) {
    const textLength = text.length;
    return text.slice(0, numberText) + '...' + text.slice(textLength - numberText, textLength);
  }

  render() {
    const { transaction } = this.state;
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="float-left">Transactions</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      {dummyHeadData.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.transactions.map((item, key) => {
                      const metadata = item.metadata;
                      return (
                        <tr key={key} onClick={this.toggle.bind(this, item)} style={{cursor: 'pointer'}}>
                          <td>
                            {this.getShortText(item._id, 5)}
                          </td>
                          <td>
                            {(new Date(metadata.time)).toLocaleString()}
                          </td>
                          <td>
                            {this.getShortText(item.senderId, 5)}
                          </td>
                          <td>
                            {this.getShortText(item.recipientId, 5)}
                          </td>
                          <td>
                            {metadata.amount}
                          </td>
                          <td>
                            {metadata.fee}
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Transaction detail</ModalHeader>
          <ModalBody>
            {
              transaction && transaction.metadata && <div>
                <Table responsive>
                  <tbody>
                  <tr>
                    <td>ID</td>
                    <td>{transaction._id}</td>
                  </tr>
                  <tr>
                    <td>Timestamp</td>
                    <td>{(new Date(transaction.metadata.time)).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Sender</td>
                    <td>{transaction.senderId}</td>
                  </tr>
                  <tr>
                    <td>Recipient</td>
                    <td>{transaction.recipientId}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>{transaction.metadata.amount}</td>
                  </tr>
                  <tr>
                    <td>Fee</td>
                    <td>{transaction.metadata.fee}</td>
                  </tr>
                  <tr>
                    <td>Shop name</td>
                    <td>{transaction.metadata.shopName}</td>
                  </tr>
                  </tbody>
                </Table>
                {
                  transaction.metadata.arraySold && <div>
                    <h2>Product sold</h2>
                    <Table responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Thumb</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Type</th>
                      </tr>
                      </thead>
                      <tbody>
                      {transaction.metadata.arraySold.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {this.getShortText(item._id, 5)}
                            </td>
                            <td>
                              <img src={item.image} width={80} height={80}/>
                            </td>
                            <td>
                              {item.name}
                            </td>
                            <td>
                              {item.price}
                            </td>
                            <td>
                              {item.quantity}
                            </td>
                            <td>
                              {item.type}
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </Table>
                  </div>
                }
              </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Transactions;
