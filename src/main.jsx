import React from 'react'
import ReactDOM from 'react-dom/client'
import liff from '@line/liff'
import App from './App.jsx'
import './index.css'

async function init() {
    try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID || '0000000000-xxxxxxxx' });
        window.liff = liff;
        console.log('LIFF initialized');
    } catch (err) {
        console.warn('LIFF init failed:', err.message);
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

init();
