import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import FileComplaintPage from './pages/FileComplaintPage';
import CitizenDashboard from './pages/CitizenDashboard';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Ramesh Sharma',
    email: 'ramesh@demo.com',
    role: 'citizen',
    ward: 4
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* 11.5% Opacity Watermark Logo Background Overlay Positioned Lower */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center select-none overflow-hidden opacity-[0.115] mix-blend-multiply"
        aria-hidden="true"
      >
        <img 
          src="/logo.png" 
          alt="Watermark Logo" 
          className="w-[70vw] max-w-[750px] h-auto object-contain transform translate-y-16"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<RegisterPage setCurrentUser={setCurrentUser} />} />
            <Route path="/track" element={<TrackComplaintPage />} />
            
            <Route path="/citizen/dashboard" element={<CitizenDashboard currentUser={currentUser} />} />
            <Route path="/citizen/file-complaint" element={<FileComplaintPage currentUser={currentUser} />} />
            <Route path="/citizen/complaint/:id" element={<ComplaintDetailPage />} />

            <Route path="/officer/dashboard" element={<OfficerDashboard currentUser={currentUser} />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <ChatWidget />
        <Footer />
      </div>

    </div>
  );
}