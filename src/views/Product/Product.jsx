import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button
} from "reactstrap";
// react plugin used to create charts
// function that returns a color based on an interval of numbers

import { PanelHeader } from "components";

import { thead, tbody } from "variables/general";
import { Link } from "react-router-dom";
import {callAPI} from "../../apiCaller";

const dummyHeadData = [
  'Thumbnail',
  'Name',
  'Type',
  'Price',
  'Quantity',
  'Actions'
];

const dummyBodyData = [
  {
    _id: 'efygyuehjfuegfuwefw',
    thumb: require('assets/img/product00.jpg'),
    name: 'adu',
    price: '100'
  },
  {
    _id: 'eufguyefbweugfuwefw',
    thumb: require('assets/img/product00.jpg'),
    name: 'bdu',
    price: '100'
  },
  {
    _id: 'wefiheuhweifhwieuhf',
    thumb: require('assets/img/product00.jpg'),
    name: 'new pro',
    price: '100'
  }
];

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
      message: ''
    };
  }
  handleRemoveProduct = (item) => {
    console.log('remove product', item);
  };

  loadProducts() {
    const shop = JSON.parse(localStorage.getItem('user'))._id;
    callAPI('/api/product/'+shop, 'get').then(res => {
      console.log('res', res);
      if ( res.success ) {
        this.setState({
          products: res.data
        })
      }
      this.setState({loading: false});
    }).catch(error => {
      this.setState({loading: false});
    });
  }

  componentDidMount() {
    this.loadProducts();
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" className="float-left">Products list</CardTitle>
                  <Link to="/dashboard/product-add">
                    <Button className="float-right">
                      <i className="now-ui-icons ui-1_simple-add" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      {dummyHeadData.map((prop, key) => {
                        if (key === dummyHeadData.length - 1)
                          return (
                            <th key={key} className="text-center">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <a href={`product-edit/${item._id}`}><img width="80px" height="80px" src={item.image} alt="Product thumb" /></a>
                          </td>
                          <td><a href={`product-edit/${item._id}`}>{item.name}</a></td>
                          <td>
                            {item.type}
                          </td>
                          <td>
                            {item.price} $
                          </td>
                          <td>
                            {item.quantity}
                          </td>
                          <td className="text-center">
                            <a href={`product-edit/${item._id}`} style={{marginRight: '10px'}} id={`product-${item._id}`}>
                              <i className="now-ui-icons ui-1_settings-gear-63"/>
                            </a>
                            <a href="javasript:void(0)" onClick={this.handleRemoveProduct.bind(this, item)}>
                              <i className="now-ui-icons ui-1_simple-remove"/>
                            </a>
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
      </div>
    );
  }
}

export default Product;
