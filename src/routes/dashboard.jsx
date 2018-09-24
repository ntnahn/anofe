import Dashboard from "views/Dashboard/Dashboard.jsx";
import Notifications from "views/Notifications/Notifications.jsx";
import Icons from "views/Icons/Icons.jsx";
import Typography from "views/Typography/Typography.jsx";
import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
// import Upgrade from "views/Upgrade/Upgrade.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import withAuthen from '../authentication/authen';
import Login from '../views/Account/Login';
import Cart from '../views/Cart/Cart';

var dashRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "design_app",
		component: Dashboard
	},
	{ path: "/shop", name: "Shop", icon: "design_image", component: Icons },
	{ path: "/maps", name: "Maps", icon: "location_map-big", component: Maps },
	{
		path: "/notifications",
		name: "Notifications",
		icon: "ui-1_bell-53",
		component: Notifications
	},
	{
		path: "/user-page",
		name: "User Profile",
		icon: "users_single-02",
		component: UserPage
	},
	{
		path: "/extended-tables",
		name: "Table List",
		icon: "files_paper",
		component: TableList
	},
	{
		path: "/typography",
		name: "Typography",
		icon: "design-2_ruler-pencil",
		component: Typography
	},
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
	{ redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
