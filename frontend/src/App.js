import { useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import WebFont from "webfontloader";

function App() {
  
  // Fetching font at the start of rendering
  useEffect(()=>{
      WebFont.load({
        google : {
          families : ["Roboto","Droid Sans", "Chilanka"]
        }
      })
  },[])

  return (
    <div className="App">
        <Outlet />
    </div>
  );
}

export default App;
