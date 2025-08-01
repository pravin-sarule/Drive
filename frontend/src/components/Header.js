

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ allItems = [], onSearchResults }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/login');
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults([]);
      onSearchResults([]);
      return;
    }

    const lower = searchTerm.toLowerCase();
    const results = allItems.filter(item =>
      item.name.toLowerCase().includes(lower)
    );

    setFilteredResults(results);
    onSearchResults(results);
  }, [searchTerm, allItems]);

  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center relative">
      {/* Left: App Title */}
      <h1 className="text-xl font-bold text-gray-800">Drive Management</h1>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-[500px]">
          <input
            type="text"
            placeholder="Search in Drive"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 transition duration-200 ease-in-out"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right: Username & Profile Dropdown */}
      {user && (
        <div className="relative flex items-center space-x-3">
          <span className="text-sm text-gray-700 hidden sm:block">
            {user.username || user.email}
          </span>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <svg
              className="w-7 h-7 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-32 bg-white border border-gray-200 rounded shadow-md z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
