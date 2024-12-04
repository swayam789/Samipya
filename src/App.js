import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Career from './Shared/frontend/career/Career';
import Contacts from './Shared/frontend/contacts/contacts';
import ProtectedLayout from './Seller/frontend/layouts/ProtectedLayout';
import Home from './Seller/frontend/Home/home';
function App() {
  return (
    <Router>
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
                <Route path="about_us" element={<h1>About</h1>} />
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
                <Route path="dashboard" element={<h1>Dashboard</h1>} />
                <Route path="profile" element={<h1>Profile</h1>} />
                <Route path="products" element={<h1>ProductDetails</h1>} />
                <Route path="statistics" element={<h1>Statistics</h1>} />
                <Route path="reviews" element={<h1>Reviews</h1>} />
                <Route path="notifications" element={<h1>Notifications</h1>} />
                <Route path="promotions" element={<h1>Promotions</h1>} />
                <Route path="about" element={<h1>About</h1>} />
                <Route path="career" element={<Career/>} />
                <Route path="contact" element={<Contacts/>} />
              </Route>
            </Routes>
          </div>
    </Router>
  );
} 

export default App;