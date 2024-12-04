const checkSellerAuthStatus = () => {
    const token = localStorage.getItem('seller_token');
    const seller = JSON.parse(localStorage.getItem('seller'));
    
    if (!token || !seller) {
        return false;
    }
    
    // Check if token is expired
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('seller_token');
            localStorage.removeItem('seller');
            return false;
        }
        return true;
    } catch (error) {
        localStorage.removeItem('seller_token');
        localStorage.removeItem('seller');
        return false;
    }
};

export { checkSellerAuthStatus }; 