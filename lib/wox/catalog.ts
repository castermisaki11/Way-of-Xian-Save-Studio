// Auto-extracted from game bundle c-GZJ7HVMK_80fd4b7a.js

export interface RealmDef {
  index: number;
  id: string;
  th: string;
  en: string;
  layers: number;
  lifespan: number;
  statCap: number;
  power: number;
}

export interface MartialRankDef {
  index: number;
  id: string;
  th: string;
  en: string;
  years: number;
  statCap: number;
  power: number;
}

export interface MasteryLabelDef {
  xian: { th: string; en: string } | null;
  plain: { th: string; en: string };
}

export interface ItemCatalogDef {
  id: string;
  slot: string;
  tier: number;
  th: string;
  en: string;
  martial: boolean;
  quest: boolean;
  art?: string;
}

export interface SkillCatalogDef {
  id: string;
  kind: string;
  tier: number;
  element: string | null;
  th: string;
  en: string;
  martial: boolean;
  demonic: boolean;
  sect?: string;
}

export const REALMS: RealmDef[] = [
  {
    "index": 0,
    "id": "mortal",
    "th": "คนธรรมดา",
    "en": "Mortal",
    "layers": 0,
    "lifespan": 75,
    "statCap": 100,
    "power": 1
  },
  {
    "index": 1,
    "id": "qi",
    "th": "หลอมปราณ",
    "en": "Qi Refining",
    "layers": 9,
    "lifespan": 100,
    "statCap": 115,
    "power": 10
  },
  {
    "index": 2,
    "id": "foundation",
    "th": "สร้างฐาน",
    "en": "Foundation Establishment",
    "layers": 4,
    "lifespan": 180,
    "statCap": 130,
    "power": 100
  },
  {
    "index": 3,
    "id": "core",
    "th": "แก่นทอง",
    "en": "Golden Core",
    "layers": 4,
    "lifespan": 300,
    "statCap": 150,
    "power": 1000
  },
  {
    "index": 4,
    "id": "nascent",
    "th": "วิญญาณก่อเกิด",
    "en": "Nascent Soul",
    "layers": 4,
    "lifespan": 600,
    "statCap": 170,
    "power": 10000
  },
  {
    "index": 5,
    "id": "spirit",
    "th": "แปลงวิญญาณ",
    "en": "Spirit Severing",
    "layers": 4,
    "lifespan": 1000,
    "statCap": 195,
    "power": 50000
  },
  {
    "index": 6,
    "id": "void",
    "th": "ผสานความว่าง",
    "en": "Void Merging",
    "layers": 4,
    "lifespan": 1500,
    "statCap": 220,
    "power": 200000
  },
  {
    "index": 7,
    "id": "tribulation",
    "th": "ข้ามทัณฑ์สวรรค์",
    "en": "Tribulation Transcendence",
    "layers": 4,
    "lifespan": 2200,
    "statCap": 245,
    "power": 1000000
  },
  {
    "index": 8,
    "id": "immortal",
    "th": "บรรลุเซียน",
    "en": "Ascended Immortal",
    "layers": 0,
    "lifespan": 10000,
    "statCap": 300,
    "power": 0
  }
];

export const MARTIAL_RANKS: MartialRankDef[] = [
  {
    "index": 0,
    "id": "novice",
    "th": "ผู้ฝึกยุทธ์",
    "en": "Martial novice",
    "years": 0,
    "statCap": 100,
    "power": 20
  },
  {
    "index": 1,
    "id": "third",
    "th": "จอมยุทธ์ชั้นสาม",
    "en": "Third-rate fighter",
    "years": 3,
    "statCap": 105,
    "power": 50
  },
  {
    "index": 2,
    "id": "second",
    "th": "จอมยุทธ์ชั้นสอง",
    "en": "Second-rate fighter",
    "years": 8,
    "statCap": 110,
    "power": 90
  },
  {
    "index": 3,
    "id": "first",
    "th": "จอมยุทธ์ชั้นหนึ่ง",
    "en": "First-rate fighter",
    "years": 15,
    "statCap": 130,
    "power": 140
  },
  {
    "index": 4,
    "id": "peak",
    "th": "ยอดฝีมือ",
    "en": "Peak master",
    "years": 30,
    "statCap": 145,
    "power": 190
  },
  {
    "index": 5,
    "id": "superhuman",
    "th": "ผู้เหนือมนุษย์",
    "en": "Superhuman",
    "years": 90,
    "statCap": 150,
    "power": 245
  },
  {
    "index": 6,
    "id": "paragon",
    "th": "ปรมาจารย์",
    "en": "Paragon",
    "years": 300,
    "statCap": 160,
    "power": 310
  }
];

export const MASTERY_THRESHOLDS: number[] = [0,30,100,250,600,1300,2800,6000,13000,28000];

export const MASTERY_LABELS: MasteryLabelDef[] = [
  {
    "xian": {
      "th": "ยังไม่เข้าใจ",
      "en": "Untouched"
    },
    "plain": {
      "th": "ยังไม่เข้าใจ",
      "en": "Untouched"
    }
  },
  {
    "xian": {
      "th": "เริ่มสัมผัส",
      "en": "First touch"
    },
    "plain": {
      "th": "ฝึกหัด",
      "en": "Apprentice"
    }
  },
  {
    "xian": {
      "th": "เข้าใจขั้นต้น",
      "en": "First grasp"
    },
    "plain": {
      "th": "พอใช้",
      "en": "Competent"
    }
  },
  {
    "xian": {
      "th": "สำเร็จเล็ก",
      "en": "Lesser success"
    },
    "plain": {
      "th": "ชำนาญ",
      "en": "Skilled"
    }
  },
  {
    "xian": {
      "th": "สำเร็จใหญ่",
      "en": "Greater success"
    },
    "plain": {
      "th": "เชี่ยวชาญ",
      "en": "Expert"
    }
  },
  {
    "xian": {
      "th": "สมบูรณ์",
      "en": "Perfection"
    },
    "plain": {
      "th": "ยอดฝีมือ",
      "en": "Master"
    }
  },
  {
    "xian": null,
    "plain": {
      "th": "เจตจำนงยุทธ์",
      "en": "Martial intent"
    }
  },
  {
    "xian": {
      "th": "อาณาเขตเต๋า",
      "en": "Dao domain"
    },
    "plain": {
      "th": "ปรมาจารย์",
      "en": "Grandmaster"
    }
  },
  {
    "xian": {
      "th": "กฎแห่งเต๋า",
      "en": "Law of the dao"
    },
    "plain": {
      "th": "มหาปรมาจารย์",
      "en": "Great grandmaster"
    }
  },
  {
    "xian": {
      "th": "หลอมรวมกับเต๋า",
      "en": "One with the dao"
    },
    "plain": {
      "th": "ไร้กระบวนท่า",
      "en": "Beyond all forms"
    }
  }
];

export const EQUIP_SLOTS: string[] = ["weapon","armor","accessory","treasure"];

export const EQUIP_SLOT_LABELS: Record<string, string> = {
  weapon: "อาวุธ (weapon)",
  armor: "ชุดเกราะ/อาภรณ์ (armor)",
  accessory: "เครื่องประดับ (accessory)",
  treasure: "ของวิเศษ/ค่ายกล (treasure)",
};

export const ITEM_SLOT_LABELS: Record<string, string> = {
  weapon: "อาวุธ",
  armor: "ชุดเกราะ",
  accessory: "เครื่องประดับ",
  treasure: "ของวิเศษ",
  pill: "โอสถ/ยา",
  talisman: "ยันต์",
  tool: "อุปกรณ์หลอม/ปรุง",
  material: "วัตถุดิบ",
  supply: "เสบียง/ภารกิจ",
  scroll: "คัมภีร์วิชา",
  other: "อื่น ๆ",
};

export const SKILL_KIND_LABELS: Record<string, string> = {
  main: "เคล็ดวิถีหลัก (main)",
  combat: "วิชาต่อสู้ (combat)",
  movement: "วิชาตัวเบา (movement)",
  defense: "วิชาป้องกัน (defense)",
  support: "วิชาเสริม/สายอาชีพ (support)",
};

