import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
 } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from "./screens/HomeScreen"
import ProductDetail from "./screens/ProductScreen.jsx"
import './index.css' 
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store.js';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CheckoutScreen from './screens/CheckoutScreen.jsx';
import DetailsScreen from './screens/DetailsScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import FAQ from './components/pages/FAQ.jsx';
import AboutUs from './components/pages/About-Us';
import ContactUs from './components/pages/Contact-Us.jsx';
import ViewAllProductsScreen from './screens/ViewAllProductsScreen.jsx';

// Admin Screens

import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/Admin/OrderListScreen.jsx';
import ProductListScreen from './screens/Admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/Admin/ProductEditScreen.jsx';
import UserListScreen from './screens/Admin/UserListScreen.jsx';
import UserEditScreen from './screens/Admin/UserEditScreen.jsx';
import CategoryScreen from './screens/CategoryScreen.jsx';
import WishlistScreen from './screens/WishlistScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<CategoryScreen />} />
      <Route path="products/allproducts" element={<ViewAllProductsScreen />} />
      <Route path="/products/:category?" element={<CategoryScreen />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartScreen />}/>
      <Route path="/login" element={<LoginScreen />}/>
      <Route path="/register" element={<RegisterScreen />}/>
      <Route path="/wishlist" element={<WishlistScreen />}/>
      <Route path="/pages/contact-us" element={<ContactUs />}/>
      <Route path="/pages/about-us" element={<AboutUs />}/>
      <Route path="/pages/frequently-asked-questions" element={< FAQ/>}/>


      <Route path='' element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}/>
        <Route path="/payment" element={<PaymentScreen />}/>
        <Route path="/placeorder" element={<PlaceOrderScreen />}/>
        <Route path="/order/:id" element={<OrderScreen />}/>
        <Route path="/checkout" element={<CheckoutScreen />}/>
        <Route path="/details" element={<DetailsScreen />}/>
        <Route path="/profile" element={<ProfileScreen />}/>
        {/* <Route path="/wishlist" element={<WishlistScreen />}/> */}
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />}/>
        <Route path="/admin/productlist" element={<ProductListScreen />}/>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}/>
        <Route path="/admin/userlist" element={<UserListScreen />}/>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />}/>

      </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
