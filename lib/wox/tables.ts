export type SaveObject = Record<string, unknown>;
export type PathSegment = string | number;
export type ValueType = 'string' | 'number' | 'bool' | 'null' | 'object' | 'array';

export const STAT_KEYS = ['body', 'mind', 'will', 'charm', 'luck'] as const;
export type StatKey = (typeof STAT_KEYS)[number];

export const STAT_LABELS: Record<StatKey, { th: string; en: string }> = {
  body: { th: 'กาย', en: 'Body' },
  mind: { th: 'ปัญญา', en: 'Mind' },
  will: { th: 'จิต', en: 'Will' },
  charm: { th: 'เสน่ห์', en: 'Charm' },
  luck: { th: 'โชค', en: 'Luck' },
};

export interface QuickFieldDef {
  label: string;
  group: string;
  path: string[];
  max?: number;
}

export const QUICK_FIELDS: QuickFieldDef[] = [
  { label: 'ชื่อ (ไทย)', group: 'ตัวตน', path: ['name', 'th'] },
  { label: 'ชื่อ (อังกฤษ)', group: 'ตัวตน', path: ['name', 'en'] },
  { label: 'เงิน (ตำลึง)', group: 'ทรัพย์และชื่อเสียง', path: ['money'], max: 99999999 },
  { label: 'ชื่อเสียง', group: 'ทรัพย์และชื่อเสียง', path: ['fame'] },
  { label: 'กรรม', group: 'ทรัพย์และชื่อเสียง', path: ['karma'] },
  { label: 'เกียรติยศ', group: 'ทรัพย์และชื่อเสียง', path: ['renown'] },
  { label: 'อายุ (เดือน)', group: 'ชีวิตและการบำเพ็ญ', path: ['ageMonths'] },
  { label: 'สุขภาพ', group: 'ชีวิตและการบำเพ็ญ', path: ['health'], max: 100 },
  { label: 'ลมปราณ', group: 'ชีวิตและการบำเพ็ญ', path: ['qi'] },
  { label: 'ขั้นบำเพ็ญ (realm)', group: 'ชีวิตและการบำเพ็ญ', path: ['realm'] },
  { label: 'ชั้น (layer)', group: 'ชีวิตและการบำเพ็ญ', path: ['layer'] },
  { label: 'กาย', group: 'ค่าสถานะ 5 ด้าน', path: ['stats', 'body'] },
  { label: 'ปัญญา', group: 'ค่าสถานะ 5 ด้าน', path: ['stats', 'mind'] },
  { label: 'จิต', group: 'ค่าสถานะ 5 ด้าน', path: ['stats', 'will'] },
  { label: 'เสน่ห์', group: 'ค่าสถานะ 5 ด้าน', path: ['stats', 'charm'] },
  { label: 'โชค', group: 'ค่าสถานะ 5 ด้าน', path: ['stats', 'luck'] },
  { label: 'ชื่อเสียงเสีย (infamy)', group: 'อื่น ๆ', path: ['infamy'] },
  { label: 'infamy ของสายตระกูล', group: 'อื่น ๆ', path: ['lineInfamy'] },
  { label: 'ระดับฐานะ (wealth)', group: 'อื่น ๆ', path: ['wealth'] },
  { label: 'ความเร็วบำเพ็ญ (pace)', group: 'อื่น ๆ', path: ['pace'] },
  { label: 'คูลดาวน์ทะลวง', group: 'อื่น ๆ', path: ['breakCooldown'] },
  { label: 'ปีโบนัส (bonusYears)', group: 'อื่น ๆ', path: ['bonusYears'] },
  { label: 'ยังมีชีวิตอยู่', group: 'อื่น ๆ', path: ['alive'] },
  { label: 'กำลังฝึกฝน', group: 'อื่น ๆ', path: ['cultivating'] },
];

export const FATE = [
  ['passing', 'ดาวผ่านฟ้า', 'A passing star', 0],
  ['support', 'ดาวค้ำชะตา', 'The steadying star', 2],
  ['falling', 'ดาวร่วง', 'The falling star', 3],
  ['dark', 'ดาวทมิฬ', 'The dark star', 5],
  ['rival', 'ดาวคู่ชะตา', 'The twin star', 7],
  ['lead', 'ดาวนำชะตา', 'The star the tale follows', 10],
] as const;

export const FATE_MAP = new Map<string, (typeof FATE)[number]>(FATE.map((f) => [f[0], f]));

export const BG = [
  ['poor', 'ครอบครัวยากจน', 'Poor family'],
  ['middle', 'ครอบครัวปานกลาง', 'Middle-class family'],
  ['rich', 'ตระกูลใหญ่', 'Wealthy clan'],
  ['martial', 'ตระกูลยุทธภพ', 'Martial family'],
  ['bandit', 'ตระกูลโจร', 'Bandit family'],
  ['tribe', 'ชนเผ่าชาวเขา', 'Hill tribe'],
  ['noble', 'ตระกูลขุนนาง', 'Noble family'],
  ['royal', 'ราชสำนัก', 'Imperial family'],
  ['fallen', 'ตระกูลตกอับ', 'Fallen clan'],
  ['cultSmall', 'ตระกูลผู้ฝึกตนเล็ก', 'Minor cultivator clan'],
  ['cultBig', 'ตระกูลผู้ฝึกตนใหญ่', 'Great cultivator clan'],
  ['demonic', 'ตระกูลมาร', 'Demonic clan'],
] as const;

export const STRUCT = [
  ['both', 'พ่อแม่ครบ', 'Both parents'],
  ['single', 'มีแค่พ่อหรือแม่', 'Single parent'],
  ['orphan', 'กำพร้า', 'Orphan'],
  ['adopted', 'ถูกรับเลี้ยง', 'Adopted'],
] as const;

