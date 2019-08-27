import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        {props.children ? props.children : <Link to='/question'>Take the survey</Link>}
      </header>
    </div>
  );
}

export default App;
