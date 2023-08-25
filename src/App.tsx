import React from 'react';
import './App.css';
import { useRoutes } from 'raviger';
import routes from './routes/routes';
import NavBar from './components/navbar';

function App() {
  let route = useRoutes(routes);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="canvas">
        <NavBar />
        {route}
      </div>
    </div>
  );
}

export default App;
