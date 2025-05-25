// Import necessary modules and components
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Create a root container and render the App component wrapped in StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <App />
  </StrictMode>
);
/**
 * StrictMode is a component in React that helps you write better code by highlighting potential problems in your application. 
 * It does not render any visible UI. Instead, it activates additional checks and warnings for its descendants
 */