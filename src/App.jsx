import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import LandingPage from './page/LandingPage';
import AddProduct from './page/AddProduct';
import ProductList from './page/ProductList';
import EditProduct from './page/EditProduct';
// import LoadingSpinner from './component/LoadingSpinner'

// import './App.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
              </Routes>
            </div>
          </main>
          <footer className="footer">
            <div className="container">
              <p>Admin Portal • Secure Product Management • Real-time Updates</p>
            </div>
          </footer>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;