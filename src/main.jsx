import React from 'react'
import ReactDOM from 'react-dom/client'
import ComponentWithOwnDebounce from './OwnDebounce.jsx'
import ComponentWithDebounceOptimized from "./DebounceOptimized";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ComponentWithOwnDebounce />
    <hr/>
    <ComponentWithDebounceOptimized />
  </React.StrictMode>
)
