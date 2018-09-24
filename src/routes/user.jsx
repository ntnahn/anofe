import Shop from "views/Shop/Shop.jsx";
import withAuthen from '../authentication/authen';
import Login from 'views/Account/Login';
import Cart from 'views/Cart/Cart';
import UserPage from 'views/UserPage/UserPage'
import { withConsumer } from "../AppEntry";
import UserPageContainer from "../views/UserPage/UserPageContainer";

var dashRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "objects_spaceship",
    component: Login
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "objects_spaceship",
    component: Cart
  },
	{
		path: "/create-shop",
		name: "Create your shop",
		icon: "objects_spaceship",
		component: UserPageContainer
	},
  {
    path: "/",
    name: "Shop",
    icon: "objects_spaceship",
    component: Shop
  },

];
export default dashRoutes;
