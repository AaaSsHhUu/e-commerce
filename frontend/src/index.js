import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Header from './components/layouts/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
        <Route path='/' element={<Header />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

