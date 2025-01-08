import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://gtext-backend.vercel.app/product/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>{product.stockStatus ? 'In Stock' : 'Out of Stock'}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
