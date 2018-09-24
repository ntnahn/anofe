import Login from '../views/Account/Login';

export default function withAuthen(component) {

	const user = localStorage.getItem('user');
	return user ? component : Login
}
