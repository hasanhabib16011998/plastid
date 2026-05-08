// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The parent route uses the Layout component */}
        <Route path="/" element={<Layout />}>
          
          {/* Nested routes are injected into the <Outlet /> inside Layout */}
          {/* <Route index element={<Home />} /> */}
          
          {/* Example of how you will add future pages: */}
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="services" element={<Services />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}