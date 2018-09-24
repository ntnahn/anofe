import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import { PanelHeader, FormInputs } from "components";

import thumb from "assets/img/product00.jpg";

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

class ProductEdit extends React.Component {
  constructor(props) {
    super(props);
    const productId = this.productId = props.match.params.id;
    this.state = {
      _id: productId,
      productName: '',
      productPrice: '',
      productDesc: '',
      productThumb: thumb
    };
  }

  componentDidMount() {
    this.getProductDetail();
  }

  getProductDetail() {
    // Todo: Call api to get product info
    console.log('this.productId', this.productId);
  }

  updateProduct = () => {
    console.log('this.state', this.state);
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleNameChange = (e) => {
    this.setState({productName: e.target.value});
  };

  handlePriceChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    this.setState({productPrice: value});
  };

  handleDescChange = (e) => {
    this.setState({productDesc: e.target.value});
  };

  handleUpdateThumbnail = () => {
    this.fileUpload.click();
  };

  handleFileChange = (e) => {
    encodeImageFileAsURL(e.target).then(result => {
      console.log(result);
      this.setState({productThumb: result});
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
                  <h5 className="title">Edit Product</h5>
                </CardHeader>
                <CardBody>
                  <input type="file" multiple={false}
                         ref={node => this.fileUpload = node}
                         onChange={this.handleFileChange}
                         className="d-none"/>
                  <img src={this.state.productThumb} alt="Product thumb"
                       onClick={this.handleUpdateThumbnail}
                       style={{width: '80px', height: '80px', cursor: 'pointer'}}/>
                  <form>
                    <FormInputs
                      ncols={[
                        "col-md-6 pr-1",
                        "col-md-6 px-1"
                      ]}
                      proprieties={[
                        {
                          label: "Name",
                          inputProps: {
                            onChange: this.handleNameChange,
                            type: "text",
                            placeholder: "Enter your product name here"
                          }
                        },
                        {
                          label: "Price",
                          inputProps: {
                            onChange: this.handlePriceChange,
                            value: this.state.productPrice,
                            placeholder: "Enter your product price here"
                          }
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Description",
                          inputProps: {
                            onChange: this.handleDescChange,
                            type: "textarea",
                            rows: "4",
                            cols: "80",
                            placeholder: "Enter your product description here"
                          }
                        }
                      ]}
                    />
                  </form>
                  <Col md={12} xs={12}>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button color="primary" onClick={this.updateProduct}>Update</Button>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProductEdit;
