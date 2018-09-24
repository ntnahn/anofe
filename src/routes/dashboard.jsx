import Product from "views/Product/Product.jsx";
import ProductEdit from "views/Product/ProductEdit.jsx";
import ProductAdd from "views/Product/ProductAdd.jsx";
import Notifications from "views/Notifications/Notifications.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import withAuthen from '../authentication/authen';

var dashRoutes = [
  {
    path: "/dashboard/product",
    name: "Products",
    icon: "design_app",
    component: Product
  },
  { hidden: true, path: "/dashboard/product-edit/:id", name: "Edit product", component: ProductEdit },
  { hidden: true, path: "/dashboard/product-add", name: "Add new product", component: ProductAdd },
  {
    path: "/dashboard/shop",
    name: "Shop",
    icon: "ui-1_bell-53",
    component: Notifications
  },
  {
    path: "/dashboard/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage
  },
  { redirect: true, path: "/dashboard", pathTo: "/dashboard/product", name: "Shop" }
];
export default dashRoutes;
