import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Shop from "layouts/Shop/Shop.jsx";

var indexRoutes = [
  { path: "/dashboard", name: "Home", component: Dashboard },
  { path: "/", name: "Shop", icon: "design_image", component: Shop }
];

export default indexRoutes;
