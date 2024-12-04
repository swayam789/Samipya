import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Career from './Shared/frontend/career/Career';
import Contacts from './Shared/frontend/contacts/contacts';
import ProtectedLayout from './Seller/frontend/layouts/ProtectedLayout';
import Home from './Seller/frontend/Home/home';
import { AuthProvider } from './Seller/frontend/context/AuthContext';
import AboutB from './Shared/frontend/About_us/about';
import Dashboard from './Seller/frontend/dashboard/Dashboard';
import ProductDetails from './Seller/frontend/product_details/ProductDetails'
import Statistics from './Seller/frontend/statistics/Statistics';
import Reviews from './Seller/frontend/Reviews/Reviews';
import Notifications from './Seller/frontend/Notifications/Notifications';
import Hero from './User/frontend/hero/hero';
import Categories from './User/frontend/categories/categories';
import AuthB from './User/frontend/login/authB';
import SigninB from './User/frontend/login/signinB';
import Register from './User/frontend/register/Register';
import ProtectedLayoutUser from './User/frontend/layouts/ProtectedLayoutUser';
import Login from './Seller/frontend/auth/Login'
import Signin from './Seller/frontend/auth/Signup'
import Profile from './Seller/frontend/profile/Profile';
import { RatingProvider } from './Seller/frontend/context/RatingContext';
import ProductsPage from './User/frontend/pages/ProductsPage';
function App() {
  return (
    <Router>
        <AuthProvider>
          <RatingProvider>
          <div className="app">
            <Routes>
              
              {/* User Routes*/}
              <Route path="/user/*" element ={<ProtectedLayoutUser/>}>
              <Route index element={<Navigate to="home" replace />} />
                <Route path="categories" element={<Categories/>} />
                <Route path="home" element={<Hero/>} />
                <Route path="product/:id" element={<h1>Product</h1>} />
                <Route path="profile" element={<h1>Profile</h1>} />
                  <Route path="login" element={<AuthB/>} />
                <Route path="signup" element={<SigninB/>} />
                <Route path="career" element={<Career/>} />
                <Route path="contact" element={<Contacts/>} />
                <Route path="register" element={<Register/>} />
                <Route path="about_us" element={<AboutB/>} />
                <Route path="products" element={<ProductsPage/>} />
              </Route>

              {/* Redirects */}
              <Route path="/" element={<Navigate to="/user/home" replace />} />
             
              {/* seller routes */}
              <Route path="/seller/login" element={<Login/>} />
              <Route path="/seller/signup" element={<Signin/>} />
        
              <Route path="/seller/*" element={<ProtectedLayout/>}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home/>} />
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="products" element={<ProductDetails/>} />
                <Route path="statistics" element={<Statistics/>} />
                <Route path="reviews" element={<Reviews/>} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="promotions" element={<h1>Promotions</h1>} />
                <Route path="about" element={<AboutB/>} />
                <Route path="career" element={<Career/>} />
                <Route path="contact" element={<Contacts/>} />
              </Route>
            </Routes>
          </div></RatingProvider>
          </AuthProvider> 
    </Router>
  );
} 

export default App;