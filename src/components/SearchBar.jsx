import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, productCount, placeholder }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-400"></span>
        </div>
        <input
          type="text"
          className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          placeholder={placeholder || "Search by name, category, or description..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>
      <div className="mt-2 text-right">
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {productCount} product{productCount !== 1 ? 's' : ''} found
        </span>
      </div>
    </div>
  );
};

export default SearchBar;