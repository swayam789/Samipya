import './Register.css';
const Register = () => {
    return (
        <section className="merchant-registration">
        <div className="container-merchant">
            <h1>Seller Registration</h1>
            <p className="form-subtitle">Join our platform and grow your business</p>

            <form className="merchant-form" id="merchantForm">
                <div className="form-section">
                    <h2>Owner Information</h2>
                    <div className="form-group">
                        <label for="ownerName">Owner's Full Name*</label>
                        <input type="text" id="ownerName" name="ownerName" required />
                    </div>
                    <div className="form-group">
                        <label for="ownerDocNum">Owner's Document Number*</label>
                        <input type="text" id="ownerDocNum" name="ownerDocNum" required />
                    </div>
                    <div className="form-group">
                        <label for="ownerPhoto">Owner's Photo*</label>
                        <input type="file" id="ownerPhoto" name="ownerPhoto" accept="image/*" required />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Shop Information</h2>
                    <div className="form-group">
                        <label for="shopName">Shop Name*</label>
                        <input type="text" id="shopName" name="shopName" required />
                    </div>
                    <div className="form-group">
                        <label for="shopCategory">Shop Category*</label>
                        <select id="shopCategory" name="shopCategory" required>
                            <option value="">Select a category</option>
                            <option value="grocery">Grocery</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Furniture</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="shopDocNum">Shop Document Number*</label>
                        <input type="text" id="shopDocNum" name="shopDocNum" required />
                    </div>
                    <div className="form-group">
                        <label for="shopDocPhoto">Shop Document Photo*</label>
                        <input type="file" id="shopDocPhoto" name="shopDocPhoto" accept="image/*" required />
                    </div>
                </div>
                <div className="form-section">
                    <h2>Contact Information</h2>
                    <div className="form-group">
                        <label for="shopAddress">Shop Address*</label>
                        <textarea id="shopAddress" name="shopAddress" required></textarea>
                    </div>
                    <div className="form-group">
                        <label for="shopPhone">Shop Phone Number*</label>
                        <input type="tel" id="shopPhone" name="shopPhone" required />
                    </div>
                    <div className="form-group">
                        <label for="shopEmail">Shop Email*</label>
                        <input type="email" id="shopEmail" name="shopEmail" required />
                    </div>
                </div>


                <div class="form-section">
                    <h2>Subscription</h2>
                    <div className="form-group">
                        <label for="promoCode">Have a Promo Code?</label>
                        <div className="promo-input-group">
                            <input type="text" id="promoCode" name="promoCode" placeholder="Enter promo code" />
                            <button type="button" id="applyPromo" className="promo-btn">Apply</button>
                        </div>
                        <p id="promoMessage" className="promo-message"></p>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" onClick={() => window.location.href='subscription.html'}>Register</button>
                </div>
            </form>
        </div>
    </section>
    );
};

export default Register;