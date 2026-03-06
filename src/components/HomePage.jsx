import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INFO_DATA = {
    gokaku: {
        title: '📊 五格とは',
        body: [
            '名前の画数から算出する5つの運勢の柱です。',
            '',
            '【天格】姓の総画数 → 家系・先祖の運勢',
            '【人格】姓の最後＋名の最初 → 性格・才能・中年期',
            '【地格】名の総画数 → 幼少期・家庭環境',
            '【外格】総画数−人格 → 対人関係・社会運',
            '【総格】姓名の全画数 → 一生の総合運・晩年期',
            '',
            '各格の画数には大吉〜凶の吉凶があり、総合的にお名前の運勢を判断します。',
        ].join('\n'),
    },
    sansai: {
        title: '🔥 三才配置とは',
        body: [
            '天格・人格・地格の画数の1の位から、それぞれの五行（木・火・土・金・水）を算出し、3つの相性を見る手法です。',
            '',
            '【相生（そうしょう）】互いに助け合う良い組み合わせ',
            '  木→火→土→金→水→木',
            '【相剋（そうこく）】互いに傷つけ合う悪い組み合わせ',
            '  木→土→水→火→金→木',
            '【比和（ひわ）】同じ五行で調和する組み合わせ',
            '',
            '天・人・地の三才のバランスが良いほど、健康運や対人運が安定するとされています。',
        ].join('\n'),
    },
    inyou: {
        title: '☯️ 陰陽配列とは',
        body: [
            '名前の各文字の画数が奇数（陽）か偶数（陰）かを見て、バランスを判断する手法です。',
            '',
            '【良い配列】陰と陽が交互に並ぶ、バランスの取れた配列',
            '【注意すべき配列】全て同じ（全陽・全陰）や偏った配列',
            '',
            '陰陽のバランスが良いお名前は、物事が円滑に進みやすいとされています。',
        ].join('\n'),
    },
};

function HomePage() {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(null);

    return (
        <div>
            {/* Hero */}
            <section className="hero" style={{ padding: '40px 20px 28px' }}>
                <div className="hero-icon" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🌸</div>
                <h1 style={{ color: '#fff', fontSize: '1.6rem', letterSpacing: '0.12em', marginBottom: '6px' }}>
                    姓名判断・名づけ
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', letterSpacing: '0.12em' }}>
                    五格・三才配置・陰陽配列で占う
                </p>
            </section>

            {/* Feature Cards */}
            <div style={{ padding: '16px 16px 80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div className="feature-card" onClick={() => navigate('/analysis')} style={{ padding: '20px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🔮</span>
                        <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>姓名判断</h3>
                        <p style={{ fontSize: '0.72rem', lineHeight: '1.6' }}>
                            お名前の画数から<br />運勢を占います
                        </p>
                    </div>
                    <div className="feature-card" onClick={() => navigate('/naming')} style={{ padding: '20px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>✨</span>
                        <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>名づけ提案</h3>
                        <p style={{ fontSize: '0.72rem', lineHeight: '1.6' }}>
                            お苗字に合う<br />良い名前を提案
                        </p>
                    </div>
                </div>

                {/* Info Cards - clickable */}
                <div style={{
                    background: 'linear-gradient(135deg, #F5F3EF, #FFF8F0)',
                    borderRadius: '16px',
                    padding: '16px',
                    border: '1px solid #E8E4DD',
                    marginBottom: '14px'
                }}>
                    <h4 style={{
                        fontSize: '0.82rem', color: '#1B2A4A', marginBottom: '10px',
                        fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                        📖 姓名判断とは
                    </h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                            { key: 'gokaku', icon: '📊', title: '五格', desc: '天・人・地・外・総' },
                            { key: 'sansai', icon: '🔥', title: '三才配置', desc: '五行の相性' },
                            { key: 'inyou', icon: '☯️', title: '陰陽配列', desc: '画数の調和' },
                        ].map(item => (
                            <div
                                key={item.key}
                                onClick={() => setPopup(item.key)}
                                style={{
                                    flex: 1, textAlign: 'center', padding: '8px 4px',
                                    background: '#fff', borderRadius: '10px', cursor: 'pointer',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                            >
                                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icon}</div>
                                <div style={{
                                    fontSize: '0.7rem', fontWeight: 700, color: '#1B2A4A',
                                    marginBottom: '2px', fontFamily: 'var(--font-serif)'
                                }}>{item.title}</div>
                                <div style={{ fontSize: '0.6rem', color: '#7A7267', lineHeight: '1.4' }}>{item.desc}</div>
                                <div style={{ fontSize: '0.55rem', color: '#A09888', marginTop: '4px' }}>タップで詳しく ▶</div>
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

            {/* Popup Modal */}
            {popup && (
                <div
                    onClick={() => setPopup(null)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.5)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        padding: '24px', animation: 'fadeIn 0.2s ease',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fff', borderRadius: '20px',
                            padding: '28px 24px', maxWidth: '400px', width: '100%',
                            maxHeight: '80vh', overflow: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            animation: 'slideUp 0.25s ease',
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.1rem', fontFamily: 'var(--font-serif)',
                            color: '#1B2A4A', marginBottom: '16px',
                            borderBottom: '2px solid #E8E4DD', paddingBottom: '12px',
                        }}>
                            {INFO_DATA[popup].title}
                        </h3>
                        <div style={{
                            fontSize: '0.82rem', lineHeight: '1.9', color: '#3A3530',
                            whiteSpace: 'pre-wrap',
                        }}>
                            {INFO_DATA[popup].body}
                        </div>
                        <button
                            onClick={() => setPopup(null)}
                            style={{
                                marginTop: '20px', width: '100%', padding: '12px',
                                background: '#1B2A4A', color: '#fff', border: 'none',
                                borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
