import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

import { PanelHeader, FormInputs } from "components";

import thumb from "assets/img/product00.jpg";

import {callAPI} from "../../apiCaller";

function encodeImageFileAsURL(element) {
  return new Promise(resolve => {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  })
}

class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      type: 'know',
      image: thumb,
      quantity: 0,
      requesting: false
    };
  }

  addProduct = () => {
    this.setState({requesting: true}, () => {
      callAPI('/api/product/create', 'post', {
        ...this.state,
        shop: localStorage.getItem('token')
      }).then(res => {
        if ( res.success ) {
          alert('Add product success');
        } else {
          alert('Add product failed');
        }
        this.setState({requesting: false});
      }).catch(error => {
        console.log('Add product error', error);
        alert('Add product failed');
        this.setState({requesting: false});
      });
    });
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  };

  handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.setState({price: value});
  };

  handleQuantityChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.setState({quantity: value});
  };

  handleTypeChange = (e) => {
    this.setState({type: e.target.value});
  };

  handleUpdateThumbnail = () => {
    this.fileUpload.click();
  };

  handleFileChange = (e) => {
    encodeImageFileAsURL(e.target).then(result => {
      console.log(result);
      this.setState({image: result});
    });
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Add new product</h5>
                </CardHeader>
                <CardBody>
                  <input type="file" multiple={false}
                         ref={node => this.fileUpload = node}
                         onChange={this.handleFileChange}
                         className="d-none"/>
                  <img src={this.state.image} alt="Product thumb"
                       onClick={this.handleUpdateThumbnail}
                       style={{width: '80px', height: '80px', cursor: 'pointer'}}/>
                  <form>
                    <FormInputs
                      ncols={[
                        "col-md-12 pr-1"
                      ]}
                      proprieties={[
                        {
                          label: "Name",
                          inputProps: {
                            onChange: this.handleNameChange,
                            type: "text",
                            placeholder: "Enter your product name here"
                          }
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={[
                        "col-md-6 pr-1",
                        "col-md-6 px-1",
                      ]}
                      proprieties={[
                        {
                          label: "Price",
                          inputProps: {
                            onChange: this.handlePriceChange,
                            value: this.state.price,
                            placeholder: "Enter your product price here"
                          }
                        },
                        {
                          label: "Quantity",
                          inputProps: {
                            onChange: this.handleQuantityChange,
                            value: this.state.quantity,
                            placeholder: "Enter your product quantity here"
                          }
                        }
                      ]}
                    />
                    <FormGroup>
                      <Label for="exampleSelect">Select type</Label>
                      <Input type="select" name="select" id="exampleSelect" onChange={this.handleTypeChange}
                      style={{height: '32px'}}>
                        <option value="know">Know</option>
                        <option value="eth">ETH</option>
                      </Input>
                    </FormGroup>
                  </form>
                  <Row>
                    <Col md={12} xs={12}>
                      <Button disabled={this.state.requesting} onClick={this.handleCancel}>Cancel</Button>
                      <Button disabled={this.state.requesting} color="primary" onClick={this.addProduct}>Add product</Button>
                    </Col>
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

export default ProductAdd;
