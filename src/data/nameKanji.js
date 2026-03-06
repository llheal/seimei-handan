// ============================================================
// 人名用漢字候補データ (Name Kanji Candidates)
// 日本の名づけパターンに基づいた頭字（先頭）と止め字（末尾）の分類
// ============================================================

// 男の子の頭字（名前の最初の文字）
export const MALE_HEAD = [
    { kanji: '大', readings: ['だい', 'ひろ'], strokes: 3 },
    { kanji: '悠', readings: ['ゆう', 'はる'], strokes: 11 },
    { kanji: '陽', readings: ['はる', 'よう'], strokes: 12 },
    { kanji: '翔', readings: ['しょう', 'かける'], strokes: 12 },
    { kanji: '蓮', readings: ['れん'], strokes: 13 },
    { kanji: '颯', readings: ['そう'], strokes: 14 },
    { kanji: '蒼', readings: ['そう', 'あお'], strokes: 13 },
    { kanji: '湊', readings: ['みなと', 'そう'], strokes: 12 },
    { kanji: '健', readings: ['けん'], strokes: 11 },
    { kanji: '真', readings: ['しん', 'ま'], strokes: 10 },
    { kanji: '直', readings: ['なお'], strokes: 8 },
    { kanji: '和', readings: ['かず'], strokes: 8 },
    { kanji: '亮', readings: ['りょう'], strokes: 9 },
    { kanji: '裕', readings: ['ゆう'], strokes: 12 },
    { kanji: '雅', readings: ['まさ'], strokes: 12 },
    { kanji: '智', readings: ['とも', 'さと'], strokes: 12 },
    { kanji: '誠', readings: ['まこと'], strokes: 13 },
    { kanji: '拓', readings: ['たく'], strokes: 8 },
    { kanji: '奏', readings: ['そう', 'かなで'], strokes: 9 },
    { kanji: '晴', readings: ['はる', 'せい'], strokes: 12 },
    { kanji: '新', readings: ['あら', 'しん'], strokes: 13 },
    { kanji: '修', readings: ['しゅう'], strokes: 10 },
    { kanji: '浩', readings: ['こう', 'ひろ'], strokes: 10 },
    { kanji: '康', readings: ['こう', 'やす'], strokes: 11 },
    { kanji: '隆', readings: ['りゅう', 'たか'], strokes: 11 },
    { kanji: '博', readings: ['ひろ'], strokes: 12 },
    { kanji: '琉', readings: ['る'], strokes: 11 },
    { kanji: '龍', readings: ['りゅう'], strokes: 16 },
    { kanji: '慶', readings: ['けい'], strokes: 15 },
    { kanji: '賢', readings: ['けん'], strokes: 15 },
    { kanji: '明', readings: ['あき'], strokes: 8 },
    { kanji: '剛', readings: ['ごう'], strokes: 10 },
    { kanji: '勇', readings: ['ゆう'], strokes: 9 },
    { kanji: '武', readings: ['たけ'], strokes: 8 },
    { kanji: '航', readings: ['こう'], strokes: 10 },
];

// 男の子の止め字（名前の最後の文字）
export const MALE_TAIL = [
    { kanji: '太', readings: ['た'], strokes: 4 },
    { kanji: '斗', readings: ['と'], strokes: 4 },
    { kanji: '翔', readings: ['と'], strokes: 12 },
    { kanji: '樹', readings: ['き'], strokes: 15 },
    { kanji: '也', readings: ['や'], strokes: 3 },
    { kanji: '哉', readings: ['や'], strokes: 9 },
    { kanji: '郎', readings: ['ろう'], strokes: 9 },
    { kanji: '介', readings: ['すけ'], strokes: 4 },
    { kanji: '助', readings: ['すけ'], strokes: 7 },
    { kanji: '平', readings: ['へい'], strokes: 5 },
    { kanji: '人', readings: ['と'], strokes: 2 },
    { kanji: '生', readings: ['き', 'お'], strokes: 5 },
    { kanji: '馬', readings: ['ま'], strokes: 10 },
    { kanji: '志', readings: ['し'], strokes: 7 },
    { kanji: '真', readings: ['ま'], strokes: 10 },
    { kanji: '輝', readings: ['き'], strokes: 15 },
    { kanji: '希', readings: ['き'], strokes: 7 },
    { kanji: '紀', readings: ['き'], strokes: 9 },
    { kanji: '陽', readings: ['ひ'], strokes: 12 },
    { kanji: '成', readings: ['なり'], strokes: 6 },
    { kanji: '仁', readings: ['と', 'じん'], strokes: 4 },
    { kanji: '吾', readings: ['ご'], strokes: 7 },
];

