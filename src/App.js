import React, {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'

function CSharpProject() {
  return <div style={{ padding: '20px' }}>This is the C# project!</div>;
}

function JavaScriptProject() {
  return <div style={{ padding: '20px' }}>This is the JS project!</div>;
}

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
