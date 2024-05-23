import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import WebFont from "webfontloader";
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { HelmetProvider } from 'react-helmet-async';

function App() {

  // Fetching font at the start of rendering
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <>
        <Header />
        <HelmetProvider>
          <Outlet />
        </HelmetProvider>
        <Footer />
    </>
  );
}

export default App;