export const ROOTT = [
  ['none', 0, 'ไม่มีรากปราณ', 'No spiritual root', 0],
  ['pseudo', 1, 'รากเทียม (5 ธาตุ)', 'Pseudo root (5 elements)', 5],
  ['four', 2, 'รากสี่ธาตุ', 'Four-element root', 4],
  ['three', 4, 'รากสามธาตุ', 'Three-element root', 3],
  ['two', 6, 'รากสองธาตุ', 'Two-element root', 2],
  ['heavenly', 8, 'รากสวรรค์ (1 ธาตุ)', 'Heavenly root (1 element)', 1],
  ['special', 10, 'รากธาตุพิเศษ', 'Special-element root', 1],
] as const;

export const ROOT_MAP = new Map<string, { cost: number; th: string; en: string; count: number }>(
  ROOTT.map((r) => [r[0], { cost: r[1], th: r[2], en: r[3], count: r[4] }])
);

export const ELEM = [
  ['metal', 'ทอง', 'Metal'],
  ['wood', 'ไม้', 'Wood'],
  ['water', 'น้ำ', 'Water'],
  ['fire', 'ไฟ', 'Fire'],
  ['earth', 'ดิน', 'Earth'],
  ['lightning', 'สายฟ้า', 'Lightning'],
  ['ice', 'น้ำแข็ง', 'Ice'],
  ['wind', 'ลม', 'Wind'],
] as const;

export const EL5 = ELEM.slice(0, 5);
export const ELX = ELEM.slice(5);

export const SINEW = [
  ['common', 'เส้นเอ็นสามัญ', 'Common sinews'],
  ['sturdy', 'เส้นเอ็นแกร่ง', 'Sturdy sinews'],
  ['fine', 'เส้นเอ็นยอดเยี่ยม', 'Fine sinews'],
  ['tiger', 'เส้นเอ็นพยัคฆ์', 'Tiger sinews'],
  ['dragon', 'เส้นเอ็นมังกร', 'Dragon sinews'],
] as const;

export interface TalentDef {
  id: string;
  good: boolean;
  tier: number;
  crossing: boolean;
  fx: Record<string, number>;
  th: string;
  en: string;
}

