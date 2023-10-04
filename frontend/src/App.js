import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

import About from './pages/About';
import Register from './pages/Register';

import Login from './pages/Login';
import { AuthProvider } from './context/auth';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Components/Routes/PrivateRouter';

import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';

import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';

import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import {SearchProvider} from './context/search';

import SearchProductPage from './pages/SearchProductPage';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import {CartProvider} from './context/cart';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

import {

  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
function App() {

  return (
    <div>

    <AuthProvider>
    <SearchProvider>
    <CartProvider>




    <Router>
    <Routes>
      <Route exact path='/' element = {<Home/>} />
      <Route exact path='/about' element = {<About/>} />
      <Route exact path= '/register' element = {<Register/>} />
      <Route exact path = '/login' element = {<Login/>} />

      <Route exact path= '/forgot-password' element = {<ForgotPassword/>} />
      <Route exact path='/dashboard' element = {<PrivateRoute/>}>
      <Route exact path='user' element = {<Dashboard/>}/>
      <Route exact path='user/orders' element = {<Orders/>}/>
      <Route exact path='user/profile' element = {<Profile/>} />
      </Route>
      <Route exact path='/dashboard' element = {<AdminRoute/>}>
      <Route exact path= 'admin' element = {<AdminDashboard/>} />
      <Route exact path= 'admin/create-category' element = {<CreateCategory/>}/>
      <Route exact path= 'admin/create-product' element = {<CreateProduct/>}/>
      <Route exact path= 'admin/products' element = {<Products/>} />
      <Route exact path= 'admin/update-product/:slug' element = {<UpdateProduct/>} />
      <Route exact path= 'admin/users' element = {<Users/>}/>
      <Route exact path= 'admin/orders' element = {<AdminOrders/>} />
      </Route>
      <Route exact path='/search-product-page' element = {<SearchProductPage/>} />
      <Route exact path='/product/:slug' element = {<ProductDetails/>} />
      <Route exact path='/categories' element = {<Categories/>} />
      <Route exact path= '/category/:slug' element = {<CategoryProduct/>} />
      <Route exact path='/cart' element = {<CartPage/>} />   




    </Routes>
    </Router>
    </CartProvider>
    </SearchProvider>
    </AuthProvider>
    </div>
  );
}

export default App;
