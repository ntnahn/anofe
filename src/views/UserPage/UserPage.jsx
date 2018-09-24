import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "components";

import userBackground from "assets/img/bg5.jpg";
import userAvatar from "assets/img/mike.jpg";

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: 'Mikey',
      lastName: 'Ckron',
      ethAddress: '',
      knAddress: '',
    };
  }

  loadUserInfo() {
    // todo: call api to get user info and fill to form
  }

  onFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value
    })
  };
  onLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value
    })
  };
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

  updateProfile = () => {
    console.log('updateProfile', this.state);
    // todo: call api to update user function
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <form>
                    <FormInputs
                      ncols={["col-md-6 pr-1", "col-md-6 pl-1"]}
                      proprieties={[
                        {
                          label: "First Name",
                          inputProps: {
                            type: "text",
                            placeholder: "First Name",
                            onChange: this.onFirstNameChange
                          }
                        },
                        {
                          label: "Last Name",
                          inputProps: {
                            type: "text",
                            placeholder: "Last Name",
                            onChange: this.onLastNameChange
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
                            onChange: this.onKnAddressChange
                          }
                        }
                      ]}
                    />
                  </form>
                  <Col md={12} xs={12}>
                    <Button color="primary" onClick={this.updateProfile}>Update</Button>
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} xs={12}>
              <Card className="card-user">
                <div className="image">
                  <img src={userBackground} alt="..." />
                </div>
                <CardBody>
                  <CardAuthor
                    avatar={userAvatar}
                    avatarAlt="..."
                    title="Mike Andrew"
                    description="michael23"
                  />
                  <p className="description text-center">
                    "Lamborghini Mercy <br />
                    Your chick she so thirsty <br />
                    I'm in that two seat Lambo"
                  </p>
                </CardBody>
                <hr />
                <CardSocials
                  size="lg"
                  socials={[
                    {
                      icon: "fab fa-facebook-f",
                      href: "https://www.facebook.com/"
                    },
                    {
                      icon: "fab fa-twitter",
                      href: "https://www.facebook.com/"
                    },
                    {
                      icon: "fab fa-google-plus-g",
                      href: "https://plus.google.com/discover"
                    }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default UserPage;