const RAW_TAL: Array<[string, number, number, number, Record<string, number>, string, string]> = [
  ['martialPeak', 1, 3, 1, {}, 'ยอดยุทธ์', 'Peak of the martial way'],
  ['dragonFocus', 1, 3, 1, {}, 'สมาธิดั่งมังกร', 'Focus of the dragon'],
  ['memory', 1, 1, 0, { mind: 10 }, 'ความจำดี', 'Sharp memory'],
  ['sturdy', 1, 1, 0, { body: 10 }, 'ร่างแข็งแรง', 'Sturdy body'],
  ['silver', 1, 1, 0, { charm: 10 }, 'ปากหวาน', 'Silver tongue'],
  ['heavenEye', 1, 2, 0, { luck: 10 }, 'ดวงตาสวรรค์', 'Heavenly eyes'],
  ['pureYin', 1, 2, 0, {}, 'กายหยินบริสุทธิ์', 'Pure Yin body'],
  ['daoHeart', 1, 2, 0, { will: 10 }, 'หัวใจเต๋ามั่นคง', 'Steadfast Dao heart'],
  ['ancientBody', 1, 4, 0, { body: 25 }, 'กายเทพโบราณ', 'Ancient divine body'],
  ['dragonBlood', 1, 4, 0, { body: 10, will: 10 }, 'สายเลือดมังกร', 'Dragon bloodline'],
  ['shortLived', 0, 2, 0, {}, 'อายุสั้น', 'Short-lived'],
  ['unlucky', 0, 1, 0, { luck: -20 }, 'ดวงตกต่ำ', 'Ill-starred'],
  ['frail', 0, 2, 0, { body: -15 }, 'ร่างอ่อนแอ', 'Frail'],
  ['hothead', 0, 1, 0, { will: -10 }, 'ใจร้อน', 'Hot-headed'],
  ['doomStar', 0, 2, 0, { luck: -25 }, 'ดาวหายนะ', 'Star of calamity'],
  ['quickWit', 1, 1, 0, { mind: 5 }, 'ปฏิภาณว่องไว', 'Quick wit'],
  ['herculean', 1, 1, 0, { body: 5 }, 'พละกำลังมหาศาล', 'Herculean strength'],
  ['ironWill', 1, 1, 0, { will: 10 }, 'ใจหินผา', 'Iron will'],
  ['peerlessBeauty', 1, 2, 0, { charm: 20 }, 'งามล่มเมือง', 'Peerless beauty'],
  ['heavensFavor', 1, 2, 0, { luck: 5 }, 'ฟ้าโปรดปราน', "Heaven's favourite"],
  ['quickHealer', 1, 1, 0, {}, 'บาดแผลหายไว', 'Quick healer'],
  ['merchantMind', 1, 1, 0, { mind: 5 }, 'หัวการค้า', "Merchant's mind"],
  ['fastLearner', 1, 2, 0, {}, 'เรียนรู้ไว', 'Fast learner'],
  ['calmMind', 1, 2, 0, { will: 5 }, 'จิตสงบนิ่ง', 'Still mind'],
  ['longevity', 1, 2, 0, {}, 'ชะตาอายุยืน', 'Long-lived'],
  ['strongSoul', 1, 2, 0, { mind: 5 }, 'วิญญาณแกร่งกล้า', 'Mighty soul'],
  ['sixthSense', 1, 2, 0, { luck: 10 }, 'สัมผัสที่หก', 'Sixth sense'],
  ['poisonProof', 1, 2, 0, { body: 5 }, 'กายต้านพิษ', 'Poison-proof body'],
  ['bornLeader', 1, 2, 0, { charm: 10, will: 5 }, 'ผู้นำโดยกำเนิด', 'Born leader'],
  ['martialBones', 1, 2, 0, { body: 10 }, 'กระดูกยุทธ์', 'Martial bones'],
  ['swordBone', 1, 3, 0, { body: 5, will: 5 }, 'กระดูกกระบี่', 'Sword bones'],
  ['pureYang', 1, 2, 0, { body: 5 }, 'กายหยางบริสุทธิ์', 'Pure Yang body'],
  ['innateQi', 1, 4, 0, {}, 'กายปราณกำเนิด', 'Innate qi body'],
  ['phoenixBody', 1, 4, 0, { body: 10 }, 'กายหงส์อมตะ', 'Undying phoenix body'],
  ['demonBlood', 1, 3, 0, { body: 15 }, 'สายเลือดอสูร', 'Demon bloodline'],
  ['lazy', 0, 2, 0, {}, 'เกียจคร้าน', 'Idle'],
  ['sickly', 0, 1, 0, { body: -5 }, 'ขี้โรค', 'Sickly'],
  ['slowWit', 0, 1, 0, { mind: -15 }, 'หัวช้า', 'Slow-witted'],
  ['ugly', 0, 1, 0, { charm: -20 }, 'หน้าตาอัปลักษณ์', 'Ill-favoured face'],
  ['blockedMeridians', 0, 2, 0, {}, 'เส้นลมปราณอุดตัน', 'Blocked meridians'],
  ['fragileHeart', 0, 1, 0, { will: -10 }, 'ใจเปราะบาง', 'Fragile heart'],
  ['spendthrift', 0, 1, 0, {}, 'มือเติบ', 'Spendthrift'],
  ['heartDemon', 0, 2, 0, {}, 'มารในใจ', 'Demon in the heart'],
  ['coward', 0, 1, 0, { will: -15 }, 'ขี้ขลาด', 'Faint-hearted'],
  ['bloodCurse', 0, 2, 0, { luck: -10 }, 'คำสาปสายเลือด', 'Blood curse'],
  ['jinxed', 0, 1, 0, { luck: -10 }, 'เคราะห์ซ้ำกรรมซัด', 'Jinxed'],
  ['goldenTouch', 1, 1, 0, {}, 'ทองคำไหลมาเทมา', 'Golden touch'],
  ['kindHeart', 1, 1, 0, { charm: 5 }, 'ใจบุญ', 'Kind heart'],
  ['risingStar', 1, 1, 0, {}, 'ดาวรุ่งพุ่งแรง', 'Rising star'],
  ['diligentDisciple', 1, 1, 0, { will: 5 }, 'ศิษย์ขยัน', 'Diligent disciple'],
  ['toughHide', 1, 1, 0, {}, 'หนังเหนียว', 'Tough hide'],
  ['ironBody', 1, 3, 0, { body: 10 }, 'กายเหล็กไหล', 'Iron body'],
  ['hawkEye', 1, 1, 0, { luck: 5, mind: 5 }, 'สายตาเหยี่ยว', "Hawk's eye"],
  ['heavenlyVoice', 1, 2, 0, { charm: 10 }, 'เสียงสวรรค์', 'Heavenly voice'],
  ['oldSoul', 1, 2, 0, { mind: 10, will: 5 }, 'วิญญาณเก่าแก่', 'Old soul'],
  ['frostBody', 1, 3, 0, {}, 'กายวิญญาณน้ำแข็ง', 'Frost spirit body'],
  ['flameBody', 1, 3, 0, { body: 5 }, 'กายธาตุเพลิง', 'Flame body'],
  ['spotless', 1, 2, 0, {}, 'กายไร้มลทิน', 'Spotless body'],
  ['warriorHeart', 1, 2, 0, { body: 5, will: 5 }, 'ใจนักรบ', "Warrior's heart"],
  ['enlightenedMind', 1, 3, 0, { mind: 15 }, 'ปัญญาญาณ', 'Enlightened mind'],
  ['survivor', 1, 2, 0, { luck: 5 }, 'ผู้รอดชีวิต', 'Survivor'],
  ['emperorStar', 1, 4, 0, { charm: 15, luck: 10 }, 'ดวงจักรพรรดิ', "Emperor's star"],
  ['pastLife', 1, 4, 0, { mind: 10 }, 'ความทรงจำชาติก่อน', 'Memories of a past life'],
  ['divineBlood', 1, 4, 0, { body: 5, mind: 5, will: 5, charm: 5, luck: 5 }, 'สายเลือดเทพ', 'Divine bloodline'],
  ['winebibber', 0, 1, 0, {}, 'ติดสุรา', 'Wine-bibber'],
  ['thinSkin', 0, 1, 0, {}, 'กายเปราะ', 'Thin-skinned'],
  ['coldHeart', 0, 1, 0, { charm: -5 }, 'ใจทมิฬ', 'Cold heart'],
  ['obscure', 0, 1, 0, {}, 'อาภัพชื่อเสียง', 'Doomed to obscurity'],
  ['forgetful', 0, 1, 0, { mind: -10 }, 'ขี้หลงขี้ลืม', 'Forgetful'],
  ['coldBody', 0, 1, 0, {}, 'กายเย็นชืด', 'Sluggish body'],
  ['anemic', 0, 1, 0, { body: -10 }, 'เลือดจาง', 'Thin-blooded'],
  ['sharpTongue', 0, 1, 0, { charm: -15 }, 'ปากเสีย', 'Sharp tongue'],
  ['scatteredMind', 0, 1, 0, { will: -5 }, 'จิตฟุ้งซ่าน', 'Scattered mind'],
  ['greedy', 0, 1, 0, {}, 'ใจโลภ', 'Greedy'],
  ['clashStar', 0, 1, 0, { luck: -5 }, 'ดวงชง', 'Clashing star'],
  ['lame', 0, 1, 0, { body: -10 }, 'ขาพิการ', 'Lame leg'],
];

// Double check jinxed fx from editor.js: in editor.js line 209: ["jinxed",0,1,0,{},"เคราะห์ซ้ำกรรมซัด","Jinxed"]
// Correcting jinxed fx to {} so it matches editor.js 100%!
RAW_TAL[45][4] = {};

