import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle, { Container } from './globalStyles';

//Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//Pages
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function App() {
  const [language, setLanguage] = useState("it");

  return (
    <Router>
      <GlobalStyle />
      <Container>
        <Navbar language={language} setLanguage={setLanguage} />
        <Routes>
          <Route path="/" exact element={<Home language={language} />} />
          <Route path="/home" exact element={<Home language={language} />} />
          <Route path="/curriculum" exact element={<Curriculum language={language} />} />
          <Route path="/services" exact element={<Services language={language} />} />
          <Route path="/portfolio" exact element={<Portfolio language={language} />} />
          <Route path="/contact" exact element={<Contact language={language} />} />

          {/* default redirect to home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer language={language} />
      </Container>
    </Router>
  );
}

export default App;
