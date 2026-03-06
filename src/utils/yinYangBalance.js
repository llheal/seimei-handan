// ============================================================
// 陰陽配列 (Yin-Yang Balance Analysis)
// ============================================================
import { getStrokeCount } from '../data/kanjiStrokes.js';

/**
 * 陰陽配列を分析する
 * @param {string} surname - 姓
 * @param {string} givenName - 名
 * @returns {object} 陰陽の分析結果
 */
export function analyzeYinYang(surname, givenName) {
    if (!surname || !givenName) return null;

    const fullName = surname + givenName;
    const chars = Array.from(fullName);

    const yinYangArray = chars.map(char => {
        const strokes = getStrokeCount(char) || 0;
        return {
            char,
            strokes,
            yinYang: strokes % 2 === 0 ? '陰' : '陽',
            symbol: strokes % 2 === 0 ? '☰' : '☷' // 易の卦象
        };
    });

    const surnameLen = Array.from(surname).length;
    const surnameYY = yinYangArray.slice(0, surnameLen);
    const givenNameYY = yinYangArray.slice(surnameLen);

    // パターン分析
    const allYang = yinYangArray.every(y => y.yinYang === '陽');
    const allYin = yinYangArray.every(y => y.yinYang === '陰');
    const yangCount = yinYangArray.filter(y => y.yinYang === '陽').length;
    const yinCount = yinYangArray.filter(y => y.yinYang === '陰').length;

    // 交互パターンチェック
    let isAlternating = true;
    for (let i = 1; i < yinYangArray.length; i++) {
        if (yinYangArray[i].yinYang === yinYangArray[i - 1].yinYang) {
            isAlternating = false;
            break;
        }
    }

    // 姓と名の接続部のバランス
    const lastSurname = surnameYY[surnameYY.length - 1];
    const firstGivenName = givenNameYY[0];
    const connectionBalance = lastSurname && firstGivenName && lastSurname.yinYang !== firstGivenName.yinYang;

    // 評価判定
    let rating, desc;

    if (allYang) {
        rating = '凶';
        desc = 'すべての文字が陽（奇数画）に偏っています。エネルギーが強すぎる傾向があり、バランスに注意が必要です。ただし、力強さと行動力の象徴でもあります。';
    } else if (allYin) {
        rating = '凶';
        desc = 'すべての文字が陰（偶数画）に偏っています。やや消極的な傾向が出やすくなりますが、慎重さと思慮深さの表れでもあります。';
    } else if (isAlternating) {
        rating = '大吉';
        desc = '陰と陽が交互に並ぶ理想的な配列です。バランスの取れたエネルギーが流れ、調和のとれた人生を歩めるでしょう。';
    } else if (connectionBalance && Math.abs(yangCount - yinCount) <= 1) {
        rating = '大吉';
        desc = '陰陽のバランスが非常に良好で、姓と名の接続部も調和しています。安定したエネルギーに恵まれるでしょう。';
    } else if (connectionBalance) {
        rating = '吉';
        desc = '姓と名の接続部で陰陽が切り替わり、良い流れが生まれています。全体的にバランスの取れた配列です。';
    } else if (Math.abs(yangCount - yinCount) <= 1) {
        rating = '吉';
        desc = '陰陽の数がほぼ均等で、バランスの取れた配列です。穏やかなエネルギーが流れるでしょう。';
    } else {
        rating = '吉凶混合';
        desc = '陰陽にやや偏りがありますが、大きな支障はございません。ご自身の努力で運勢は十分に開けるでしょう。';
    }

    return {
        fullArray: yinYangArray,
        surname: surnameYY,
        givenName: givenNameYY,
        stats: {
            yangCount,
            yinCount,
            total: yinYangArray.length,
            isAlternating,
            allYang,
            allYin,
            connectionBalance
        },
        rating,
        desc
    };
}
