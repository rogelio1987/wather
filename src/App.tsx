import React, { FunctionComponent } from 'react';

import './App.css';
import HomePage from './pages/home/Home';



const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HomePage/>
      </header>
    </div>
  );
}



export default App;


