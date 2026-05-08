import { Outlet } from 'react-router-dom';
import HeaderContactInfo from './HeaderContactInfo';
import Navbar from './NavBar';
import Footer from './Footer';

export default function Layout() {
  return (
    // I noticed your HTML wrapped everything in this class, so let's keep it!
    <div className="boxed_wrapper"> 
      
      {/* --- HEADER --- */}
      <header className="main-header header-style1">
        <Navbar />
        <HeaderContactInfo />
      </header>

      {/* --- MAIN PAGE CONTENT --- */}
      <main>
        {/* <Outlet /> automatically renders the component for the current route (e.g., Home, About) */}
        <Outlet /> 
      </main>

      {/* --- FOOTER --- */}
      <Footer />
      
    </div>
  );
}