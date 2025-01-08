import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import './style.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://gtext-backend.vercel.app/products')
    // axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Product Listing</h1>
        </header>

        {/* Search Input */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="product-list">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                      <img src={product.image} alt={product.name} />
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p>Price: ${product.price}</p>
                      <Link to={`/product/${product._id}`}>View Details</Link>
                    </div>
                  ))
                ) : (
                  <p>No products found....</p>
                )}
              </div>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
