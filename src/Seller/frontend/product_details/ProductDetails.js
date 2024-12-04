import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { FaPlus, FaEdit, FaTrash, FaTags, FaRupeeSign, FaBoxes } from 'react-icons/fa';

const ProductDetails = () => {
  const categories = [
    "Fashion",
    "Electronics",
    "Food & Beverages",
    "Home & Living",
    "Health & Beauty",
    "Books & Stationery",
    "Sports & Fitness",
    "Music & Instruments",
    "Toys & Games",
    "Automotive",
    "Gifts & Occasions"
  ];
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customCategory, setCustomCategory] = useState(false);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: 0,
    price: 0,
    category: '',
    description: '',
    image: null
  });

  useEffect(() => {
    const sellerStr = localStorage.getItem('seller');
    if (sellerStr) {
      const seller = JSON.parse(sellerStr);
      fetchProducts(seller._id);
    }
  }, []);

  const fetchProducts = async (id) => {
    try {
      setError(null);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('seller_token');
      
      const response = await fetch(`${API_URL}/seller/products/seller/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const productsWithImages = data.map(product => ({
        ...product,
        imageUrl: product.imagePath ? `${API_URL}/uploads/${product.imagePath}` : null
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } 
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const sellerStr = localStorage.getItem('seller');
    if (!sellerStr) {
        setError('Please log in to add products');
        return;
    }

    const seller = JSON.parse(sellerStr);

    try {
        const formData = new FormData();
        
        const dataToSend = {
            name: newProduct.name,
            stock: newProduct.stock,
            price: newProduct.price,
            category: newProduct.category,
            description: newProduct.description,
            sellerId: seller._id,
            seller: {
                shopName: seller.shopName,
                contact: seller.contact,
                landmark: seller.landmark,
                email: seller.email,
                username: seller.username
            }
        };
        
        Object.keys(dataToSend).forEach(key => {
            if (typeof dataToSend[key] === 'object') {
                formData.append(key, JSON.stringify(dataToSend[key]));
            } else {
                formData.append(key, dataToSend[key]);
            }
        });
        
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const token = localStorage.getItem('seller_token');
        
        const response = await fetch(`${API_URL}/seller/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const responseData = await response.json();
        fetchProducts(seller._id);
        setShowAddForm(false);
        setNewProduct({
            name: '',
            stock: 0,
            price: 0,
            category: '',
            description: '',
            image: null
        });
    } catch (error) {
        console.error('Error adding product:', error);
        setError('Failed to add product: ' + error.message);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('seller_token');
      const response = await fetch(`${API_URL}/seller/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product. Status: ${response.status}`);
      }

      setProducts(products.filter(product => product._id !== id)); // Remove the deleted product from state
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('seller_token');
      
      const sellerStr = localStorage.getItem('seller');
      const seller = JSON.parse(sellerStr);

      const response = await fetch(`${API_URL}/seller/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          stock: newStock,
          sellerId: seller._id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update stock. Status: ${response.status}`);
      }

      setProducts(products.map(product => 
        product._id === id ? { ...product, stock: newStock } : product
      ));

    } catch (error) {
      console.error('Error updating stock:', error);
      setError('Failed to update stock: ' + error.message);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return `${API_URL}/uploads/${imagePath}`;
  };
  if (error) {
    return <div className="error-message">{error}</div>;
}

  return (
    <div className="det-content">
        <div className="page-header">
            <h1>Product Management</h1>
            <button 
                className="add-product-button"
                onClick={() => setShowAddForm(true)}
            >
                <FaPlus /> Add New Product
            </button>
        </div>
        
        <div className="product-grid">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    <div className="product-image">
                        {product.imageUrl ? (
                           <img src={product.imageUrl} alt={product.name} />
                        ) : (
                            <div className="no-image">No Image Available</div>
                        )}
                    </div>
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="category">
                            <FaTags /> {product.category}
                        </p>
                        <p className="price">
                            <FaRupeeSign /> {product.price.toLocaleString()}
                        </p>
                        <p className="stock">
                            <FaBoxes /> Stock: {product.stock} units
                        </p>
                    </div>
                    <div className="stock-control">
                        <input className='stock-input'
                            type="number" 
                            defaultValue={product.stock} 
                            min="0"
                            onChange={(e) => {
                                const newStock = parseInt(e.target.value);
                                if (!isNaN(newStock) && newStock >= 0) {
                                    handleUpdateStock(product._id, newStock);
                                }
                            }}
                        />
                    </div>
                    <div className="product-actions">
                        <button className="edit-button">
                            <FaEdit /> Edit
                        </button>
                        <button 
                            className="delete-button" 
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
        {showAddForm && (
            <div className="product-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Add New Product</h2>
                        <button className="close-button" onClick={() => setShowAddForm(false)}>×</button>
                    </div>
                    <form onSubmit={handleAddProduct}>
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={newProduct.category}
                                onChange={(e) => {
                                    if (e.target.value === "custom") {
                                        setCustomCategory(true);
                                    } else {
                                        setNewProduct({...newProduct, category: e.target.value});
                                        setCustomCategory(false);
                                    }
                                }}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="custom">Custom Category</option>
                            </select>
                            {customCategory && (
                                <input
                                    type="text"
                                    placeholder="Enter custom category"
                                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
                            />
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="submit-button">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default ProductDetails; 