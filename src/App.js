import React from 'react';
import { ProviderProvider } from './context/ProviderContext';
import HomePage from './components/HomePage';
import './App.css';

function App() {
    return (
        <ProviderProvider>
            <HomePage />
        </ProviderProvider>
    );
}

export default App;
