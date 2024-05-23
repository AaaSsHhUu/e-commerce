import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import {Provider} from "react-redux";
import {store} from "./app/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
);

