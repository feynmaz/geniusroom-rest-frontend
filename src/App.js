import React from 'react'
import { useRoutes } from "./routes.js";
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.js';
import { AuthContext } from './context/AuthContext.js';

function App() {
  const { access, grantAccess, closeAccess } = useAuth() 
  const routes = useRoutes()
  return (
      <BrowserRouter>
        <AuthContext.Provider value={{access, grantAccess, closeAccess}}>
          <div className="App">
            {routes}
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
  )
}

export default App;
