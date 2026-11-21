#!/usr/bin/env node
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), zlib = require("zlib");

const SECRET = "道法自然:wox2:5f1c-93ab-e27d", WQ = 97;
let _e = 625341585;
for (let i = 0; i < SECRET.length; i++) _e = Math.imul(_e ^ SECRET.charCodeAt(i), 16777619) >>> 0;
const BQ = [];
for (let i = 0; i < WQ; i++) { _e = (_e ^ (_e << 13)) >>> 0; _e = (_e ^ (_e >>> 17)) >>> 0; _e = (_e ^ (_e << 5)) >>> 0; BQ.push(_e % 94); }
const JME = new Uint8Array(WQ * 94);
for (let t = 0, n = 0; t < 94; t++) for (let o = 0; o < WQ; o++) JME[n++] = (BQ[o] + t * 29 + ((o ^ t) % 11)) % 94;

function hash(s) {
  let t = (2166136261 ^ Math.imul(BQ[3] + 1, 2654435761)) >>> 0;
  let h = (16777619 ^ (BQ[41] << 11)) >>> 0, a = 0;
  for (let i = 0; i < s.length; i++) {
    const r = s.charCodeAt(i);
    t = Math.imul(t ^ r, 16777619) >>> 0;
    h = (Math.imul(h ^ r, 1540483477) + BQ[a]) >>> 0;
    a = (a + 1) % WQ;
  }
  t = (t ^ s.length) >>> 0; h = (h ^ (h >>> 15)) >>> 0;
  h = Math.imul(h ^ s.length, 668265261) >>> 0; h = (h ^ (h >>> 13)) >>> 0;
  return t.toString(16).padStart(8, "0") + h.toString(16).padStart(8, "0");
}
function shift(s, dir) {
  const out = new Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i), v = c - 33;
    if (v >= 0 && v < 94) { const k = JME[i % JME.length]; let x = v + (dir > 0 ? k : 94 - k); if (x >= 94) x -= 94; out[i] = x + 33; }
    else out[i] = c;
  }
  let r = "";
  for (let i = 0; i < out.length; i += 8192) r += String.fromCharCode.apply(null, out.slice(i, i + 8192));
  return r;
}
const seal = text => "WOX2" + hash(text) + "~" + shift(text, 1);
function unseal(raw) {
  if (!raw.startsWith("WOX2") || raw[20] !== "~") throw new Error("ไม่ใช่ไฟล์เซฟ WOX2");
  const text = shift(raw.slice(21), -1);
  if (hash(text) !== raw.slice(4, 20)) throw new Error("ตราตรวจสอบไม่ตรง (ไฟล์อาจเสียหายหรือถูกแก้)");
  return text;
}

function readText(file) {
  let buf = fs.readFileSync(file);
  if (buf[0] === 0x1f && buf[1] === 0x8b) buf = zlib.gunzipSync(buf);
  return buf.toString("utf8").replace(/^\uFEFF/, "").replace(/[\r\n]+$/, "");
}

function endOf(src, i, closeOnly) {
  let d = 0;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") { for (i++; i < src.length && src[i] !== c; i++) if (src[i] === "\\") i++; continue; }
    if (c === "(" || c === "[" || c === "{") d++;
    else if (c === ")" || c === "]" || c === "}") { if (--d < 0) return i; }
    else if (!closeOnly && d === 0 && (c === ";" || c === ",")) return i;
  }
  return src.length;
}
const esc = s => s.replace(/[$.*+?^()|[\]{}\\]/g, "\\$&");
function grab(src, name, prefix = "") {
  const re = new RegExp("(?<![\\w$])" + esc(prefix + name) + "=(?!=)", "g"), hits = [...src.matchAll(re)];
  if (hits.length !== 1) throw new Error(`${name}: พบ ${hits.length} ตำแหน่ง (ต้องเจอ 1)`);
  const s = hits[0].index + hits[0][0].length;
  return vm.runInNewContext("(" + src.slice(s, endOf(src, s)) + ")", { Ms: (id, cost, th, en) => ({ id, cost, th, en }) });
}

