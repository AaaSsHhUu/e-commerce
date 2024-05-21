import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

