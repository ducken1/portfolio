import React, {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import CSharpProject from './pages/CSharpProject';
import JavaScriptProject from './pages/JavaScriptProject';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csharp" element={<CSharpProject />} />
        <Route path="/javascript" element={<JavaScriptProject />} />
      </Routes>
    </Router>
  );
}

export default App;