export const ITEMS_CATALOG: ItemCatalogDef[] = [
  {
    "id": "woodSword",
    "slot": "weapon",
    "tier": 0,
    "th": "ดาบไม้",
    "en": "Wooden sword",
    "martial": false,
    "quest": false
  },
  {
    "id": "ironSword",
    "slot": "weapon",
    "tier": 1,
    "th": "กระบี่เหล็ก",
    "en": "Iron sword",
    "martial": false,
    "quest": false
  },
  {
    "id": "spiritSword",
    "slot": "weapon",
    "tier": 2,
    "th": "กระบี่วิญญาณ",
    "en": "Spirit sword",
    "martial": false,
    "quest": false
  },
  {
    "id": "cloudSword",
    "slot": "weapon",
    "tier": 3,
    "th": "กระบี่เมฆาวายุ",
    "en": "Cloudwind sword",
    "martial": false,
    "quest": false
  },
  {
    "id": "heavenBlade",
    "slot": "weapon",
    "tier": 4,
    "th": "ดาบสวรรค์ผ่าภูผา",
    "en": "Heaven-splitting blade",
    "martial": false,
    "quest": false
  },
  {
    "id": "clothRobe",
    "slot": "armor",
    "tier": 0,
    "th": "ชุดผ้าฝ้าย",
    "en": "Cotton robe",
    "martial": false,
    "quest": false
  },
  {
    "id": "leatherArmor",
    "slot": "armor",
    "tier": 1,
    "th": "เกราะหนัง",
    "en": "Leather armour",
    "martial": false,
    "quest": false
  },
  {
    "id": "spiritRobe",
    "slot": "armor",
    "tier": 2,
    "th": "ชุดคลุมวิญญาณ",
    "en": "Spirit robe",
    "martial": false,
    "quest": false
  },
  {
    "id": "dragonScale",
    "slot": "armor",
    "tier": 3,
    "th": "เกราะเกล็ดมังกร",
    "en": "Dragon-scale armour",
    "martial": false,
    "quest": false
  },
  {
    "id": "heavenArmor",
    "slot": "armor",
    "tier": 4,
    "th": "อาภรณ์สวรรค์",
    "en": "Heavenly raiment",
    "martial": false,
    "quest": false
  },
  {
    "id": "jadePendant",
    "slot": "accessory",
    "tier": 1,
    "th": "จี้หยกนำโชค",
    "en": "Lucky jade pendant",
    "martial": false,
    "quest": false
  },
  {
    "id": "redString",
    "slot": "accessory",
    "tier": 1,
    "th": "ด้ายแดงผูกข้อมือ",
    "en": "Red wrist string",
    "martial": false,
    "quest": false
  },
  {
    "id": "clearRing",
    "slot": "accessory",
    "tier": 2,
    "th": "แหวนจิตใส",
    "en": "Ring of the clear mind",
    "martial": false,
    "quest": false
  },
  {
    "id": "willJade",
    "slot": "accessory",
    "tier": 2,
    "th": "หยกใจมั่น",
    "en": "Steadfast jade",
    "martial": false,
    "quest": false
  },
  {
    "id": "tigerBand",
    "slot": "accessory",
    "tier": 2,
    "th": "กำไลเขี้ยวเสือ",
    "en": "Tiger-fang bracelet",
    "martial": false,
    "quest": false
  },
  {
    "id": "phoenixPin",
    "slot": "accessory",
    "tier": 3,
    "th": "ปิ่นหงส์",
    "en": "Phoenix hairpin",
    "martial": false,
    "quest": false
  },
  {
    "id": "starCoin",
    "slot": "accessory",
    "tier": 3,
    "th": "เหรียญดาราโชค",
    "en": "Star-luck coin",
    "martial": false,
    "quest": false
  },
  {
    "id": "guardTalisman",
    "slot": "treasure",
    "tier": 1,
    "th": "ยันต์คุ้มกาย",
    "en": "Protective talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "jadeShield",
    "slot": "treasure",
    "tier": 2,
    "th": "โล่หยก",
    "en": "Jade shield",
    "martial": false,
    "quest": false
  },
  {
    "id": "bronzeMirror",
    "slot": "treasure",
    "tier": 3,
    "th": "กระจกทองแดงสะท้อนภัย",
    "en": "Bronze warding mirror",
    "martial": false,
    "quest": false
  },
  {
    "id": "healPill",
    "slot": "pill",
    "tier": 1,
    "th": "ยาห้ามเลือด",
    "en": "Healing pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "healMend",
    "slot": "pill",
    "tier": 2,
    "th": "ยาสมานแผล",
    "en": "Wound-mending pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "healBlood",
    "slot": "pill",
    "tier": 3,
    "th": "ยาฟื้นโลหิตวิญญาณ",
    "en": "Spirit blood-renewing pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "healLotus",
    "slot": "pill",
    "tier": 4,
    "th": "ยาบัวหยกคืนชีพ",
    "en": "Jade-lotus revival pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "healHeaven",
    "slot": "pill",
    "tier": 5,
    "th": "ยาคืนชีพสวรรค์",
    "en": "Heavenly revival pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "wxHealGold",
    "slot": "pill",
    "tier": 2,
    "th": "ยาทองสมานแผล",
    "en": "Golden wound salve",
    "martial": true,
    "quest": false
  },
  {
    "id": "wxHealLesser",
    "slot": "pill",
    "tier": 3,
    "th": "ยาเสี่ยวหวนตัน",
    "en": "Lesser Returning Pill",
    "martial": true,
    "quest": false
  },
  {
    "id": "wxHealGreat",
    "slot": "pill",
    "tier": 4,
    "th": "ยาต้าหวนตัน",
    "en": "Great Returning Pill",
    "martial": true,
    "quest": false
  },
  {
    "id": "wxHealSnow",
    "slot": "pill",
    "tier": 5,
    "th": "ยาบัวหิมะเทียนซาน",
    "en": "Tianshan snow-lotus pill",
    "martial": true,
    "quest": false
  },
  {
    "id": "qiPill",
    "slot": "pill",
    "tier": 1,
    "th": "ยารวมปราณ",
    "en": "Qi-gathering pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "antidote",
    "slot": "pill",
    "tier": 1,
    "th": "ยาแก้พิษ",
    "en": "Antidote",
    "martial": false,
    "quest": false
  },
  {
    "id": "torch",
    "slot": "supply",
    "tier": 0,
    "th": "คบไฟ",
    "en": "Torch",
    "martial": false,
    "quest": false
  },
  {
    "id": "glowPearl",
    "slot": "supply",
    "tier": 2,
    "th": "ไข่มุกเรืองแสง",
    "en": "Glowing pearl",
    "martial": false,
    "quest": false
  },
  {
    "id": "wildEgg",
    "slot": "supply",
    "tier": 0,
    "th": "ไข่ประหลาดลายเกล็ด",
    "en": "Scaly strange egg",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgTombKey",
    "slot": "supply",
    "tier": 2,
    "th": "กุญแจหยกธาร",
    "en": "Stream-jade key",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgSingShard",
    "slot": "supply",
    "tier": 2,
    "th": "ผลึกขับขาน",
    "en": "Singing shard",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgArchiveToken",
    "slot": "supply",
    "tier": 3,
    "th": "ป้ายผู้ดูแลหอคัมภีร์",
    "en": "Archivist's token",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgMoonPin",
    "slot": "supply",
    "tier": 3,
    "th": "ปิ่นหยกนางในจันทรา",
    "en": "Moon lady's jade hairpin",
    "martial": false,
    "quest": true
  },
  {
    "id": "dg4Tally",
    "slot": "supply",
    "tier": 3,
    "th": "ป้ายบัญชาศึกครึ่งแผ่น",
    "en": "Half a war tally",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgIchorFlask",
    "slot": "supply",
    "tier": 4,
    "th": "ขวดหยกบรรจุโลหิตทอง",
    "en": "Jade flask of golden ichor",
    "martial": false,
    "quest": true
  },
  {
    "id": "dgEyeShard",
    "slot": "supply",
    "tier": 4,
    "th": "เศษดวงเนตรเทพ",
    "en": "Shard of the god's eye",
    "martial": false,
    "quest": true
  },
  {
    "id": "boneMend",
    "slot": "pill",
    "tier": 2,
    "th": "ยาสมานกระดูกคืนชีพจร",
    "en": "Bone-mending pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "foundationPill",
    "slot": "pill",
    "tier": 2,
    "th": "ยาสร้างฐาน",
    "en": "Foundation pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "corePill",
    "slot": "pill",
    "tier": 3,
    "th": "ยาหลอมแก่น",
    "en": "Core-forming pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "soulPill",
    "slot": "pill",
    "tier": 4,
    "th": "ยาวิญญาณก่อเกิด",
    "en": "Nascent soul pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "spiritPill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาแปลงวิญญาณ",
    "en": "Spirit-transforming pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "voidPill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาผสานความว่าง",
    "en": "Void-merging pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "heavenPill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาข้ามทัณฑ์สวรรค์",
    "en": "Tribulation-crossing pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "marrowPill",
    "slot": "pill",
    "tier": 4,
    "th": "ยาชำระไขกระดูก",
    "en": "Marrow-washing pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "pureMarrowPill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาเปลี่ยนกระดูกเก้ารอบ",
    "en": "Ninefold bone-changing pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "rootForgePill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาหลอมรากสวรรค์",
    "en": "Root-forging heaven pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "rebirthFruit",
    "slot": "pill",
    "tier": 5,
    "th": "ผลไม้เกิดใหม่",
    "en": "Fruit of rebirth",
    "martial": false,
    "quest": false
  },
  {
    "id": "enlightenTea",
    "slot": "pill",
    "tier": 5,
    "th": "ชาตรัสรู้",
    "en": "Enlightenment tea",
    "martial": false,
    "quest": false
  },
  {
    "id": "palacePill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาเบิกวังวิญญาณ",
    "en": "Spirit Palace Opening Pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "sinewPill",
    "slot": "pill",
    "tier": 4,
    "th": "ยาเปลี่ยนเส้นเอ็น",
    "en": "Sinew-changing pill",
    "martial": true,
    "quest": false
  },
  {
    "id": "ninefoldPill",
    "slot": "pill",
    "tier": 5,
    "th": "ยาเซียนเก้าเปลี่ยน",
    "en": "Ninefold immortal pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "meridianGuard",
    "slot": "pill",
    "tier": 2,
    "th": "ยาพิทักษ์ชีพจร",
    "en": "Meridian-guarding pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "soulGuard",
    "slot": "pill",
    "tier": 4,
    "th": "ยาพิทักษ์วิญญาณ",
    "en": "Soul-guarding pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "heavenGuard",
    "slot": "pill",
    "tier": 5,
    "th": "ยาคุ้มกายทัณฑ์สวรรค์",
    "en": "Tribulation-shielding pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "fateLock",
    "slot": "pill",
    "tier": 4,
    "th": "ยาต่อชะตา",
    "en": "Fate-binding pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "longevityFruit",
    "slot": "pill",
    "tier": 3,
    "th": "ผลไม้พันปี",
    "en": "Thousand-year fruit",
    "martial": false,
    "quest": false
  },
  {
    "id": "springPill",
    "slot": "pill",
    "tier": 3,
    "th": "ยาคืนวสันต์",
    "en": "Spring-Returning Pill",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_hempTunic",
    "slot": "armor",
    "tier": 0,
    "th": "เสื้อป่านชาวนา",
    "en": "Hemp field tunic",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_indigoRobe",
    "slot": "armor",
    "tier": 1,
    "th": "ชุดผ้าครามชาวเมือง",
    "en": "Indigo cotton robe",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_greyScholar",
    "slot": "armor",
    "tier": 1,
    "th": "ชุดบัณฑิตผ้าเทา",
    "en": "Grey scholar's robe",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_greenSilk",
    "slot": "armor",
    "tier": 2,
    "th": "ชุดไหมเขียวคหบดี",
    "en": "Green silk robe of a man of means",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_redGown",
    "slot": "armor",
    "tier": 2,
    "th": "ชุดไหมแดงงานมงคล",
    "en": "Red silk festive gown",
    "martial": false,
    "quest": false
  },
  {
    "id": "g_merchantCoat",
    "slot": "armor",
    "tier": 2,
    "th": "เสื้อคลุมไหมน้ำเงินพ่อค้า",
    "en": "Blue silk merchant's coat",
    "martial": true,
    "quest": false
  },
  {
    "id": "beastCore",
    "slot": "material",
    "tier": 1,
    "th": "แก่นอสูร",
    "en": "Beast core",
    "martial": false,
    "quest": false
  },
  {
    "id": "spiritHerb",
    "slot": "material",
    "tier": 1,
    "th": "หญ้าวิญญาณ",
    "en": "Spirit herb",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishMinnow",
    "slot": "material",
    "tier": 0,
    "th": "ปลาซิวเงิน",
    "en": "Silver minnow",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishBarb",
    "slot": "material",
    "tier": 0,
    "th": "ปลาตะเพียนลำธาร",
    "en": "Stream barb",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishCatfish",
    "slot": "material",
    "tier": 0,
    "th": "ปลาดุกโคลน",
    "en": "Mud catfish",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishSpiritCarp",
    "slot": "material",
    "tier": 1,
    "th": "ปลาไนวิญญาณ",
    "en": "Spirit carp",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishJadePerch",
    "slot": "material",
    "tier": 1,
    "th": "ปลากะพงหยก",
    "en": "Jade perch",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishFlameKoi",
    "slot": "material",
    "tier": 2,
    "th": "ปลาคาร์ปหางเพลิง",
    "en": "Flame-tail koi",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishThunderEel",
    "slot": "material",
    "tier": 2,
    "th": "ปลาไหลอัสนี",
    "en": "Thunder eel",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishMoonFish",
    "slot": "material",
    "tier": 3,
    "th": "ปลาเงาจันทร์",
    "en": "Moon-shadow fish",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishGoldScale",
    "slot": "material",
    "tier": 3,
    "th": "ปลาเกล็ดทองพันปี",
    "en": "Thousand-year goldscale",
    "martial": false,
    "quest": false
  },
  {
    "id": "fishDragonCarp",
    "slot": "material",
    "tier": 3,
    "th": "ปลาหลีฮื้อมังกรทอง",
    "en": "Golden dragon carp",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_snakeGall",
    "slot": "material",
    "tier": 1,
    "th": "ดีงูเหลือม",
    "en": "Python gall",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_cloudMushroom",
    "slot": "material",
    "tier": 1,
    "th": "เห็ดเมฆา",
    "en": "Cloud mushroom",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_lowStone",
    "slot": "material",
    "tier": 1,
    "th": "หินวิญญาณขั้นต่ำ",
    "en": "Low spirit stone",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_coldIron",
    "slot": "material",
    "tier": 1,
    "th": "เหล็กเย็น",
    "en": "Cold iron",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_angelica",
    "slot": "material",
    "tier": 1,
    "th": "ตังกุย",
    "en": "Angelica root",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_licorice",
    "slot": "material",
    "tier": 1,
    "th": "ชะเอมเทศ",
    "en": "Liquorice root",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_rawIron",
    "slot": "material",
    "tier": 1,
    "th": "เหล็กดิบ",
    "en": "Raw iron",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_peachWood",
    "slot": "material",
    "tier": 1,
    "th": "ไม้ท้อ",
    "en": "Peachwood",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_oxHide",
    "slot": "material",
    "tier": 1,
    "th": "หนังวัวฟอก",
    "en": "Tanned oxhide",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_redGinseng",
    "slot": "material",
    "tier": 2,
    "th": "โสมแดงพันวัน",
    "en": "Thousand-day red ginseng",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_frostPetal",
    "slot": "material",
    "tier": 2,
    "th": "กลีบบัวน้ำแข็ง",
    "en": "Frost-lotus petal",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_emberBlossom",
    "slot": "material",
    "tier": 2,
    "th": "ดอกเพลิงชาด",
    "en": "Cinnabar ember blossom",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_spiritCore",
    "slot": "material",
    "tier": 2,
    "th": "แก่นอสูรวิญญาณ",
    "en": "Spirit beast core",
    "martial": false,
    "quest": false
  },
  {
    "id": "tigerBone",
    "slot": "material",
    "tier": 2,
    "th": "กระดูกเสือ",
    "en": "Tiger bone",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_midStone",
    "slot": "material",
    "tier": 2,
    "th": "หินวิญญาณขั้นกลาง",
    "en": "Mid spirit stone",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_spiritIron",
    "slot": "material",
    "tier": 2,
    "th": "เหล็กวิญญาณ",
    "en": "Spirit iron",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_mountainGinseng",
    "slot": "material",
    "tier": 2,
    "th": "โสมภูเขา",
    "en": "Mountain ginseng",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_pseudoGinseng",
    "slot": "material",
    "tier": 2,
    "th": "ซานฉี",
    "en": "Sanqi root",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_toadGall",
    "slot": "material",
    "tier": 2,
    "th": "ดีคางคกพิษ",
    "en": "Venom-toad gall",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_steelIngot",
    "slot": "material",
    "tier": 2,
    "th": "เหล็กกล้า",
    "en": "Steel ingot",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_purpleGinseng",
    "slot": "material",
    "tier": 3,
    "th": "โสมม่วงร้อยปี",
    "en": "Hundred-year purple ginseng",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_moonOrchid",
    "slot": "material",
    "tier": 3,
    "th": "กล้วยไม้จันทรา",
    "en": "Moon orchid",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_goldCore",
    "slot": "material",
    "tier": 3,
    "th": "แก่นอสูรทอง",
    "en": "Golden beast core",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_highStone",
    "slot": "material",
    "tier": 3,
    "th": "หินวิญญาณขั้นสูง",
    "en": "High spirit stone",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_starMetal",
    "slot": "material",
    "tier": 3,
    "th": "โลหะดาวตก",
    "en": "Fallen-star metal",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_flameCrystal",
    "slot": "material",
    "tier": 3,
    "th": "ผลึกเพลิง",
    "en": "Flame crystal",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_snowLotusSeed",
    "slot": "material",
    "tier": 3,
    "th": "เมล็ดบัวหิมะ",
    "en": "Snow-lotus seed",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_cordyceps",
    "slot": "material",
    "tier": 3,
    "th": "ถั่งเช่าหิมะ",
    "en": "Snow cordyceps",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_blackIron",
    "slot": "material",
    "tier": 3,
    "th": "เหล็กนิล",
    "en": "Black iron",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_ironwood",
    "slot": "material",
    "tier": 3,
    "th": "ไม้เหล็กพันปี",
    "en": "Thousand-year ironwood",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_silverSilk",
    "slot": "material",
    "tier": 3,
    "th": "ใยไหมเงิน",
    "en": "Silver silk thread",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_dragonBlood",
    "slot": "material",
    "tier": 4,
    "th": "หญ้าโลหิตมังกร",
    "en": "Dragon-blood grass",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_nineLeaf",
    "slot": "material",
    "tier": 4,
    "th": "หญ้าเก้าใบวิญญาณ",
    "en": "Nine-leaf spirit grass",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_dragonScale",
    "slot": "material",
    "tier": 4,
    "th": "เกล็ดมังกร",
    "en": "Dragon scale shard",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_skySteel",
    "slot": "material",
    "tier": 4,
    "th": "เหล็กฟ้า",
    "en": "Sky steel",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_lingzhi",
    "slot": "material",
    "tier": 4,
    "th": "หลินจือพันปี",
    "en": "Thousand-year lingzhi",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_meteorIron",
    "slot": "material",
    "tier": 4,
    "th": "เหล็กอุกกาบาต",
    "en": "Meteoric iron",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_thunderWood",
    "slot": "material",
    "tier": 4,
    "th": "ไม้ต้องฟ้าผ่า",
    "en": "Thunder-struck wood",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_pythonRoyal",
    "slot": "material",
    "tier": 4,
    "th": "ดีงูหลามราชา",
    "en": "Royal python gall",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_immortalLotus",
    "slot": "material",
    "tier": 5,
    "th": "บัวเซียนเก้าชั้น",
    "en": "Nine-tier immortal lotus",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_phoenixFeather",
    "slot": "material",
    "tier": 5,
    "th": "ขนหงส์เพลิง",
    "en": "Phoenix feather",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_skyDewFruit",
    "slot": "material",
    "tier": 5,
    "th": "ผลน้ำค้างสวรรค์",
    "en": "Heavenly dew fruit",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_chaosOre",
    "slot": "material",
    "tier": 5,
    "th": "แร่โกลาหล",
    "en": "Chaos ore",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_dragonMarrow",
    "slot": "material",
    "tier": 5,
    "th": "ไขกระดูกมังกร",
    "en": "Dragon marrow",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_heavenSteel",
    "slot": "material",
    "tier": 5,
    "th": "เหล็กกล้าสวรรค์",
    "en": "Heaven-forged steel",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_goldSilkworm",
    "slot": "material",
    "tier": 5,
    "th": "หนอนไหมทองคำ",
    "en": "Golden silkworm",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_guardianBlood",
    "slot": "material",
    "tier": 4,
    "th": "โลหิตผู้พิทักษ์แดนลับ",
    "en": "Realm guardian's blood",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_kingCore",
    "slot": "material",
    "tier": 5,
    "th": "แก่นราชันอสูร",
    "en": "Beast king's core",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_realmHeart",
    "slot": "material",
    "tier": 5,
    "th": "หัวใจแดนลับ",
    "en": "Heart of a secret realm",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_fateThread",
    "slot": "material",
    "tier": 5,
    "th": "เส้นด้ายชะตา",
    "en": "Thread of fate",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_tigerLordBone",
    "slot": "material",
    "tier": 4,
    "th": "กระดูกจ้าวพยัคฆ์",
    "en": "Tiger lord's bone",
    "martial": true,
    "quest": false
  },
  {
    "id": "ig_talismanPaper",
    "slot": "material",
    "tier": 1,
    "th": "กระดาษยันต์เหลือง",
    "en": "Yellow talisman paper",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_cinnabar",
    "slot": "material",
    "tier": 1,
    "th": "ผงชาด",
    "en": "Cinnabar powder",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_spiritInk",
    "slot": "material",
    "tier": 2,
    "th": "หมึกเลือดอสูร",
    "en": "Beast-blood ink",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_flagSilk",
    "slot": "material",
    "tier": 2,
    "th": "ผ้าไหมธงค่ายกล",
    "en": "Array-flag silk",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_goldInk",
    "slot": "material",
    "tier": 3,
    "th": "หมึกผงทองคำ",
    "en": "Gold-dust ink",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_batWing",
    "slot": "material",
    "tier": 1,
    "th": "ปีกค้างคาวศิลา",
    "en": "Stone-bat wing",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_caveFang",
    "slot": "material",
    "tier": 1,
    "th": "เขี้ยวสัตว์ถ้ำ",
    "en": "Cave-beast fang",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_venomSac",
    "slot": "material",
    "tier": 1,
    "th": "ถุงพิษสัตว์ถ้ำ",
    "en": "Cave venom sac",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_glowScale",
    "slot": "material",
    "tier": 1,
    "th": "เกล็ดเรืองแสง",
    "en": "Glowing scale",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_glowRoot",
    "slot": "material",
    "tier": 1,
    "th": "รากไม้เรืองแสง",
    "en": "Glowing spirit root",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_crystalSilk",
    "slot": "material",
    "tier": 2,
    "th": "ใยแมงมุมผลึก",
    "en": "Crystal spider silk",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_shellPlate",
    "slot": "material",
    "tier": 1,
    "th": "กระดองหินธารมืด",
    "en": "Dark-stream shell plate",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_soulAsh",
    "slot": "material",
    "tier": 2,
    "th": "เถ้าดวงวิญญาณ",
    "en": "Wraith ash",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_swordRust",
    "slot": "material",
    "tier": 2,
    "th": "สนิมกระบี่วิญญาณ",
    "en": "Spirit-sword rust",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_emberFeather",
    "slot": "material",
    "tier": 2,
    "th": "ขนนกเพลิงเตา",
    "en": "Furnace-ember feather",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_cinderGall",
    "slot": "material",
    "tier": 3,
    "th": "ดีคางคกกลืนถ่าน",
    "en": "Cinder-toad gall",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_inkFur",
    "slot": "material",
    "tier": 2,
    "th": "ขนอสูรซึมหมึก",
    "en": "Ink-steeped fur",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_jadeHide",
    "slot": "material",
    "tier": 2,
    "th": "หนังเกราะหยก",
    "en": "Jade-armour hide",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_coldScale",
    "slot": "material",
    "tier": 2,
    "th": "เกล็ดเจียวน้ำเย็น",
    "en": "Cold flood-dragon scale",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_fireMarrow",
    "slot": "material",
    "tier": 3,
    "th": "ไขกระดูกอสูรเพลิง",
    "en": "Fire-beast marrow",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_qilinFlame",
    "slot": "material",
    "tier": 4,
    "th": "เปลวเพลิงกิเลน",
    "en": "Qilin flame",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_cloudDown",
    "slot": "material",
    "tier": 2,
    "th": "ขนปุยเมฆสวรรค์",
    "en": "Cloud-down plume",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_skyHoney",
    "slot": "material",
    "tier": 2,
    "th": "น้ำผึ้งสวรรค์",
    "en": "Heavenly honey",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_starHorn",
    "slot": "material",
    "tier": 2,
    "th": "เขาสัตว์สวรรค์",
    "en": "Celestial horn",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_thunderHide",
    "slot": "material",
    "tier": 2,
    "th": "หนังสัตว์รอยอัสนี",
    "en": "Thunder-scarred hide",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_palaceShell",
    "slot": "material",
    "tier": 2,
    "th": "กระดองหยกวังสวรรค์",
    "en": "Palace jade shell",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_starFur",
    "slot": "material",
    "tier": 2,
    "th": "ขนสัตว์ดารา",
    "en": "Star-touched fur",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_thunderBone",
    "slot": "material",
    "tier": 3,
    "th": "กระดูกอัสนี",
    "en": "Thunder bone",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_rainbowPlume",
    "slot": "material",
    "tier": 3,
    "th": "ขนหางรุ้ง",
    "en": "Rainbow plume",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_starBlood",
    "slot": "material",
    "tier": 3,
    "th": "โลหิตสัตว์ดารา",
    "en": "Star blood",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig_tiangouFang",
    "slot": "material",
    "tier": 4,
    "th": "เขี้ยวเทียนโก่ว",
    "en": "Tiangou fang",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_corpseFeather",
    "slot": "material",
    "tier": 3,
    "th": "ขนแร้งกินศพเซียน",
    "en": "Immortal-carrion feather",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_ghostIron",
    "slot": "material",
    "tier": 3,
    "th": "เหล็กเกราะผีศึก",
    "en": "Ghost-armour iron",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_warSoul",
    "slot": "material",
    "tier": 3,
    "th": "แก่นวิญญาณศึก",
    "en": "War-soul essence",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_bloodJade",
    "slot": "material",
    "tier": 3,
    "th": "หยกโลหิตเซียน",
    "en": "Immortal-blood jade",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_dragonBone",
    "slot": "material",
    "tier": 3,
    "th": "เศษกระดูกมังกรศึก",
    "en": "War-dragon bone shard",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_starSilk",
    "slot": "material",
    "tier": 3,
    "th": "เส้นใยดาราผนึก",
    "en": "Star-seal thread",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_immortalMarrow",
    "slot": "material",
    "tier": 4,
    "th": "ไขกระดูกเซียนร่วง",
    "en": "Fallen immortal's marrow",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_demonBlood",
    "slot": "material",
    "tier": 4,
    "th": "โลหิตมารบรรพกาล",
    "en": "Primordial demon blood",
    "martial": false,
    "quest": false
  },
  {
    "id": "ig4_chainScale",
    "slot": "material",
    "tier": 4,
    "th": "เกล็ดมังกรมารโซ่ตรวน",
    "en": "Chained demon dragon's scale",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnace1",
    "slot": "tool",
    "tier": 1,
    "th": "เตาหลอมยาดินเผา",
    "en": "Clay alchemy stove",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnace2",
    "slot": "tool",
    "tier": 2,
    "th": "หม้อหลอมยาสัมฤทธิ์",
    "en": "Bronze alchemy cauldron",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnace3",
    "slot": "tool",
    "tier": 3,
    "th": "หม้อหลอมยาไฟวิญญาณ",
    "en": "Spirit-fire pill cauldron",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnace4",
    "slot": "tool",
    "tier": 4,
    "th": "กระถางหลอมยาไฟหยก",
    "en": "Jade-fire elixir tripod",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnace5",
    "slot": "tool",
    "tier": 5,
    "th": "กระถางหลอมยาแห่งสวรรค์",
    "en": "Heaven-forged elixir tripod",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_furnaceM1",
    "slot": "tool",
    "tier": 1,
    "th": "หม้อต้มยาดินเผา",
    "en": "Clay decoction pot",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_furnaceM2",
    "slot": "tool",
    "tier": 2,
    "th": "กาต้มยาทองแดง",
    "en": "Copper medicine kettle",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_furnaceM3",
    "slot": "tool",
    "tier": 3,
    "th": "เตาต้มยาเหล็กนิล",
    "en": "Black-iron medicine stove",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_furnaceM4",
    "slot": "tool",
    "tier": 4,
    "th": "หม้อยาหยกขาว",
    "en": "White-jade decoction pot",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_furnaceM5",
    "slot": "tool",
    "tier": 5,
    "th": "หม้อยาทองคำพันปี",
    "en": "Millennial gold pill pot",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_hammer1",
    "slot": "tool",
    "tier": 1,
    "th": "ค้อนเหล็กช่างตี",
    "en": "Smith's iron hammer",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_hammer2",
    "slot": "tool",
    "tier": 2,
    "th": "ค้อนหลอมวิญญาณ",
    "en": "Spirit-forging hammer",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_hammer3",
    "slot": "tool",
    "tier": 3,
    "th": "ค้อนดาวตก",
    "en": "Fallen-star hammer",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_hammer4",
    "slot": "tool",
    "tier": 4,
    "th": "ค้อนหลอมสายฟ้า",
    "en": "Thunder-forge hammer",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_hammer5",
    "slot": "tool",
    "tier": 5,
    "th": "ค้อนหลอมเซียน",
    "en": "Immortal forge hammer",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_hammerM1",
    "slot": "tool",
    "tier": 1,
    "th": "ค้อนช่างตีเหล็ก",
    "en": "Blacksmith's hammer",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_hammerM2",
    "slot": "tool",
    "tier": 2,
    "th": "ค้อนเหล็กกล้าช่างตีดาบ",
    "en": "Swordsmith's steel hammer",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_hammerM3",
    "slot": "tool",
    "tier": 3,
    "th": "ค้อนเหล็กนิลหลงเฉวียน",
    "en": "Longquan black-iron hammer",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_hammerM4",
    "slot": "tool",
    "tier": 4,
    "th": "ค้อนเหล็กอุกกาบาต",
    "en": "Meteoric-iron hammer",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_hammerM5",
    "slot": "tool",
    "tier": 5,
    "th": "ค้อนปรมาจารย์ช่างตี",
    "en": "Grandmaster smith's hammer",
    "martial": true,
    "quest": false
  },
  {
    "id": "tl_plate1",
    "slot": "tool",
    "tier": 1,
    "th": "จานค่ายกลไม้ท้อ",
    "en": "Peachwood array disc",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_plate2",
    "slot": "tool",
    "tier": 2,
    "th": "จานค่ายกลหยกเขียว",
    "en": "Green-jade array disc",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_plate3",
    "slot": "tool",
    "tier": 3,
    "th": "จานค่ายกลเก้าดารา",
    "en": "Nine-star array disc",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_plate4",
    "slot": "tool",
    "tier": 4,
    "th": "จานค่ายกลอัสนีม่วง",
    "en": "Purple-thunder array disc",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_plate5",
    "slot": "tool",
    "tier": 5,
    "th": "จานค่ายกลฟ้าดิน",
    "en": "Heaven-and-earth array disc",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_brush1",
    "slot": "tool",
    "tier": 1,
    "th": "พู่กันขนกระต่าย",
    "en": "Rabbit-hair talisman brush",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_brush2",
    "slot": "tool",
    "tier": 2,
    "th": "พู่กันขนหมาป่าวิญญาณ",
    "en": "Spirit-wolf talisman brush",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_brush3",
    "slot": "tool",
    "tier": 3,
    "th": "พู่กันด้ามหยก",
    "en": "Jade-handled talisman brush",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_brush4",
    "slot": "tool",
    "tier": 4,
    "th": "พู่กันขนหงส์",
    "en": "Phoenix-feather talisman brush",
    "martial": false,
    "quest": false
  },
  {
    "id": "tl_brush5",
    "slot": "tool",
    "tier": 5,
    "th": "พู่กันเซียน",
    "en": "Immortal's talisman brush",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_mend",
    "slot": "talisman",
    "tier": 1,
    "th": "ยันต์ฟื้นกาย",
    "en": "Body-mending talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_qi",
    "slot": "talisman",
    "tier": 1,
    "th": "ยันต์รวมปราณ",
    "en": "Qi-gathering talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_purge",
    "slot": "talisman",
    "tier": 2,
    "th": "ยันต์ขับพิษ",
    "en": "Poison-purging talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_gather",
    "slot": "talisman",
    "tier": 3,
    "th": "ยันต์ชุมนุมปราณ",
    "en": "Qi-convergence talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_hide",
    "slot": "talisman",
    "tier": 2,
    "th": "ยันต์ซ่อนกลิ่นอาย",
    "en": "Scent-hiding talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_substitute",
    "slot": "talisman",
    "tier": 3,
    "th": "ยันต์แทนชีวิต",
    "en": "Life-substitute talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_deathward",
    "slot": "talisman",
    "tier": 4,
    "th": "ยันต์ย้ายร่างหนีตาย",
    "en": "Death-ward body-shifting talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "tal_tame",
    "slot": "talisman",
    "tier": 2,
    "th": "ยันต์ผูกใจอสูร",
    "en": "Beast-binding talisman",
    "martial": false,
    "quest": false
  },
  {
    "id": "dg_calmPowder",
    "slot": "pill",
    "tier": 2,
    "th": "ผงยาสงบอสูร",
    "en": "Beast-calming powder",
    "martial": true,
    "quest": false
  },
  {
    "id": "arr_mist",
    "slot": "treasure",
    "tier": 2,
    "th": "ค่ายกลหมอกลวงตาพกพา",
    "en": "Portable mist-maze array",
    "martial": false,
    "quest": false
  },
  {
    "id": "arr_gather",
    "slot": "treasure",
    "tier": 2,
    "th": "ค่ายกลรวมปราณพกพา",
    "en": "Portable qi-gathering array",
    "martial": false,
    "quest": false
  },
  {
    "id": "arr_stone",
    "slot": "treasure",
    "tier": 3,
    "th": "ค่ายกลศิลาเก้าก้อน",
    "en": "Nine-stone array",
    "martial": false,
    "quest": false
  },
  {
    "id": "arr_star",
    "slot": "treasure",
    "tier": 3,
    "th": "ค่ายกลดาราเจ็ดดวง",
    "en": "Seven-star array",
    "martial": false,
    "quest": false
  },
  {
    "id": "soulVessel",
    "slot": "material",
    "tier": 5,
    "th": "ร่างหุ่นหยกวิญญาณ",
    "en": "Soul-jade puppet body",
    "martial": false,
    "quest": false
  },
  {
    "id": "mistVeilJade",
    "slot": "treasure",
    "tier": 3,
    "th": "หยกม่านหมอก",
    "en": "Mist-Veil Jade",
    "martial": false,
    "quest": false
  },
  {
    "id": "scroll:basicBreath",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: หายใจพื้นฐาน",
    "en": "Scroll: Basic Breathing Manual",
    "martial": false,
    "quest": false,
    "art": "basicBreath"
  },
  {
    "id": "scroll:fiveCycle",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ห้าธาตุหมุนเวียน",
    "en": "Scroll: Five Elements Cycle Manual",
    "martial": false,
    "quest": false,
    "art": "fiveCycle"
  },
  {
    "id": "scroll:clanMethod",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาสืบตระกูล",
    "en": "Scroll: Family Method",
    "martial": false,
    "quest": false,
    "art": "clanMethod"
  },
  {
    "id": "scroll:greatClanMethod",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: บรรพชนตระกูลใหญ่",
    "en": "Scroll: Ancestral Clan Canon",
    "martial": false,
    "quest": false,
    "art": "greatClanMethod"
  },
  {
    "id": "scroll:primordial",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ฟ้าดินกำเนิด",
    "en": "Scroll: Primordial Heaven-Earth Sutra",
    "martial": false,
    "quest": false,
    "art": "primordial"
  },
  {
    "id": "scroll:lostImmortal",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: เซียนที่หายสาบสูญ",
    "en": "Scroll: Lost Immortal Sutra",
    "martial": false,
    "quest": false,
    "art": "lostImmortal"
  },
  {
    "id": "scroll:wwSutra",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: สายลมพเนจร",
    "en": "Scroll: Wandering Wind Sutra",
    "martial": false,
    "quest": false,
    "art": "wwSutra"
  },
  {
    "id": "scroll:acsSutra",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: หัวใจกระบี่เมฆา",
    "en": "Scroll: Cloud Sword Heart Sutra",
    "martial": false,
    "quest": false,
    "art": "acsSutra"
  },
  {
    "id": "scroll:fpSutra",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ใจน้ำแข็ง",
    "en": "Scroll: Ice Heart Sutra",
    "martial": false,
    "quest": false,
    "art": "fpSutra"
  },
  {
    "id": "scroll:bdcSutra",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: โลหิตอมตะ",
    "en": "Scroll: Undying Blood Sutra",
    "martial": false,
    "quest": false,
    "art": "bdcSutra"
  },
  {
    "id": "scroll:tbvSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: พันบุปผา",
    "en": "Scroll: Thousand Blossom Sutra",
    "martial": false,
    "quest": false,
    "art": "tbvSutra"
  },
  {
    "id": "scroll:nsfSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ดาราเก้าชั้น",
    "en": "Scroll: Nine Stars Sutra",
    "martial": false,
    "quest": false,
    "art": "nsfSutra"
  },
  {
    "id": "scroll:tvsSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: เงาพิษ",
    "en": "Scroll: Venom Shadow Sutra",
    "martial": false,
    "quest": false,
    "art": "tvsSutra"
  },
  {
    "id": "scroll:jbSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: บุปผาคู่",
    "en": "Scroll: Paired Blossom Sutra",
    "martial": false,
    "quest": false,
    "art": "jbSutra"
  },
  {
    "id": "scroll:vtSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: กายาวัชระ",
    "en": "Scroll: Vajra Body Sutra",
    "martial": false,
    "quest": false,
    "art": "vtSutra"
  },
  {
    "id": "scroll:mbSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: จิตสัตว์อสูร",
    "en": "Scroll: Beast Spirit Sutra",
    "martial": false,
    "quest": false,
    "art": "mbSutra"
  },
  {
    "id": "scroll:dgSutra",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ปราณมังกรทอง",
    "en": "Scroll: Golden Dragon Qi",
    "martial": false,
    "quest": false,
    "art": "dgSutra"
  },
  {
    "id": "scroll:tpSutra",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: อัสนีผ่านกาย",
    "en": "Scroll: Thunder-Through-Body Sutra",
    "martial": false,
    "quest": false,
    "art": "tpSutra"
  },
  {
    "id": "scroll:wwSecret",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ลมไร้รูป",
    "en": "Scroll: Formless Wind Canon",
    "martial": false,
    "quest": false,
    "art": "wwSecret"
  },
  {
    "id": "scroll:acsSecret",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: กระบี่ทะลวงฟ้า",
    "en": "Scroll: Sky-Piercing Sword Canon",
    "martial": false,
    "quest": false,
    "art": "acsSecret"
  },
  {
    "id": "scroll:fpSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: หิมะนิรันดร์",
    "en": "Scroll: Eternal Snow Canon",
    "martial": false,
    "quest": false,
    "art": "fpSecret"
  },
  {
    "id": "scroll:bdcSecret",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ทะเลโลหิต",
    "en": "Scroll: Sea of Blood Canon",
    "martial": false,
    "quest": false,
    "art": "bdcSecret"
  },
  {
    "id": "scroll:tbvSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ต้นไม้ชีวิต",
    "en": "Scroll: Tree of Life Canon",
    "martial": false,
    "quest": false,
    "art": "tbvSecret"
  },
  {
    "id": "scroll:nsfSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ดาวเหนือ",
    "en": "Scroll: Polestar Canon",
    "martial": false,
    "quest": false,
    "art": "nsfSecret"
  },
  {
    "id": "scroll:tvsSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: หมื่นพิษ",
    "en": "Scroll: Ten Thousand Venoms Canon",
    "martial": false,
    "quest": false,
    "art": "tvsSecret"
  },
  {
    "id": "scroll:jbSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: หยินหยางรวมใจ",
    "en": "Scroll: Yin-Yang Union Canon",
    "martial": false,
    "quest": false,
    "art": "jbSecret"
  },
  {
    "id": "scroll:vtSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: พุทธกายทอง",
    "en": "Scroll: Golden Buddha Body Canon",
    "martial": false,
    "quest": false,
    "art": "vtSecret"
  },
  {
    "id": "scroll:mbSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ราชันอสูร",
    "en": "Scroll: Beast King Canon",
    "martial": false,
    "quest": false,
    "art": "mbSecret"
  },
  {
    "id": "scroll:dgSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: จักรพรรดิมังกร",
    "en": "Scroll: Dragon Emperor Canon",
    "martial": false,
    "quest": false,
    "art": "dgSecret"
  },
  {
    "id": "scroll:tpSecret",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: อัสนีพิโรธเก้าเมฆา",
    "en": "Scroll: Nine-Cloud Wrathful Thunder Canon",
    "martial": false,
    "quest": false,
    "art": "tpSecret"
  },
  {
    "id": "scroll:ninethunder",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: อัสนีเก้าสวรรค์",
    "en": "Scroll: Nine Heavens Thunder Canon",
    "martial": false,
    "quest": false,
    "art": "ninethunder"
  },
  {
    "id": "scroll:moonShadow",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: เงาจันทร์",
    "en": "Scroll: Moon Shadow Canon",
    "martial": false,
    "quest": false,
    "art": "moonShadow"
  },
  {
    "id": "scroll:phoenixFire",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: เพลิงหงส์",
    "en": "Scroll: Phoenix Fire Canon",
    "martial": false,
    "quest": false,
    "art": "phoenixFire"
  },
  {
    "id": "scroll:turtleBreath",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ลมหายใจเต่าดำ",
    "en": "Scroll: Black Tortoise Breath",
    "martial": false,
    "quest": false,
    "art": "turtleBreath"
  },
  {
    "id": "scroll:starSea",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ทะเลดารา",
    "en": "Scroll: Star Sea Canon",
    "martial": false,
    "quest": false,
    "art": "starSea"
  },
  {
    "id": "scroll:ironWill",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ใจเหล็ก",
    "en": "Scroll: Iron Will Manual",
    "martial": false,
    "quest": false,
    "art": "ironWill"
  },
  {
    "id": "scroll:greenWood",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ไม้เขียวชอุ่ม",
    "en": "Scroll: Evergreen Manual",
    "martial": false,
    "quest": false,
    "art": "greenWood"
  },
  {
    "id": "scroll:goldenCrow",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: อีกาทอง",
    "en": "Scroll: Golden Crow Canon",
    "martial": false,
    "quest": false,
    "art": "goldenCrow"
  },
  {
    "id": "scroll:frostLotus",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: บัวน้ำแข็ง",
    "en": "Scroll: Frost Lotus Canon",
    "martial": false,
    "quest": false,
    "art": "frostLotus"
  },
  {
    "id": "scroll:galeSky",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: พายุฟ้า",
    "en": "Scroll: Sky Gale Canon",
    "martial": false,
    "quest": false,
    "art": "galeSky"
  },
  {
    "id": "scroll:chaosSeed",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: เมล็ดโกลาหล",
    "en": "Scroll: Chaos Seed Canon",
    "martial": false,
    "quest": false,
    "art": "chaosSeed"
  },
  {
    "id": "scroll:soulDevour",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: กลืนวิญญาณ",
    "en": "Scroll: Soul-Devouring Canon",
    "martial": false,
    "quest": false,
    "art": "soulDevour"
  },
  {
    "id": "scroll:heavenFate",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ลิขิตสวรรค์",
    "en": "Scroll: Heaven's Fate Canon",
    "martial": false,
    "quest": false,
    "art": "heavenFate"
  },
  {
    "id": "scroll:basicFist",
    "slot": "scroll",
    "tier": 0,
    "th": "คัมภีร์วิชา: หมัดพื้นฐาน",
    "en": "Scroll: Basic Fist",
    "martial": false,
    "quest": false,
    "art": "basicFist"
  },
  {
    "id": "scroll:basicSword",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: กระบี่พื้นฐาน",
    "en": "Scroll: Basic Swordplay",
    "martial": false,
    "quest": false,
    "art": "basicSword"
  },
  {
    "id": "scroll:axeForm",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: เพลงขวานผ่าฟืน",
    "en": "Scroll: Woodsplitter Axe Form",
    "martial": false,
    "quest": false,
    "art": "axeForm"
  },
  {
    "id": "scroll:hammerForm",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: เพลงค้อนสะท้านทั่ง",
    "en": "Scroll: Anvil-Shaking Hammer Form",
    "martial": false,
    "quest": false,
    "art": "hammerForm"
  },
  {
    "id": "scroll:fanForm",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: เพลงพัดลมหวน",
    "en": "Scroll: Returning-Wind Fan Form",
    "martial": false,
    "quest": false,
    "art": "fanForm"
  },
  {
    "id": "scroll:bannerArt",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาธงวิญญาณเรียกหมอก",
    "en": "Scroll: Mist-Calling Soul Banner",
    "martial": false,
    "quest": false,
    "art": "bannerArt"
  },
  {
    "id": "scroll:wwSword",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: กระบี่ลมกรด",
    "en": "Scroll: Gale Sword",
    "martial": false,
    "quest": false,
    "art": "wwSword"
  },
  {
    "id": "scroll:acsSword",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: กระบี่เมฆาคราม",
    "en": "Scroll: Azure Cloud Sword Art",
    "martial": false,
    "quest": false,
    "art": "acsSword"
  },
  {
    "id": "scroll:fpSword",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: กระบี่หิมะ",
    "en": "Scroll: Snow Sword",
    "martial": false,
    "quest": false,
    "art": "fpSword"
  },
  {
    "id": "scroll:bdcPalm",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ฝ่ามือโลหิต",
    "en": "Scroll: Blood Palm",
    "martial": false,
    "quest": false,
    "art": "bdcPalm"
  },
  {
    "id": "scroll:tbvNeedle",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: เข็มบุปผา",
    "en": "Scroll: Blossom Needles",
    "martial": false,
    "quest": false,
    "art": "tbvNeedle"
  },
  {
    "id": "scroll:nsfStar",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ยันต์ดาราตก",
    "en": "Scroll: Falling Star Talisman",
    "martial": false,
    "quest": false,
    "art": "nsfStar"
  },
  {
    "id": "scroll:tvsStrike",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: เงาพิษสังหาร",
    "en": "Scroll: Venom Shadow Strike",
    "martial": false,
    "quest": false,
    "art": "tvsStrike"
  },
  {
    "id": "scroll:jbZither",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ระบำพิณ",
    "en": "Scroll: Zither Dance",
    "martial": false,
    "quest": false,
    "art": "jbZither"
  },
  {
    "id": "scroll:vtPalm",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ฝ่ามือพันชั่ง",
    "en": "Scroll: Thousand-Weight Palm",
    "martial": false,
    "quest": false,
    "art": "vtPalm"
  },
  {
    "id": "scroll:mbClaw",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: กรงเล็บอสูร",
    "en": "Scroll: Beast Claw",
    "martial": false,
    "quest": false,
    "art": "mbClaw"
  },
  {
    "id": "scroll:dgFist",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: หมัดมังกรทอง",
    "en": "Scroll: Golden Dragon Fist",
    "martial": false,
    "quest": false,
    "art": "dgFist"
  },
  {
    "id": "scroll:tpPalm",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ฝ่ามือฟ้าคำราม",
    "en": "Scroll: Roaring Sky Palm",
    "martial": false,
    "quest": false,
    "art": "tpPalm"
  },
  {
    "id": "scroll:thunderPalm",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ฝ่ามืออัสนี",
    "en": "Scroll: Thunder Palm",
    "martial": false,
    "quest": false,
    "art": "thunderPalm"
  },
  {
    "id": "scroll:lightStep",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: วิชาตัวเบาพื้นฐาน",
    "en": "Scroll: Basic Lightness Skill",
    "martial": false,
    "quest": false,
    "art": "lightStep"
  },
  {
    "id": "scroll:windStep",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ก้าวสายลม",
    "en": "Scroll: Wind Step",
    "martial": false,
    "quest": false,
    "art": "windStep"
  },
  {
    "id": "scroll:moonStep",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ก้าวเงาจันทร์",
    "en": "Scroll: Moon Shadow Step",
    "martial": false,
    "quest": false,
    "art": "moonStep"
  },
  {
    "id": "scroll:tpStep",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: ก้าวตามแสงฟ้า",
    "en": "Scroll: Lightning-Trail Step",
    "martial": false,
    "quest": false,
    "art": "tpStep"
  },
  {
    "id": "scroll:ironSkin",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: กายเหล็ก",
    "en": "Scroll: Iron Skin",
    "martial": false,
    "quest": false,
    "art": "ironSkin"
  },
  {
    "id": "scroll:goldenBell",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ระฆังทองคุ้มกาย",
    "en": "Scroll: Golden Bell",
    "martial": false,
    "quest": false,
    "art": "goldenBell"
  },
  {
    "id": "scroll:iceArmor",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: เกราะน้ำแข็ง",
    "en": "Scroll: Ice Armour",
    "martial": false,
    "quest": false,
    "art": "iceArmor"
  },
  {
    "id": "scroll:alchemy",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาปรุงยา",
    "en": "Scroll: Alchemy",
    "martial": false,
    "quest": false,
    "art": "alchemy"
  },
  {
    "id": "scroll:arrays",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาค่ายกล",
    "en": "Scroll: Array Craft",
    "martial": false,
    "quest": false,
    "art": "arrays"
  },
  {
    "id": "scroll:talismans",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: วิชาเขียนยันต์",
    "en": "Scroll: Talisman Craft",
    "martial": false,
    "quest": false,
    "art": "talismans"
  },
  {
    "id": "scroll:beastTaming",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาเลี้ยงสัตว์อสูร",
    "en": "Scroll: Beast Taming",
    "martial": false,
    "quest": false,
    "art": "beastTaming"
  },
  {
    "id": "scroll:poisonCraft",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาพิษ",
    "en": "Scroll: Poison Craft",
    "martial": false,
    "quest": false,
    "art": "poisonCraft"
  },
  {
    "id": "scroll:smithing",
    "slot": "scroll",
    "tier": 1,
    "th": "คัมภีร์วิชา: วิชาตีเหล็กหลอมอาวุธ",
    "en": "Scroll: Smithing and Weapon-Forging",
    "martial": false,
    "quest": false,
    "art": "smithing"
  },
  {
    "id": "scroll:smithing2",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาหลอมอาวุธวิญญาณ",
    "en": "Scroll: Spirit-Weapon Forging",
    "martial": false,
    "quest": false,
    "art": "smithing2"
  },
  {
    "id": "scroll:smithing3",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: วิชาหลอมศาสตราไฟแก่น",
    "en": "Scroll: Core-Fire Armament Forging",
    "martial": false,
    "quest": false,
    "art": "smithing3"
  },
  {
    "id": "scroll:smithing4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ตำราหลอมอาวุธฟ้าดิน",
    "en": "Scroll: Heaven-and-Earth Forging Canon",
    "martial": false,
    "quest": false,
    "art": "smithing4"
  },
  {
    "id": "scroll:smithing5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: วิถีหลอมศาสตราเซียน",
    "en": "Scroll: Immortal Armament Dao",
    "martial": false,
    "quest": false,
    "art": "smithing5"
  },
  {
    "id": "scroll:wx_smith0",
    "slot": "scroll",
    "tier": 0,
    "th": "คัมภีร์วิชา: วิชาช่างตีเหล็กประจำหมู่บ้าน",
    "en": "Scroll: Village Blacksmith's Craft",
    "martial": true,
    "quest": false,
    "art": "wx_smith0"
  },
  {
    "id": "scroll:wx_smith2",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาช่างตีดาบยุทธภพ",
    "en": "Scroll: Jianghu Swordsmith's Craft",
    "martial": true,
    "quest": false,
    "art": "wx_smith2"
  },
  {
    "id": "scroll:wx_smith3",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: วิชาตีกระบี่เหล็กนิล",
    "en": "Scroll: Black-Iron Swordsmithing",
    "martial": true,
    "quest": false,
    "art": "wx_smith3"
  },
  {
    "id": "scroll:wx_smith4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ตำราช่างตีกระบี่หลงเฉวียน",
    "en": "Scroll: Longquan Master-Smith's Canon",
    "martial": true,
    "quest": false,
    "art": "wx_smith4"
  },
  {
    "id": "scroll:talisman2",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: วิชาเขียนยันต์วิญญาณ",
    "en": "Scroll: Spirit Talisman Script",
    "martial": false,
    "quest": false,
    "art": "talisman2"
  },
  {
    "id": "scroll:talisman3",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: ตำรายันต์อัสนีเก้าชั้น",
    "en": "Scroll: Ninefold Thunder Talisman Canon",
    "martial": false,
    "quest": false,
    "art": "talisman3"
  },
  {
    "id": "scroll:af_mbody2",
    "slot": "scroll",
    "tier": 2,
    "th": "คัมภีร์วิชา: หลอมกระดูกเหล็ก",
    "en": "Scroll: Iron-Bone Tempering Canon",
    "martial": false,
    "quest": false,
    "art": "af_mbody2"
  },
  {
    "id": "scroll:af_mbody3",
    "slot": "scroll",
    "tier": 3,
    "th": "คัมภีร์วิชา: เลือดทองแดง",
    "en": "Scroll: Copper-Blood Canon",
    "martial": false,
    "quest": false,
    "art": "af_mbody3"
  },
  {
    "id": "scroll:af_mbody4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: วัชระพันครั้ง",
    "en": "Scroll: Thousand-Forging Vajra Canon",
    "martial": false,
    "quest": false,
    "art": "af_mbody4"
  },
  {
    "id": "scroll:af_mbody5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: กายเซียนไร้ตำหนิ",
    "en": "Scroll: Flawless Immortal Body Canon",
    "martial": false,
    "quest": false,
    "art": "af_mbody5"
  },
  {
    "id": "scroll:af_msword4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ใจกระบี่ไร้ขอบ",
    "en": "Scroll: Boundless Sword-Heart Canon",
    "martial": false,
    "quest": false,
    "art": "af_msword4"
  },
  {
    "id": "scroll:af_msword5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: กระบี่ปฐมกำเนิด",
    "en": "Scroll: Genesis Sword Canon",
    "martial": false,
    "quest": false,
    "art": "af_msword5"
  },
  {
    "id": "scroll:af_blade5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ดาบสยบสิบทิศ",
    "en": "Scroll: Ten-Directions Quelling Sabre",
    "martial": false,
    "quest": false,
    "art": "af_blade5"
  },
  {
    "id": "scroll:af_spear4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ทวนมังกรทะลวงเมฆ",
    "en": "Scroll: Cloud-Piercing Dragon Spear",
    "martial": false,
    "quest": false,
    "art": "af_spear4"
  },
  {
    "id": "scroll:af_spear5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ทวนเซียนค้ำฟ้า",
    "en": "Scroll: Sky-Propping Immortal Spear",
    "martial": false,
    "quest": false,
    "art": "af_spear5"
  },
  {
    "id": "scroll:af_whip4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: แส้เก้าห่วงตรึงวิญญาณ",
    "en": "Scroll: Soul-Binding Nine-Ring Whip",
    "martial": false,
    "quest": false,
    "art": "af_whip4"
  },
  {
    "id": "scroll:af_whip5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: แส้โซ่ผูกดารา",
    "en": "Scroll: Star-Binding Chain Whip",
    "martial": false,
    "quest": false,
    "art": "af_whip5"
  },
  {
    "id": "scroll:af_axe4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ขวานแยกขุนเขา",
    "en": "Scroll: Mountain-Splitting Axe",
    "martial": false,
    "quest": false,
    "art": "af_axe4"
  },
  {
    "id": "scroll:af_axe5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ขวานเปิดฟ้าดิน",
    "en": "Scroll: Heaven-Opening Axe",
    "martial": false,
    "quest": false,
    "art": "af_axe5"
  },
  {
    "id": "scroll:af_hammer4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ค้อนทุบเขาลั่นฟ้า",
    "en": "Scroll: Thunder-Pounding Hammer",
    "martial": false,
    "quest": false,
    "art": "af_hammer4"
  },
  {
    "id": "scroll:af_hammer5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ค้อนสะเทือนภพ",
    "en": "Scroll: World-Shattering Hammer",
    "martial": false,
    "quest": false,
    "art": "af_hammer5"
  },
  {
    "id": "scroll:af_fan4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: พัดเมฆเก้าชั้น",
    "en": "Scroll: Ninefold Cloud Fan",
    "martial": false,
    "quest": false,
    "art": "af_fan4"
  },
  {
    "id": "scroll:af_fan5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: พัดโบกกระแสฟ้า",
    "en": "Scroll: Heaven-Turning Fan",
    "martial": false,
    "quest": false,
    "art": "af_fan5"
  },
  {
    "id": "scroll:af_hidden4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: เข็มพันลมหายใจ",
    "en": "Scroll: Thousand-Breath Needles",
    "martial": false,
    "quest": false,
    "art": "af_hidden4"
  },
  {
    "id": "scroll:af_hidden5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: เข็มฟ้าไร้เงา",
    "en": "Scroll: Shadowless Sky Needles",
    "martial": false,
    "quest": false,
    "art": "af_hidden5"
  },
  {
    "id": "scroll:af_banner4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ธงวิญญาณหมื่นเงา",
    "en": "Scroll: Ten-Thousand Shadow Soul Banner",
    "martial": false,
    "quest": false,
    "art": "af_banner4"
  },
  {
    "id": "scroll:af_banner5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ธงเซียนปราบสวรรค์",
    "en": "Scroll: Heaven-Quelling Immortal Banner",
    "martial": false,
    "quest": false,
    "art": "af_banner5"
  },
  {
    "id": "scroll:af_fly4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: กระบี่บินคืนเก้าครา",
    "en": "Scroll: Ninefold Swords Return",
    "martial": false,
    "quest": false,
    "art": "af_fly4"
  },
  {
    "id": "scroll:af_fly5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ดาราเหินกระบี่รวมพล",
    "en": "Scroll: Star-Swords Convergence",
    "martial": false,
    "quest": false,
    "art": "af_fly5"
  },
  {
    "id": "scroll:af_zither4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ท่วงทำนองพิณพิชิตวิญญาณ",
    "en": "Scroll: Soul-Taming Zither Dirge",
    "martial": false,
    "quest": false,
    "art": "af_zither4"
  },
  {
    "id": "scroll:afm_msword4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ลมปราณกระบี่เย็น",
    "en": "Scroll: Chill-Edge Sword Qi Manual",
    "martial": true,
    "quest": false,
    "art": "afm_msword4"
  },
  {
    "id": "scroll:afm_blade5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ดาบหักฟ้าไร้เงา",
    "en": "Scroll: Sky-Breaking Shadowless Sabre",
    "martial": true,
    "quest": false,
    "art": "afm_blade5"
  },
  {
    "id": "scroll:afm_spear4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ทวนหงส์พิชิตทัพ",
    "en": "Scroll: Phoenix Host-Breaking Spear",
    "martial": true,
    "quest": false,
    "art": "afm_spear4"
  },
  {
    "id": "scroll:afm_spear5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ทวนวีรชนหมื่นกอง",
    "en": "Scroll: Ten-Thousand-Rank Hero's Spear",
    "martial": true,
    "quest": false,
    "art": "afm_spear5"
  },
  {
    "id": "scroll:afm_whip4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: แส้ไหมงูเขียว",
    "en": "Scroll: Green Serpent Silk Whip",
    "martial": true,
    "quest": false,
    "art": "afm_whip4"
  },
  {
    "id": "scroll:afm_whip5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: แส้เก้ามังกรรัดฟ้า",
    "en": "Scroll: Nine-Dragon Sky-Binding Whip",
    "martial": true,
    "quest": false,
    "art": "afm_whip5"
  },
  {
    "id": "scroll:afm_axe4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ขวานจอมทัพ",
    "en": "Scroll: Warlord's Axe",
    "martial": true,
    "quest": false,
    "art": "afm_axe4"
  },
  {
    "id": "scroll:afm_axe5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ขวานบุกทะลวงหมื่นทัพ",
    "en": "Scroll: Axe That Parts Ten Thousand Hosts",
    "martial": true,
    "quest": false,
    "art": "afm_axe5"
  },
  {
    "id": "scroll:afm_hammer4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ค้อนมหาวัชระ",
    "en": "Scroll: Great Vajra Hammer",
    "martial": true,
    "quest": false,
    "art": "afm_hammer4"
  },
  {
    "id": "scroll:afm_hammer5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ค้อนหนักพันชั่งสะเทือนดิน",
    "en": "Scroll: Earth-Shaking Thousand-Weight Hammer",
    "martial": true,
    "quest": false,
    "art": "afm_hammer5"
  },
  {
    "id": "scroll:afm_fan4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: พัดเหล็กสิบสองซี่",
    "en": "Scroll: Twelve-Rib Iron Fan",
    "martial": true,
    "quest": false,
    "art": "afm_fan4"
  },
  {
    "id": "scroll:afm_fan5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: พัดมือสวรรค์พลิกยุทธภพ",
    "en": "Scroll: World-Turning Heavenly Fan",
    "martial": true,
    "quest": false,
    "art": "afm_fan5"
  },
  {
    "id": "scroll:afm_hidden4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ดอกเหมยพันเข็ม",
    "en": "Scroll: Plum-Blossom Thousand Needles",
    "martial": true,
    "quest": false,
    "art": "afm_hidden4"
  },
  {
    "id": "scroll:afm_hidden5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ลูกดอกเทพไร้เงาพันลี้",
    "en": "Scroll: Thousand-Li Shadowless Throwing Darts",
    "martial": true,
    "quest": false,
    "art": "afm_hidden5"
  },
  {
    "id": "scroll:afm_zither4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: บทพิณขับวิญญาณทัพ",
    "en": "Scroll: Host-Rousing Zither Song",
    "martial": true,
    "quest": false,
    "art": "afm_zither4"
  },
  {
    "id": "scroll:afm_zither5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: พิณฟ้าลั่นกู่ก้อง",
    "en": "Scroll: Sky-Echoing Zither Strains",
    "martial": true,
    "quest": false,
    "art": "afm_zither5"
  },
  {
    "id": "scroll:afm_dpalm5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ฝ่ามือม่านสวรรค์",
    "en": "Scroll: Heavenly Curtain Palm",
    "martial": true,
    "quest": false,
    "art": "afm_dpalm5"
  },
  {
    "id": "scroll:afm_sbody4",
    "slot": "scroll",
    "tier": 4,
    "th": "คัมภีร์วิชา: ตำรานวดกระดูกคืนชีพ",
    "en": "Scroll: Bone-Reviving Rubdown Treatise",
    "martial": true,
    "quest": false,
    "art": "afm_sbody4"
  },
  {
    "id": "scroll:afm_forge5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: วิชาหลอมศาสตราจอมยุทธ์สวรรค์",
    "en": "Scroll: Heaven-Grade Martial Forging",
    "martial": true,
    "quest": false,
    "art": "afm_forge5"
  },
  {
    "id": "scroll:afm_alch5",
    "slot": "scroll",
    "tier": 5,
    "th": "คัมภีร์วิชา: ตำรับหมอเทพล้างกระดูกเปลี่ยนเลือด",
    "en": "Scroll: Divine Physician's Marrow-Washing Pharmacopoeia",
    "martial": true,
    "quest": false,
    "art": "afm_alch5"
  }
];
export const ITEM_MAP = new Map<string, ItemCatalogDef>(ITEMS_CATALOG.map((x) => [x.id, x]));