export const TAL: TalentDef[] = RAW_TAL.map(([id, g, tier, x, fx, th, en]) => ({
  id,
  good: Boolean(g),
  tier,
  crossing: Boolean(x),
  fx,
  th,
  en,
}));

export const TAL_MAP = new Map<string, TalentDef>(TAL.map((t) => [t.id, t]));

export const CONF: ReadonlyArray<readonly [string, string]> = [
  ['silver', 'sharpTongue'],
  ['sturdy', 'frail'],
  ['sturdy', 'anemic'],
  ['ancientBody', 'frail'],
  ['herculean', 'frail'],
  ['memory', 'forgetful'],
  ['memory', 'slowWit'],
  ['quickWit', 'slowWit'],
  ['quickWit', 'forgetful'],
  ['enlightenedMind', 'slowWit'],
  ['heavenEye', 'unlucky'],
  ['heavenEye', 'doomStar'],
  ['heavensFavor', 'jinxed'],
  ['heavensFavor', 'unlucky'],
  ['emperorStar', 'doomStar'],
  ['longevity', 'shortLived'],
  ['phoenixBody', 'shortLived'],
  ['peerlessBeauty', 'ugly'],
  ['heavenlyVoice', 'ugly'],
  ['ironWill', 'coward'],
  ['ironWill', 'fragileHeart'],
  ['daoHeart', 'fragileHeart'],
  ['strongSoul', 'fragileHeart'],
  ['warriorHeart', 'coward'],
  ['bornLeader', 'coward'],
  ['calmMind', 'hothead'],
  ['calmMind', 'heartDemon'],
  ['quickHealer', 'sickly'],
  ['quickHealer', 'anemic'],
  ['spotless', 'sickly'],
  ['poisonProof', 'sickly'],
  ['toughHide', 'thinSkin'],
  ['ironBody', 'thinSkin'],
  ['fastLearner', 'lazy'],
  ['merchantMind', 'spendthrift'],
  ['goldenTouch', 'spendthrift'],
  ['kindHeart', 'coldHeart'],
  ['risingStar', 'obscure'],
  ['frostBody', 'flameBody'],
  ['pureYin', 'pureYang'],
  ['innateQi', 'blockedMeridians'],
];

export const ILL_MAX = 5;

export function isConflict(a: string, b: string): boolean {
  return CONF.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

export function isProtectedPath(p: PathSegment[]): boolean {
  return p.length >= 1 && p[0] === 'tampered';
}

export function getAtPath(obj: unknown, p: PathSegment[]): unknown {
  let cur: unknown = obj;
  for (const k of p) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string | number, unknown>)[k];
  }
  return cur;
}

export function cloneState<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function typeOfValue(v: unknown): ValueType {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (typeof v === 'object') return 'object';
  if (typeof v === 'boolean') return 'bool';
  if (typeof v === 'number') return 'number';
  return 'string';
}

export const TYPE_OPTIONS: Array<{ value: ValueType; label: string }> = [
  { value: 'string', label: 'ข้อความ' },
  { value: 'number', label: 'ตัวเลข' },
  { value: 'bool', label: 'จริง/เท็จ' },
  { value: 'null', label: 'null' },
  { value: 'object', label: 'กลุ่ม {}' },
  { value: 'array', label: 'รายการ []' },
];

export function convertValue(v: unknown, t: ValueType): unknown {
  const isO = v !== null && typeof v === 'object';
  switch (t) {
    case 'string':
      return v == null ? '' : isO ? JSON.stringify(v) : String(v);
    case 'number': {
      const n = parseFloat(String(v));
      return Number.isFinite(n) ? n : v === true ? 1 : 0;
    }
    case 'bool':
      return typeof v === 'string' ? !/^\s*(|0|false|no|null)\s*$/i.test(v) : Boolean(v);
    case 'null':
      return null;
    case 'object':
      return Array.isArray(v) ? Object.assign({}, v) : isO ? v : {};
    case 'array':
      return Array.isArray(v) ? v : isO ? Object.values(v as Record<string, unknown>) : [];
  }
}

export function setStatInState(state: SaveObject, n: string, t: number): void {
  const statSrc = state.statSrc as Record<string, Record<string, number>> | undefined;
  const src = statSrc?.[n];
  if (src && typeof src === 'object') {
    const cur = Object.values(src).reduce((a, b) => a + (+b || 0), 0);
    src.event = (src.event || 0) + (t - cur);
  }
  if (state.stats && typeof state.stats === 'object') {
    (state.stats as Record<string, number>)[n] = t;
  }
  if (!state.capSeen || typeof state.capSeen !== 'object') {
    state.capSeen = {};
  }
  const capSeen = state.capSeen as Record<string, number>;
  capSeen[n] = Math.max(capSeen[n] ?? 0, t);
  if (state.yearFrom && typeof state.yearFrom === 'object') {
    const yf = state.yearFrom as Record<string, number>;
    if (n in yf) yf[n] = t;
  }
}

export function setAtPath(state: SaveObject, p: PathSegment[], v: unknown): boolean {
  if (isProtectedPath(p) || !p.length) return false;
  const stats = state.stats as Record<string, unknown> | undefined;
  if (
    p.length === 2 &&
    p[0] === 'stats' &&
    typeof v === 'number' &&
    stats &&
    typeof stats[String(p[1])] === 'number'
  ) {
    setStatInState(state, String(p[1]), v);
  } else {
    let parent: unknown = state;
    for (let i = 0; i < p.length - 1; i++) {
      const seg = p[i];
      if (parent == null || typeof parent !== 'object') return false;
      const rec = parent as Record<string | number, unknown>;
      if (rec[seg] == null || typeof rec[seg] !== 'object') {
        rec[seg] = typeof p[i + 1] === 'number' ? [] : {};
      }
      parent = rec[seg];
    }
    if (parent == null || typeof parent !== 'object') return false;
    (parent as Record<string | number, unknown>)[p[p.length - 1]] = v;
    if (
      p.length === 1 &&
      p[0] === 'renown' &&
      typeof state.renownPeak === 'number' &&
      typeof v === 'number' &&
      v > state.renownPeak
    ) {
      state.renownPeak = v;
    }
  }
  return true;
}

