import React from 'react'
import ReactDOM from 'react-dom/client'
import liff from '@line/liff'
import App from './App.jsx'
import './index.css'

const LIFF_ID = '2009339223-6IfTVZdD';

async function init() {
    try {
        await liff.init({ liffId: LIFF_ID });
        window.liff = liff;
        console.log('LIFF initialized successfully');
        console.log('isInClient:', liff.isInClient());
        console.log('shareTargetPicker available:', liff.isApiAvailable('shareTargetPicker'));
    } catch (err) {
        console.warn('LIFF init failed:', err.message);
        window.liff = null;
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

init();
