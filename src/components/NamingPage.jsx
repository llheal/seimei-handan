import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { suggestNames } from '../utils/nameSuggester.js'
import { fortuneClass } from '../data/fortuneData.js'

function NamingPage() {
    const navigate = useNavigate();
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('neutral');
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSuggest = useCallback(() => {
        if (!surname.trim()) return;
        setLoading(true);
        setSuggestions(null);

        // 少し遅らせてUIのローディング表示を見せる
        setTimeout(() => {
            const results = suggestNames(surname.trim(), {
                gender,
                maxResults: 30,
            });
            setSuggestions(results);
            setLoading(false);
        }, 600);
    }, [surname, gender]);

    // 候補をクリックしたら姓名鑑定ページへ遷移
    const handleSelectName = (item) => {
        const s = encodeURIComponent(surname.trim());
        const g = encodeURIComponent(item.name);
        navigate(`/analysis?surname=${s}&givenName=${g}`);
    };

    return (
        <div>
            {/* Header */}
            <header className="app-header">
                <button className="header-back" onClick={() => navigate('/')}>←</button>
                <div className="header-title">名づけ</div>
                <div className="header-subtitle">NAZUKE</div>
            </header>

            <div className="page">
                {/* Input */}
                <div className="input-section">
                    <div className="input-group">
                        <label className="input-label">姓（苗字）</label>
                        <input
                            id="naming-surname-input"
                            className="input-field"
                            type="text"
                            placeholder="例: 山田"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSuggest()}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">性別</label>
                        <div className="gender-select">
                            {[
                                { key: 'neutral', label: '指定なし' },
                                { key: 'male', label: '男の子' },
                                { key: 'female', label: '女の子' }
                            ].map(opt => (
                                <button
                                    key={opt.key}
                                    className={`gender-option ${gender === opt.key ? 'active' : ''}`}
                                    onClick={() => setGender(opt.key)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="input-hint">※ お苗字をご入力いただくと、五格・三才配置の相性が良い名前候補を自動でお探しします</p>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '16px' }}
                        onClick={handleSuggest}
                        disabled={!surname.trim()}
                    >
                        ✨ 名前候補を探す
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">最適な名前を算出中...</div>
                    </div>
                )}

                {/* Results */}
                {suggestions && !loading && (
                    <div className="result-section">
                        <div className="section-title">
                            <span className="section-title-icon">🏆</span>
                            <h2>「{surname}」さんの名づけ候補</h2>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#7A7267', marginBottom: '16px' }}>
                            候補をタップすると詳しい判断結果へ進みます
                        </p>

                        {suggestions.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '32px', color: '#7A7267' }}>
                                <p>候補が見つかりませんでした。</p>
                                <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>別のお苗字でお試しください。</p>
                            </div>
                        ) : (
                            <div className="suggestion-list">
                                {suggestions.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="suggestion-card"
                                        onClick={() => handleSelectName(item)}
                                    >
                                        <div className="suggestion-rank">
                                            {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : `${idx + 1}`}
                                        </div>
                                        <div>
                                            <div className="suggestion-name">{surname}{item.name}</div>
                                            <div className="suggestion-reading">
                                                {item.readings.slice(0, 2).join('、')}
                                            </div>
                                            {item.strokes && (
                                                <div style={{ fontSize: '0.7rem', color: '#A09888', marginTop: '2px' }}>
                                                    名前 {item.strokes.join(' + ')} = {item.strokes.reduce((a, b) => a + b, 0)}画
                                                </div>
                                            )}
                                        </div>
                                        <div className="suggestion-score">
                                            <div className="suggestion-score-num">{item.score}</div>
                                            <div className="suggestion-score-label">点</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Share section */}
                        {suggestions.length > 0 && (
                            <div className="share-section">
                                <p>名づけ候補をLINEで共有しませんか？</p>
                                <button className="btn btn-share" onClick={async () => {
                                    const top3 = suggestions.slice(0, 3).map((s, i) =>
                                        `${['🥇', '🥈', '🥉'][i]} ${surname}${s.name}（${s.readings[0]}）${s.score}点`
                                    ).join('\n');
                                    const shareText = `🌸 名づけ候補 🌸\n\n「${surname}」さんにおすすめの名前：\n${top3}\n\n🔮 あなたも占ってみませんか？\nhttps://miniapp.line.me/2009339223-6IfTVZdD`;

                                    if (window.liff && window.liff.isApiAvailable && window.liff.isApiAvailable('shareTargetPicker')) {
                                        try { await window.liff.shareTargetPicker([{ type: 'text', text: shareText }]); return; } catch (e) { }
                                    }
                                    if (window.liff && window.liff.isInClient && window.liff.isInClient()) {
                                        try { await window.liff.sendMessages([{ type: 'text', text: shareText }]); return; } catch (e) { }
                                    }
                                    if (navigator.share) {
                                        try { await navigator.share({ title: '名づけ候補', text: shareText }); return; } catch (e) { }
                                    }
                                    try {
                                        await navigator.clipboard.writeText(shareText);
                                        alert('候補をコピーしました！');
                                    } catch (e) {
                                        const ta = document.createElement('textarea');
                                        ta.value = shareText;
                                        document.body.appendChild(ta);
                                        ta.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(ta);
                                        alert('候補をコピーしました！');
                                    }
                                }}>
                                    💬 LINEで共有する
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default NamingPage;
