import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

import { AuthProvider } from './contexts/auth';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        
        <Routes />
      </AuthProvider>
    </Router>
  );
};

export default App;
