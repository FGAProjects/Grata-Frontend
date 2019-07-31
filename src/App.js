import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './Router';

import CustomLayout from './containers/Layout';

function App() {
  return (
    <div className="App">
      <Router>
      <CustomLayout>
          <BaseRouter></BaseRouter>
      </CustomLayout> 
      </Router>
    </div>
  );
}

export default App;
