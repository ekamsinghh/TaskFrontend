import React from 'react';
import {Toaster} from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import PointHistory from './pages/PointHistory';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/history/:id" element={<PointHistory />}></Route>
        </Routes>
      </Router>

      <Toaster 
        toastOptions={{
          className: '',
          style: {
            fontSize:"13px",
          },

        }}
      />
    </div>
  );
}

export default App;