export function applyTalentFx(state: SaveObject, t: TalentDef, sign: 1 | -1): void {
  const stats = state.stats as Record<string, unknown> | undefined;
  if (!stats || typeof stats !== 'object') return;
  const capSeen = state.capSeen as Record<string, unknown> | undefined;
  const yearFrom = state.yearFrom as Record<string, number> | undefined;

  for (const [n, a] of Object.entries(t.fx || {})) {
    const r = stats[n];
    if (typeof r !== 'number') continue;
    const cap = capSeen?.[n];
    const hi = Math.max(typeof cap === 'number' ? cap : Infinity, r);
    const nv = Math.min(Math.max(r + sign * a, 1), hi);
    const d = nv - r;
    if (!d) continue;
    stats[n] = nv;
    if (!state.statSrc || typeof state.statSrc !== 'object') state.statSrc = {};
    const statSrc = state.statSrc as Record<string, Record<string, number>>;
    if (!statSrc[n] || typeof statSrc[n] !== 'object') statSrc[n] = {};
    statSrc[n].talent = (statSrc[n].talent || 0) + d;
    if (yearFrom && n in yearFrom) yearFrom[n] += d;
  }
}

export function getExpectedTalentFxSums(state: SaveObject): Record<string, number> {
  const sums: Record<string, number> = {};
  const list = Array.isArray(state.talents) ? (state.talents as unknown[]) : [];
  for (const id of list) {
    if (typeof id !== 'string') continue;
    const t = TAL_MAP.get(id);
    if (!t?.fx) continue;
    for (const [stat, val] of Object.entries(t.fx)) {
      sums[stat] = (sums[stat] || 0) + val;
    }
  }
  return sums;
}

export function reconcileStatSources(state: SaveObject): number {
  if (!state.stats || typeof state.stats !== 'object' || Array.isArray(state.stats)) return 0;
  if (!state.statSrc || typeof state.statSrc !== 'object' || Array.isArray(state.statSrc)) {
    state.statSrc = {};
  }
  const stats = state.stats as Record<string, unknown>;
  const statSrc = state.statSrc as Record<string, Record<string, number>>;
  const expectedTalent = getExpectedTalentFxSums(state);
  let fixed = 0;

  for (const n of STAT_KEYS) {
    const statVal = stats[n];
    if (typeof statVal !== 'number' || !Number.isFinite(statVal)) continue;
    if (!statSrc[n] || typeof statSrc[n] !== 'object' || Array.isArray(statSrc[n])) {
      statSrc[n] = { base: 0, event: statVal };
    }
    const src = statSrc[n];
    const targetTalent = expectedTalent[n] || 0;
    const prevTalent = Number(src.talent) || 0;
    const curSum = Object.values(src).reduce((a, b) => a + (+b || 0), 0);
    if (Math.abs(prevTalent - targetTalent) > 1e-6 || Math.abs(curSum - statVal) > 1e-6) {
      if (targetTalent !== 0) src.talent = targetTalent;
      else delete src.talent;
      const sumWithoutEvent = Object.entries(src)
        .filter(([k]) => k !== 'event')
        .reduce((a, [, v]) => a + (+v || 0), 0);
      src.event = statVal - sumWithoutEvent;
      fixed += 1;
    }
  }
  return fixed;
}

export function isSlotsEnabled(state: SaveObject): boolean {
  return state.talentRules === 'slots';
}

export function getGoodTalentMax(state: SaveObject): number {
  return Math.min(8, 5 + (Number(state.talentSlotsUp) || 0));
}

export function countTalentsByKind(state: SaveObject, good: boolean, skipIds?: string[]): number {
  const list = Array.isArray(state.talents) ? (state.talents as string[]) : [];
  return list
    .filter((id) => !(skipIds && skipIds.includes(id)))
    .map((id) => TAL_MAP.get(id))
    .filter((t): t is TalentDef => Boolean(t && !t.crossing && t.good === good)).length;
}

export interface LintFinding {
  level: 'error' | 'warn';
  message: string;
}

