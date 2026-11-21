export interface SectCatalogDef {
  id: string;
  th: string;
  en: string;
  tier: number;
  al: string;
  women: boolean;
}

export interface BeastSpeciesDef {
  index: number;
  th: string;
  en: string;
  el: string;
  world: string;
  tame: boolean;
}

export const SECT_AL_LABELS: Record<string, string> = {
  righteous: 'ธรรมะ',
  neutral: 'กลาง',
  evil: 'อธรรม',
  demonic: 'มาร',
  royal: 'ราชสำนัก',
};

export const SECT_RANKS: ReadonlyArray<readonly [string, string, string]> = [
  ['servant', 'ศิษย์รับใช้', 'Servant disciple'],
  ['outer', 'ศิษย์นอก', 'Outer disciple'],
  ['inner', 'ศิษย์ใน', 'Inner disciple'],
  ['direct', 'ศิษย์สายตรง', 'Direct disciple'],
  ['elder', 'ผู้อาวุโสฝ่ายนอก', 'Outer elder'],
  ['innerElder', 'ผู้อาวุโสสายใน', 'Inner elder'],
  ['vice', 'รองเจ้าสำนัก', 'Vice master'],
  ['master', 'เจ้าสำนัก', 'Master'],
];

export const SECT_RANK_MAP = new Map<string, { th: string; en: string }>(
  SECT_RANKS.map(([id, th, en]) => [id, { th, en }])
);

export const MORTAL_CAREERS: ReadonlyArray<{
  id: string;
  th: string;
  en: string;
  ranks: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    id: 'official',
    th: 'ขุนนาง',
    en: 'Official',
    ranks: [
      ['เสมียนอำเภอ', 'County clerk'],
      ['นายอำเภอ', 'Magistrate'],
      ['เจ้าเมือง', 'Prefect'],
      ['ขุนนางราชสำนัก', 'Court minister'],
    ],
  },
  {
    id: 'merchant',
    th: 'พ่อค้า',
    en: 'Merchant',
    ranks: [
      ['ลูกจ้างร้าน', 'Shop hand'],
      ['พ่อค้าเร่', 'Trader'],
      ['เถ้าแก่ร้านใหญ่', 'Master of a great shop'],
      ['คหบดีแห่งเมือง', 'Merchant prince'],
    ],
  },
  {
    id: 'soldier',
    th: 'ทหาร',
    en: 'Soldier',
    ranks: [
      ['พลทหาร', 'Private'],
      ['นายสิบ', 'Sergeant'],
      ['นายกอง', 'Captain'],
      ['แม่ทัพ', 'General'],
    ],
  },
  {
    id: 'martial',
    th: 'จอมยุทธ์',
    en: 'Martial artist',
    ranks: [
      ['ศิษย์หอยุทธ์', 'Hall disciple'],
      ['จอมยุทธ์พเนจร', 'Wandering fighter'],
      ['ยอดฝีมือมีชื่อ', 'Named master'],
      ['ปรมาจารย์แห่งยุทธภพ', 'Grandmaster of the jianghu'],
    ],
  },
  {
    id: 'xian',
    th: 'ผู้ฝึกตน',
    en: 'Cultivator',
    ranks: [
      ['ศิษย์สำนักเซียน', 'Sect disciple'],
      ['ศิษย์ใน', 'Inner disciple'],
      ['ผู้อาวุโส', 'Elder'],
      ['บรรพจารย์', 'Patriarch'],
    ],
  },
  {
    id: 'artisan',
    th: 'ช่างฝีมือ',
    en: 'Artisan',
    ranks: [
      ['ลูกมือช่าง', 'Apprentice'],
      ['ช่าง', 'Craftsman'],
      ['ช่างใหญ่', 'Master craftsman'],
      ['ช่างหลวง', 'Imperial artisan'],
    ],
  },
  {
    id: 'doctor',
    th: 'หมอ',
    en: 'Physician',
    ranks: [
      ['ผู้ช่วยหมอ', "Physician's helper"],
      ['หมอ', 'Physician'],
      ['หมอมีชื่อ', 'Renowned physician'],
      ['หมอหลวง', 'Imperial physician'],
    ],
  },
  {
    id: 'wastrel',
    th: 'คนเสเพล',
    en: 'Wastrel',
    ranks: [
      ['เตร็ดเตร่', 'Idler'],
      ['นักพนัน', 'Gambler'],
      ['ติดหนี้ท่วมหัว', 'Deep in debt'],
      ['นักเลงหัวไม้', 'Ruffian'],
    ],
  },
];

