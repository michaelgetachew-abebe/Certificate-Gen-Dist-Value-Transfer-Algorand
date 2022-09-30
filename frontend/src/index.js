import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import './index.css';
// pages
import Home from './pages/Homepage.js'
// others

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={AdminPanel />} />
    </Routes>
  </BrowserRouter>,
  ReactDOM.render(<Home />, document.getElementById('root'))
);