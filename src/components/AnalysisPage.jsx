import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { calculateFiveGrids, calculateOverallScore, getOverallEvaluation } from '../utils/fiveGrids.js'
import { analyzeThreeElements, ELEMENT_DESCRIPTIONS } from '../utils/threeElements.js'
import { analyzeYinYang } from '../utils/yinYangBalance.js'
import { fortuneClass } from '../data/fortuneData.js'

function AnalysisPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [surname, setSurname] = useState('');
    const [givenName, setGivenName] = useState('');
    const [result, setResult] = useState(null);
    const [openGrids, setOpenGrids] = useState({});
    const autoAnalyzed = useRef(false);

    const runAnalysis = useCallback((s, g) => {
        if (!s || !g) return;
        const fiveGrids = calculateFiveGrids(s, g);
        if (!fiveGrids) return;

        const threeElements = analyzeThreeElements(fiveGrids);
        const yinYang = analyzeYinYang(s, g);
        const score = calculateOverallScore(fiveGrids, threeElements, yinYang);
        const evaluation = getOverallEvaluation(score);

        setResult({ fiveGrids, threeElements, yinYang, score, evaluation });
        setOpenGrids({});
    }, []);

    // URLクエリパラメータから自動鑑定
    useEffect(() => {
        if (autoAnalyzed.current) return;
        const searchParams = new URLSearchParams(location.search);
        const s = searchParams.get('surname');
        const g = searchParams.get('givenName');
        if (s && g) {
            autoAnalyzed.current = true;
            setSurname(s);
            setGivenName(g);
            // 次のレンダーまで待ってから鑑定実行
            setTimeout(() => runAnalysis(s, g), 100);
        }
    }, [location.search, runAnalysis]);

    const handleAnalyze = useCallback(() => {
        if (!surname.trim() || !givenName.trim()) return;
        runAnalysis(surname.trim(), givenName.trim());
    }, [surname, givenName, runAnalysis]);

    const toggleGrid = (key) => {
        setOpenGrids(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleShare = async () => {
        const shareText = `🌸 姓名判断の結果 🌸\n\n【${surname} ${givenName}】\n総合スコア: ${result.score}/100点（${result.evaluation.label}）\n\n天格 ${result.fiveGrids.tenkaku.value}画（${result.fiveGrids.tenkaku.rating}）\n人格 ${result.fiveGrids.jinkaku.value}画（${result.fiveGrids.jinkaku.rating}）\n地格 ${result.fiveGrids.chikaku.value}画（${result.fiveGrids.chikaku.rating}）\n外格 ${result.fiveGrids.gaikaku.value}画（${result.fiveGrids.gaikaku.rating}）\n総格 ${result.fiveGrids.soukaku.value}画（${result.fiveGrids.soukaku.rating}）\n\n🔮 あなたも占ってみませんか？\nhttps://miniapp.line.me/2009339223-6IfTVZdD`;

        // 1. shareTargetPicker（友だち選択して送信）
        if (window.liff && window.liff.isApiAvailable && window.liff.isApiAvailable('shareTargetPicker')) {
            try {
                await window.liff.shareTargetPicker([{
                    type: 'text',
                    text: shareText,
                }]);
                return;
            } catch (e) {
                console.warn('shareTargetPicker failed:', e);
            }
        }
        // 2. sendMessages（LINE内のみ）
        if (window.liff && window.liff.isInClient && window.liff.isInClient()) {
            try {
                await window.liff.sendMessages([{ type: 'text', text: shareText }]);
                return;
            } catch (e) {
                console.warn('sendMessages failed:', e);
            }
        }
        // 3. Web Share API
        if (navigator.share) {
            try {
                await navigator.share({ title: '姓名判断の結果', text: shareText });
                return;
            } catch (e) { /* user cancelled */ }
        }
        // 4. クリップボード
        try {
            await navigator.clipboard.writeText(shareText);
            alert('判断結果をコピーしました！');
        } catch (e) {
            // 最終フォールバック: テキストエリアを使ったコピー
            const ta = document.createElement('textarea');
            ta.value = shareText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            alert('判断結果をコピーしました！');
        }
    };

    const getElementClass = (element) => {
        const map = { '木': 'element-wood', '火': 'element-fire', '土': 'element-earth', '金': 'element-metal', '水': 'element-water' };
        return map[element] || '';
    };

    const getElementBg = (element) => {
        const map = { '木': '#2D8B4E', '火': '#C53D43', '土': '#B8860B', '金': '#7B7B7B', '水': '#1B5E8A' };
        return map[element] || '#7B7B7B';
    };

    return (
        <div>
            {/* Header */}
            <header className="app-header">
                <button className="header-back" onClick={() => navigate('/')}>←</button>
                <div className="header-title">姓名判断</div>
                <div className="header-subtitle">SEIMEI HANDAN</div>
            </header>

            <div className="page">
                {/* Input */}
                <div className="input-section">
                    <div className="input-group">
                        <label className="input-label">姓（苗字）</label>
                        <input
                            id="surname-input"
                            className="input-field"
                            type="text"
                            placeholder="例: 田中"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && document.getElementById('givenname-input')?.focus()}
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">名（名前）</label>
                        <input
                            id="givenname-input"
                            className="input-field"
                            type="text"
                            placeholder="例: 太郎"
                            value={givenName}
                            onChange={e => setGivenName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                        />
                    </div>
                    <p className="input-hint">※ 漢字・ひらがな・カタカナに対応しています</p>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '16px' }}
                        onClick={handleAnalyze}
                        disabled={!surname.trim() || !givenName.trim()}
                    >
                        🔮 占う
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="result-section">
                        {/* Name Display */}
                        <div className="name-display">
                            <span className="name-display-surname">{surname}</span>
                            {' '}
                            <span className="name-display-givenname">{givenName}</span>
                            <div className="name-display-strokes">
                                {result.fiveGrids.surname.chars.map((c, i) => (
                                    <span key={`s-${i}`} className="name-display-stroke-item">
                                        <strong>{c.char}</strong> {c.strokes}画
                                    </span>
                                ))}
                                {result.fiveGrids.givenName.chars.map((c, i) => (
                                    <span key={`g-${i}`} className="name-display-stroke-item">
                                        <strong>{c.char}</strong> {c.strokes}画
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="score-display">
                            <div className="score-number">{result.score}<span style={{ fontSize: '0.4em', fontWeight: 400, opacity: 0.7 }}>/100点</span></div>
                            <div className="score-label">総合スコア</div>
                            <div className="score-evaluation">
                                <span className="score-evaluation-label">{result.evaluation.label}</span>
                                <p className="score-evaluation-desc">{result.evaluation.desc}</p>
                            </div>
                        </div>

                        {/* Five Grids */}
                        <div className="grid-section slide-up">
                            <div className="section-title">
                                <span className="section-title-icon">📊</span>
                                <h2>五格</h2>
                            </div>

                            {['tenkaku', 'jinkaku', 'chikaku', 'gaikaku', 'soukaku'].map((key, idx) => {
                                const grid = result.fiveGrids[key];
                                const isOpen = openGrids[key];
                                return (
                                    <div key={key} className={`expandable-card ${isOpen ? 'open' : ''}`} style={{ animationDelay: `${idx * 0.08}s` }}>
                                        <button className="expandable-header" onClick={() => toggleGrid(key)}>
                                            <div className="grid-strokes">
                                                {grid.value}<span>画</span>
                                            </div>
                                            <div className="grid-info">
                                                <div className="grid-name">{grid.label}</div>
                                                <div className="grid-sublabel">{grid.sublabel}</div>
                                            </div>
                                            <span className={`fortune-badge ${fortuneClass(grid.rating)}`}>
                                                {grid.rating}
                                            </span>
                                            <span className="expandable-arrow">▼</span>
                                        </button>
                                        {isOpen && (
                                            <div className="expandable-body fade-in">
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                                    <span className={`element-badge ${getElementClass(grid.element)}`}>
                                                        五行: {grid.element}
                                                    </span>
                                                </div>
                                                <p className="grid-desc">{grid.desc}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Three Elements */}
                        {result.threeElements && (
                            <div className="sansai-display slide-up">
                                <div className="section-title">
                                    <span className="section-title-icon">🔥</span>
                                    <h2>三才配置</h2>
                                </div>

                                <div className="sansai-elements">
                                    {['ten', 'jin', 'chi'].map((key, idx) => {
                                        const elem = result.threeElements.elements[key];
                                        return (
                                            <React.Fragment key={key}>
                                                {idx > 0 && <span className="sansai-arrow">→</span>}
                                                <div className="sansai-element">
                                                    <div
                                                        className="sansai-element-circle"
                                                        style={{ background: getElementBg(elem.element) }}
                                                    >
                                                        <span className="element-name">{elem.element}</span>
                                                        <span className="element-type">{elem.english}</span>
                                                    </div>
                                                    <div className="sansai-element-label">{elem.name}格</div>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>

                                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                                    <span className={`fortune-badge ${fortuneClass(result.threeElements.fortune.rating)}`}>
                                        {result.threeElements.fortune.rating}
                                    </span>
                                </div>

                                <div className="sansai-relation">
                                    <p className="sansai-relation-desc">{result.threeElements.fortune.desc}</p>
                                </div>

                                {/* Relations */}
                                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {['tenJin', 'jinChi'].map(relKey => {
                                        const rel = result.threeElements.relations[relKey];
                                        const labels = { tenJin: '天↔人', jinChi: '人↔地' };
                                        return (
                                            <div key={relKey} style={{
                                                flex: 1,
                                                padding: '10px',
                                                background: '#fff',
                                                borderRadius: '10px',
                                                textAlign: 'center',
                                                minWidth: '120px'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700,
                                                    color: rel.favorable ? '#2D8B4E' : '#C53D43',
                                                    marginBottom: '4px'
                                                }}>
                                                    {labels[relKey]} {rel.type}
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: '#7A7267', lineHeight: 1.5 }}>
                                                    {rel.desc}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Yin-Yang */}
                        {result.yinYang && (
                            <div className="yinyang-display slide-up">
                                <div className="section-title">
                                    <span className="section-title-icon">☯️</span>
                                    <h2>陰陽配列</h2>
                                </div>

                                <div className="yinyang-chars">
                                    {result.yinYang.fullArray.map((item, idx) => (
                                        <div key={idx} className={`yinyang-char ${item.yinYang === '陽' ? 'yang' : 'yin'}`}>
                                            <span className="char-text">{item.char}</span>
                                            <span className="char-strokes">{item.strokes}画</span>
                                            <span className="char-yy">{item.yinYang}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="yinyang-result">
                                    <span className={`fortune-badge ${fortuneClass(result.yinYang.rating)}`}>
                                        {result.yinYang.rating}
                                    </span>
                                    <p className="yinyang-result-desc">{result.yinYang.desc}</p>
                                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#A09888' }}>
                                        陽 {result.yinYang.stats.yangCount}文字 / 陰 {result.yinYang.stats.yinCount}文字
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Share */}
                        <div className="share-section">
                            <p>判断結果をLINEで共有しませんか？</p>
                            <button className="btn btn-share" onClick={handleShare}>
                                💬 LINEで共有する
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnalysisPage;