const canon = v => JSON.stringify(v, (k, x) => x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map(q => [q, x[q]])) : x);
let failed = 0;
function report(label, ok, detail) {
  if (!ok) failed++;
  console.log((ok ? "✓ " : "✗ ") + label + (detail ? " · " + detail : ""));
}
function compare(label, ed, game, key = "id") {
  const g = new Map(game.map(x => [x[key], x])), seen = new Set(), bad = [];
  let match = 0;
  for (const e of ed) {
    seen.add(e[key]);
    const x = g.get(e[key]);
    if (!x) bad.push("เกินในตัวแก้ไข: " + e[key]);
    else if (canon(e) !== canon(x)) bad.push("ต่างกัน: " + e[key] + " editor=" + canon(e) + " game=" + canon(x));
    else match++;
  }
  for (const k of g.keys()) if (!seen.has(k)) bad.push("ขาดในตัวแก้ไข: " + k);
  report(`${label} ${match}/${game.length}`, !bad.length && ed.length === game.length, bad.slice(0, 5).join(" | "));
}

function findFiles(dir) {
  const ls = fs.readdirSync(dir);
  const pick = re => ls.filter(f => re.test(f)).sort();
  return { editor: path.join(dir, "editor.js"), apps: pick(/^app-.*\.js$/).map(f => path.join(dir, f)), cs: pick(/^c-.*\.js$/).map(f => path.join(dir, f)) };
}

