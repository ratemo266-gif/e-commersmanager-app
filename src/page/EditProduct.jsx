import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import LoadingSpinner from '../components/LoadingSpinner';
// import ToastNotification from '../component/ToastNotification';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct, loading } = useProducts();
  const [formData, setFormData] = useState(null);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const product = getProduct(id);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        icon: product.icon,
        stock: product.stock || 0
      });
    } else {
      navigate('/products');
    }
  }, [id, getProduct, navigate]);

  const categories = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports', 'Books', 'Toys'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Please enter a valid positive price';
    }
    
    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);

    const result = await updateProduct(id, {
      name: formData.name.trim(),
      price: price,
      description: formData.description.trim(),
      category: formData.category,
      icon: formData.icon,
      stock: stock
    });

    if (result.success) {
      setToast({ message: 'Product updated successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } else {
      setToast({ message: 'Failed to update product. Please try again.', type: 'error' });
    }
  };

  if (!formData) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="edit-product-page">
      <div className="page-card">
        <div className="page-header">
          <h2> Edit Product</h2>
          <p className="page-subtitle">Update product information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>
            
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Icon (emoji)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                maxLength="4"
              />
            </div>
            
            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                step="1"
                className={errors.stock ? 'error' : ''}
              />
              {errors.stock && <span className="error-message">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/products')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EditProduct;