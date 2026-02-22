import React, { useState } from 'react';
import './App.css';
import HttpClient from './components/HttpClient';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HTTP Client</h1>
      </header>
      <main>
        <HttpClient />
      </main>
    </div>
  );
}

export default App;
