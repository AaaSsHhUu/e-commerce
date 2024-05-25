import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import WebFont from "webfontloader";
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <ToastContainer position='top-center' autoClose={5000} closeOnClick={true} hideProgressBar={false} />
      </HelmetProvider>
      <Footer />
    </>
  );
}

export default App;
const toastOption = {
  position : "top-center",
  autoClose : 5000,
  closeOnClick : true,
  hideProgressBar : false,
}