export const REL_TAGS: ReadonlyArray<readonly [string, string, string]> = [
  ['companion', 'คู่หู / ร่วมทาง', 'Companion'],
  ['spouse', 'คู่สมรส', 'Spouse'],
  ['consort', 'อนุ / สนม', 'Consort'],
  ['lover', 'คนรัก', 'Lover'],
  ['betrothed', 'คู่หมั้น', 'Betrothed'],
  ['sworn', 'พี่น้องร่วมสาบาน', 'Sworn sibling'],
  ['master', 'อาจารย์', 'Master'],
  ['student', 'ศิษย์', 'Student'],
  ['family', 'ครอบครัว', 'Family'],
  ['rival', 'คู่แข่ง', 'Rival'],
  ['enemy', 'ศัตรู', 'Enemy'],
  ['ex', 'คนรักเก่า', 'Ex-lover'],
  ['exSpouse', 'อดีตคู่สมรส', 'Ex-spouse'],
  ['lateSpouse', 'คู่สมรสผู้ล่วงลับ', 'Late spouse'],
];

export const REL_TAG_MAP = new Map<string, { th: string; en: string }>(
  REL_TAGS.map(([id, th, en]) => [id, { th, en }])
);

export const BEAST_EPITHETS: ReadonlyArray<readonly [string, string]> = [
  ['เขี้ยวเงิน', 'Silverfang'],
  ['ตาเดียว', 'One-eyed'],
  ['เกล็ดดำ', 'Black-scaled'],
  ['หางเพลิง', 'Flametail'],
  ['ขนหิมะ', 'Snowpelt'],
  ['เขาเหล็ก', 'Ironhorn'],
  ['เงาจันทร์', 'Moonshadow'],
  ['กรงเล็บเลือด', 'Bloodclaw'],
  ['อัสนี', 'Thunder'],
  ['หินผา', 'Stoneback'],
  ['ม่วงพิษ', 'Venom-purple'],
  ['เมฆา', 'Cloud'],
];

export const SECTS_CATALOG: SectCatalogDef[] = [
  {
    "id": "azure-cloud-sword",
    "th": "สำนักกระบี่เมฆาคราม",
    "en": "Azure Cloud Sword Sect",
    "tier": 1,
    "al": "righteous",
    "women": false
  },
  {
    "id": "frost-palace",
    "th": "วังเหมันต์",
    "en": "Frost Palace",
    "tier": 1,
    "al": "righteous",
    "women": true
  },
  {
    "id": "blood-demon-cult",
    "th": "ลัทธิโลหิตมาร",
    "en": "Blood Demon Cult",
    "tier": 1,
    "al": "demonic",
    "women": false
  },
  {
    "id": "thousand-blossom-valley",
    "th": "หุบเขาโอสถพันบุปผา",
    "en": "Thousand Blossom Pill Valley",
    "tier": 2,
    "al": "neutral",
    "women": false
  },
  {
    "id": "nine-star-formation",
    "th": "สำนักค่ายกลดาราเก้าชั้น",
    "en": "Nine-Star Formation Sect",
    "tier": 2,
    "al": "righteous",
    "women": false
  },
  {
    "id": "thousand-venom-shadow",
    "th": "นิกายเงาพันพิษ",
    "en": "Thousand Venom Shadow Sect",
    "tier": 2,
    "al": "evil",
    "women": false
  },
  {
    "id": "joyful-blossom",
    "th": "สำนักบุปผาสราญรมย์",
    "en": "Joyful Blossom Sect",
    "tier": 2,
    "al": "neutral",
    "women": false
  },
  {
    "id": "vajra-temple",
    "th": "อารามกายาวัชระ",
    "en": "Vajra Body Temple",
    "tier": 3,
    "al": "righteous",
    "women": false
  },
  {
    "id": "mountain-beast",
    "th": "สำนักอสูรภูผา",
    "en": "Mountain Beast Sect",
    "tier": 3,
    "al": "neutral",
    "women": false
  },
  {
    "id": "wandering-wind",
    "th": "สำนักวายุพเนจร",
    "en": "Wandering Wind Sect",
    "tier": 4,
    "al": "righteous",
    "women": false
  },
  {
    "id": "dragon-guard",
    "th": "หอพิทักษ์มังกร",
    "en": "Dragon Guard Pavilion",
    "tier": 1,
    "al": "royal",
    "women": false
  },
  {
    "id": "thunder-peak",
    "th": "สำนักยอดเขาอัสนี",
    "en": "Thunder Peak Sect",
    "tier": 2,
    "al": "righteous",
    "women": false
  },
  {
    "id": "bone-throne-court",
    "th": "ราชสำนักบัลลังก์กระดูก",
    "en": "Bone Throne Court",
    "tier": 1,
    "al": "demonic",
    "women": false
  },
  {
    "id": "nine-hells-pavilion",
    "th": "หอเก้านรก",
    "en": "Nine Hells Pavilion",
    "tier": 2,
    "al": "evil",
    "women": false
  }
];