export function lintSaveState(s: SaveObject): { findings: LintFinding[]; skipped: string[] } {
  const findings: LintFinding[] = [];
  const skipped: string[] = [];
  const isObj = (v: unknown): v is Record<string, unknown> =>
    v !== null && typeof v === 'object' && !Array.isArray(v);
  const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
  const fmt = (v: unknown) => {
    const str = v === undefined ? 'ไม่มี' : JSON.stringify(v);
    return str.length > 80 ? str.slice(0, 77) + '...' : str;
  };
  const err = (m: string) => findings.push({ level: 'error', message: m });
  const warn = (m: string) => findings.push({ level: 'warn', message: m });

  if (!isObj(s.stats)) {
    err('stats ไม่ใช่ object');
  } else {
    for (const n of STAT_KEYS) {
      const v = s.stats[n];
      if (!num(v)) {
        err(`stats.${n} ไม่ใช่ตัวเลข (${fmt(v)})`);
        continue;
      }
      if (v < 1) warn(`stats.${n} = ${v} ต่ำกว่า 1`);
      const src = isObj(s.statSrc) ? s.statSrc[n] : undefined;
      if (isObj(src)) {
        const sum = Object.values(src).reduce<number>((a, b) => a + (+(b as number) || 0), 0);
        if (Math.abs(sum - v) > 1e-6) {
          warn(`statSrc.${n} รวม ${sum} ≠ stats.${n} ${v} (เกมอาจ rescale ตอนโหลด)`);
        }
      }
      const cap = isObj(s.capSeen) ? s.capSeen[n] : undefined;
      if (num(cap) && v > cap) {
        warn(`stats.${n} = ${v} เกิน capSeen.${n} = ${cap} (เกมอาจตัดค่าตอนโหลด)`);
      }
    }
  }

  if (s.health !== undefined && (!num(s.health) || s.health < 0 || s.health > 100)) {
    warn(`health นอกช่วง 0–100 (${fmt(s.health)})`);
  }
  if (s.money !== undefined && (!num(s.money) || s.money < 0)) {
    err(`money ต้องเป็นตัวเลข ≥ 0 (${fmt(s.money)})`);
  } else if (num(s.money)) {
    const moneyCap = getMoneyAlertThreshold(s.ageMonths);
    if (s.money > moneyCap) {
      warn(
        `money = ${s.money.toLocaleString()} เกินเกณฑ์ตรวจจับของเกม (~${moneyCap.toLocaleString()} สำหรับอายุ ${Math.floor((Number(s.ageMonths) || 0) / 12)} ปี)`
      );
    }
  }
  if (s.ageMonths !== undefined && (!num(s.ageMonths) || s.ageMonths < 0)) {
    err(`ageMonths ต้องเป็นตัวเลข ≥ 0 (${fmt(s.ageMonths)})`);
  }

  if (s.talents === undefined) {
    skipped.push('talents');
  } else if (!Array.isArray(s.talents)) {
    err('talents ไม่ใช่ array');
  } else {
    const seen = new Set<string>();
    for (const id of s.talents) {
      if (typeof id !== 'string' || !TAL_MAP.has(id)) {
        err(`พรสวรรค์ไม่รู้จัก: ${fmt(id)} (ไม่อยู่ในตารางเกม)`);
      } else if (seen.has(id)) {
        err(`พรสวรรค์ซ้ำ: ${id}`);
      }
      if (typeof id === 'string') seen.add(id);
    }
    for (const [x, y] of CONF) {
      if (seen.has(x) && seen.has(y)) {
        err(`พรสวรรค์ขัดกัน: ${x} ↔ ${y}`);
      }
    }
    if (s.talentRules === 'slots') {
      const gm = getGoodTalentMax(s);
      const gc = countTalentsByKind(s, true);
      const ic = countTalentsByKind(s, false);
      if (gc > gm) warn(`พรสวรรค์ดีเกินช่อง ${gc}/${gm}`);
      if (ic > ILL_MAX) warn(`พรสวรรค์ร้ายเกินช่อง ${ic}/${ILL_MAX}`);
    }
  }

  if (s.root === undefined || s.root === null) {
    skipped.push('root');
  } else if (!isObj(s.root)) {
    err('root ไม่ใช่ object');
  } else {
    const r = s.root;
    const type = r.type == null ? 'none' : String(r.type);
    const meta = ROOT_MAP.get(type);
    if (!meta) {
      err(`root.type ไม่รู้จัก: ${fmt(r.type)}`);
    } else {
      const els = Array.isArray(r.elements) ? r.elements : [];
      if (r.elements !== undefined && !Array.isArray(r.elements)) {
        err('root.elements ไม่ใช่ array');
      }
      const pool = new Set((type === 'special' ? ELX : EL5).map((x) => x[0] as string));
      if (els.length !== meta.count) {
        const msg = `root.elements มี ${els.length} ธาตุ แต่ระดับ ${type} ต้องมี ${meta.count}`;
        if (type === 'none') warn(msg);
        else err(msg);
      }
      for (const e of els) {
        if (typeof e !== 'string' || !pool.has(e)) {
          err(`root.elements: ธาตุ ${fmt(e)} ไม่อยู่ในกลุ่มของระดับ ${type}`);
        }
      }
      if (new Set(els).size !== els.length) err('root.elements มีธาตุซ้ำ');
    }
    if (r.purity !== undefined && (!num(r.purity) || r.purity < 1 || r.purity > 100)) {
      warn(`root.purity นอกช่วง 1–100 (${fmt(r.purity)})`);
    }
    if (r.known !== undefined && typeof r.known !== 'boolean') {
      warn(`root.known ไม่ใช่ boolean (${fmt(r.known)})`);
    }
  }

  const checkEnum = (key: string, rows: ReadonlyArray<readonly [string, ...unknown[]]>) => {
    if (s[key] === undefined) {
      skipped.push(key);
      return;
    }
    const valid = rows.some((r) => r[0] === s[key]);
    if (!valid) err(`${key} ไม่รู้จัก: ${fmt(s[key])}`);
  };

  checkEnum('cls', BG);
  checkEnum('structure', STRUCT);
  checkEnum('sinew', SINEW);

  if (s.structure === 'orphan' && s.cls !== undefined && s.cls !== 'poor') {
    warn(`structure=orphan แต่ cls=${fmt(s.cls)} (เกมตั้ง cls="poor" ให้เสมอตอนสร้างตัวละคร)`);
  }

  if (s.destiny === undefined || s.destiny === null) {
    skipped.push('destiny');
  } else if (!isObj(s.destiny)) {
    err('destiny ไม่ใช่ object');
  } else {
    const d = s.destiny;
    if (d.tier != null && !FATE_MAP.has(String(d.tier))) {
      err(`destiny.tier ไม่รู้จัก: ${fmt(d.tier)}`);
    }
    if (d.id != null && typeof d.id !== 'string' && !num(d.id)) {
      warn(`destiny.id ชนิดผิดปกติ (${fmt(d.id)})`);
    }
  }

  if (
    s.tampered !== undefined &&
    !(isObj(s.tampered) && num(s.tampered.at) && typeof s.tampered.why === 'string')
  ) {
    warn(`tampered รูปแบบผิดปกติ (${fmt(s.tampered)})`);
  }

  if (isObj(s.stats) && isObj(s.statSrc) && Array.isArray(s.talents)) {
    const expectedTalent = getExpectedTalentFxSums(s);
    for (const n of STAT_KEYS) {
      const src = s.statSrc[n];
      if (!isObj(src)) continue;
      const actualTalent = typeof src.talent === 'number' ? src.talent : 0;
      const exp = expectedTalent[n] || 0;
      if (Math.abs(actualTalent - exp) > 1e-6) {
        warn(`statSrc.${n}.talent = ${actualTalent} ไม่ตรงผลรวม fx ของพรสวรรค์ (${exp})`);
      }
    }
  }

  if (isObj(s.equip)) {
    const bag = isObj(s.bag) ? s.bag : {};
    for (const [slot, itemId] of Object.entries(s.equip)) {
      if (typeof itemId === 'string' && itemId) {
        const count = bag[itemId];
        if (typeof count !== 'number' || count <= 0) {
          warn(`equip.${slot} ใส่ "${itemId}" แต่ไม่มีในกระเป๋า bag หรือจำนวนเป็น 0`);
        }
      }
    }
  }

  if (isObj(s.slots)) {
    const techs = isObj(s.techs) ? s.techs : {};
    for (const kind of ['main', 'movement', 'defense'] as const) {
      const skillId = s.slots[kind];
      if (typeof skillId === 'string' && skillId && !(skillId in techs)) {
        warn(`slots.${kind} ติดตั้งวิชา "${skillId}" ที่ไม่อยู่ใน techs`);
      }
    }
    for (const kind of ['combat', 'support'] as const) {
      const arr = s.slots[kind];
      if (Array.isArray(arr)) {
        if (new Set(arr).size !== arr.length) {
          warn(`slots.${kind} มีรหัสวิชาซ้ำกัน`);
        }
        for (const skillId of arr) {
          if (typeof skillId === 'string' && skillId && !(skillId in techs)) {
            warn(`slots.${kind} ติดตั้งวิชา "${skillId}" ที่ไม่อยู่ใน techs`);
          }
        }
      }
    }
  }

  if (isObj(s.world) && Array.isArray(s.world.people)) {
    const people = s.world.people.filter(isObj);
    const rel = isObj(s.world.rel) ? s.world.rel : {};
    const findPerson = (id: unknown) => people.find((p) => p.id === id);

    if (s.follower != null) {
      const p = findPerson(s.follower);
      if (!p) {
        warn(`follower = ${fmt(s.follower)} ไม่พบตัวละคร/สัตว์ใน world.people`);
      } else {
        if (p.dead || p.ghost) {
          warn(`follower (${fmt(s.follower)}) อยู่ในสถานะเสียชีวิต/วิญญาณ`);
        }
        const r = rel[String(s.follower)];
        const tags = isObj(r) && Array.isArray(r.tags) ? r.tags : [];
        if (!tags.includes('companion')) {
          warn(`follower (${fmt(s.follower)}) ไม่มีแท็ก "companion" ใน world.rel`);
        }
      }
    }

    if (s.spouseId != null) {
      const p = findPerson(s.spouseId);
      if (!p) {
        warn(`spouseId = ${fmt(s.spouseId)} ไม่พบตัวละครใน world.people`);
      } else {
        const r = rel[String(s.spouseId)];
        const tags = isObj(r) && Array.isArray(r.tags) ? r.tags : [];
        if (!tags.includes('spouse') && !tags.includes('consort')) {
          warn(`spouseId (${fmt(s.spouseId)}) ไม่มีแท็ก "spouse" หรือ "consort" ใน world.rel`);
        }
      }
    }
  }

  return { findings, skipped };
}

