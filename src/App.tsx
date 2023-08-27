import React from 'react';
import './App.css';
import { useRoutes } from 'raviger';
import routes from './routes/routes';
import NavBar from './components/navbar';
import { Provider } from 'react-redux';
import reduxStore from './utils/redux/store';

function App() {
  let route = useRoutes(routes);
  return (
    <div className="App">
      <Provider store={reduxStore}>
        <div className="canvas">
          <NavBar />
          {route}
        </div>
      </Provider>
    </div>
  );
}

export default App;
