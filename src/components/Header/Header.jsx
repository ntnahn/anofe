import React from "react";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
	Input
} from "reactstrap";

import { VariableConsumer } from '../../AppEntry';

import dashboardRoutes from "routes/dashboard.jsx";
import logo from "logo-white.svg";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			dropdownOpen: false,
			dropdownAccountOpen: false,
			color: "transparent"
		};
		this.toggle = this.toggle.bind(this);
		this.dropdownToggle = this.dropdownToggle.bind(this);
	}

	toggle() {
		if (this.state.isOpen) {
			this.setState({
				color: "transparent"
			});
		} else {
			this.setState({
				color: "white"
			});
		}
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	dropdownToggle(e) {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	dropdownAccountToggle(e) {
		this.setState({
			dropdownAccountOpen: !this.state.dropdownAccountOpen
		});
	}

	getBrand() {
		var name;
		dashboardRoutes.map((prop, key) => {
			if (prop.collapse) {
				prop.views.map((prop, key) => {
					if (prop.path === this.props.location.pathname) {
						name = prop.name;
					}
					return null;
				});
			} else {
				if (prop.redirect) {
					if (prop.path === this.props.location.pathname) {
						name = prop.name;
					}
				} else {
					if (prop.path === this.props.location.pathname) {
						name = prop.name;
					}
				}
			}
			return null;
		});
		return name;
	}

	openSidebar() {
		document.documentElement.classList.toggle("nav-open");
		this.refs.sidebarToggle.classList.toggle("toggled");
	}

	// function that adds color white/transparent to the navbar on resize (this is for the collapse)
	updateColor() {
		if (window.innerWidth < 993 && this.state.isOpen) {
			this.setState({
				color: "white"
			});
		} else {
			this.setState({
				color: "transparent"
			});
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateColor.bind(this));
	}

	componentDidUpdate(e) {
		if (
			window.innerWidth < 993 &&
			e.history.location.pathname !== e.location.pathname &&
			document.documentElement.className.indexOf("nav-open") !== -1
		) {
			document.documentElement.classList.toggle("nav-open");
			this.refs.sidebarToggle.classList.toggle("toggled");
		}
	}

	render() {
		return (
			// add or remove classes depending if we are on full-screen-maps page or not
			<Navbar
				color={
					this.props.location.pathname.indexOf("full-screen-maps") !== -1
						? "white"
						: this.state.color
				}
				expand="lg"
				className={
					this.props.location.pathname.indexOf("full-screen-maps") !== -1
						? "navbar-absolute fixed-top"
						: "navbar-absolute fixed-top " +
						(this.state.color === "transparent" ? "navbar-transparent " : "")
				}
			>
				<Container fluid>
					<div className="navbar-wrapper">
						<div className="navbar-toggle">
							<button
								type="button"
								ref="sidebarToggle"
								className="navbar-toggler"
								onClick={() => this.openSidebar()}
							>
								<span className="navbar-toggler-bar bar1"/>
								<span className="navbar-toggler-bar bar2"/>
								<span className="navbar-toggler-bar bar3"/>
							</button>
						</div>
						<NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
					</div>
					<NavbarToggler onClick={this.toggle}>
						<span className="navbar-toggler-bar navbar-kebab"/>
						<span className="navbar-toggler-bar navbar-kebab"/>
						<span className="navbar-toggler-bar navbar-kebab"/>
					</NavbarToggler>
					<div className="justify-content-start">
						<a
							href="https://github.com/ntnahn/anofe"
							className="simple-text logo-mini"
						>
							<div className="logo-img">
								<img src={logo} alt="react-logo" />
							</div>
						</a>
						<a
							href="/"
							className="simple-text logo-normal"
						>
							ANO Shop
						</a>
					</div>
					<Collapse
						isOpen={this.state.isOpen}
						navbar
						className="justify-content-end"
					>
						<form>
							<InputGroup className="no-border">
								<Input placeholder="Search..."/>
								<InputGroupAddon addonType="append">
									<InputGroupText>
										<i className="now-ui-icons ui-1_zoom-bold"/>
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</form>
						<Nav navbar>
							<NavItem>
								<Link to="/cart" className="nav-link">
									<i className="now-ui-icons shopping_bag-16"/>
									<span>10</span>
									<p>
										<span className="d-lg-none d-md-block">Cart</span>
									</p>
								</Link>
							</NavItem>
							<Dropdown
								isOpen={this.state.dropdownAccountOpen}
								toggle={e => this.dropdownAccountToggle(e)}
							>
								<DropdownToggle caret nav>
									<i className="now-ui-icons users_single-02"/>
									<p>
										<span className="d-lg-none d-md-block">Account</span>
									</p>
								</DropdownToggle>
								<DropdownMenu>
									<Link to="/login"><DropdownItem><span className="text-primary">Login</span></DropdownItem></Link>
									<DropdownItem>Logout</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<VariableConsumer>
								{(value)=>console.log(value)}
							</VariableConsumer>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

export default Header;