export const SKILLS_CATALOG: SkillCatalogDef[] = [
  {
    "id": "basicBreath",
    "kind": "main",
    "tier": 1,
    "element": null,
    "th": "คัมภีร์หายใจพื้นฐาน",
    "en": "Basic Breathing Manual",
    "martial": false,
    "demonic": false
  },
  {
    "id": "fiveCycle",
    "kind": "main",
    "tier": 2,
    "element": null,
    "th": "คัมภีร์ห้าธาตุหมุนเวียน",
    "en": "Five Elements Cycle Manual",
    "martial": false,
    "demonic": false
  },
  {
    "id": "clanMethod",
    "kind": "main",
    "tier": 2,
    "element": null,
    "th": "วิชาสืบตระกูล",
    "en": "Family Method",
    "martial": false,
    "demonic": false
  },
  {
    "id": "greatClanMethod",
    "kind": "main",
    "tier": 3,
    "element": null,
    "th": "คัมภีร์บรรพชนตระกูลใหญ่",
    "en": "Ancestral Clan Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "primordial",
    "kind": "main",
    "tier": 4,
    "element": null,
    "th": "คัมภีร์ฟ้าดินกำเนิด",
    "en": "Primordial Heaven-Earth Sutra",
    "martial": false,
    "demonic": false
  },
  {
    "id": "lostImmortal",
    "kind": "main",
    "tier": 5,
    "element": null,
    "th": "คัมภีร์เซียนที่หายสาบสูญ",
    "en": "Lost Immortal Sutra",
    "martial": false,
    "demonic": false
  },
  {
    "id": "wwSutra",
    "kind": "main",
    "tier": 1,
    "element": "wind",
    "th": "คัมภีร์สายลมพเนจร",
    "en": "Wandering Wind Sutra",
    "martial": false,
    "demonic": false,
    "sect": "wandering-wind"
  },
  {
    "id": "acsSutra",
    "kind": "main",
    "tier": 3,
    "element": "metal",
    "th": "คัมภีร์หัวใจกระบี่เมฆา",
    "en": "Cloud Sword Heart Sutra",
    "martial": false,
    "demonic": false,
    "sect": "azure-cloud-sword"
  },
  {
    "id": "fpSutra",
    "kind": "main",
    "tier": 3,
    "element": "ice",
    "th": "คัมภีร์ใจน้ำแข็ง",
    "en": "Ice Heart Sutra",
    "martial": false,
    "demonic": false,
    "sect": "frost-palace"
  },
  {
    "id": "bdcSutra",
    "kind": "main",
    "tier": 3,
    "element": "fire",
    "th": "คัมภีร์โลหิตอมตะ",
    "en": "Undying Blood Sutra",
    "martial": false,
    "demonic": true,
    "sect": "blood-demon-cult"
  },
  {
    "id": "tbvSutra",
    "kind": "main",
    "tier": 2,
    "element": "wood",
    "th": "คัมภีร์พันบุปผา",
    "en": "Thousand Blossom Sutra",
    "martial": false,
    "demonic": false,
    "sect": "thousand-blossom-valley"
  },
  {
    "id": "nsfSutra",
    "kind": "main",
    "tier": 2,
    "element": "earth",
    "th": "คัมภีร์ดาราเก้าชั้น",
    "en": "Nine Stars Sutra",
    "martial": false,
    "demonic": false,
    "sect": "nine-star-formation"
  },
  {
    "id": "tvsSutra",
    "kind": "main",
    "tier": 2,
    "element": "water",
    "th": "คัมภีร์เงาพิษ",
    "en": "Venom Shadow Sutra",
    "martial": false,
    "demonic": false,
    "sect": "thousand-venom-shadow"
  },
  {
    "id": "jbSutra",
    "kind": "main",
    "tier": 2,
    "element": "wood",
    "th": "คัมภีร์บุปผาคู่",
    "en": "Paired Blossom Sutra",
    "martial": false,
    "demonic": false,
    "sect": "joyful-blossom"
  },
  {
    "id": "vtSutra",
    "kind": "main",
    "tier": 2,
    "element": "earth",
    "th": "คัมภีร์กายาวัชระ",
    "en": "Vajra Body Sutra",
    "martial": false,
    "demonic": false,
    "sect": "vajra-temple"
  },
  {
    "id": "mbSutra",
    "kind": "main",
    "tier": 2,
    "element": "earth",
    "th": "คัมภีร์จิตสัตว์อสูร",
    "en": "Beast Spirit Sutra",
    "martial": false,
    "demonic": false,
    "sect": "mountain-beast"
  },
  {
    "id": "dgSutra",
    "kind": "main",
    "tier": 3,
    "element": "metal",
    "th": "ปราณมังกรทอง",
    "en": "Golden Dragon Qi",
    "martial": false,
    "demonic": false,
    "sect": "dragon-guard"
  },
  {
    "id": "tpSutra",
    "kind": "main",
    "tier": 2,
    "element": "lightning",
    "th": "คัมภีร์อัสนีผ่านกาย",
    "en": "Thunder-Through-Body Sutra",
    "martial": false,
    "demonic": false,
    "sect": "thunder-peak"
  },
  {
    "id": "wwSecret",
    "kind": "main",
    "tier": 3,
    "element": "wind",
    "th": "คัมภีร์ลมไร้รูป",
    "en": "Formless Wind Canon",
    "martial": false,
    "demonic": false,
    "sect": "wandering-wind"
  },
  {
    "id": "acsSecret",
    "kind": "main",
    "tier": 5,
    "element": "metal",
    "th": "คัมภีร์กระบี่ทะลวงฟ้า",
    "en": "Sky-Piercing Sword Canon",
    "martial": false,
    "demonic": false,
    "sect": "azure-cloud-sword"
  },
  {
    "id": "fpSecret",
    "kind": "main",
    "tier": 4,
    "element": "ice",
    "th": "คัมภีร์หิมะนิรันดร์",
    "en": "Eternal Snow Canon",
    "martial": false,
    "demonic": false,
    "sect": "frost-palace"
  },
  {
    "id": "bdcSecret",
    "kind": "main",
    "tier": 5,
    "element": "fire",
    "th": "คัมภีร์ทะเลโลหิต",
    "en": "Sea of Blood Canon",
    "martial": false,
    "demonic": true,
    "sect": "blood-demon-cult"
  },
  {
    "id": "tbvSecret",
    "kind": "main",
    "tier": 4,
    "element": "wood",
    "th": "คัมภีร์ต้นไม้ชีวิต",
    "en": "Tree of Life Canon",
    "martial": false,
    "demonic": false,
    "sect": "thousand-blossom-valley"
  },
  {
    "id": "nsfSecret",
    "kind": "main",
    "tier": 4,
    "element": "earth",
    "th": "คัมภีร์ดาวเหนือ",
    "en": "Polestar Canon",
    "martial": false,
    "demonic": false,
    "sect": "nine-star-formation"
  },
  {
    "id": "tvsSecret",
    "kind": "main",
    "tier": 4,
    "element": "water",
    "th": "คัมภีร์หมื่นพิษ",
    "en": "Ten Thousand Venoms Canon",
    "martial": false,
    "demonic": true,
    "sect": "thousand-venom-shadow"
  },
  {
    "id": "jbSecret",
    "kind": "main",
    "tier": 4,
    "element": "wood",
    "th": "คัมภีร์หยินหยางรวมใจ",
    "en": "Yin-Yang Union Canon",
    "martial": false,
    "demonic": false,
    "sect": "joyful-blossom"
  },
  {
    "id": "vtSecret",
    "kind": "main",
    "tier": 4,
    "element": "earth",
    "th": "คัมภีร์พุทธกายทอง",
    "en": "Golden Buddha Body Canon",
    "martial": false,
    "demonic": false,
    "sect": "vajra-temple"
  },
  {
    "id": "mbSecret",
    "kind": "main",
    "tier": 4,
    "element": "earth",
    "th": "คัมภีร์ราชันอสูร",
    "en": "Beast King Canon",
    "martial": false,
    "demonic": false,
    "sect": "mountain-beast"
  },
  {
    "id": "dgSecret",
    "kind": "main",
    "tier": 4,
    "element": "metal",
    "th": "คัมภีร์จักรพรรดิมังกร",
    "en": "Dragon Emperor Canon",
    "martial": false,
    "demonic": false,
    "sect": "dragon-guard"
  },
  {
    "id": "tpSecret",
    "kind": "main",
    "tier": 4,
    "element": "lightning",
    "th": "คัมภีร์อัสนีพิโรธเก้าเมฆา",
    "en": "Nine-Cloud Wrathful Thunder Canon",
    "martial": false,
    "demonic": false,
    "sect": "thunder-peak"
  },
  {
    "id": "ninethunder",
    "kind": "main",
    "tier": 4,
    "element": "lightning",
    "th": "คัมภีร์อัสนีเก้าสวรรค์",
    "en": "Nine Heavens Thunder Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "moonShadow",
    "kind": "main",
    "tier": 3,
    "element": "water",
    "th": "คัมภีร์เงาจันทร์",
    "en": "Moon Shadow Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "phoenixFire",
    "kind": "main",
    "tier": 4,
    "element": "fire",
    "th": "คัมภีร์เพลิงหงส์",
    "en": "Phoenix Fire Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "turtleBreath",
    "kind": "main",
    "tier": 3,
    "element": "water",
    "th": "คัมภีร์ลมหายใจเต่าดำ",
    "en": "Black Tortoise Breath",
    "martial": false,
    "demonic": false
  },
  {
    "id": "starSea",
    "kind": "main",
    "tier": 4,
    "element": "earth",
    "th": "คัมภีร์ทะเลดารา",
    "en": "Star Sea Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "ironWill",
    "kind": "main",
    "tier": 2,
    "element": "metal",
    "th": "คัมภีร์ใจเหล็ก",
    "en": "Iron Will Manual",
    "martial": false,
    "demonic": false
  },
  {
    "id": "greenWood",
    "kind": "main",
    "tier": 2,
    "element": "wood",
    "th": "คัมภีร์ไม้เขียวชอุ่ม",
    "en": "Evergreen Manual",
    "martial": false,
    "demonic": false
  },
  {
    "id": "goldenCrow",
    "kind": "main",
    "tier": 3,
    "element": "fire",
    "th": "คัมภีร์อีกาทอง",
    "en": "Golden Crow Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "frostLotus",
    "kind": "main",
    "tier": 3,
    "element": "ice",
    "th": "คัมภีร์บัวน้ำแข็ง",
    "en": "Frost Lotus Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "galeSky",
    "kind": "main",
    "tier": 3,
    "element": "wind",
    "th": "คัมภีร์พายุฟ้า",
    "en": "Sky Gale Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "chaosSeed",
    "kind": "main",
    "tier": 5,
    "element": null,
    "th": "คัมภีร์เมล็ดโกลาหล",
    "en": "Chaos Seed Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "soulDevour",
    "kind": "main",
    "tier": 4,
    "element": "water",
    "th": "คัมภีร์กลืนวิญญาณ",
    "en": "Soul-Devouring Canon",
    "martial": false,
    "demonic": true
  },
  {
    "id": "heavenFate",
    "kind": "main",
    "tier": 5,
    "element": null,
    "th": "คัมภีร์ลิขิตสวรรค์",
    "en": "Heaven's Fate Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "revElement",
    "kind": "main",
    "tier": 4,
    "element": null,
    "th": "เคล็ดย้อนธาตุ",
    "en": "Element-Reversing Art",
    "martial": false,
    "demonic": false
  },
  {
    "id": "basicFist",
    "kind": "combat",
    "tier": 0,
    "element": null,
    "th": "หมัดพื้นฐาน",
    "en": "Basic Fist",
    "martial": false,
    "demonic": false
  },
  {
    "id": "basicSword",
    "kind": "combat",
    "tier": 1,
    "element": "metal",
    "th": "กระบี่พื้นฐาน",
    "en": "Basic Swordplay",
    "martial": false,
    "demonic": false
  },
  {
    "id": "axeForm",
    "kind": "combat",
    "tier": 1,
    "element": null,
    "th": "เพลงขวานผ่าฟืน",
    "en": "Woodsplitter Axe Form",
    "martial": false,
    "demonic": false
  },
  {
    "id": "hammerForm",
    "kind": "combat",
    "tier": 1,
    "element": null,
    "th": "เพลงค้อนสะท้านทั่ง",
    "en": "Anvil-Shaking Hammer Form",
    "martial": false,
    "demonic": false
  },
  {
    "id": "fanForm",
    "kind": "combat",
    "tier": 1,
    "element": "wind",
    "th": "เพลงพัดลมหวน",
    "en": "Returning-Wind Fan Form",
    "martial": false,
    "demonic": false
  },
  {
    "id": "bannerArt",
    "kind": "combat",
    "tier": 2,
    "element": null,
    "th": "วิชาธงวิญญาณเรียกหมอก",
    "en": "Mist-Calling Soul Banner",
    "martial": false,
    "demonic": false
  },
  {
    "id": "wwSword",
    "kind": "combat",
    "tier": 1,
    "element": "wind",
    "th": "กระบี่ลมกรด",
    "en": "Gale Sword",
    "martial": false,
    "demonic": false,
    "sect": "wandering-wind"
  },
  {
    "id": "acsSword",
    "kind": "combat",
    "tier": 3,
    "element": "metal",
    "th": "กระบี่เมฆาคราม",
    "en": "Azure Cloud Sword Art",
    "martial": false,
    "demonic": false,
    "sect": "azure-cloud-sword"
  },
  {
    "id": "fpSword",
    "kind": "combat",
    "tier": 3,
    "element": "ice",
    "th": "กระบี่หิมะ",
    "en": "Snow Sword",
    "martial": false,
    "demonic": false,
    "sect": "frost-palace"
  },
  {
    "id": "bdcPalm",
    "kind": "combat",
    "tier": 3,
    "element": "fire",
    "th": "ฝ่ามือโลหิต",
    "en": "Blood Palm",
    "martial": false,
    "demonic": true,
    "sect": "blood-demon-cult"
  },
  {
    "id": "tbvNeedle",
    "kind": "combat",
    "tier": 2,
    "element": "wood",
    "th": "เข็มบุปผา",
    "en": "Blossom Needles",
    "martial": false,
    "demonic": false,
    "sect": "thousand-blossom-valley"
  },
  {
    "id": "nsfStar",
    "kind": "combat",
    "tier": 2,
    "element": "earth",
    "th": "ยันต์ดาราตก",
    "en": "Falling Star Talisman",
    "martial": false,
    "demonic": false,
    "sect": "nine-star-formation"
  },
  {
    "id": "tvsStrike",
    "kind": "combat",
    "tier": 2,
    "element": "water",
    "th": "เงาพิษสังหาร",
    "en": "Venom Shadow Strike",
    "martial": false,
    "demonic": false,
    "sect": "thousand-venom-shadow"
  },
  {
    "id": "jbZither",
    "kind": "combat",
    "tier": 2,
    "element": "wood",
    "th": "ระบำพิณ",
    "en": "Zither Dance",
    "martial": false,
    "demonic": false,
    "sect": "joyful-blossom"
  },
  {
    "id": "vtPalm",
    "kind": "combat",
    "tier": 2,
    "element": "earth",
    "th": "ฝ่ามือพันชั่ง",
    "en": "Thousand-Weight Palm",
    "martial": false,
    "demonic": false,
    "sect": "vajra-temple"
  },
  {
    "id": "mbClaw",
    "kind": "combat",
    "tier": 2,
    "element": "earth",
    "th": "กรงเล็บอสูร",
    "en": "Beast Claw",
    "martial": false,
    "demonic": false,
    "sect": "mountain-beast"
  },
  {
    "id": "dgFist",
    "kind": "combat",
    "tier": 3,
    "element": "metal",
    "th": "หมัดมังกรทอง",
    "en": "Golden Dragon Fist",
    "martial": false,
    "demonic": false,
    "sect": "dragon-guard"
  },
  {
    "id": "tpPalm",
    "kind": "combat",
    "tier": 2,
    "element": "lightning",
    "th": "ฝ่ามือฟ้าคำราม",
    "en": "Roaring Sky Palm",
    "martial": false,
    "demonic": false,
    "sect": "thunder-peak"
  },
  {
    "id": "thunderPalm",
    "kind": "combat",
    "tier": 4,
    "element": "lightning",
    "th": "ฝ่ามืออัสนี",
    "en": "Thunder Palm",
    "martial": false,
    "demonic": false
  },
  {
    "id": "lightStep",
    "kind": "movement",
    "tier": 1,
    "element": null,
    "th": "วิชาตัวเบาพื้นฐาน",
    "en": "Basic Lightness Skill",
    "martial": false,
    "demonic": false
  },
  {
    "id": "windStep",
    "kind": "movement",
    "tier": 2,
    "element": "wind",
    "th": "ก้าวสายลม",
    "en": "Wind Step",
    "martial": false,
    "demonic": false,
    "sect": "wandering-wind"
  },
  {
    "id": "moonStep",
    "kind": "movement",
    "tier": 3,
    "element": "water",
    "th": "ก้าวเงาจันทร์",
    "en": "Moon Shadow Step",
    "martial": false,
    "demonic": false,
    "sect": "thousand-venom-shadow"
  },
  {
    "id": "tpStep",
    "kind": "movement",
    "tier": 2,
    "element": "lightning",
    "th": "ก้าวตามแสงฟ้า",
    "en": "Lightning-Trail Step",
    "martial": false,
    "demonic": false,
    "sect": "thunder-peak"
  },
  {
    "id": "ironSkin",
    "kind": "defense",
    "tier": 1,
    "element": "earth",
    "th": "กายเหล็ก",
    "en": "Iron Skin",
    "martial": false,
    "demonic": false
  },
  {
    "id": "goldenBell",
    "kind": "defense",
    "tier": 3,
    "element": "metal",
    "th": "ระฆังทองคุ้มกาย",
    "en": "Golden Bell",
    "martial": false,
    "demonic": false,
    "sect": "vajra-temple"
  },
  {
    "id": "iceArmor",
    "kind": "defense",
    "tier": 2,
    "element": "ice",
    "th": "เกราะน้ำแข็ง",
    "en": "Ice Armour",
    "martial": false,
    "demonic": false,
    "sect": "frost-palace"
  },
  {
    "id": "alchemy",
    "kind": "support",
    "tier": 2,
    "element": "fire",
    "th": "วิชาปรุงยา",
    "en": "Alchemy",
    "martial": false,
    "demonic": false,
    "sect": "thousand-blossom-valley"
  },
  {
    "id": "arrays",
    "kind": "support",
    "tier": 2,
    "element": "earth",
    "th": "วิชาค่ายกล",
    "en": "Array Craft",
    "martial": false,
    "demonic": false,
    "sect": "nine-star-formation"
  },
  {
    "id": "talismans",
    "kind": "support",
    "tier": 1,
    "element": null,
    "th": "วิชาเขียนยันต์",
    "en": "Talisman Craft",
    "martial": false,
    "demonic": false
  },
  {
    "id": "beastTaming",
    "kind": "support",
    "tier": 2,
    "element": "wood",
    "th": "วิชาเลี้ยงสัตว์อสูร",
    "en": "Beast Taming",
    "martial": false,
    "demonic": false,
    "sect": "mountain-beast"
  },
  {
    "id": "poisonCraft",
    "kind": "support",
    "tier": 2,
    "element": "water",
    "th": "วิชาพิษ",
    "en": "Poison Craft",
    "martial": false,
    "demonic": false,
    "sect": "thousand-venom-shadow"
  },
  {
    "id": "smithing",
    "kind": "support",
    "tier": 1,
    "element": null,
    "th": "วิชาตีเหล็กหลอมอาวุธ",
    "en": "Smithing and Weapon-Forging",
    "martial": false,
    "demonic": false
  },
  {
    "id": "smithing2",
    "kind": "support",
    "tier": 2,
    "element": null,
    "th": "วิชาหลอมอาวุธวิญญาณ",
    "en": "Spirit-Weapon Forging",
    "martial": false,
    "demonic": false
  },
  {
    "id": "smithing3",
    "kind": "support",
    "tier": 3,
    "element": null,
    "th": "วิชาหลอมศาสตราไฟแก่น",
    "en": "Core-Fire Armament Forging",
    "martial": false,
    "demonic": false
  },
  {
    "id": "smithing4",
    "kind": "support",
    "tier": 4,
    "element": null,
    "th": "ตำราหลอมอาวุธฟ้าดิน",
    "en": "Heaven-and-Earth Forging Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "smithing5",
    "kind": "support",
    "tier": 5,
    "element": null,
    "th": "วิถีหลอมศาสตราเซียน",
    "en": "Immortal Armament Dao",
    "martial": false,
    "demonic": false
  },
  {
    "id": "wx_smith0",
    "kind": "support",
    "tier": 0,
    "element": null,
    "th": "วิชาช่างตีเหล็กประจำหมู่บ้าน",
    "en": "Village Blacksmith's Craft",
    "martial": true,
    "demonic": false
  },
  {
    "id": "wx_smith2",
    "kind": "support",
    "tier": 2,
    "element": null,
    "th": "วิชาช่างตีดาบยุทธภพ",
    "en": "Jianghu Swordsmith's Craft",
    "martial": true,
    "demonic": false
  },
  {
    "id": "wx_smith3",
    "kind": "support",
    "tier": 3,
    "element": null,
    "th": "วิชาตีกระบี่เหล็กนิล",
    "en": "Black-Iron Swordsmithing",
    "martial": true,
    "demonic": false
  },
  {
    "id": "wx_smith4",
    "kind": "support",
    "tier": 4,
    "element": null,
    "th": "ตำราช่างตีกระบี่หลงเฉวียน",
    "en": "Longquan Master-Smith's Canon",
    "martial": true,
    "demonic": false
  },
  {
    "id": "talisman2",
    "kind": "support",
    "tier": 2,
    "element": null,
    "th": "วิชาเขียนยันต์วิญญาณ",
    "en": "Spirit Talisman Script",
    "martial": false,
    "demonic": false
  },
  {
    "id": "talisman3",
    "kind": "support",
    "tier": 3,
    "element": "lightning",
    "th": "ตำรายันต์อัสนีเก้าชั้น",
    "en": "Ninefold Thunder Talisman Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "sunkenBreath",
    "kind": "support",
    "tier": 2,
    "element": "water",
    "th": "คัมภีร์จมปราณ",
    "en": "Sunken Breath Art",
    "martial": false,
    "demonic": false
  },
  {
    "id": "heavenVeil",
    "kind": "support",
    "tier": 4,
    "element": null,
    "th": "คัมภีร์ม่านฟ้าปิดปราณ",
    "en": "Heaven-Veil Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_mbody2",
    "kind": "main",
    "tier": 2,
    "element": null,
    "th": "คัมภีร์หลอมกระดูกเหล็ก",
    "en": "Iron-Bone Tempering Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_mbody3",
    "kind": "main",
    "tier": 3,
    "element": null,
    "th": "คัมภีร์เลือดทองแดง",
    "en": "Copper-Blood Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_mbody4",
    "kind": "main",
    "tier": 4,
    "element": null,
    "th": "คัมภีร์วัชระพันครั้ง",
    "en": "Thousand-Forging Vajra Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_mbody5",
    "kind": "main",
    "tier": 5,
    "element": null,
    "th": "คัมภีร์กายเซียนไร้ตำหนิ",
    "en": "Flawless Immortal Body Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_msword4",
    "kind": "main",
    "tier": 4,
    "element": null,
    "th": "คัมภีร์ใจกระบี่ไร้ขอบ",
    "en": "Boundless Sword-Heart Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_msword5",
    "kind": "main",
    "tier": 5,
    "element": null,
    "th": "คัมภีร์กระบี่ปฐมกำเนิด",
    "en": "Genesis Sword Canon",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_blade5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ดาบสยบสิบทิศ",
    "en": "Ten-Directions Quelling Sabre",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_spear4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ทวนมังกรทะลวงเมฆ",
    "en": "Cloud-Piercing Dragon Spear",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_spear5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ทวนเซียนค้ำฟ้า",
    "en": "Sky-Propping Immortal Spear",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_whip4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "แส้เก้าห่วงตรึงวิญญาณ",
    "en": "Soul-Binding Nine-Ring Whip",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_whip5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "แส้โซ่ผูกดารา",
    "en": "Star-Binding Chain Whip",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_axe4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ขวานแยกขุนเขา",
    "en": "Mountain-Splitting Axe",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_axe5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ขวานเปิดฟ้าดิน",
    "en": "Heaven-Opening Axe",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_hammer4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ค้อนทุบเขาลั่นฟ้า",
    "en": "Thunder-Pounding Hammer",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_hammer5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ค้อนสะเทือนภพ",
    "en": "World-Shattering Hammer",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_fan4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "พัดเมฆเก้าชั้น",
    "en": "Ninefold Cloud Fan",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_fan5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "พัดโบกกระแสฟ้า",
    "en": "Heaven-Turning Fan",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_hidden4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "เข็มพันลมหายใจ",
    "en": "Thousand-Breath Needles",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_hidden5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "เข็มฟ้าไร้เงา",
    "en": "Shadowless Sky Needles",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_banner4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ธงวิญญาณหมื่นเงา",
    "en": "Ten-Thousand Shadow Soul Banner",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_banner5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ธงเซียนปราบสวรรค์",
    "en": "Heaven-Quelling Immortal Banner",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_fly4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "กระบี่บินคืนเก้าครา",
    "en": "Ninefold Swords Return",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_fly5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ดาราเหินกระบี่รวมพล",
    "en": "Star-Swords Convergence",
    "martial": false,
    "demonic": false
  },
  {
    "id": "af_zither4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ท่วงทำนองพิณพิชิตวิญญาณ",
    "en": "Soul-Taming Zither Dirge",
    "martial": false,
    "demonic": false
  },
  {
    "id": "afm_msword4",
    "kind": "main",
    "tier": 4,
    "element": null,
    "th": "คัมภีร์ลมปราณกระบี่เย็น",
    "en": "Chill-Edge Sword Qi Manual",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_blade5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ดาบหักฟ้าไร้เงา",
    "en": "Sky-Breaking Shadowless Sabre",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_spear4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ทวนหงส์พิชิตทัพ",
    "en": "Phoenix Host-Breaking Spear",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_spear5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ทวนวีรชนหมื่นกอง",
    "en": "Ten-Thousand-Rank Hero's Spear",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_whip4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "แส้ไหมงูเขียว",
    "en": "Green Serpent Silk Whip",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_whip5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "แส้เก้ามังกรรัดฟ้า",
    "en": "Nine-Dragon Sky-Binding Whip",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_axe4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ขวานจอมทัพ",
    "en": "Warlord's Axe",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_axe5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ขวานบุกทะลวงหมื่นทัพ",
    "en": "Axe That Parts Ten Thousand Hosts",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_hammer4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ค้อนมหาวัชระ",
    "en": "Great Vajra Hammer",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_hammer5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ค้อนหนักพันชั่งสะเทือนดิน",
    "en": "Earth-Shaking Thousand-Weight Hammer",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_fan4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "พัดเหล็กสิบสองซี่",
    "en": "Twelve-Rib Iron Fan",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_fan5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "พัดมือสวรรค์พลิกยุทธภพ",
    "en": "World-Turning Heavenly Fan",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_hidden4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "ดอกเหมยพันเข็ม",
    "en": "Plum-Blossom Thousand Needles",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_hidden5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "ลูกดอกเทพไร้เงาพันลี้",
    "en": "Thousand-Li Shadowless Throwing Darts",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_zither4",
    "kind": "combat",
    "tier": 4,
    "element": null,
    "th": "บทพิณขับวิญญาณทัพ",
    "en": "Host-Rousing Zither Song",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_zither5",
    "kind": "combat",
    "tier": 5,
    "element": null,
    "th": "พิณฟ้าลั่นกู่ก้อง",
    "en": "Sky-Echoing Zither Strains",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_dpalm5",
    "kind": "defense",
    "tier": 5,
    "element": null,
    "th": "ฝ่ามือม่านสวรรค์",
    "en": "Heavenly Curtain Palm",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_sbody4",
    "kind": "support",
    "tier": 4,
    "element": null,
    "th": "ตำรานวดกระดูกคืนชีพ",
    "en": "Bone-Reviving Rubdown Treatise",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_forge5",
    "kind": "support",
    "tier": 5,
    "element": null,
    "th": "วิชาหลอมศาสตราจอมยุทธ์สวรรค์",
    "en": "Heaven-Grade Martial Forging",
    "martial": true,
    "demonic": false
  },
  {
    "id": "afm_alch5",
    "kind": "support",
    "tier": 5,
    "element": null,
    "th": "ตำรับหมอเทพล้างกระดูกเปลี่ยนเลือด",
    "en": "Divine Physician's Marrow-Washing Pharmacopoeia",
    "martial": true,
    "demonic": false
  }
];
export const SKILL_MAP = new Map<string, SkillCatalogDef>(SKILLS_CATALOG.map((x) => [x.id, x]));

export function getMasteryLevel(xp: number, isXian: boolean): { level: number; th: string; en: string } {
  let lv = 0;
  for (let i = 0; i < MASTERY_THRESHOLDS.length; i++) {
    if (xp >= MASTERY_THRESHOLDS[i]) lv = i;
  }
  const entry = MASTERY_LABELS[lv] ?? MASTERY_LABELS[0];
  const label = isXian && entry.xian ? entry.xian : entry.plain;
  return { level: lv, th: label.th, en: label.en };
}
