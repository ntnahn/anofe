import Product from "views/Product/Product.jsx";
import ProductEdit from "views/Product/ProductEdit.jsx";
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
    path: "/product",
    name: "Products",
    icon: "design_app",
    component: Product
  },
  { hidden: true, path: "/product-edit/:id", name: "Product", component: ProductEdit },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  { path: "/shop", name: "Shop", icon: "design_image", component: Icons },
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
  { path: "/icons", name: "Icons", icon: "design_image", component: Icons },
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
  { redirect: true, path: "/", pathTo: "/404", name: "404: Page not found" }
];
export default dashRoutes;