export const SECT_MAP = new Map<string, SectCatalogDef>(
  SECTS_CATALOG.map((s) => [s.id, s])
);

export const BEAST_SPECIES: BeastSpeciesDef[] = [
  {
    "index": 0,
    "th": "หมาป่า",
    "en": "Wolf",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 1,
    "th": "หมูป่าอสูร",
    "en": "Demon Boar",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 2,
    "th": "งูวิญญาณ",
    "en": "Spirit Serpent",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 3,
    "th": "เสือ",
    "en": "Tiger",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 4,
    "th": "จิ้งจอก",
    "en": "Fox",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 5,
    "th": "กระเรียน",
    "en": "Crane",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 6,
    "th": "หมี",
    "en": "Bear",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 7,
    "th": "อินทรี",
    "en": "Eagle",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 8,
    "th": "วานร",
    "en": "Ape",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 9,
    "th": "กระต่ายวิญญาณ",
    "en": "Spirit Rabbit",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 10,
    "th": "กวางหยก",
    "en": "Jade Deer",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 11,
    "th": "วัวหลังเหล็ก",
    "en": "Iron-backed Ox",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 12,
    "th": "อาชาเมฆา",
    "en": "Cloud Steed",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 13,
    "th": "แมงป่องพิษ",
    "en": "Venom Scorpion",
    "el": "fire",
    "world": "xian",
    "tame": false
  },
  {
    "index": 14,
    "th": "หนูระบาด",
    "en": "Plague Rat",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 15,
    "th": "เต่าดำ",
    "en": "Black Tortoise",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 16,
    "th": "ผึ้งทอง",
    "en": "Golden Bee",
    "el": "wood",
    "world": "xian",
    "tame": false
  },
  {
    "index": 17,
    "th": "นกฮูกราตรี",
    "en": "Night Owl",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 18,
    "th": "ค้างคาวโลหิต",
    "en": "Blood Bat",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 19,
    "th": "นกยูงห้าสี",
    "en": "Five-hued Peacock",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 20,
    "th": "ลิงภูเขา",
    "en": "Mountain Monkey",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 21,
    "th": "เสือดาวเงา",
    "en": "Shadow Leopard",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 22,
    "th": "สิงโตทอง",
    "en": "Golden Lion",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 23,
    "th": "เสือดำ",
    "en": "Black Panther",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 24,
    "th": "ช้างปฐพี",
    "en": "Earth Elephant",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 25,
    "th": "แรดศิลา",
    "en": "Stone Rhino",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 26,
    "th": "จระเข้แม่น้ำ",
    "en": "River Crocodile",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 27,
    "th": "ซาลาแมนเดอร์ไฟ",
    "en": "Fire Salamander",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 28,
    "th": "คางคกพิษ",
    "en": "Venom Toad",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 29,
    "th": "กบหยก",
    "en": "Jade Frog",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 30,
    "th": "ตะขาบร้อยขา",
    "en": "Hundred-legged Centipede",
    "el": "fire",
    "world": "xian",
    "tame": false
  },
  {
    "index": 31,
    "th": "ตั๊กแตนใบมีด",
    "en": "Blade Mantis",
    "el": "metal",
    "world": "xian",
    "tame": false
  },
  {
    "index": 32,
    "th": "แมงมุมใยเหล็ก",
    "en": "Ironsilk Spider",
    "el": "metal",
    "world": "xian",
    "tame": false
  },
  {
    "index": 33,
    "th": "ปูเกราะเหล็ก",
    "en": "Iron Crab",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 34,
    "th": "ปลาไหลอัสนี",
    "en": "Thunder Eel",
    "el": "lightning",
    "world": "xian",
    "tame": false
  },
  {
    "index": 35,
    "th": "มังกรน้ำ",
    "en": "Flood Dragon",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 36,
    "th": "งูเหลือมพันปี",
    "en": "Thousand-year Python",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 37,
    "th": "แบดเจอร์",
    "en": "Honey Badger",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 38,
    "th": "ราชาหมูป่า",
    "en": "Boar King",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 39,
    "th": "ราชาหมาป่า",
    "en": "Wolf King",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 40,
    "th": "จิ้งจอกเก้าหาง",
    "en": "Nine-tailed Fox",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 41,
    "th": "แพะภูเขา",
    "en": "Mountain Goat",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 42,
    "th": "สุนัขวิญญาณ",
    "en": "Spirit Hound",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 43,
    "th": "แมวป่า",
    "en": "Wild Lynx",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 44,
    "th": "ปลาคาร์ปทอง",
    "en": "Golden Carp",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 45,
    "th": "กิเลน",
    "en": "Qilin",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 46,
    "th": "หงส์เพลิง",
    "en": "Phoenix",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 47,
    "th": "มังกรแท้",
    "en": "True Dragon",
    "el": "lightning",
    "world": "xian",
    "tame": true
  },
  {
    "index": 48,
    "th": "เสืออัสนี",
    "en": "Thunder Tiger",
    "el": "lightning",
    "world": "xian",
    "tame": true
  },
  {
    "index": 49,
    "th": "วิญญาณแค้น",
    "en": "Wandering Wraith",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 50,
    "th": "เถาเที่ย",
    "en": "Taotie",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 51,
    "th": "ปี้ฟาง",
    "en": "Bifang",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 52,
    "th": "นกเก้าเศียร",
    "en": "Nine-headed Bird",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 53,
    "th": "คุนเผิง",
    "en": "Kunpeng",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 54,
    "th": "พยัคฆ์ขาว",
    "en": "White Tiger",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 55,
    "th": "เสวียนอู่",
    "en": "Xuanwu",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 56,
    "th": "เผิงอัสนี",
    "en": "Thunder Roc",
    "el": "lightning",
    "world": "xian",
    "tame": true
  },
  {
    "index": 57,
    "th": "คางคกหยก",
    "en": "Jade Toad",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 58,
    "th": "วานรตาทอง",
    "en": "Golden-eyed Ape",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 59,
    "th": "ปี่เซียะ",
    "en": "Pixiu",
    "el": "metal",
    "world": "xian",
    "tame": true
  },
  {
    "index": 60,
    "th": "ฉยงฉี",
    "en": "Qiongqi",
    "el": "wind",
    "world": "xian",
    "tame": false
  },
  {
    "index": 61,
    "th": "เซี่ยจื้อ",
    "en": "Xiezhi",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 62,
    "th": "นกจิ้นพิษ",
    "en": "Poison Zhen Bird",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 63,
    "th": "ลิ่นทะลวงดิน",
    "en": "Earth-piercing Pangolin",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 64,
    "th": "ไป๋เจ๋อ",
    "en": "Baize",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 65,
    "th": "กาทองสามขา",
    "en": "Three-legged Golden Crow",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 66,
    "th": "เซียงหลิว",
    "en": "Xiangliu",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 67,
    "th": "อิ่งหลง",
    "en": "Yinglong",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 68,
    "th": "นกหลวนฟ้า",
    "en": "Azure Luan",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 69,
    "th": "เยติหิมะ",
    "en": "Snow Yeti",
    "el": "ice",
    "world": "xian",
    "tame": false
  },
  {
    "index": 70,
    "th": "แมงมุมไหมน้ำแข็ง",
    "en": "Ice-silk Spider",
    "el": "ice",
    "world": "xian",
    "tame": false
  },
  {
    "index": 71,
    "th": "วาฬเมฆา",
    "en": "Cloud Whale",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 72,
    "th": "แมมมอธเขี้ยวเลือด",
    "en": "Blood-tusk Mammoth",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 73,
    "th": "สิงโตเพลิงซวนหนี",
    "en": "Flame Suanni",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 74,
    "th": "ม้ามังกร",
    "en": "Dragon Horse",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 75,
    "th": "ฮุ่นตุ้น",
    "en": "Hundun",
    "el": "earth",
    "world": "xian",
    "tame": false
  },
  {
    "index": 76,
    "th": "กระต่ายหยกจันทรา",
    "en": "Moon Jade Rabbit",
    "el": "ice",
    "world": "xian",
    "tame": true
  },
  {
    "index": 77,
    "th": "หมาฟ้าเทียนโก่ว",
    "en": "Heavenly Hound",
    "el": "lightning",
    "world": "xian",
    "tame": true
  },
  {
    "index": 78,
    "th": "ปลาคาร์ปข้ามประตูมังกร",
    "en": "Dragon-gate Carp",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 79,
    "th": "ปี้ซี่เต่ามังกร",
    "en": "Bixi Dragon-turtle",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 80,
    "th": "นกฉงหมิง",
    "en": "Chongming Bird",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 81,
    "th": "กวางเก้าสี",
    "en": "Nine-colour Deer",
    "el": "wood",
    "world": "xian",
    "tame": true
  },
  {
    "index": 82,
    "th": "ปูน้ำแข็งเกราะเงิน",
    "en": "Frost-armour Crab",
    "el": "ice",
    "world": "xian",
    "tame": false
  },
  {
    "index": 83,
    "th": "ราชาค้างคาวโลหิต",
    "en": "Blood Bat King",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 84,
    "th": "ราชาหนูกาฬโรค",
    "en": "Plague Rat King",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 85,
    "th": "ตะขาบหมื่นขา",
    "en": "Ten-thousand-legged Centipede",
    "el": "fire",
    "world": "xian",
    "tame": false
  },
  {
    "index": 86,
    "th": "ราชินีแมงมุมเขี้ยวหยก",
    "en": "Jade-fang Spider Queen",
    "el": "wood",
    "world": "xian",
    "tame": false
  },
  {
    "index": 87,
    "th": "ราชาแมงป่องเพลิง",
    "en": "Flame Scorpion King",
    "el": "fire",
    "world": "xian",
    "tame": false
  },
  {
    "index": 88,
    "th": "หมาป่าจันทรา",
    "en": "Moon Wolf",
    "el": "ice",
    "world": "xian",
    "tame": true
  },
  {
    "index": 89,
    "th": "แกะอัสนี",
    "en": "Thunder Ram",
    "el": "lightning",
    "world": "xian",
    "tame": true
  },
  {
    "index": 90,
    "th": "กระเรียนเซียน",
    "en": "Immortal Crane",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 91,
    "th": "เหยี่ยวผ่าเมฆา",
    "en": "Cloud-splitting Hawk",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 92,
    "th": "วานรศิลา",
    "en": "Stone Monkey",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 93,
    "th": "งูเหลือมอัสนี",
    "en": "Thunder Python",
    "el": "lightning",
    "world": "xian",
    "tame": false
  },
  {
    "index": 94,
    "th": "จระเข้มังกรถัว",
    "en": "Tuo Dragon",
    "el": "water",
    "world": "xian",
    "tame": false
  },
  {
    "index": 95,
    "th": "นกสารสีฟ้า",
    "en": "Azure Messenger Bird",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 96,
    "th": "นกฮูกพันตา",
    "en": "Thousand-eyed Owl",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 97,
    "th": "หมูป่างาหยก",
    "en": "Jade-tusk Boar",
    "el": "wind",
    "world": "xian",
    "tame": true
  },
  {
    "index": 98,
    "th": "จูหลง มังกรคบเพลิง",
    "en": "Zhulong, the Torch Dragon",
    "el": "fire",
    "world": "xian",
    "tame": true
  },
  {
    "index": 99,
    "th": "วัวขุยหนิว",
    "en": "Kui Ox",
    "el": "lightning",
    "world": "xian",
    "tame": false
  },
  {
    "index": 100,
    "th": "หมาป่าทุ่งหญ้า",
    "en": "Steppe Wolf",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 101,
    "th": "หมาป่าเทาขุนเขา",
    "en": "Mountain Grey Wolf",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 102,
    "th": "จ่าฝูงหมาป่า",
    "en": "Alpha Wolf",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 103,
    "th": "หมาป่าหิมะ",
    "en": "Snow Wolf",
    "el": "ice",
    "world": "martial",
    "tame": true
  },
  {
    "index": 104,
    "th": "หมาไนแดง",
    "en": "Red Dhole",
    "el": "fire",
    "world": "martial",
    "tame": true
  },
  {
    "index": 105,
    "th": "จิ้งจอกแดง",
    "en": "Red Fox",
    "el": "fire",
    "world": "martial",
    "tame": true
  },
  {
    "index": 106,
    "th": "จิ้งจอกเงิน",
    "en": "Silver Fox",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 107,
    "th": "แมวป่าลายเสือดาว",
    "en": "Leopard Cat",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 108,
    "th": "ลิงซ์ภูเขา",
    "en": "Mountain Lynx",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 109,
    "th": "เสือดาว",
    "en": "Leopard",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 110,
    "th": "เสือดำป่าลึก",
    "en": "Black Leopard",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 111,
    "th": "เสือดาวหิมะ",
    "en": "Snow Leopard",
    "el": "ice",
    "world": "martial",
    "tame": true
  },
  {
    "index": 112,
    "th": "เสือโคร่งป่าไผ่",
    "en": "Bamboo-forest Tiger",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 113,
    "th": "เสือกินคน",
    "en": "Man-eating Tiger",
    "el": "metal",
    "world": "martial",
    "tame": false
  },
  {
    "index": 114,
    "th": "เสือไซบีเรีย",
    "en": "Siberian Tiger",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 115,
    "th": "ลูกเสือโคร่ง",
    "en": "Tiger Cub",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 116,
    "th": "หมีดำ",
    "en": "Black Bear",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 117,
    "th": "หมีสีน้ำตาล",
    "en": "Brown Bear",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 118,
    "th": "หมีแพนด้ายักษ์",
    "en": "Giant Panda",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 119,
    "th": "หมีหมา",
    "en": "Sun Bear",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 120,
    "th": "หมูป่า",
    "en": "Wild Boar",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 121,
    "th": "หมูป่าเขี้ยวยาว",
    "en": "Tusked Boar",
    "el": "metal",
    "world": "martial",
    "tame": false
  },
  {
    "index": 122,
    "th": "ควายป่า",
    "en": "Wild Buffalo",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 123,
    "th": "จามรีป่า",
    "en": "Wild Yak",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 124,
    "th": "กวางเอลก์",
    "en": "Elk",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 125,
    "th": "กวางชะมด",
    "en": "Musk Deer",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 126,
    "th": "กวางป่าเขาใหญ่",
    "en": "Red Stag",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 127,
    "th": "วัวตะกิน",
    "en": "Takin",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 128,
    "th": "แกะภูเขาอาร์กาลี",
    "en": "Argali Sheep",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 129,
    "th": "ม้าป่าทุ่งหญ้า",
    "en": "Steppe Horse",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 130,
    "th": "ลาป่า",
    "en": "Wild Ass",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 131,
    "th": "อูฐสองหนอก",
    "en": "Bactrian Camel",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 132,
    "th": "ช้างป่ายูนนาน",
    "en": "Yunnan Elephant",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 133,
    "th": "แรดป่า",
    "en": "Jungle Rhinoceros",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 134,
    "th": "ม้าศึกผ่านสมรภูมิ",
    "en": "Veteran War Horse",
    "el": "metal",
    "world": "martial",
    "tame": true
  },
  {
    "index": 135,
    "th": "ลิงจมูกเชิดทอง",
    "en": "Golden Snub-nosed Monkey",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 136,
    "th": "ฝูงลิงแสม",
    "en": "Macaque Troop",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 137,
    "th": "ชะนีแขนยาว",
    "en": "Long-armed Gibbon",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 138,
    "th": "ลิงเฒ่าแห่งเขาง้อไบ๊",
    "en": "Old Ape of Mount Emei",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 139,
    "th": "งูเหลือมยักษ์แห่งบึง",
    "en": "Giant Marsh Python",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 140,
    "th": "งูเหลือมหินผา",
    "en": "Rock Python",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 141,
    "th": "งูจงอางยักษ์",
    "en": "King Cobra",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 142,
    "th": "งูสามเหลี่ยมวงทอง",
    "en": "Golden-ringed Snake",
    "el": "metal",
    "world": "martial",
    "tame": false
  },
  {
    "index": 143,
    "th": "งูเขียวหางไหม้ไผ่",
    "en": "Bamboo Viper",
    "el": "wood",
    "world": "martial",
    "tame": false
  },
  {
    "index": 144,
    "th": "งูร้อยก้าว",
    "en": "Hundred-pace Snake",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 145,
    "th": "งูพิษภูผา",
    "en": "Mountain Pit Viper",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 146,
    "th": "จระเข้แยงซี",
    "en": "Yangtze Alligator",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 147,
    "th": "จระเข้น้ำเค็มทะเลใต้",
    "en": "Southern Sea Crocodile",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 148,
    "th": "ตัวเงินตัวทอง",
    "en": "Monitor Lizard",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 149,
    "th": "ซาลาแมนเดอร์ยักษ์",
    "en": "Giant Salamander",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 150,
    "th": "เต่าจะละเม็ดนักล่า",
    "en": "Snapping Turtle",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 151,
    "th": "เต่าแม่น้ำเฒ่า",
    "en": "Old River Turtle",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 152,
    "th": "คางคกพิษ",
    "en": "Poison Toad",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 153,
    "th": "คางคกแดงจุดทอง",
    "en": "Red-spotted Toad",
    "el": "fire",
    "world": "martial",
    "tame": false
  },
  {
    "index": 154,
    "th": "กบพิษต้นไม้",
    "en": "Poison Tree Frog",
    "el": "wood",
    "world": "martial",
    "tame": false
  },
  {
    "index": 155,
    "th": "อินทรีเทพ",
    "en": "Divine Condor",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 156,
    "th": "อินทรีทอง",
    "en": "Golden Eagle",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 157,
    "th": "อินทรีทะเลสาบ",
    "en": "Lake Sea Eagle",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 158,
    "th": "เหยี่ยวล่าเนื้อ",
    "en": "Hunting Falcon",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 159,
    "th": "เหยี่ยวแดง",
    "en": "Red Kite",
    "el": "fire",
    "world": "martial",
    "tame": true
  },
  {
    "index": 160,
    "th": "กระเรียนหัวแดง",
    "en": "Red-crowned Crane",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 161,
    "th": "กระเรียนขาว",
    "en": "White Crane",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 162,
    "th": "แร้งภูผา",
    "en": "Mountain Vulture",
    "el": "wind",
    "world": "martial",
    "tame": false
  },
  {
    "index": 163,
    "th": "อีกาดำ",
    "en": "Black Crow",
    "el": "wind",
    "world": "martial",
    "tame": false
  },
  {
    "index": 164,
    "th": "นกเค้าแมวใหญ่",
    "en": "Great Eagle Owl",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 165,
    "th": "นกฮูกป่าช้า",
    "en": "Graveyard Owl",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 166,
    "th": "ไก่ฟ้าหางยาว",
    "en": "Long-tailed Pheasant",
    "el": "fire",
    "world": "martial",
    "tame": true
  },
  {
    "index": 167,
    "th": "นกยูงป่า",
    "en": "Wild Peafowl",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 168,
    "th": "นกกางเขน",
    "en": "Magpie",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 169,
    "th": "นกกระเต็นแม่น้ำ",
    "en": "River Kingfisher",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 170,
    "th": "นกแก้วป่า",
    "en": "Wild Parrot",
    "el": "fire",
    "world": "martial",
    "tame": true
  },
  {
    "index": 171,
    "th": "นกพิราบสื่อสาร",
    "en": "Courier Pigeon",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 172,
    "th": "ต่อหัวเสือ",
    "en": "Giant Hornet",
    "el": "fire",
    "world": "martial",
    "tame": false
  },
  {
    "index": 173,
    "th": "ฝูงผึ้งป่า",
    "en": "Wild Bee Swarm",
    "el": "wood",
    "world": "martial",
    "tame": false
  },
  {
    "index": 174,
    "th": "แมงป่องทะเลทราย",
    "en": "Desert Scorpion",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 175,
    "th": "ตะขาบยักษ์",
    "en": "Giant Centipede",
    "el": "fire",
    "world": "martial",
    "tame": false
  },
  {
    "index": 176,
    "th": "แมงมุมทารันทูลา",
    "en": "Tarantula",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 177,
    "th": "แมงมุมม่ายดำ",
    "en": "Black Widow",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 178,
    "th": "ตั๊กแตนตำข้าวยักษ์",
    "en": "Giant Mantis",
    "el": "metal",
    "world": "martial",
    "tame": false
  },
  {
    "index": 179,
    "th": "ค้างคาวถ้ำ",
    "en": "Cave Bat",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 180,
    "th": "หนูกาฬโรค",
    "en": "Plague-bearing Rat",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 181,
    "th": "ปลาคาร์ปยักษ์",
    "en": "Giant Carp",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 182,
    "th": "ปลาสเตอร์เจียนแยงซี",
    "en": "Yangtze Sturgeon",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 183,
    "th": "ปลาไหลไฟฟ้า",
    "en": "Electric Eel",
    "el": "lightning",
    "world": "martial",
    "tame": false
  },
  {
    "index": 184,
    "th": "ปูแม่น้ำยักษ์",
    "en": "Giant River Crab",
    "el": "water",
    "world": "martial",
    "tame": false
  },
  {
    "index": 185,
    "th": "นากแม่น้ำ",
    "en": "River Otter",
    "el": "water",
    "world": "martial",
    "tame": true
  },
  {
    "index": 186,
    "th": "เพียงพอนเหลือง",
    "en": "Yellow Weasel",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 187,
    "th": "เม่นภูเขา",
    "en": "Mountain Porcupine",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 188,
    "th": "วูล์ฟเวอรีนหิมะ",
    "en": "Snow Wolverine",
    "el": "ice",
    "world": "martial",
    "tame": false
  },
  {
    "index": 189,
    "th": "ลิ่นภูเขา",
    "en": "Mountain Pangolin",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 190,
    "th": "กระต่ายป่า",
    "en": "Hare",
    "el": "wind",
    "world": "martial",
    "tame": true
  },
  {
    "index": 191,
    "th": "ชะมดป่า",
    "en": "Civet Cat",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 192,
    "th": "สุนัขล่าเนื้อ",
    "en": "Hunting Hound",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 193,
    "th": "สุนัขเฝ้าหมู่บ้าน",
    "en": "Village Watchdog",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 194,
    "th": "สุนัขมาสทิฟทิเบต",
    "en": "Tibetan Mastiff",
    "el": "earth",
    "world": "martial",
    "tame": true
  },
  {
    "index": 195,
    "th": "ล่อบรรทุกของ",
    "en": "Pack Mule",
    "el": "wood",
    "world": "martial",
    "tame": true
  },
  {
    "index": 196,
    "th": "กระทิงดุ",
    "en": "Raging Gaur",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 197,
    "th": "หมาจิ้งจอกทุ่งหญ้า",
    "en": "Steppe Jackal",
    "el": "earth",
    "world": "martial",
    "tame": false
  },
  {
    "index": 198,
    "th": "ราชาเสือแห่งผาเมฆ",
    "en": "King of the Cloud-Cliff Tigers",
    "el": "metal",
    "world": "martial",
    "tame": false
  },
  {
    "index": 199,
    "th": "งูเหลือมขาวแห่งบึงพันปี",
    "en": "White Python of the Old Marsh",
    "el": "ice",
    "world": "martial",
    "tame": false
  },
  {
    "index": 200,
    "th": "เม่นหนามศิลา",
    "en": "Stone-quilled Porcupine",
    "el": "earth",
    "world": "xian",
    "tame": true
  },
  {
    "index": 201,
    "th": "เพียงพอนเงา",
    "en": "Shadow Weasel",
    "el": "water",
    "world": "xian",
    "tame": true
  },
  {
    "index": 202,
    "th": "งูจงอางเกล็ดหยก",
    "en": "Jade-scaled Cobra",
    "el": "wood",
    "world": "xian",
    "tame": true
  }
];
