import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './index.css'; // Import Tailwind CSS
// import MyDrivePage from './pages/MyDrivePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App flex h-screen">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            {/* <Route path="/my-drive" element={<MyDrivePage />} /> */}
            {/* Add other routes here if needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
