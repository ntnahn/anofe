import React, { Component } from 'react';


const VariableContext = React.createContext();
export const VariableConsumer = VariableContext.Consumer;

export const withConsumer = (component)=> <VariableConsumer>{(props)=><component {...props} />}</VariableConsumer>


class AppEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {},
			chosenProducts: [],
			updateChosenProducts: this.updateChosenProducts,
			updateUserInfo: this.updateUserInfo,
			alertMessage: '',
			alertType: 'success',
			updateAlertMessage: this.updateAlertMessage,
			onLogout : this.onLogout
		};
		this.timeoutIns = null;
	}

	componentDidMount() {
		if (localStorage.getItem('cart')) {
			const listItem = localStorage.getItem('cart');
			try {
				this.setState({
					chosenProducts: JSON.parse(listItem)
				})
			} catch (err) {
				console.log('err parsing cart', err)
			}
		}
		// setTimeout(() => this.setState({ alertMessage: 'hahahah' }), 3000)
	}

	onLogout = ()=>{
		localStorage.removeItem('token');
		window.location.href='/';
	};

	updateAlertMessage = (type, message) => {
		this.setState({
			alertMessage: message,
			alertType: type
		},()=>{
			this.timeoutIns = setTimeout(()=>this.setState({
				alertMessage: '',
				alertType: 'success'
			}),4000)
		})
	};

	updateChosenProducts = (type = 'add', item) => {
		if (type === 'add') {
			const itemIndex = this.state.chosenProducts.findIndex((prod) => prod._id === item._id);
			if (itemIndex === -1) {
				this.setState(prevState => ({
					chosenProducts: [...prevState.chosenProducts, {...item, purchased:1 }]
				}), () => this.updateLocalStorage())
				this.updateAlertMessage('success',`Added ${item.name} to cart`);
			} else {
				const temp = [...this.state.chosenProducts];
				temp[itemIndex].purchased = temp[itemIndex].purchased + 1;
				this.setState({
					chosenProducts: temp
				}, () => this.updateLocalStorage())
				this.updateAlertMessage('success',`Increase ${item.name} purchased by 1`);
			}
		} else if (type === 'subtract') {
			const itemIndex = this.state.chosenProducts.findIndex((prod) => prod._id === item._id);
			if (itemIndex !== -1) {
				const temp = [...this.state.chosenProducts];
				let message;
				if (temp[itemIndex].purchased === 1){
					temp.splice(itemIndex, 1);
					message = `Removed ${item.name} from cart`
				} else {
					temp[itemIndex].purchased = temp[itemIndex].purchased - 1;
					message = `Decrease ${item.name} purchased by 1`
				}

				this.setState({
					chosenProducts: temp
				}, () => this.updateLocalStorage())
				this.updateAlertMessage('success',message);
			}
		} else if (type === 'delete') {
			const itemIndex = this.state.chosenProducts.findIndex((prod) => prod._id === item._id);
			if (itemIndex !== -1) {
				const temp = [...this.state.chosenProducts];
				temp.splice(itemIndex, 1);
				console.log(temp)
				this.setState({
					chosenProducts: temp
				}, () => this.updateLocalStorage())
				this.updateAlertMessage('success',`Removed ${item.name} from cart`);
			}
		}
	};

	updateLocalStorage = () => {
		if (this.timeoutIns) clearTimeout(this.timeoutIns);
		localStorage.setItem('cart', JSON.stringify(this.state.chosenProducts));
	};

	updateUserInfo = (info) => {
		this.setState({
			userInfo: info
		})
	};

	render() {
		return (
			<VariableContext.Provider value={this.state}>
				{this.props.children}
			</VariableContext.Provider>
		);
	}
}

export default AppEntry;
