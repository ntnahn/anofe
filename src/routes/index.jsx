import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Shop from "layouts/Shop/Shop.jsx";
import withAuthen from '../authentication/authen';

var indexRoutes = [
  { path: "/dashboard", name: "Home", component: withAuthen(Dashboard) },
  { path: "/", name: "Shop", icon: "design_image", component: Shop }
];

export default indexRoutes;
