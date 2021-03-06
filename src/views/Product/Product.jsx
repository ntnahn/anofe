import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";
// react plugin used to create charts
// function that returns a color based on an interval of numbers

import { PanelHeader } from "components";

import { thead, tbody } from "variables/general";

const dummyHeadData = [
  'Thumbnail',
  'Name',
  'Price',
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
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Products list</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                    <tr>
                      {dummyHeadData.map((prop, key) => {
                        if (key === thead.length - 1)
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
                    {dummyBodyData.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <a href={`product-edit/${item._id}`}><img width="80px" height="80px" src={item.thumb} alt="Product thumb" /></a>
                          </td>
                          <td><a href={`product-edit/${item._id}`}>{item.name}</a></td>
                          <td>
                            {item.price} $
                          </td>
                          <td className="text-center">
                            <a href={`product-edit/${item._id}`}>
                              <i className="now-ui-icons ui-1_settings-gear-63"/>
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
