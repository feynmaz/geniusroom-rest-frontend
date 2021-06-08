import logo from './logo.svg';
import React from 'react'
import './App.css';
import { useRoutes } from "./routes.js";
import { BrowserRouter } from 'react-router-dom'

function App() {
  const routes = useRoutes()
  return (
      <BrowserRouter>
         <div className="App">
          {routes}
        </div>
      </BrowserRouter>
  )
}

export default App;