function loadBundleCodec(src) {
  const st = src.match(/var ([\w$]+)="WOX1",([\w$]+)="WOX2"/);
  const zk = src.match(/function ([\w$]+)\(e\)\{if\(typeof e!="string"\|\|[\w$]+\(e\)\)return e;if\(e===/);
  const r0 = src.match(/function ([\w$]+)\(e\)\{if\(![\w$]+\(e\)\)return e;let t=e\.slice\(0,4\)/);
  if (!st || !zk || !r0) throw new Error("ไม่พบ codec ใน bundle (โครงสร้างเปลี่ยน ต้องตรวจมือ)");
  const end = Math.max(endOf(src, zk.index + zk[0].indexOf("{") + 1, true), endOf(src, r0.index + r0[0].indexOf("{") + 1, true));
  const code = src.slice(st.index, end + 1);
  return vm.runInNewContext(`(function(){${code};return{seal:${zk[1]},unseal:${r0[1]}}})()`, { TextDecoder });
}

function loadEditor(file) {
  const src = fs.readFileSync(file, "utf8");
  const cs = src.indexOf("/*CODEC*/"), ce = src.indexOf("/*END*/");
  if (cs < 0 || ce < 0) throw new Error("ไม่พบบล็อก /*CODEC*/ ใน editor.js");
  const codec = vm.runInNewContext(`(function(){${src.slice(cs, ce)};return{seal,unseal}})()`, {});
  const names = ["TAL", "CONF", "FATE", "BG", "STRUCT", "ROOTT", "ELEM", "SINEW"], t = {};
  for (const n of names) t[n] = grab(src, n, "const ");
  return { codec, t };
}

function lcg(seed) { let s = seed; return () => (s = (Math.imul(s, 1103515245) + 12345) >>> 0) / 4294967296; }
function samples() {
  const r = lcg(7), pool = ["ก", "ข", "ไ", "🐉", "\n", "\"", "\\", "a", "Z", "~", "!", "}", " "], big = [];
  for (let i = 0; i < 60000; i++) big.push(pool[Math.floor(r() * pool.length)]);
  const ascii = Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i)).join("");
  return [
    "{}",
    JSON.stringify({ name: { th: "ทดสอบ 🐉", en: "Test" }, n: [1, 2.5, -3], s: "line\nbreak", e: "" }),
    ascii.repeat(30),
    "x".repeat(20000) + "ไทย",
    big.join(""),
    JSON.stringify({ stats: { body: 10 }, big: big.join("") }),
  ];
}

function cmdCheck(dir) {
  const f = findFiles(dir);
  if (!fs.existsSync(f.editor)) throw new Error("ไม่พบ " + f.editor);
  if (f.apps.length !== 1 || f.cs.length !== 1) throw new Error(`ต้องมี app-*.js และ c-*.js อย่างละ 1 ไฟล์ในโฟลเดอร์ ${dir} (พบ ${f.apps.length}/${f.cs.length})`);
  const A = fs.readFileSync(f.apps[0], "utf8"), C = fs.readFileSync(f.cs[0], "utf8");
  console.log("editor : " + f.editor + "\napp    : " + f.apps[0] + "\nc      : " + f.cs[0] + "\n");
  const { codec, t } = loadEditor(f.editor);

  let bundle = null;
  try { bundle = loadBundleCodec(A); } catch (e) { report("codec ใน bundle", false, e.message); }
  if (bundle) {
    const tests = samples();
    let ok = 0, why = "";
    for (const [i, s] of tests.entries()) {
      const g = bundle.seal(s), e = codec.seal(s), m = seal(s);
      if (g !== e || g !== m) { why = `ตัวอย่าง #${i}: seal ไม่ตรง`; break; }
      if (bundle.unseal(g) !== s || codec.unseal(g) !== s || unseal(g) !== s) { why = `ตัวอย่าง #${i}: unseal ไม่ตรง`; break; }
      ok++;
    }
    report(`seal/unseal ตรงกับเกม ${ok}/${tests.length} (editor.js, wox.js, bundle)`, ok === tests.length, why);
    const g = bundle.seal(tests[1]);
    const badHash = g.slice(0, 4) + (g[4] === "0" ? "1" : "0") + g.slice(5), body = g.slice(0, 25) + (g[25] === "a" ? "b" : "a") + g.slice(26);
    let rej = 0;
    for (const x of [badHash, body]) {
      let a = false, b = false;
      try { codec.unseal(x); } catch { a = true; }
      b = bundle.unseal(x) === null;
      if (a && b) rej++;
    }
    report(`ไฟล์ที่ถูกแก้ถูกปฏิเสธเหมือนเกม ${rej}/2`, rej === 2);
  }

  const run = (label, fn) => { try { fn(); } catch (e) { report(label, false, e.message); } };
  run("TAL/Hf", () => {
    const hf = grab(C, "Hf");
    compare("TAL = Hf", t.TAL.map(x => ({ id: x.id, tier: x.tier, good: !!x.good, crossing: !!x.crossing, fx: x.fx, th: x.th, en: x.en })),
      hf.map(x => ({ id: x.id, tier: x.tier, good: !!x.good, crossing: !!x.crossing, fx: x.fx, th: x.th, en: x.en })));
  });
  run("CONF/joe", () => {
    const joe = grab(C, "joe"), norm = a => a.map(p => [...p].sort().join("|"));
    const e = norm(t.CONF), g = norm(joe), eu = new Set(e), gu = new Set(g);
    const bad = [...gu].filter(x => !eu.has(x)).map(x => "ขาด " + x).concat([...eu].filter(x => !gu.has(x)).map(x => "เกิน " + x));
    report(`CONF = joe ${[...eu].filter(x => gu.has(x)).length}/${gu.size}`, !bad.length && e.length === g.length, bad.slice(0, 5).join(" | "));
  });
  run("FATE/Oie", () => compare("FATE = Oie", t.FATE.map(([id, th, en, cost]) => ({ id, cost, th, en })), grab(A, "Oie")));
  run("SINEW/Aie", () => compare("SINEW = Aie", t.SINEW.map(([id, th, en]) => ({ id, th, en })), grab(A, "Aie").map(({ id, th, en }) => ({ id, th, en }))));
  run("BG/CRe", () => compare("BG = CRe", t.BG.map(([id, th, en]) => ({ id, th, en })), grab(C, "CRe").map(({ id, th, en }) => ({ id, th, en }))));
  run("STRUCT/LRe", () => compare("STRUCT = LRe", t.STRUCT.map(([id, th, en]) => ({ id, th, en })), grab(C, "LRe").map(({ id, th, en }) => ({ id, th, en }))));
  run("ROOTT/Tie+ERe", () => {
    const tie = grab(A, "Tie"), ere = new Map(grab(C, "ERe").map(x => [x.id, x.count]));
    compare("ROOTT = Tie+ERe", t.ROOTT.map(([id, cost, th, en, count]) => ({ id, cost, th, en, count })), tie.map(x => ({ ...x, count: ere.get(x.id) ?? 0 })));
  });
  run("ELEM/V_", () => {
    const v = grab(C, "V_"), tre = grab(C, "TRe"), are = grab(C, "ARe"), order = [...tre, ...are];
    compare("ELEM = V_", t.ELEM.map(([id, th, en]) => ({ id, th, en })), order.map(id => ({ id, th: v[id]?.th, en: v[id]?.en })));
    const el = t.ELEM.map(x => x[0]);
    report("ELEM แบ่ง 5 ธาตุปกติ + 3 ธาตุพิเศษ ตรง TRe/ARe", canon(el.slice(0, 5)) === canon(tre) && canon(el.slice(5)) === canon(are) && Object.keys(v).length === 8);
  });

  console.log(failed ? `\n✗ ไม่ผ่าน ${failed} รายการ` : "\n✓ ผ่านทุกรายการ");
  return failed ? 1 : 0;
}

function cmdVerify(file, dir) {
  const raw = readText(file), text = unseal(raw), state = JSON.parse(text);
  report("เปิดได้ · ตราตรวจสอบถูกต้อง", true, Object.keys(state).length + " คีย์ · " + text.length + " ตัวอักษร");
  report("เข้ารหัสกลับได้ไฟล์เดิมตรงทุกตัวอักษร", seal(JSON.stringify(state)) === raw, seal(JSON.stringify(state)) === raw ? "" : "ไม่ตรงเป๊ะแต่ถอดกลับได้ (ลำดับ/รูปแบบ JSON ต่าง)");
  try {
    const f = findFiles(dir);
    if (f.apps.length === 1) {
      const b = loadBundleCodec(fs.readFileSync(f.apps[0], "utf8"));
      report("codec ของเกมถอดได้ข้อความเดียวกัน", b.unseal(raw) === text);
    }
  } catch (e) { console.log("- ข้ามการเทียบกับ bundle: " + e.message); }
  console.log("tampered: " + (state.tampered ? JSON.stringify(state.tampered) : "ไม่มี"));
  return failed ? 1 : 0;
}

function loadState(file) {
  const raw = readText(file), state = JSON.parse(raw.startsWith("WOX2") ? unseal(raw) : raw);
  if (!state || typeof state !== "object" || Array.isArray(state)) throw new Error(file + ": เซฟต้องเป็น JSON object");
  return state;
}

const isObj = v => v !== null && typeof v === "object" && !Array.isArray(v);
const isRef = v => v !== null && typeof v === "object";
const fmt = v => { const s = v === undefined ? "ไม่มี" : JSON.stringify(v); return s.length > 80 ? s.slice(0, 77) + "..." : s; };

function diffValues(a, b, p, out) {
  if (a !== undefined && b !== undefined && canon(a) === canon(b)) return;
  if (a === undefined) return void out.push(["+", p, "= " + fmt(b)]);
  if (b === undefined) return void out.push(["-", p, "(เดิม " + fmt(a) + ")"]);
  if (isRef(a) && isRef(b) && Array.isArray(a) === Array.isArray(b)) {
    if (Array.isArray(a)) {
      if ([...a, ...b].every(x => !isRef(x))) {
        const rm = a.filter(x => !b.includes(x)), ad = b.filter(x => !a.includes(x));
        for (const x of rm) out.push(["-", p, "[ ] " + fmt(x)]);
        for (const x of ad) out.push(["+", p, "[ ] " + fmt(x)]);
        if (!rm.length && !ad.length) out.push(["~", p, "ลำดับหรือจำนวนซ้ำต่างกัน: " + fmt(a) + " → " + fmt(b)]);
      } else for (let i = 0; i < Math.max(a.length, b.length); i++) diffValues(a[i], b[i], p + "[" + i + "]", out);
    } else for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffValues(a[k], b[k], p ? p + "." + k : k, out);
    return;
  }
  out.push(["~", p, fmt(a) + " → " + fmt(b)]);
}

function cmdDiff(fa, fb, all) {
  const out = [];
  diffValues(loadState(fa), loadState(fb), "", out);
  const lim = all ? out.length : 200;
  for (const [m, p, d] of out.slice(0, lim)) console.log(m + " " + (p || "(root)") + " " + d);
  if (out.length > lim) console.log("... ซ่อนอีก " + (out.length - lim) + " รายการ (ใช้ --all เพื่อดูทั้งหมด)");
  const c = m => out.filter(x => x[0] === m).length;
  console.log(out.length ? `\nต่างกัน ${out.length} จุด (+${c("+")} −${c("-")} ~${c("~")})` : "ไม่ต่างกัน");
  return 0;
}

const STATS = ["body", "mind", "will", "charm", "luck"];
function lintState(s, t) {
  const F = [], skip = [], E = m => F.push(["e", m]), W = m => F.push(["w", m]);
  const ids = rows => new Set(rows.map(r => r[0]));
  const num = v => typeof v === "number" && Number.isFinite(v);

  if (!isObj(s.stats)) E("stats ไม่ใช่ object");
  else for (const n of STATS) {
    const v = s.stats[n];
    if (!num(v)) { E(`stats.${n} ไม่ใช่ตัวเลข (${fmt(v)})`); continue; }
    if (v < 1) W(`stats.${n} = ${v} ต่ำกว่า 1`);
    const src = isObj(s.statSrc) ? s.statSrc[n] : undefined;
    if (isObj(src)) {
      const sum = Object.values(src).reduce((a, b) => a + (+b || 0), 0);
      if (Math.abs(sum - v) > 1e-6) W(`statSrc.${n} รวม ${sum} ≠ stats.${n} ${v} (เกมอาจ rescale ตอนโหลด)`);
    }
    const cap = isObj(s.capSeen) ? s.capSeen[n] : undefined;
    if (num(cap) && v > cap) W(`stats.${n} = ${v} เกิน capSeen.${n} = ${cap} (เกมอาจตัดค่าตอนโหลด)`);
  }
  if (s.health !== undefined && (!num(s.health) || s.health < 0 || s.health > 100)) W(`health นอกช่วง 0–100 (${fmt(s.health)})`);
  if (s.money !== undefined && (!num(s.money) || s.money < 0)) E(`money ต้องเป็นตัวเลข ≥ 0 (${fmt(s.money)})`);
  if (s.ageMonths !== undefined && (!num(s.ageMonths) || s.ageMonths < 0)) E(`ageMonths ต้องเป็นตัวเลข ≥ 0 (${fmt(s.ageMonths)})`);

  if (s.talents === undefined) skip.push("talents");
  else if (!Array.isArray(s.talents)) E("talents ไม่ใช่ array");
  else {
    const TM = new Map(t.TAL.map(x => [x.id, x])), seen = new Set();
    for (const id of s.talents) {
      if (!TM.has(id)) E(`พรสวรรค์ไม่รู้จัก: ${fmt(id)} (ไม่อยู่ในตารางเกม)`);
      if (seen.has(id)) E(`พรสวรรค์ซ้ำ: ${id}`);
      seen.add(id);
    }
    for (const [x, y] of t.CONF) if (seen.has(x) && seen.has(y)) E(`พรสวรรค์ขัดกัน: ${x} ↔ ${y}`);
    if (s.talentRules === "slots") {
      const cnt = good => s.talents.filter(id => TM.has(id) && !TM.get(id).crossing && TM.get(id).good === good).length;
      const gm = Math.min(8, 5 + (+s.talentSlotsUp || 0));
      if (cnt(true) > gm) W(`พรสวรรค์ดีเกินช่อง ${cnt(true)}/${gm}`);
      if (cnt(false) > 5) W(`พรสวรรค์ร้ายเกินช่อง ${cnt(false)}/5`);
    }
  }

  if (s.root === undefined || s.root === null) skip.push("root");
  else if (!isObj(s.root)) E("root ไม่ใช่ object");
  else {
    const r = s.root, type = r.type == null ? "none" : String(r.type), row = t.ROOTT.find(x => x[0] === type);
    if (!row) E(`root.type ไม่รู้จัก: ${fmt(r.type)}`);
    else {
      const els = Array.isArray(r.elements) ? r.elements : [];
      if (r.elements !== undefined && !Array.isArray(r.elements)) E("root.elements ไม่ใช่ array");
      const pool = new Set((type === "special" ? t.ELEM.slice(5) : t.ELEM.slice(0, 5)).map(x => x[0]));
      if (els.length !== row[4]) (type === "none" ? W : E)(`root.elements มี ${els.length} ธาตุ แต่ระดับ ${type} ต้องมี ${row[4]}`);
      for (const e of els) if (!pool.has(e)) E(`root.elements: ธาตุ ${fmt(e)} ไม่อยู่ในกลุ่มของระดับ ${type}`);
      if (new Set(els).size !== els.length) E("root.elements มีธาตุซ้ำ");
    }
    if (r.purity !== undefined && (!num(r.purity) || r.purity < 1 || r.purity > 100)) W(`root.purity นอกช่วง 1–100 (${fmt(r.purity)})`);
    if (r.known !== undefined && typeof r.known !== "boolean") W(`root.known ไม่ใช่ boolean (${fmt(r.known)})`);
  }

  const enumChk = (key, rows) => {
    if (s[key] === undefined) return skip.push(key);
    if (!ids(rows).has(s[key])) E(`${key} ไม่รู้จัก: ${fmt(s[key])}`);
  };
  enumChk("cls", t.BG); enumChk("structure", t.STRUCT); enumChk("sinew", t.SINEW);
  if (s.structure === "orphan" && s.cls !== undefined && s.cls !== "poor") W(`structure=orphan แต่ cls=${fmt(s.cls)} (เกมตั้ง cls="poor" ให้เสมอตอนสร้างตัวละคร)`);

  if (s.destiny === undefined || s.destiny === null) skip.push("destiny");
  else if (!isObj(s.destiny)) E("destiny ไม่ใช่ object");
  else {
    const d = s.destiny;
    if (d.tier != null && !ids(t.FATE).has(d.tier)) E(`destiny.tier ไม่รู้จัก: ${fmt(d.tier)}`);
    if (d.id != null && typeof d.id !== "string" && !num(d.id)) W(`destiny.id ชนิดผิดปกติ (${fmt(d.id)})`);
  }

  if (s.tampered !== undefined && !(isObj(s.tampered) && num(s.tampered.at) && typeof s.tampered.why === "string")) W(`tampered รูปแบบผิดปกติ (${fmt(s.tampered)})`);
  return { F, skip };
}

function cmdLint(file, dir, strict) {
  const f = findFiles(dir);
  if (!fs.existsSync(f.editor)) throw new Error("ไม่พบ " + f.editor + " (ใช้ตารางจาก editor.js ระบุโฟลเดอร์ด้วย --dir)");
  const { F, skip } = lintState(loadState(file), loadEditor(f.editor).t);
  for (const [lv, m] of F) console.log((lv === "e" ? "✗ " : "! ") + m);
  const e = F.filter(x => x[0] === "e").length, w = F.length - e;
  console.log((F.length ? "\n" : "") + `error ${e} · warn ${w}` + (skip.length ? " · ข้าม (ไม่มีในเซฟ): " + skip.join(", ") : ""));
  if (!F.length) console.log("✓ ไม่พบปัญหา");
  return e || (strict && w) ? 1 : 0;
}

function out(args, def, data) {
  const i = args.indexOf("-o"), o = i >= 0 ? args[i + 1] : def;
  if (o === "-") process.stdout.write(data); else { fs.writeFileSync(o, data); console.log("เขียน " + o + " (" + data.length + " ตัวอักษร)"); }
}

function main() {
  const [cmd, ...args] = process.argv.slice(2);
  const di = args.indexOf("--dir"), dir = di >= 0 ? args[di + 1] : __dirname;
  const pos = args.filter((a, i) => !a.startsWith("-") && args[i - 1] !== "-o" && args[i - 1] !== "--dir"), file = pos[0];
  const need = () => { if (!file) throw new Error("ต้องระบุไฟล์"); };
  switch (cmd) {
    case "unseal": {
      need();
      const text = unseal(readText(file));
      out(args, file.replace(/\.[^.]*$/, "") + ".unsealed.json", JSON.stringify(JSON.parse(text), null, 1));
      return 0;
    }
    case "seal": {
      need();
      const state = JSON.parse(readText(file));
      if (!state || typeof state !== "object" || Array.isArray(state)) throw new Error("เซฟต้องเป็น JSON object");
      if (!state.tampered) state.tampered = { at: Date.now(), why: "hand" };
      state.savedAt = Math.max(Date.now(), (+state.savedAt || 0) + 1);
      out(args, file.replace(/\.[^.]*$/, "").replace(/\.unsealed$/, "") + "-edited.json", seal(JSON.stringify(state)));
      return 0;
    }
    case "verify": need(); return cmdVerify(file, dir);
    case "diff": if (pos.length < 2) throw new Error("ต้องระบุไฟล์สองไฟล์"); return cmdDiff(pos[0], pos[1], args.includes("--all"));
    case "lint": need(); return cmdLint(file, dir, args.includes("--strict"));
    case "check": return cmdCheck(dir);
    default:
      console.log("ใช้: node wox.js <คำสั่ง>\n  unseal <ไฟล์> [-o out.json|-]   ถอดรหัสเป็น JSON อ่านง่าย\n  seal   <json> [-o out|-]       เข้ารหัสเป็น WOX2 (ใส่ป้าย tampered ถ้ายังไม่มี และอัปเดต savedAt เหมือนตัวแก้ไข)\n  verify <ไฟล์>                  ตรวจตราและเทียบ round-trip\n  diff   <เก่า> <ใหม่> [--all]   เทียบเซฟสองไฟล์ แสดงเฉพาะจุดที่ต่าง (รับ WOX2 หรือ JSON)\n  lint   <ไฟล์> [--strict]       ตรวจความสมเหตุสมผลของเซฟตามตารางเกม (--strict: warn ก็ถือว่าไม่ผ่าน)\n  check  [--dir โฟลเดอร์]        เทียบ codec/ตารางใน editor.js กับ bundle เกม");
      return cmd ? 2 : 0;
  }
}
try { process.exitCode = main(); } catch (e) { console.error("✗ " + e.message); process.exitCode = 1; }
