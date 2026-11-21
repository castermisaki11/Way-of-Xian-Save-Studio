const SECRET = '道法自然:wox2:5f1c-93ab-e27d';
const WQ = 97;

let _e = 625341585;
for (let i = 0; i < SECRET.length; i++) {
  _e = Math.imul(_e ^ SECRET.charCodeAt(i), 16777619) >>> 0;
}

const BQ: number[] = [];
for (let i = 0; i < WQ; i++) {
  _e = (_e ^ (_e << 13)) >>> 0;
  _e = (_e ^ (_e >>> 17)) >>> 0;
  _e = (_e ^ (_e << 5)) >>> 0;
  BQ.push(_e % 94);
}

const JME = new Uint8Array(WQ * 94);
{
  let n = 0;
  for (let t = 0; t < 94; t++) {
    for (let o = 0; o < WQ; o++) {
      JME[n++] = (BQ[o] + t * 29 + ((o ^ t) % 11)) % 94;
    }
  }
}

export function woxHash(s: string): string {
  let t = (2166136261 ^ Math.imul(BQ[3] + 1, 2654435761)) >>> 0;
  let h = (16777619 ^ (BQ[41] << 11)) >>> 0;
  let a = 0;
  for (let i = 0; i < s.length; i++) {
    const r = s.charCodeAt(i);
    t = Math.imul(t ^ r, 16777619) >>> 0;
    h = (Math.imul(h ^ r, 1540483477) + BQ[a]) >>> 0;
    a = (a + 1) % WQ;
  }
  t = (t ^ s.length) >>> 0;
  h = (h ^ (h >>> 15)) >>> 0;
  h = Math.imul(h ^ s.length, 668265261) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  return t.toString(16).padStart(8, '0') + h.toString(16).padStart(8, '0');
}

export function woxShift(s: string, dir: 1 | -1): string {
  const L = s.length;
  const out = new Array<number>(L);
  for (let i = 0; i < L; i++) {
    const c = s.charCodeAt(i);
    const v = c - 33;
    if (v >= 0 && v < 94) {
      const k = JME[i % JME.length];
      let x = v + (dir > 0 ? k : 94 - k);
      if (x >= 94) x -= 94;
      out[i] = x + 33;
    } else {
      out[i] = c;
    }
  }
  let r = '';
  for (let i = 0; i < L; i += 8192) {
    r += String.fromCharCode.apply(null, out.slice(i, i + 8192));
  }
  return r;
}

export function sealWox(text: string): string {
  return 'WOX2' + woxHash(text) + '~' + woxShift(text, 1);
}

export function unsealWox(raw: string): string {
  if (!raw.startsWith('WOX2') || raw[20] !== '~') {
    throw new Error('ไม่ใช่ไฟล์เซฟ WOX2');
  }
  const text = woxShift(raw.slice(21), -1);
  if (woxHash(text) !== raw.slice(4, 20)) {
    throw new Error('ตราตรวจสอบไม่ตรง (ไฟล์อาจเสียหายหรือถูกแก้)');
  }
  return text;
}

export async function readSaveFile(file: File): Promise<{ raw: string; wasGzip: boolean }> {
  let buf = new Uint8Array(await file.arrayBuffer());
  let wasGzip = false;
  if (buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b) {
    wasGzip = true;
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('เบราว์เซอร์นี้ไม่รองรับการคลายไฟล์ gzip (DecompressionStream)');
    }
    const ds = new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'));
    buf = new Uint8Array(await new Response(ds).arrayBuffer());
  }
  const raw = new TextDecoder('utf-8')
    .decode(buf)
    .replace(/^\uFEFF/, '')
    .replace(/[\r\n]+$/, '');
  return { raw, wasGzip };
}

export async function compressGzip(text: string): Promise<Uint8Array> {
  if (typeof CompressionStream === 'undefined') {
    throw new Error('เบราว์เซอร์นี้ไม่รองรับการบีบอัด gzip (CompressionStream)');
  }
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const cs = blob.stream().pipeThrough(new CompressionStream('gzip'));
  return new Uint8Array(await new Response(cs).arrayBuffer());
}

