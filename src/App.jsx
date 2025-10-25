import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RobotGuide from './components/RobotGuide';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <RobotGuide />
      </main>
      <Footer />
    </div>
  );
}
