import React, { createContext, useContext, useState, useCallback } from 'react';
import { generateId } from '../utils/formatters';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProductContext = createContext();

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Studio Wireless Headphones',
    price: 89.99,
    description: 'Over-ear headphones with active noise cancellation, 30hr battery life.',
    category: 'Electronics',
    icon: '',
    stock: 45,
    createdAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: 'p2',
    name: 'Minimalist Leather Backpack',
    price: 59.99,
    description: 'Vegan leather, water-resistant, fits 15-inch laptop.',
    category: 'Clothing',
    icon: '',
    stock: 32,
    createdAt: '2024-01-20T10:00:00.000Z'
  },
  {
    id: 'p3',
    name: 'Smart LED Desk Lamp',
    price: 34.99,
    description: 'Touch control, adjustable brightness, USB charging port.',
    category: 'Home',
    icon: '',
    stock: 78,
    createdAt: '2024-01-25T10:00:00.000Z'
  },
  {
    id: 'p4',
    name: 'Ceramic Coffee Mug Set',
    price: 24.99,
    description: 'Set of 4, dishwasher safe, modern matte finish.',
    category: 'Home',
    icon: '',
    stock: 120,
    createdAt: '2024-02-01T10:00:00.000Z'
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage('products', INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newProduct = {
        ...productData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        stock: productData.stock || 0
      };
      
      setProducts(prev => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err) {
      setError('Failed to add product');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const updateProduct = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product
        )
      );
      return { success: true };
    } catch (err) {
      setError('Failed to update product');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      setProducts(prev => prev.filter(product => product.id !== id));
      return { success: true };
    } catch (err) {
      setError('Failed to delete product');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [setProducts]);

  const getProduct = useCallback((id) => {
    return products.find(product => product.id === id);
  }, [products]);

  const getCategories = useCallback(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      getCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};