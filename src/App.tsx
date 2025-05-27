import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { BarberDashboardPage } from './pages/BarberDashboardPage';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/barber-dashboard" element={<BarberDashboardPage />} />
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;