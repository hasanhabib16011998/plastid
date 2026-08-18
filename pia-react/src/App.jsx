import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTopOnNav from './components/ScrollToTopOnNav'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'
import Services from './pages/Services/Services'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import Projects from './pages/Projects/Projects'
import ProjectSingle from './pages/ProjectSingle/ProjectSingle'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectSingle />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