export function getMoneyAlertThreshold(ageMonths: unknown): number {
  const years = Math.max(0, Math.floor((Number(ageMonths) || 0) / 12));
  return 500000 + 5000 * years;
}

export function revertAtPath(
  draft: SaveObject,
  originalState: SaveObject,
  rawPath: PathSegment[]
): boolean {
  if (!rawPath.length || isProtectedPath(rawPath)) return false;
  const origVal = getAtPath(originalState, rawPath);
  const parentPath = rawPath.slice(0, -1);
  const lastKey = rawPath[rawPath.length - 1];
  const parent = parentPath.length ? getAtPath(draft, parentPath) : draft;

  if (origVal === undefined) {
    if (Array.isArray(parent) && typeof lastKey === 'number') {
      parent.splice(lastKey, 1);
      return true;
    }
    if (parent && typeof parent === 'object') {
      delete (parent as Record<string, unknown>)[String(lastKey)];
      return true;
    }
    return false;
  }

  return setAtPath(draft, rawPath, cloneState(origVal));
}

export interface DiffEntry {
  kind: '+' | '-' | '~';
  path: string;
  rawPath: PathSegment[];
  detail: string;
}

function canonJson(v: unknown): string {
  return JSON.stringify(v, (_k, x) =>
    x && typeof x === 'object' && !Array.isArray(x)
      ? Object.fromEntries(
          Object.keys(x as Record<string, unknown>)
            .sort()
            .map((q) => [q, (x as Record<string, unknown>)[q]])
        )
      : x
  );
}

