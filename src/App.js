// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import VideoPage from './components/VideoPage/VideoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Defina "/" para carregar Login por padrão */}
        <Route path="/video" element={<VideoPage />} />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
