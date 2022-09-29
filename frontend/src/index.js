import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import 'bootstrap/scss/bootstrap.scss';
import 'assets/scss/paper-kit.scss?v=1.3.0';
import 'assets/demo/demo.css?v=1.3.0';
// pages
import LandingPage from 'views/LandingPage.js';
import AdminView from 'views/AdminView';
import Typography from 'views/Typography.js';
import TraineeView from 'views/TraineeView';

// others

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/trainee" element={<TraineeView />} />
      <Route path="/typo" element={<Typography />} />

      {/* <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      /> */}
    </Routes>
    {/* <Navigate to="/" /> */}
  </BrowserRouter>,
  document.getElementById('root')
);
