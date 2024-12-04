import Footer from '../../../Shared/frontend/footer/footer';
import './categories.css';
const Categories = () => {
    return (
        <div className='categories-containers'>
        <section className="categories-section">
        <div className="container1">
            <h2 className="section-title">Shop by Categories</h2>
            <div className="categories-grid">
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-tshirt"></i>
                    </div>
                    <h3>Fashion</h3>
                    <p>Clothing, Accessories, Footwear</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Electronics</h3>
                    <p>Phones, Laptops, Gadgets</p>
                </div>
                <div class="category-card">
                    <div className="category-icon">
                            <i className="fas fa-utensils"></i>
                    </div>
                    <h3>Food & Beverages</h3>
                    <p>Restaurants, Cafes, Groceries</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-home"></i>
                    </div>
                    <h3>Home & Living</h3>
                    <p>Furniture, Decor, Appliances</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-heartbeat"></i>
                    </div>
                    <h3>Health & Beauty</h3>
                    <p>Pharmacy, Cosmetics, Wellness</p>
                </div>
                <div class="category-card">
                    <div className="category-icon">
                        <i className="fas fa-book"></i>
                    </div>
                    <h3>Books & Stationery</h3>
                    <p>Books, Office Supplies, Art</p>
                </div>
                <div class="category-card">
                    <div className="category-icon">
                        <i className="fas fa-futbol"></i>
                    </div>
                    <h3>Sports & Fitness</h3>
                    <p>Equipment, Gear, Accessories</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-music"></i>
                    </div>
                    <h3>Music & Instruments</h3>
                    <p>Instruments, Equipment, Accessories</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-gamepad"></i>
                    </div>
                    <h3>Toys & Games</h3>
                    <p>Games, Toys, Entertainment</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-car"></i>
                    </div>
                    <h3>Automotive</h3>
                    <p>Parts, Accessories, Services</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-gift"></i>
                    </div>
                    <h3>Gifts & Occasions</h3>
                    <p>Gifts, Cards, Party Supplies</p>
                </div>
                <div className="category-card">
                    <div className="category-icon">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <h3>Other</h3>
                    <p>More Categories</p>
                </div>
            </div>
        </div>
        </section>
        <Footer />
        </div>
    );
};

export default Categories;