import React from 'react'
import { useRoutes } from "./routes.js";
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.js';
import { AuthContext } from './context/AuthContext.js';

function App() {
  const {refresh, access, validateAccess, validateRefresh, login, logout } = useAuth() 
  const routes = useRoutes()
  return (
      <BrowserRouter>
        <AuthContext.Provider value={{refresh, access, validateAccess, validateRefresh, login, logout}}>
            {routes}
        </AuthContext.Provider>
      </BrowserRouter>
  )
}

export default App;
