import Login from '../views/Account/Login';

export default function withAuthen(component) {

	const token = localStorage.getItem('token');
	return token ? component : Login
}
