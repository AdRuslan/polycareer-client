import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HashRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook.';

import './App.scss';

function App() {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isReady, isLogin }}
    >
      <div className="app">
        <HashRouter>
          <Navbar />
          <main>{routes}</main>
          {isLogin ? <Footer /> : <footer></footer>}
        </HashRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
