import './subscription.css';
import Footer from '../../../Shared/frontend/footer/footer';

const Subscription = () => {
  return(<div className='subscription-container1'><main className='main-content3'><h1>Dashboard</h1>
         <section className="subscription-section">
        <div className="container1">
            <h1>Choose Your Plan</h1>
            <p className="section-subtitle">Select the perfect subscription plan for your business</p>
            
            <div className="subscription-grid">
                <div className="subscription-card">
                    <div className="plan-header">
                        <h2>Basic Seller</h2>
                        <div className="price">
                            <span className="currency">Rs.</span>
                            <span className="amount">95</span>
                            <span className="period">/month</span>
                        </div>
                    </div>
                    <div className="plan-features">
                        <ul>
                            <li><i className="fas fa-check"></i> Access to Seller Dashboard</li>
                            <li><i className="fas fa-check"></i> Basic Analytics</li>
                            <li><i className="fas fa-check"></i> Product Listings</li>
                            <li><i className="fas fa-check"></i> Customer Support</li>
                        </ul>
                        <div className="subscription-toggle">
                              <label className="switch">
                                <input type="checkbox" id="billingToggle"/>
                                <span className="slider round"></span>
                            </label>
                            <span className="toggle-label">Annual Billing</span>
                        </div>
                    </div>
                    <button className="subscribe-btn">Buy Now</button>
                </div>

    
                <div className="subscription-card featured">
                    <div className="popular-badge">Most Popular</div>
                      <div className="plan-header">
                        <h2>Super Seller</h2>
                        <div className="price">
                            <span className="currency">Rs.</span>
                            <span className="amount">150</span>
                            <span className="period">/month</span>
                            
                        </div>
                        <div className="price yearly-price">
                            <span className="currency">Rs.</span>
                            <span className="amount">1350</span>
                            <span className="period">/year</span>
                        </div>
                        <div className="savings">Save Rs. 450 on annual subscription</div>
                    </div>
                    <div className="plan-features">
                        <ul>
                            <li><i className="fas fa-check"></i> All Basic Seller Features</li>
                            <li><i className="fas fa-check"></i> 1 Free Push Notification Marketing/Month</li>
                            <li><i className="fas fa-check"></i> 1 Free App Promotion/Month</li>
                            <li><i className="fas fa-check"></i> Priority Support</li>
                            <li><i className="fas fa-check"></i> Featured Store Listing</li>
                        </ul>
                    </div>
                    <div className="subscription-toggle">
                        <label className="switch">
                            <input type="checkbox" id="billingToggle"/>
                            <span className="slider round"></span>
                        </label>
                        <span className="toggle-label">Annual Billing</span>
                    </div>
                    <button className="subscribe-btn">Buy Now</button>
                </div>


                <div className="subscription-card">
                    <div className="plan-header">
                        <h2>Premium Seller</h2>
                        <div class="price">
                            <span className="currency">Rs.</span>
                            <span className="amount">1899</span>
                            <span className="period">/2 years</span>
                        </div>
                        <div class="savings">Get 6 months FREE!</div>
                    </div>
                    <div className="plan-features">
                        <ul>
                            <li><i className="fas fa-check"></i> All Super Seller Features</li>
                            <li><i class="fas fa-check"></i> Unlimited Push Notifications</li>
                        </ul>
                    </div>
                    <button className="subscribe-btn">Buy Now</button>
                </div>
            </div>
            <div className="additional-features">
                <h3>All Plans Include</h3>
                <div className="features-grid">
                    <div className="feature-item">
                        <i className="fas fa-store"></i>
                        <h4>Store Profile</h4>
                        <p>Customizable store profile with all your business details</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-chart-line"></i>
                        <h4>Analytics</h4>
                        <p>Track your store's performance and customer engagement</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-headset"></i>
                        <h4>24/7 Support</h4>
                        <p>Get help whenever you need it from our support team</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-mobile-alt"></i>
                        <h4>Mobile App</h4>
                        <p>Manage your store on the go with our mobile app</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </main>
        <Footer /></div>
              );
};

export default Subscription; 