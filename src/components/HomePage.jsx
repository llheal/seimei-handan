import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            {/* Hero - compact but styled */}
            <section className="hero" style={{ padding: '40px 20px 28px' }}>
                <div className="hero-icon" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🌸</div>
                <h1 style={{ color: '#fff', fontSize: '1.6rem', letterSpacing: '0.12em', marginBottom: '6px' }}>
                    姓名判断・名づけ
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', letterSpacing: '0.12em' }}>
                    五格・三才配置・陰陽配列で占う
                </p>
            </section>

            {/* Main content - stays in viewport */}
            <div style={{ padding: '16px 16px 80px' }}>
                {/* Two feature cards side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div
                        className="feature-card"
                        onClick={() => navigate('/analysis')}
                        style={{ padding: '20px 16px', textAlign: 'center' }}
                    >
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🔮</span>
                        <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>姓名判断</h3>
                        <p style={{ fontSize: '0.72rem', lineHeight: '1.6' }}>
                            お名前の画数から<br />運勢を占います
                        </p>
                    </div>

                    <div
                        className="feature-card"
                        onClick={() => navigate('/naming')}
                        style={{ padding: '20px 16px', textAlign: 'center' }}
                    >
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>✨</span>
                        <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>名づけ提案</h3>
                        <p style={{ fontSize: '0.72rem', lineHeight: '1.6' }}>
                            お苗字に合う<br />良い名前を提案
                        </p>
                    </div>
                </div>

                {/* How it works - compact info */}
                <div style={{
                    background: 'linear-gradient(135deg, #F5F3EF, #FFF8F0)',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E8E4DD',
                    marginBottom: '14px'
                }}>
                    <h4 style={{
                        fontSize: '0.82rem',
                        color: '#1B2A4A',
                        marginBottom: '10px',
                        fontFamily: 'var(--font-serif)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        📖 姓名判断とは
                    </h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                            { icon: '📊', title: '五格', desc: '天・人・地・外・総' },
                            { icon: '🔥', title: '三才配置', desc: '五行の相性' },
                            { icon: '☯️', title: '陰陽配列', desc: '画数の調和' },
                        ].map(item => (
                            <div key={item.title} style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '8px 4px',
                                background: '#fff',
                                borderRadius: '10px',
                            }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icon}</div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#1B2A4A',
                                    marginBottom: '2px',
                                    fontFamily: 'var(--font-serif)'
                                }}>{item.title}</div>
                                <div style={{ fontSize: '0.6rem', color: '#7A7267', lineHeight: '1.4' }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', fontSize: '0.6rem', color: '#A09888', paddingTop: '4px' }}>
                    <div style={{ marginBottom: '4px' }}>
                        <a href="/privacy.html" target="_blank" rel="noopener" style={{ color: '#7A7267', textDecoration: 'none', marginRight: '12px' }}>
                            プライバシーポリシー
                        </a>
                        <a href="/terms.html" target="_blank" rel="noopener" style={{ color: '#7A7267', textDecoration: 'none' }}>
                            利用規約
                        </a>
                    </div>
                    © 2026 UNIIS公式通販
                </div>
            </div>
        </div>
    );
}

export default HomePage;
