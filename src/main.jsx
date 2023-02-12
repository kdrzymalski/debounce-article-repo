import React from 'react';
import ReactDOM from 'react-dom/client';
import ComponentWithOwnDebounce from './OwnDebounce.jsx';
import ControlledInput from './ControlledInput.jsx';
import ComponentWithHookDebounce from './DebounceWithHook.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ControlledInput />
    <hr />
    <ComponentWithOwnDebounce />
    <hr />
    <ComponentWithHookDebounce />
  </React.StrictMode>
);
