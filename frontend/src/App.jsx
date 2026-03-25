import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Cart } from './pages/Cart/Cart';
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder';
import { Footer } from './components/Footer/Footer';
import { LoginPopup } from './components/LoginPopup/LoginPopup';
import { Verify } from './pages/Verify';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const footerRef = useRef(null);
  const menuRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          scrollToFooter={scrollToFooter}
          scrollToMenu={scrollToMenu}
        />
      </div>

      <div className="app">
        <Routes>
       <Route path='/' element={<Home foodDisplayRef={menuRef} />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default App;
