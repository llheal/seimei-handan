// ============================================================
// 三才配置 (Three Elements / Five Phases Analysis)
// ============================================================
import { strokeToElement, getSansaiFortune, ELEMENT_COLORS, ELEMENT_NAMES } from '../data/fortuneData.js';

/**
 * 三才配置を分析する
 * @param {object} fiveGrids - calculateFiveGrids() の結果
 * @returns {object} 三才配置の分析結果
 */
export function analyzeThreeElements(fiveGrids) {
    if (!fiveGrids) return null;

    const tenElement = fiveGrids.tenkaku.element;
    const jinElement = fiveGrids.jinkaku.element;
    const chiElement = fiveGrids.chikaku.element;

    const fortune = getSansaiFortune(tenElement, jinElement, chiElement);

    // 五行の相性関係を分析
    const tenJinRelation = getRelation(tenElement, jinElement);
    const jinChiRelation = getRelation(jinElement, chiElement);

    return {
        elements: {
            ten: { name: '天', element: tenElement, color: ELEMENT_COLORS[tenElement], english: ELEMENT_NAMES[tenElement] },
            jin: { name: '人', element: jinElement, color: ELEMENT_COLORS[jinElement], english: ELEMENT_NAMES[jinElement] },
            chi: { name: '地', element: chiElement, color: ELEMENT_COLORS[chiElement], english: ELEMENT_NAMES[chiElement] }
        },
        combination: `${tenElement}-${jinElement}-${chiElement}`,
        fortune,
        relations: {
            tenJin: tenJinRelation,
            jinChi: jinChiRelation
        }
    };
}

/**
 * 二つの五行間の関係を判定
 * @returns {object} { type: '相生'|'相剋'|'比和', desc: string }
 */
function getRelation(element1, element2) {
    // 比和（同じ五行）
    if (element1 === element2) {
        return { type: '比和', desc: `${element1}と${element2}は同じ五行で調和しています。`, favorable: true };
    }

    // 相生の関係
    const soushou = {
        '木': '火', // 木生火
        '火': '土', // 火生土
        '土': '金', // 土生金
        '金': '水', // 金生水
        '水': '木'  // 水生木
    };

    if (soushou[element1] === element2) {
        return { type: '相生', desc: `${element1}が${element2}を生み出す良い関係です。`, favorable: true };
    }
    if (soushou[element2] === element1) {
        return { type: '相生', desc: `${element2}が${element1}を生み出す良い関係です。`, favorable: true };
    }

    // 相剋の関係
    return { type: '相剋', desc: `${element1}と${element2}は緊張関係にありますが、お互いを高め合う力にもなります。`, favorable: false };
}

/**
 * 五行の説明テキスト
 */
export const ELEMENT_DESCRIPTIONS = {
    '木': '成長・発展・柔軟性を象徴します。春のように生命力にあふれ、上に向かって伸びていく力を持ちます。',
    '火': '情熱・活力・明るさを象徴します。夏のように燃え盛るエネルギーで周囲を照らし、人を引きつける力があります。',
    '土': '安定・信頼・包容力を象徴します。大地のように万物を育み、周囲に安心感を与える力があります。',
    '金': '正義・決断・純粋さを象徴します。秋のように実りをもたらし、物事を整理し研ぎ澄ます力があります。',
    '水': '知恵・柔軟・生命力を象徴します。冬のように静かに力を蓄え、万物を育てる根源的な力があります。'
};
