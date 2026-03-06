// ============================================================
// 名づけエンジン (Name Suggestion Engine)
// 日本の名づけパターン（頭字＋止め字）で自然な名前を生成
// ============================================================
import { getStrokeCount } from '../data/kanjiStrokes.js';
import { getStrokeFortune, fortuneScore } from '../data/fortuneData.js';
import { calculateFiveGrids, calculateOverallScore } from './fiveGrids.js';
import { analyzeThreeElements } from './threeElements.js';
import { analyzeYinYang } from './yinYangBalance.js';
import {
    MALE_HEAD, MALE_TAIL,
    FEMALE_HEAD, FEMALE_TAIL,
    NEUTRAL_HEAD,
    MALE_SINGLE, FEMALE_SINGLE,
} from '../data/nameKanji.js';

/**
 * 苗字に対して最適な名前候補を提案する
 */
export function suggestNames(surname, options = {}) {
    const {
        gender = 'neutral',
        maxResults = 20,
    } = options;

    if (!surname) return [];

    const candidates = [];

    // 性別に応じた漢字リストを取得
    let headList, tailList, singleList;
    if (gender === 'male') {
        headList = [...MALE_HEAD, ...NEUTRAL_HEAD];
        tailList = MALE_TAIL;
        singleList = MALE_SINGLE;
    } else if (gender === 'female') {
        headList = [...FEMALE_HEAD, ...NEUTRAL_HEAD];
        tailList = FEMALE_TAIL;
        singleList = FEMALE_SINGLE;
    } else {
        headList = [...MALE_HEAD, ...FEMALE_HEAD, ...NEUTRAL_HEAD];
        tailList = [...MALE_TAIL, ...FEMALE_TAIL];
        singleList = [...MALE_SINGLE, ...FEMALE_SINGLE];
    }

    // 重複除去
    const seenHead = new Set();
    headList = headList.filter(k => {
        if (seenHead.has(k.kanji)) return false;
        seenHead.add(k.kanji);
        return true;
    });

    const seenTail = new Set();
    tailList = tailList.filter(k => {
        if (seenTail.has(k.kanji)) return false;
        seenTail.add(k.kanji);
        return true;
    });

    // === 二文字名の候補生成 ===
    for (const head of headList) {
        for (const tail of tailList) {
            // 同じ漢字は避ける
            if (head.kanji === tail.kanji) continue;

            const name = head.kanji + tail.kanji;
            const result = evaluateCandidate(surname, name);
            if (result && result.score >= 70) {
                // 読みの組み合わせ
                const readings = [];
                for (const hr of head.readings.slice(0, 2)) {
                    for (const tr of tail.readings.slice(0, 1)) {
                        readings.push(hr + tr);
                    }
                }

                candidates.push({
                    name,
                    readings,
                    strokes: [head.strokes, tail.strokes],
                    ...result
                });
            }
        }
    }

    // === 一文字名の候補生成 ===
    const seenSingle = new Set();
    for (const single of singleList) {
        if (seenSingle.has(single.kanji)) continue;
        seenSingle.add(single.kanji);

        const result = evaluateCandidate(surname, single.kanji);
        if (result && result.score >= 65) {
            candidates.push({
                name: single.kanji,
                readings: single.readings,
                strokes: [single.strokes],
                ...result
            });
        }
    }

    // スコアでソートして上位を返す
    candidates.sort((a, b) => b.score - a.score);

    // 重複する名前を除去
    const seen = new Set();
    const uniqueCandidates = candidates.filter(c => {
        if (seen.has(c.name)) return false;
        seen.add(c.name);
        return true;
    });

    return uniqueCandidates.slice(0, maxResults);
}

/**
 * 名前候補を評価する
 * ※ AnalysisPage と同じスコアリングを使用
 */
function evaluateCandidate(surname, givenName) {
    try {
        const fiveGrids = calculateFiveGrids(surname, givenName);
        if (!fiveGrids) return null;

        const threeElements = analyzeThreeElements(fiveGrids);
        const yinYang = analyzeYinYang(surname, givenName);

        // AnalysisPage と同じ calculateOverallScore を使用
        const score = calculateOverallScore(fiveGrids);

        return {
            score,
            fiveGrids,
            threeElements,
            yinYang
        };
    } catch {
        return null;
    }
}
