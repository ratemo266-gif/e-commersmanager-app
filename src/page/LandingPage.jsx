import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    { icon: '', title: 'Real-time Updates', desc: 'Change prices and descriptions instantly with inline editing', color: 'from-blue-500 to-blue-600' },
    { icon: '', title: 'Smart Search', desc: 'Dynamically search products by name, category, or description', color: 'from-purple-500 to-purple-600' },
    { icon: '', title: 'Fully Responsive', desc: 'Beautiful interface that works seamlessly on all devices', color: 'from-green-500 to-green-600' },
    { icon: '', title: 'Admin Control', desc: 'Full CRUD operations to manage your catalog efficiently', color: 'from-orange-500 to-orange-600' },
    { icon: '', title: 'Analytics Ready', desc: 'Track inventory levels and product performance', color: 'from-pink-500 to-pink-600' },
    { icon: '', title: 'Secure Access', desc: 'Role-based admin authentication and data persistence', color: 'from-indigo-500 to-indigo-600' }
  ];

  const stats = [
    { number: '24/7', label: 'Availability' },
    { number: 'Real-time', label: 'Updates' },
    { number: 'Secure', label: 'Admin Access' },
    { number: '100%', label: 'Responsive' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 mb-12 text-white text-center">
        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm mb-4">
           Welcome to Admin Portal v2.0
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">E‑commerce Manager</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-95">
          Streamline your product catalog, update pricing on the fly, 
          and manage inventory — all from one powerful dashboard.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/add-product" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
             Add Product
          </Link>
          <Link to="/products" className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200">
             View Products
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.number}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Powerful Features for Modern E-commerce</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`text-4xl mb-4 bg-linear-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to manage your products?</h3>
        <p className="text-gray-300 mb-6">Get started with our intuitive admin interface</p>
        <Link to="/add-product" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200">
          Start Adding Products →
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;