export function diffSaveStates(a: unknown, b: unknown): DiffEntry[] {
  const out: DiffEntry[] = [];
  const isRef = (v: unknown): v is Record<string, unknown> | unknown[] =>
    v !== null && typeof v === 'object';
  const fmt = (v: unknown) => {
    const s = v === undefined ? 'ไม่มี' : JSON.stringify(v);
    return s.length > 90 ? s.slice(0, 87) + '...' : s;
  };

  function walk(x: unknown, y: unknown, p: string, rp: PathSegment[]): void {
    if (x !== undefined && y !== undefined && canonJson(x) === canonJson(y)) return;
    if (x === undefined) {
      out.push({ kind: '+', path: p || '(root)', rawPath: rp, detail: '= ' + fmt(y) });
      return;
    }
    if (y === undefined) {
      out.push({ kind: '-', path: p || '(root)', rawPath: rp, detail: '(เดิม ' + fmt(x) + ')' });
      return;
    }
    if (isRef(x) && isRef(y) && Array.isArray(x) === Array.isArray(y)) {
      if (Array.isArray(x) && Array.isArray(y)) {
        if ([...x, ...y].every((item) => !isRef(item))) {
          const rm = x.filter((item) => !y.includes(item));
          const ad = y.filter((item) => !x.includes(item));
          for (const item of rm) {
            out.push({ kind: '-', path: p, rawPath: rp, detail: '[ ] ' + fmt(item) });
          }
          for (const item of ad) {
            out.push({ kind: '+', path: p, rawPath: rp, detail: '[ ] ' + fmt(item) });
          }
          if (!rm.length && !ad.length) {
            out.push({
              kind: '~',
              path: p,
              rawPath: rp,
              detail: `ลำดับหรือจำนวนซ้ำต่างกัน: ${fmt(x)} → ${fmt(y)}`,
            });
          }
        } else {
          for (let i = 0; i < Math.max(x.length, y.length); i++) {
            walk(x[i], y[i], `${p}[${i}]`, [...rp, i]);
          }
        }
      } else {
        const xo = x as Record<string, unknown>;
        const yo = y as Record<string, unknown>;
        for (const k of new Set([...Object.keys(xo), ...Object.keys(yo)])) {
          walk(xo[k], yo[k], p ? `${p}.${k}` : k, [...rp, k]);
        }
      }
      return;
    }
    out.push({ kind: '~', path: p || '(root)', rawPath: rp, detail: `${fmt(x)} → ${fmt(y)}` });
  }

  walk(a, b, '', []);
  return out;
}

export function createSandboxSave(): SaveObject {
  return {
    version: 2,
    seed: 8492017,
    savedAt: Date.now(),
    name: { th: 'หลินชิงเสวียน', en: 'Lin Qingxuan' },
    alive: true,
    cultivating: true,
    ageMonths: 216,
    health: 94,
    qi: 480,
    realm: 2,
    layer: 4,
    money: 12500,
    wealth: 2,
    fame: 340,
    karma: 18,
    renown: 210,
    renownPeak: 210,
    infamy: 0,
    lineInfamy: 0,
    pace: 1.25,
    breakCooldown: 0,
    bonusYears: 0,
    cls: 'cultSmall',
    structure: 'both',
    sinew: 'fine',
    root: {
      type: 'two',
      elements: ['wood', 'water'],
      purity: 76,
      known: true,
    },
    destiny: {
      tier: 'support',
      id: null,
    },
    talentRules: 'slots',
    talentSlotsUp: 1,
    talents: ['daoHeart', 'calmMind', 'quickWit'],
    stats: {
      body: 38,
      mind: 47,
      will: 52,
      charm: 34,
      luck: 29,
    },
    capSeen: {
      body: 80,
      mind: 95,
      will: 95,
      charm: 75,
      luck: 70,
    },
    yearFrom: {
      body: 36,
      mind: 45,
      will: 50,
      charm: 34,
      luck: 29,
    },
    statSrc: {
      body: { base: 20, event: 18 },
      mind: { base: 22, talent: 5, event: 20 },
      will: { base: 18, talent: 15, event: 19 },
      charm: { base: 20, event: 14 },
      luck: { base: 20, event: 9 },
    },
    personality: {
      courage: 62,
      compassion: 71,
      ambition: 45,
    },
    equip: {
      weapon: 'spiritSword',
      armor: 'spiritRobe',
      accessory: 'clearRing',
      treasure: 'jadeShield',
    },
    bag: {
      spiritSword: 1,
      spiritRobe: 1,
      clearRing: 1,
      jadeShield: 1,
      qiPill: 5,
      healMend: 3,
      foundationPill: 1,
      spiritHerb: 12,
      beastCore: 4,
    },
    techs: {
      fiveCycle: 1450,
      acsSword: 680,
      lightStep: 320,
      ironSkin: 450,
      alchemy: 180,
    },
    slots: {
      main: 'fiveCycle',
      combat: ['acsSword'],
      movement: 'lightStep',
      defense: 'ironSkin',
      support: ['alchemy'],
    },
    sect: 'azure-cloud-sword',
    status: {
      id: 'disciple',
      rank: 'inner',
      since: 180,
      favor: 65,
      merit: 180,
    },
    married: false,
    spouse: null,
    spouseId: null,
    follower: 2,
    world: {
      people: [
        {
          id: 1,
          name: { th: 'ไป๋หลิงเอ๋อร์', en: 'Bai Ling-er' },
          g: 'f',
          b: 12,
          d: 2160,
          sect: 'azure-cloud-sword',
          role: 'peer',
          pk: 2,
          mr: 0,
        },
        {
          id: 2,
          name: { th: 'เสวี่ยอวิ๋น', en: 'Xueyun' },
          kind: 'beast',
          role: 'beast',
          sp: 4,
          ep: 4,
          b: 144,
          d: 3600,
          pk: 2,
        },
        {
          id: 3,
          name: { th: 'หลิ่วอู๋เฉิน', en: 'Liu Wuchen' },
          g: 'm',
          b: -360,
          d: 3600,
          sect: 'azure-cloud-sword',
          role: 'elder',
          pk: 4,
          mr: 0,
        },
      ],
      rel: {
        1: { c: 68, fv: 35, ow: 0, io: 0, tags: ['lover'], met: 182 },
        2: { c: 82, fv: 50, ow: 0, io: 0, tags: ['companion'], met: 196 },
        3: { c: 55, fv: 40, ow: 0, io: 0, tags: ['master'], met: 180 },
      },
      sects: {
        'azure-cloud-sword': { funds: 1200, loyalty: 78, disciples: 120 },
      },
    },
  };
}
