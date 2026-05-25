import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & UI Components
import Loader from './components/ui/Loader';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
// import About from './pages/About';
// import Services from './pages/Services';

// ==========================================
// The Router Wrapper (Listens for URL changes)
// ==========================================
const AppContent = () => {
  // Start with the loader visible on the very first visit
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // 1. Show the loader whenever the route changes
    setIsLoading(true);

    // 2. Hide the loader after a delay to let the GSAP animation play out.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 

    // Cleanup the timer if the user clicks a link really fast
    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <>
      {/* Show the GSAP Loader if isLoading is true */}
      {isLoading && <Loader />}
      
      {/* We wrap your routes in a div that fades in. 
        Because your Loader has z-index: 9999 and is fixed, 
        it will sit on top of everything. The opacity transition here 
        ensures the page content doesn't abruptly "pop" in.
      */}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.6s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh' // Keeps footer at bottom even on short pages
        }}
      >
        <Header />
        
        {/* Main content area flexes to fill available space */}
        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add your other pages here as you build them */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/services" element={<Services />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

// ==========================================
// Main App Component
// ==========================================
const App = () => {
  return (
    // BrowserRouter must wrap everything so useLocation works inside AppContent
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;