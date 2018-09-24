import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="https://github.com/ntnahn/anofe">ANO Team</a>
              </li>
              <li>
                <a href="https://github.com/ntnahn/anofe">About Us</a>
              </li>
              <li>
                <a href="https://github.com/ntnahn/anofe">Blog</a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
