import './App.css';
import {ReactNavbar} from "overlay-navbar";
import Header from './components/layouts/Header';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Outlet />
    </div>
  );
}

export default App;
