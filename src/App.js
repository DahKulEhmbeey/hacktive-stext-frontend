import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppShell from './components/AppShell';

function App() {
  return (
    <div className="App">
      <Router>
        <AppShell />
      </Router>
    </div>
  );
}

export default App;