// 女の子の頭字
export const FEMALE_HEAD = [
    { kanji: '結', readings: ['ゆい', 'ゆう'], strokes: 12 },
    { kanji: '陽', readings: ['ひな', 'はる'], strokes: 12 },
    { kanji: '美', readings: ['み'], strokes: 9 },
    { kanji: '愛', readings: ['あい', 'まな'], strokes: 13 },
    { kanji: '咲', readings: ['さき', 'さ'], strokes: 9 },
    { kanji: '彩', readings: ['あや'], strokes: 11 },
    { kanji: '真', readings: ['ま'], strokes: 10 },
    { kanji: '桜', readings: ['さくら'], strokes: 10 },
    { kanji: '千', readings: ['ち'], strokes: 3 },
    { kanji: '紗', readings: ['さ'], strokes: 10 },
    { kanji: '優', readings: ['ゆう', 'ゆ'], strokes: 17 },
    { kanji: '菜', readings: ['な'], strokes: 11 },
    { kanji: '花', readings: ['はな', 'か'], strokes: 7 },
    { kanji: '心', readings: ['こ'], strokes: 4 },
    { kanji: '詩', readings: ['うた', 'し'], strokes: 13 },
    { kanji: '瑞', readings: ['みず'], strokes: 13 },
    { kanji: '琴', readings: ['こと'], strokes: 12 },
    { kanji: '雪', readings: ['ゆき'], strokes: 11 },
    { kanji: '夏', readings: ['なつ'], strokes: 10 },
    { kanji: '鈴', readings: ['すず'], strokes: 13 },
    { kanji: '柚', readings: ['ゆず', 'ゆ'], strokes: 9 },
    { kanji: '莉', readings: ['り'], strokes: 10 },
    { kanji: '杏', readings: ['あん'], strokes: 7 },
    { kanji: '茉', readings: ['ま'], strokes: 8 },
    { kanji: '芽', readings: ['め'], strokes: 8 },
];

// 女の子の止め字
export const FEMALE_TAIL = [
    { kanji: '子', readings: ['こ'], strokes: 3 },
    { kanji: '美', readings: ['み'], strokes: 9 },
    { kanji: '菜', readings: ['な'], strokes: 11 },
    { kanji: '花', readings: ['か'], strokes: 7 },
    { kanji: '奈', readings: ['な'], strokes: 8 },
    { kanji: '里', readings: ['り'], strokes: 7 },
    { kanji: '香', readings: ['か'], strokes: 9 },
    { kanji: '恵', readings: ['え'], strokes: 10 },
    { kanji: '音', readings: ['ね'], strokes: 9 },
    { kanji: '穂', readings: ['ほ'], strokes: 15 },
    { kanji: '乃', readings: ['の'], strokes: 2 },
    { kanji: '葉', readings: ['は'], strokes: 12 },
    { kanji: '月', readings: ['つき'], strokes: 4 },
    { kanji: '彩', readings: ['さ'], strokes: 11 },
    { kanji: '絵', readings: ['え'], strokes: 12 },
    { kanji: '実', readings: ['み'], strokes: 8 },
    { kanji: '織', readings: ['おり'], strokes: 18 },
    { kanji: '瑠', readings: ['る'], strokes: 14 },
    { kanji: '璃', readings: ['り'], strokes: 15 },
    { kanji: '紗', readings: ['さ'], strokes: 10 },
    { kanji: '帆', readings: ['ほ'], strokes: 6 },
    { kanji: '咲', readings: ['さき', 'さ'], strokes: 9 },
    { kanji: '良', readings: ['ら'], strokes: 7 },
];

// 中性的に使える名前パターン
export const NEUTRAL_HEAD = [
    { kanji: '光', readings: ['ひかる', 'こう'], strokes: 6 },
    { kanji: '純', readings: ['じゅん'], strokes: 10 },
    { kanji: '碧', readings: ['あおい', 'あお'], strokes: 14 },
    { kanji: '凪', readings: ['なぎ'], strokes: 6 },
    { kanji: '薫', readings: ['かおる'], strokes: 16 },
    { kanji: '晶', readings: ['あきら'], strokes: 12 },
    { kanji: '涼', readings: ['りょう', 'すず'], strokes: 11 },
    { kanji: '潤', readings: ['じゅん'], strokes: 15 },
    { kanji: '楓', readings: ['かえで'], strokes: 13 },
    { kanji: '春', readings: ['はる'], strokes: 9 },
];

// 一文字名（男の子）
export const MALE_SINGLE = [
    { kanji: '翔', readings: ['しょう', 'かける'], strokes: 12 },
    { kanji: '蓮', readings: ['れん'], strokes: 13 },
    { kanji: '湊', readings: ['みなと'], strokes: 12 },
    { kanji: '樹', readings: ['いつき'], strokes: 15 },
    { kanji: '誠', readings: ['まこと'], strokes: 13 },
    { kanji: '亮', readings: ['りょう'], strokes: 9 },
    { kanji: '駿', readings: ['しゅん'], strokes: 17 },
    { kanji: '輝', readings: ['ひかる'], strokes: 15 },
    { kanji: '悠', readings: ['ゆう', 'はるか'], strokes: 11 },
    { kanji: '健', readings: ['たける'], strokes: 11 },
    { kanji: '剛', readings: ['つよし'], strokes: 10 },
    { kanji: '拳', readings: ['けん'], strokes: 10 },
];

// 一文字名（女の子）
export const FEMALE_SINGLE = [
    { kanji: '凛', readings: ['りん'], strokes: 15 },
    { kanji: '葵', readings: ['あおい'], strokes: 12 },
    { kanji: '桜', readings: ['さくら'], strokes: 10 },
    { kanji: '栞', readings: ['しおり'], strokes: 10 },
    { kanji: '渚', readings: ['なぎさ'], strokes: 11 },
    { kanji: '瞳', readings: ['ひとみ'], strokes: 15 },
    { kanji: '梢', readings: ['こずえ'], strokes: 11 },
    { kanji: '環', readings: ['たまき'], strokes: 17 },
    { kanji: '萌', readings: ['もえ'], strokes: 11 },
    { kanji: '茜', readings: ['あかね'], strokes: 9 },
    { kanji: '杏', readings: ['あんず'], strokes: 7 },
    { kanji: '雫', readings: ['しずく'], strokes: 11 },
];

export default {
    MALE_HEAD, MALE_TAIL,
    FEMALE_HEAD, FEMALE_TAIL,
    NEUTRAL_HEAD,
    MALE_SINGLE, FEMALE_SINGLE,
};
