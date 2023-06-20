import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Kyc from "@pages/kyc";
import Login from "@pages/login";
import Dashboard from "@pages/dashboard";
import NotFound from "@pages/not-found";
import Banners from "@pages/banner/banners";
import Products from "@pages/product/products";
import Categories from "@pages/category/categories";
import AuthLayout from "@components/layout/auth-layout";
import RootLayout from "@components/layout/root-layout";
import SubCategories from "@pages/category/subcategories";
import EditProduct from "@pages/product/edit-product";
import AddProduct from "@pages/product/add-product";
import Sellers from "@pages/seller/sellers";
import Retailers from "@pages/retailer/retailers";
import Orders from "@pages/order/orders";
import OrderDetails from "@pages/order/order-details";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        {/* management */}
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path=":id" element={<SubCategories />} />
        </Route>
        <Route path="banners" element={<Banners />} />
        <Route path="kyc" element={<Kyc />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<EditProduct />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
        {/* orders */}
        <Route path="orders">
          <Route index element={<Orders />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
        {/* users */}
        <Route path="sellers" element={<Sellers />} />
        <Route path="retailers" element={<Retailers />} />
      </Route>
      {/* auth */}
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      {/* default to redirect admin */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default appRouter;
