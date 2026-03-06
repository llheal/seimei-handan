import React from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AnalysisPage from './components/AnalysisPage.jsx'
import NamingPage from './components/NamingPage.jsx'

function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className="bottom-nav">
            <button
                className={`bottom-nav-item ${path === '/' ? 'active' : ''}`}
                onClick={() => navigate('/')}
            >
                <span className="bottom-nav-icon">🏠</span>
                <span className="bottom-nav-label">ホーム</span>
            </button>
            <button
                className={`bottom-nav-item ${path === '/analysis' ? 'active' : ''}`}
                onClick={() => navigate('/analysis')}
            >
                <span className="bottom-nav-icon">🔮</span>
                <span className="bottom-nav-label">姓名判断</span>
            </button>
            <button
                className={`bottom-nav-item ${path === '/naming' ? 'active' : ''}`}
                onClick={() => navigate('/naming')}
            >
                <span className="bottom-nav-icon">✨</span>
                <span className="bottom-nav-label">名づけ</span>
            </button>
        </nav>
    );
}

function App() {
    return (
        <HashRouter>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/naming" element={<NamingPage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
                <BottomNav />
            </div>
        </HashRouter>
    );
}

export default App;
