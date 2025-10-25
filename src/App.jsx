import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
    </div>
  );
}
