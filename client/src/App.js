import { Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Home from "./pages/HomePage/Home";
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage'
import CartScreen from "./pages/cartPage/CartPage";
import Login from './pages/LoginScreen/Login'
import Register from './pages/RegisterScreen/Register'
import Verify from "./pages/verifyEmailScreen/Verify";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Shipping from "./pages/shippingScreen/Shipping";
import PrivateRoutes from "./components/PrivateRoutesComponent/PrivateRoutes";
import Payment from "./pages/PaymentScreen/Payment";
import NotFound from "./pages/NotFoundPage/NotFound";
import PlaceOrder from "./pages/PlaceOrderScreen/PlaceOrder";
import OrderItem from "./pages/OrderItemScreen/OrderItem";
import Profile from "./pages/profileScreen/Profile";
import Admin from "./components/adminRouteComponent/Admin";
import ThankYou from "./pages/thankYouScreen/ThankYou";
import WishList from "./pages/wishlistScreen/WishList";
import OrdersList from "./pages/adminRoutes/orderslistScreen/OrdersList";
import ProductsList from "./pages/adminRoutes/productsListScreen/ProductsList";
import UsersList from "./pages/adminRoutes/usersListScreen/UsersList";
import EditUser from "./pages/adminRoutes/EdituserScreen/EditUser";
import EditProduct from "./pages/adminRoutes/EditProductScreen/EditProduct";
import CategoryPage from "./pages/categoryPageElements/CategoryPage";
import Footer from "./components/footerComponent/Footer";
import MobileHeader from "./components/HeaderComponent/MobileHeader";

function App() {
  return (
    <div className="app-container">
     
        <Header />
        
        <div className="content">
          <div id='overlay'></div>
          <div style={{opacity:'0' , visibility:"hidden", display:'none'}}>
        <MobileHeader  />
      </div>  
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route  path="/page/:pageNumber" element={<Home />} />
                <Route  path="/search/:keyword" element={<Home />} />
                <Route  path="/search/:keyword/page/:pageNumber" element={<Home />} />
                <Route  path="/products/:id" element={<ProductDetailsPage />} />
                <Route  path="/cart" element={<CartScreen />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/register" element={<Register />} />
                <Route  path="/category/:categoryName" element={<CategoryPage />} />
                <Route  path="/verify" element={<Verify />} />
                <Route  path="*" element={<NotFound />} />
                <Route path="" element={<PrivateRoutes />} >
                    <Route  path="/shipping" element={<Shipping />} />
                    <Route  path="/payment" element={<Payment />} />
                    <Route  path="/place-order" element={<PlaceOrder />} />
                    <Route  path="/orders/:id" element={<OrderItem />} />
                    <Route  path="/profile" element={<Profile />} />
                    <Route  path="/success" element={<ThankYou />} />
                    <Route path='/browse-wishlist-products' element={<WishList />} />
                </Route>
                <Route path="" element={<Admin />} >
                    <Route path='/admin/ordersList' element={<OrdersList />} />
                    <Route path='/admin/productsList' element={<ProductsList />} />
                    <Route path="/admin/productsList/:pageNumber" element={<ProductsList />} />
                    <Route path='/admin/usersList' element={<UsersList />} />
                    <Route path='/admin/user/:id/edit' element={<EditUser />} />
                    <Route path='/admin/product/:id/edit' element={<EditProduct />} />
                </Route>
                </Routes>
        </div>
        <Footer />
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Bounce}
        pauseOnHover
        theme="dark"
         
        />
    </div>
  );
}

export default App;
