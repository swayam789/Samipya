import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <Link to="/seller/products"><li tabIndex="0">Product Details</li></Link>
                <Link to="/seller/promotions"><li tabIndex="0">Promotion & Offers</li></Link>
                <Link to="/seller/statistics"><li tabIndex="0">Statistics</li></Link>
                <Link to="/seller/notifications"><li tabIndex="0">Notifications</li></Link>
                <Link to="/seller/reviews"><li tabIndex="0">Reviews</li></Link>
            </ul>
        </aside>
    );
}

export default Sidebar;