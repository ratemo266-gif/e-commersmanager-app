import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText } from '../utils/formatters';

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(product.price.toString());
  const [editDescription, setEditDescription] = useState(product.description);
  const [editStock, setEditStock] = useState(product.stock?.toString() || '0');

  const handleSave = async () => {
    const newPrice = parseFloat(editPrice);
    const newStock = parseInt(editStock);
    
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid positive price');
      return;
    }
    
    if (isNaN(newStock) || newStock < 0) {
      alert('Please enter a valid stock quantity');
      return;
    }

    await onUpdate(product.id, {
      price: newPrice,
      description: editDescription.trim(),
      stock: newStock
    });
    setIsEditing(false);
  };

  const stockStatus = {
    'in-stock': 'bg-green-100 text-green-700',
    'low-stock': 'bg-yellow-100 text-yellow-700',
    'out-of-stock': 'bg-red-100 text-red-700'
  };

  const stockText = product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock';
  const statusClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100 p-6 text-center">
        <span className="text-5xl">{product.icon || '📦'}</span>
        <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${stockStatus[statusClass]}`}>
          {stockText}
        </span>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
          <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {isEditing ? (
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Price ($)</label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Stock Quantity</label>
              <input
                type="number"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Description</label>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleSave} className="flex-1 bg-green-500 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-green-600 transition">
                ✓ Save
              </button>
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition">
                ✗ Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</div>
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{truncateText(product.description, 80)}</p>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-blue-100 transition">
                 Quick Edit
              </button>
              <Link to={`/edit-product/${product.id}`} className="flex-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-amber-100 transition text-center">
                 Full Edit
              </Link>
              <button onClick={() => onDelete(product.id)} className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition">
                 Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;