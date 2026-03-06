// ============================================================
// 五格推命 (Five Grids Calculation Engine)
// ============================================================
import { getStrokeCount, getTotalStrokes } from '../data/kanjiStrokes.js';
import { getStrokeFortune, strokeToElement } from '../data/fortuneData.js';

/**
 * 五格を計算する
 * @param {string} surname - 姓（苗字）
 * @param {string} givenName - 名（名前）
 * @returns {object} 五格の計算結果
 */
export function calculateFiveGrids(surname, givenName) {
    if (!surname || !givenName) return null;

    const surnameChars = Array.from(surname);
    const givenNameChars = Array.from(givenName);

    // 各文字の画数を取得
    const surnameStrokes = surnameChars.map(c => getStrokeCount(c) || 0);
    const givenNameStrokes = givenNameChars.map(c => getStrokeCount(c) || 0);

    const surnameTotal = surnameStrokes.reduce((a, b) => a + b, 0);
    const givenNameTotal = givenNameStrokes.reduce((a, b) => a + b, 0);

    // --- 天格 (Ten-kaku): 姓の総画数 ---
    // 1文字姓の場合は霊数(1)を加える
    let tenkaku;
    if (surnameChars.length === 1) {
        tenkaku = surnameTotal + 1; // 霊数
    } else {
        tenkaku = surnameTotal;
    }

    // --- 人格 (Jin-kaku): 姓の末字 + 名の初字 ---
    const jinkaku = surnameStrokes[surnameStrokes.length - 1] + givenNameStrokes[0];

    // --- 地格 (Chi-kaku): 名の総画数 ---
    // 1文字名の場合は霊数(1)を加える
    let chikaku;
    if (givenNameChars.length === 1) {
        chikaku = givenNameTotal + 1; // 霊数
    } else {
        chikaku = givenNameTotal;
    }

    // --- 総格 (Sou-kaku): 姓名全体の総画数 ---
    const soukaku = surnameTotal + givenNameTotal;

    // --- 外格 (Gai-kaku): 総格 - 人格 ---
    // 1文字姓 + 1文字名の場合は霊数を使用
    let gaikaku;
    if (surnameChars.length === 1 && givenNameChars.length === 1) {
        gaikaku = 2; // 1+1（霊数×2）
    } else if (surnameChars.length === 1) {
        // 姓の先頭（霊数1）+ 名の末尾
        gaikaku = 1 + givenNameStrokes[givenNameStrokes.length - 1];
    } else if (givenNameChars.length === 1) {
        // 姓の先頭 + 名の末尾（霊数1）
        gaikaku = surnameStrokes[0] + 1;
    } else {
        // 姓の先頭 + 名の末尾
        gaikaku = surnameStrokes[0] + givenNameStrokes[givenNameStrokes.length - 1];
    }

    // 外格が0以下にならないよう保護
    if (gaikaku <= 0) gaikaku = 1;

    // 各格の吉凶を取得
    const tenkakuFortune = getStrokeFortune(tenkaku);
    const jinkakuFortune = getStrokeFortune(jinkaku);
    const chikakuFortune = getStrokeFortune(chikaku);
    const gaikakuFortune = getStrokeFortune(gaikaku);
    const soukakuFortune = getStrokeFortune(soukaku);

    // 五行を取得
    const tenkakuElement = strokeToElement(tenkaku);
    const jinkakuElement = strokeToElement(jinkaku);
    const chikakuElement = strokeToElement(chikaku);

    return {
        surname: {
            text: surname,
            chars: surnameChars.map((c, i) => ({ char: c, strokes: surnameStrokes[i] })),
            totalStrokes: surnameTotal
        },
        givenName: {
            text: givenName,
            chars: givenNameChars.map((c, i) => ({ char: c, strokes: givenNameStrokes[i] })),
            totalStrokes: givenNameTotal
        },
        tenkaku: {
            value: tenkaku,
            label: '天格',
            sublabel: '祖先運',
            ...tenkakuFortune,
            element: tenkakuElement
        },
        jinkaku: {
            value: jinkaku,
            label: '人格',
            sublabel: '主運（性格・才能）',
            ...jinkakuFortune,
            element: jinkakuElement
        },
        chikaku: {
            value: chikaku,
            label: '地格',
            sublabel: '初運（幼少期）',
            ...chikakuFortune,
            element: chikakuElement
        },
        gaikaku: {
            value: gaikaku,
            label: '外格',
            sublabel: '助運（対人関係）',
            ...gaikakuFortune,
            element: strokeToElement(gaikaku)
        },
        soukaku: {
            value: soukaku,
            label: '総格',
            sublabel: '総運（一生の運勢）',
            ...soukakuFortune,
            element: strokeToElement(soukaku)
        }
    };
}

/**
 * 五格の総合スコアを計算(0-100)
 */
export function calculateOverallScore(fiveGrids) {
    if (!fiveGrids) return 0;

    const grids = ['tenkaku', 'jinkaku', 'chikaku', 'gaikaku', 'soukaku'];
    const weights = {
        tenkaku: 0.10, // 天格は変えられないので重みを低く
        jinkaku: 0.30, // 最重要
        chikaku: 0.20,
        gaikaku: 0.15,
        soukaku: 0.25
    };

    let totalScore = 0;
    grids.forEach(grid => {
        const rating = fiveGrids[grid].rating;
        let score;
        switch (rating) {
            case '大吉': score = 100; break;
            case '吉': score = 80; break;
            case '吉凶混合': score = 60; break;
            case '凶': score = 40; break;
            case '大凶': score = 20; break;
            default: score = 50;
        }
        totalScore += score * weights[grid];
    });

    return Math.round(totalScore);
}

/**
 * 総合評価テキストを返す
 */
export function getOverallEvaluation(score) {
    if (score >= 90) return { label: '最高', desc: 'この名前は素晴らしい運勢に恵まれた、最高の命名です。すべての面でバランスが取れており、幸福な人生が期待できるでしょう。' };
    if (score >= 80) return { label: '大変良い', desc: 'この名前は非常に良い運勢を持っています。主要な運格が吉以上で、バランスの良い命名です。' };
    if (score >= 70) return { label: '良い', desc: 'この名前は全体的に良い運勢を持っています。いくつかの運格で更なる改善の余地がありますが、おおむね好ましい命名です。' };
    if (score >= 60) return { label: '普通', desc: 'この名前はバランスの取れた運勢を持っています。特に大きな問題はありませんが、より良い候補も検討してみてはいかがでしょうか。' };
    if (score >= 50) return { label: 'やや注意', desc: 'この名前にはいくつかの注意点がございます。ただし、名前の運勢は人生の一要素ですので、前向きにお考えください。' };
    return { label: '要検討', desc: 'この名前の運勢にはいくつかの課題がございます。良運命名機能で、より良い候補を探してみることもお勧めいたします。' };
}
