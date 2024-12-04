import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Career from './Shared/frontend/career/Career';
import Contacts from './Shared/frontend/contacts/contacts';
import ProtectedLayout from './Seller/frontend/layouts/ProtectedLayout';
import Home from './Seller/frontend/Home/home';
// import { AuthProvider } from './Seller/frontend/context/AuthContext';
import AboutB from './Shared/frontend/About_us/about';
import Dashboard from './Seller/frontend/dashboard/Dashboard';
import ProductDetails from './Seller/frontend/product_details/ProductDetails'
import Statistics from './Seller/frontend/statistics/Statistics';
import Reviews from './Seller/frontend/Reviews/Reviews';
import Notifications from './Seller/frontend/Notifications/Notifications';
function App() {
  return (
    <Router>
        {/* <AuthProvider> */}
          <div className="app">
            <Routes>
              
              {/* User Routes*/}
              <Route path="/user/*">
              <Route index element={<Navigate to="home" replace />} />
                <Route path="categories" element={<h1>Categories</h1>} />
                <Route path="home" element={<h1>Home</h1>} />
                <Route path="product/:id" element={<h1>Product</h1>} />
                <Route path="profile" element={<h1>Profile</h1>} />
                  <Route path="login" element={<h1>Login</h1>} />
                <Route path="signup" element={<h1>Signup</h1>} />
                <Route path="career" element={<Career/>} />
                <Route path="contact" element={<Contacts/>} />
                <Route path="register" element={<h1>Register</h1>} />
                <Route path="about_us" element={<AboutB/>} />
                <Route path="products" element={<h1>Products</h1>} />
              </Route>

              {/* Redirects */}
              <Route path="/" element={<Navigate to="/user/home" replace />} />
             
              {/* seller routes */}
              <Route path="/seller/login" element={<h1>Login</h1>} />
              <Route path="/seller/signup" element={<h1>Signup</h1>} />
        
              <Route path="/seller/*" element={<ProtectedLayout/>}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Home/>} />
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="profile" element={<h1>profile</h1>} />
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
          </div>
          {/* </AuthProvider>  */}
    </Router>
  );
} 

export default App;