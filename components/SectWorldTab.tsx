'use client';

import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Crown,
  Heart,
  PawPrint,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react';
import { MARTIAL_RANKS, REALMS } from '@/lib/wox/catalog';
import {
  BEAST_EPITHETS,
  BEAST_SPECIES,
  MORTAL_CAREERS,
  REL_TAGS,
  REL_TAG_MAP,
  SECTS_CATALOG,
  SECT_AL_LABELS,
  SECT_MAP,
  SECT_RANKS,
} from '@/lib/wox/world-data';
import { PathSegment, SaveObject, cloneState } from '@/lib/wox/tables';

interface SectWorldTabProps {
  state: SaveObject;
  onSetAt: (path: PathSegment[], value: unknown) => void;
  onMutate: (mutator: (draft: SaveObject) => void, message?: string) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

type PeopleFilter = 'all' | 'romance' | 'kin_mentors' | 'beasts_companions' | 'rivals';

interface RawPerson {
  id: number;
  name?: string | { th?: string; en?: string };
  kind?: string;
  g?: string;
  b?: number;
  d?: number;
  dead?: boolean;
  ghost?: boolean;
  sect?: string;
  role?: string;
  fam?: string;
  pk?: number;
  mr?: number;
  sp?: number;
  ep?: number;
}

interface RawRel {
  c?: number;
  fv?: number;
  ow?: number;
  io?: number;
  gr?: number;
  tags?: string[];
  met?: number;
  last?: number;
}

const PAGE_SIZE = 20;

function readPersonName(p: RawPerson): { th: string; en: string } {
  if (typeof p.name === 'string') return { th: p.name, en: '' };
  if (p.name && typeof p.name === 'object') {
    return {
      th: String(p.name.th || p.name.en || `NPC #${p.id}`),
      en: String(p.name.en || ''),
    };
  }
  return { th: `NPC #${p.id}`, en: '' };
}

export function SectWorldTab({ state, onSetAt, onMutate, onNotify }: SectWorldTabProps) {
  const [customSectId, setCustomSectId] = useState('');
  const [filter, setFilter] = useState<PeopleFilter>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState<'none' | 'beast' | 'npc'>('none');

  const [newBeastSp, setNewBeastSp] = useState(4);
  const [newBeastEp, setNewBeastEp] = useState(4);
  const [newBeastNameTh, setNewBeastNameTh] = useState('เสี่ยวไป๋');
  const [newBeastPk, setNewBeastPk] = useState(2);

  const [newNpcNameTh, setNewNpcNameTh] = useState('');
  const [newNpcNameEn, setNewNpcNameEn] = useState('');
  const [newNpcGender, setNewNpcGender] = useState<'f' | 'm'>('f');
  const [newNpcPk, setNewNpcPk] = useState(2);
  const [newNpcTag, setNewNpcTag] = useState('companion');

  const curSect = typeof state.sect === 'string' ? state.sect : '';
  const ageMonths = Number(state.ageMonths) || 0;

  const statusObj =
    state.status && typeof state.status === 'object' && !Array.isArray(state.status)
      ? (state.status as Record<string, unknown>)
      : null;

  const ownSect =
    state.ownSect && typeof state.ownSect === 'object' && !Array.isArray(state.ownSect)
      ? (state.ownSect as Record<string, unknown>)
      : null;
  const ownSectId = typeof ownSect?.id === 'string' ? ownSect.id : null;
  const ownSectData =
    ownSect?.data && typeof ownSect.data === 'object' && !Array.isArray(ownSect.data)
      ? (ownSect.data as Record<string, unknown>)
      : null;

  const worldObj =
    state.world && typeof state.world === 'object' && !Array.isArray(state.world)
      ? (state.world as Record<string, unknown>)
      : null;

  const worldSects =
    worldObj?.sects && typeof worldObj.sects === 'object' && !Array.isArray(worldObj.sects)
      ? (worldObj.sects as Record<string, Record<string, unknown>>)
      : null;

  const curSectWorld = curSect && worldSects?.[curSect] ? worldSects[curSect] : null;

  const people = useMemo<RawPerson[]>(() => {
    if (!worldObj || !Array.isArray(worldObj.people)) return [];
    return worldObj.people.filter(
      (p): p is RawPerson => Boolean(p && typeof p === 'object' && !Array.isArray(p))
    );
  }, [worldObj]);

  const relMap = useMemo<Record<string, RawRel>>(() => {
    if (!worldObj || !worldObj.rel || typeof worldObj.rel !== 'object' || Array.isArray(worldObj.rel)) {
      return {};
    }
    return worldObj.rel as Record<string, RawRel>;
  }, [worldObj]);

  const followerId = typeof state.follower === 'number' ? state.follower : null;
  const spouseId = typeof state.spouseId === 'number' ? state.spouseId : null;

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    return people
      .filter((p) => {
        const rel = relMap[String(p.id)];
        const tags = Array.isArray(rel?.tags) ? rel.tags : [];
        if (filter === 'romance') {
          if (
            p.id !== spouseId &&
            !tags.some((t) => ['spouse', 'consort', 'lover', 'betrothed'].includes(t))
          ) {
            return false;
          }
        } else if (filter === 'kin_mentors') {
          if (
            p.role !== 'family' &&
            !p.fam &&
            !tags.some((t) => ['family', 'master', 'student', 'sworn'].includes(t))
          ) {
            return false;
          }
        } else if (filter === 'beasts_companions') {
          if (p.kind !== 'beast' && p.id !== followerId && !tags.includes('companion')) {
            return false;
          }
        } else if (filter === 'rivals') {
          if (!tags.some((t) => ['enemy', 'rival'].includes(t))) {
            return false;
          }
        }

        if (!q) return true;
        const { th, en } = readPersonName(p);
        const beastMeta = typeof p.sp === 'number' ? BEAST_SPECIES[p.sp] : undefined;
        return (
          String(p.id).includes(q) ||
          th.toLowerCase().includes(q) ||
          en.toLowerCase().includes(q) ||
          (p.sect && p.sect.toLowerCase().includes(q)) ||
          (beastMeta &&
            (beastMeta.th.toLowerCase().includes(q) || beastMeta.en.toLowerCase().includes(q)))
        );
      })
      .sort((a, b) => {
        const aPin = a.id === spouseId || a.id === followerId ? 1 : 0;
        const bPin = b.id === spouseId || b.id === followerId ? 1 : 0;
        if (bPin !== aPin) return bPin - aPin;
        const relA = relMap[String(a.id)]?.c ?? -999;
        const relB = relMap[String(b.id)]?.c ?? -999;
        if (relB !== relA) return relB - relA;
        return a.id - b.id;
      });
  }, [people, relMap, filter, query, followerId, spouseId]);

  const totalPages = Math.max(1, Math.ceil(filteredPeople.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const visiblePeople = filteredPeople.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const ensureRel = (draft: SaveObject, id: number): RawRel => {
    if (!draft.world || typeof draft.world !== 'object' || Array.isArray(draft.world)) {
      draft.world = { people: [], rel: {} };
    }
    const w = draft.world as Record<string, unknown>;
    if (!w.rel || typeof w.rel !== 'object' || Array.isArray(w.rel)) {
      w.rel = {};
    }
    const rel = w.rel as Record<string, RawRel>;
    if (!rel[String(id)] || typeof rel[String(id)] !== 'object') {
      rel[String(id)] = { c: 0, fv: 0, ow: 0, io: 0, tags: [], met: ageMonths };
    }
    if (!Array.isArray(rel[String(id)].tags)) {
      rel[String(id)].tags = [];
    }
    return rel[String(id)];
  };

  const handleSelectSect = (sectId: string) => {
    onMutate((draft) => {
      if (!sectId) {
        draft.sect = null;
        if (draft.flags && typeof draft.flags === 'object' && !Array.isArray(draft.flags)) {
          delete (draft.flags as Record<string, unknown>).inSect;
        }
        return;
      }
      draft.sect = sectId;
      if (!draft.flags || typeof draft.flags !== 'object' || Array.isArray(draft.flags)) {
        draft.flags = {};
      }
      (draft.flags as Record<string, unknown>).inSect = true;
      const curStatus =
        draft.status && typeof draft.status === 'object' && !Array.isArray(draft.status)
          ? (draft.status as Record<string, unknown>)
          : null;
      if (!curStatus || curStatus.id !== 'disciple') {
        draft.status = {
          id: 'disciple',
          since: Number(draft.ageMonths) || 0,
          favor: 0,
          rank: 'outer',
          merit: 0,
        };
      }
    }, sectId ? `เปลี่ยนสำนักสังกัดเป็น ${SECT_MAP.get(sectId)?.th || sectId} แล้ว` : 'ปลดสังกัดสำนักแล้ว');
  };

  const handleCreateEntry = (mode: 'beast' | 'npc') => {
    onMutate((draft) => {
      if (!draft.world || typeof draft.world !== 'object' || Array.isArray(draft.world)) {
        draft.world = { people: [], rel: {} };
      }
      const w = draft.world as Record<string, unknown>;
      if (!Array.isArray(w.people)) w.people = [];
      const arr = w.people as RawPerson[];
      const maxId = arr.reduce((m, x) => Math.max(m, Number(x?.id) || 0), 0);
      const nextId = maxId + 1;
      const curAge = Number(draft.ageMonths) || 0;

      if (mode === 'beast') {
        const spDef = BEAST_SPECIES[newBeastSp] ?? BEAST_SPECIES[0];
        const thName = newBeastNameTh.trim() || spDef.th;
        arr.push({
          id: nextId,
          name: { th: thName, en: spDef.en },
          kind: 'beast',
          role: 'beast',
          sp: newBeastSp,
          ep: newBeastEp,
          b: Math.max(0, curAge - 24),
          d: curAge + 3600,
          pk: newBeastPk,
        });
        const r = ensureRel(draft, nextId);
        r.c = 80;
        r.fv = 50;
        r.tags = ['companion'];
        draft.follower = nextId;
      } else {
        const th = newNpcNameTh.trim() || 'สหายนิรนาม';
        const en = newNpcNameEn.trim() || 'Companion';
        arr.push({
          id: nextId,
          name: { th, en },
          g: newNpcGender,
          b: Math.max(0, curAge - 216),
          d: curAge + 2400,
          sect: typeof draft.sect === 'string' ? draft.sect : undefined,
          role: newNpcTag === 'master' ? 'elder' : 'peer',
          pk: newNpcPk,
          mr: 0,
        });
        const r = ensureRel(draft, nextId);
        r.c = 75;
        r.fv = 40;
        r.tags = newNpcTag ? [newNpcTag] : [];
        if (newNpcTag === 'companion') {
          draft.follower = nextId;
        }
        if (newNpcTag === 'spouse') {
          draft.married = true;
          draft.spouseId = nextId;
          draft.spouse = { th, en };
        }
      }
      setExpandedId(nextId);
    });
    onNotify(mode === 'beast' ? 'สร้างสัตว์อสูรคู่หูและตั้งเป็นผู้ติดตามแล้ว' : 'เพิ่ม NPC ใหม่เข้าโลกแล้ว', true);
    setShowCreate('none');
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Section 1: Sect & Status */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-3.5 sm:flex-row sm:items-center dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              สำนักและตำแหน่ง (sect · status)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              เลือกสำนักสังกัด ตำแหน่งศิษย์ ผลงาน ความเอ็นดู หรืออาชีพทางโลก
            </p>
          </div>
          {curSect && (
            <span className="font-mono text-xs text-teal-700 dark:text-teal-400">
              {SECT_MAP.get(curSect)?.th || (ownSectId === curSect ? String(ownSectData?.th || curSect) : curSect)}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              สำนักปัจจุบัน (sect)
            </label>
            <select
              value={curSect}
              onChange={(e) => handleSelectSect(e.target.value)}
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[40px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="">ไม่มีสำนัก (อิสระ / null)</option>
              {ownSectId && !SECT_MAP.has(ownSectId) && (
                <option value={ownSectId}>
                  [สำนักตนเอง] {String(ownSectData?.th || ownSectId)} ({ownSectId})
                </option>
              )}
              {curSect && !SECT_MAP.has(curSect) && curSect !== ownSectId && (
                <option value={curSect}>[กำหนดเอง / DLC] {curSect}</option>
              )}
              {SECTS_CATALOG.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.th} · {s.en} ({SECT_AL_LABELS[s.al] || s.al} · ระดับ {s.tier})
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={customSectId}
                onChange={(e) => setCustomSectId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customSectId.trim()) {
                    handleSelectSect(customSectId.trim());
                    setCustomSectId('');
                  }
                }}
                placeholder="หรือพิมพ์รหัสสำนักเอง (เช่น สำนักยุทธภพ)"
                className="min-h-[44px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <button
                type="button"
                disabled={!customSectId.trim()}
                onClick={() => {
                  handleSelectSect(customSectId.trim());
                  setCustomSectId('');
                }}
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 sm:min-h-[38px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap shrink-0"
              >
                ตั้งรหัสสำนัก
              </button>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                ตำแหน่งและสถานะ (status)
              </span>
              {(!statusObj || statusObj.id !== 'disciple') && (
                <button
                  type="button"
                  onClick={() =>
                    onSetAt(['status'], {
                      id: 'disciple',
                      since: ageMonths,
                      favor: 0,
                      rank: 'outer',
                      merit: 0,
                    })
                  }
                  className="rounded-md bg-teal-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
                >
                  ตั้งเป็นศิษย์สำนัก
                </button>
              )}
            </div>

            {statusObj?.id === 'disciple' ? (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                    ระดับตำแหน่งในสำนัก (rank)
                  </label>
                  <select
                    value={String(statusObj.rank || 'outer')}
                    onChange={(e) => onSetAt(['status', 'rank'], e.target.value)}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {SECT_RANKS.map(([id, th, en]) => (
                      <option key={id} value={id}>
                        {th} · {en} ({id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                    ความเอ็นดู (favor)
                  </label>
                  <input
                    type="number"
                    value={Number(statusObj.favor) || 0}
                    onChange={(e) => onSetAt(['status', 'favor'], Number(e.target.value) || 0)}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-base text-slate-900 sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                    คุณูปการ (merit)
                  </label>
                  <input
                    type="number"
                    value={Number(statusObj.merit) || 0}
                    onChange={(e) => onSetAt(['status', 'merit'], Number(e.target.value) || 0)}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-base text-slate-900 sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                    เดือนที่เข้า (since)
                  </label>
                  <input
                    type="number"
                    value={Number(statusObj.since) || 0}
                    onChange={(e) => onSetAt(['status', 'since'], Number(e.target.value) || 0)}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-base text-slate-900 sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  สถานะปัจจุบัน:{' '}
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {statusObj ? JSON.stringify(statusObj) : 'null (ไม่มีตำแหน่ง)'}
                  </span>
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <select
                    value={String(statusObj?.line || '')}
                    onChange={(e) => {
                      const line = e.target.value;
                      if (!line) onSetAt(['status'], null);
                      else onSetAt(['status'], { id: 'career', line, lr: 0 });
                    }}
                    className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="">ตั้งสายอาชีพทางโลก...</option>
                    {MORTAL_CAREERS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.th} ({c.en})
                      </option>
                    ))}
                  </select>
                  {typeof statusObj?.line === 'string' && (
                    <select
                      value={Number(statusObj.lr) || 0}
                      onChange={(e) => onSetAt(['status', 'lr'], Number(e.target.value) || 0)}
                      className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    >
                      {(MORTAL_CAREERS.find((c) => c.id === statusObj.line)?.ranks ?? []).map(
                        ([th, en], idx) => (
                          <option key={idx} value={idx}>
                            ขั้น {idx + 1}: {th} ({en})
                          </option>
                        )
                      )}
                    </select>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {(curSectWorld || ownSect) && (
          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 md:grid-cols-2 dark:border-slate-800">
            {curSectWorld && (
              <div className="space-y-2.5 rounded-lg border border-slate-200 p-3.5 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  สถานะสำนักในโลก (world.sects.{curSect})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-500">กองทุน (funds)</label>
                    <input
                      type="number"
                      value={Number(curSectWorld.funds) || 0}
                      onChange={(e) =>
                        onSetAt(['world', 'sects', curSect, 'funds'], Number(e.target.value) || 0)
                      }
                      className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-base text-slate-900 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-500">ความภักดี</label>
                    <input
                      type="number"
                      value={Number(curSectWorld.loyalty) || 0}
                      onChange={(e) =>
                        onSetAt(
                          ['world', 'sects', curSect, 'loyalty'],
                          Number(e.target.value) || 0
                        )
                      }
                      className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-base text-slate-900 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-500">ศิษย์</label>
                    <input
                      type="number"
                      value={Number(curSectWorld.disciples) || 0}
                      onChange={(e) =>
                        onSetAt(
                          ['world', 'sects', curSect, 'disciples'],
                          Number(e.target.value) || 0
                        )
                      }
                      className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-base text-slate-900 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {ownSect && (
              <div className="space-y-2.5 rounded-lg border border-teal-200 bg-teal-50/40 p-3.5 dark:border-teal-900/60 dark:bg-teal-950/20">
                <div className="flex items-center justify-between gap-2">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-900 dark:text-teal-200">
                    <Crown className="h-3.5 w-3.5" />
                    <span>สำนักที่ก่อตั้งเอง (ownSect: {ownSectId})</span>
                  </p>
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(ownSect.disbanded)}
                      onChange={(e) => onSetAt(['ownSect', 'disbanded'], e.target.checked)}
                      className="h-4 w-4 rounded accent-teal-700"
                    />
                    <span>ยุบสำนัก</span>
                  </label>
                </div>
                {ownSectData && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <input
                      type="text"
                      value={String(ownSectData.th || '')}
                      onChange={(e) => onSetAt(['ownSect', 'data', 'th'], e.target.value)}
                      placeholder="ชื่อสำนัก (ไทย)"
                      className="min-h-[40px] rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-base text-slate-900 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <input
                      type="text"
                      value={String(ownSectData.en || '')}
                      onChange={(e) => onSetAt(['ownSect', 'data', 'en'], e.target.value)}
                      placeholder="Sect name (EN)"
                      className="min-h-[40px] rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-base text-slate-900 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Section 2: Companion / Spouse / World NPCs & Beasts */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-center dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              ผู้คน ความสัมพันธ์ และสัตว์อสูรคู่หู (world.people · world.rel)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ปรับค่าความใกล้ชิด บุญคุณ หนี้สิน แท็กความสัมพันธ์ ตั้งผู้ติดตาม คู่ครอง ชุบชีวิต หรือเพิ่มสัตว์อสูร
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <button
              type="button"
              onClick={() => setShowCreate((v) => (v === 'beast' ? 'none' : 'beast'))}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-800 sm:min-h-[38px] dark:bg-teal-500 dark:text-slate-950 whitespace-nowrap"
            >
              <PawPrint className="h-3.5 w-3.5" />
              <span>เพิ่มสัตว์อสูร</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCreate((v) => (v === 'npc' ? 'none' : 'npc'))}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-[38px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap"
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>เพิ่ม NPC</span>
            </button>
          </div>
        </div>

        {/* Active Follower & Spouse Pins */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                ผู้ติดตามร่วมทาง (follower)
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                {followerId != null
                  ? (() => {
                      const fp = people.find((p) => p.id === followerId);
                      return fp ? `${readPersonName(fp).th} (#${fp.id})` : `#${followerId}`;
                    })()
                  : 'ไม่มีผู้ติดตาม'}
              </p>
            </div>
            {followerId != null && (
              <button
                type="button"
                onClick={() => onSetAt(['follower'], null)}
                className="min-h-[36px] rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap"
              >
                ปลดออก
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                คู่สมรสปัจจุบัน (spouseId)
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                {spouseId != null
                  ? (() => {
                      const sp = people.find((p) => p.id === spouseId);
                      return sp ? `${readPersonName(sp).th} (#${sp.id})` : `#${spouseId}`;
                    })()
                  : 'ยังไม่มีคู่สมรส'}
              </p>
            </div>
            {spouseId != null && (
              <button
                type="button"
                onClick={() =>
                  onMutate((draft) => {
                    draft.married = false;
                    draft.spouseId = null;
                    draft.spouse = null;
                  }, 'ปลดสถานะคู่สมรสแล้ว')
                }
                className="min-h-[36px] rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap"
              >
                ปลดออก
              </button>
            )}
          </div>
        </div>

        {/* Create Beast / NPC Panel */}
        {showCreate === 'beast' && (
          <div className="mt-4 space-y-3 rounded-xl border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-900/60 dark:bg-teal-950/20">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-teal-900 dark:text-teal-200">
                สร้างสัตว์อสูรคู่หูใหม่ (ตั้งเป็นผู้ติดตาม + companion อัตโนมัติ)
              </h3>
              <button
                type="button"
                onClick={() => setShowCreate('none')}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                ยกเลิก
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">
                  สายพันธุ์สัตว์ (203 ชนิด)
                </label>
                <select
                  value={newBeastSp}
                  onChange={(e) => setNewBeastSp(Number(e.target.value))}
                  className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {BEAST_SPECIES.map((b) => (
                    <option key={b.index} value={b.index}>
                      #{b.index} {b.th} · {b.en} ({b.world})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">
                  ฉายาสัตว์ (ep)
                </label>
                <select
                  value={newBeastEp}
                  onChange={(e) => setNewBeastEp(Number(e.target.value))}
                  className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {BEAST_EPITHETS.map(([th, en], idx) => (
                    <option key={idx} value={idx}>
                      {th} · {en}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">
                  ชื่อเล่นสัตว์
                </label>
                <input
                  type="text"
                  value={newBeastNameTh}
                  onChange={(e) => setNewBeastNameTh(e.target.value)}
                  className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">
                  ขั้นพลังอสูร (pk)
                </label>
                <select
                  value={newBeastPk}
                  onChange={(e) => setNewBeastPk(Number(e.target.value))}
                  className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {REALMS.map((r) => (
                    <option key={r.index} value={r.index}>
                      {r.index}: {r.th}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleCreateEntry('beast')}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 sm:min-h-[38px] dark:bg-teal-500 dark:text-slate-950"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>ยืนยันเพิ่มสัตว์อสูร</span>
              </button>
            </div>
          </div>
        )}

        {showCreate === 'npc' && (
          <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                สร้าง NPC ใหม่เข้าโลก (world.people + world.rel)
              </h3>
              <button
                type="button"
                onClick={() => setShowCreate('none')}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                ยกเลิก
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <input
                type="text"
                value={newNpcNameTh}
                onChange={(e) => setNewNpcNameTh(e.target.value)}
                placeholder="ชื่อ (ไทย)"
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <input
                type="text"
                value={newNpcNameEn}
                onChange={(e) => setNewNpcNameEn(e.target.value)}
                placeholder="Name (EN)"
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <select
                value={newNpcGender}
                onChange={(e) => setNewNpcGender(e.target.value as 'f' | 'm')}
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="f">หญิง (f)</option>
                <option value="m">ชาย (m)</option>
              </select>
              <select
                value={newNpcPk}
                onChange={(e) => setNewNpcPk(Number(e.target.value))}
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {REALMS.map((r) => (
                  <option key={r.index} value={r.index}>
                    ขั้น {r.index}: {r.th}
                  </option>
                ))}
              </select>
              <select
                value={newNpcTag}
                onChange={(e) => setNewNpcTag(e.target.value)}
                className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-base text-slate-900 sm:min-h-[38px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {REL_TAGS.map(([id, th]) => (
                  <option key={id} value={id}>
                    แท็ก: {th}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleCreateEntry('npc')}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 sm:min-h-[38px] dark:bg-slate-100 dark:text-slate-900"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>ยืนยันเพิ่ม NPC</span>
              </button>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="ค้นหาชื่อ ID สำนัก หรือสายพันธุ์..."
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                ['all', `ทั้งหมด (${people.length})`],
                ['romance', 'คู่ครอง & คนรัก'],
                ['kin_mentors', 'ครอบครัว & ศิษย์-อาจารย์'],
                ['beasts_companions', 'สัตว์อสูร & คู่หู'],
                ['rivals', 'ศัตรู & คู่แข่ง'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setFilter(id);
                  setPage(0);
                }}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === id
                    ? 'bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* People List */}
        {visiblePeople.length === 0 ? (
          <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-10 text-center dark:border-slate-800">
            <Users className="h-6 w-6 text-slate-400" />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              ไม่พบบุคคลหรือสัตว์อสูรในหมวดนี้ ({people.length === 0 ? 'ยังไม่มี world.people' : 'ลองเปลี่ยนคำค้นหา'})
            </p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {visiblePeople.map((p) => {
              const { th, en } = readPersonName(p);
              const rel = relMap[String(p.id)];
              const tags = Array.isArray(rel?.tags) ? rel.tags : [];
              const isOpen = expandedId === p.id;
              const isBeast = p.kind === 'beast';
              const isFollower = followerId === p.id;
              const isSpouse = spouseId === p.id;
              const isDead = Boolean(p.dead || p.ghost);
              const ageYears = typeof p.b === 'number' ? Math.max(0, Math.floor((ageMonths - p.b) / 12)) : null;
              const beastDef = isBeast && typeof p.sp === 'number' ? BEAST_SPECIES[p.sp] : undefined;
              const epithet = isBeast && typeof p.ep === 'number' ? BEAST_EPITHETS[p.ep] : undefined;

              return (
                <div key={p.id} className="p-3.5 sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : p.id)}
                      className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                    >
                      {isOpen ? (
                        <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      ) : (
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="font-mono text-xs text-slate-400">#{p.id}</span>
                          <span className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {th}
                          </span>
                          {en && (
                            <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {en}
                            </span>
                          )}
                          {isFollower && (
                            <span className="font-mono text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                              [ผู้ติดตาม]
                            </span>
                          )}
                          {isSpouse && (
                            <span className="font-mono text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                              [คู่สมรส]
                            </span>
                          )}
                          {isDead && (
                            <span className="font-mono text-[11px] font-semibold text-red-600 dark:text-red-400">
                              [{p.ghost ? 'วิญญาณ' : 'เสียชีวิต'}]
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                          {isBeast
                            ? `สัตว์อสูร: ${beastDef?.th || `sp#${p.sp ?? '?'}`}${
                                epithet ? ` (${epithet[0]})` : ''
                              }`
                            : `${p.g === 'f' ? 'หญิง' : 'ชาย'}${
                                p.sect ? ` · ${SECT_MAP.get(p.sect)?.th || p.sect}` : ''
                              }${p.role ? ` · ${p.role}` : ''}`}
                          {ageYears !== null ? ` · อายุ ${ageYears} ปี` : ''}
                          {typeof p.pk === 'number' && REALMS[p.pk] ? ` · ${REALMS[p.pk].th}` : ''}
                          {rel ? ` · สนิท ${rel.c ?? 0} · ชอบ ${rel.fv ?? 0}` : ''}
                        </p>
                      </div>
                    </button>

                    <div className="flex flex-wrap items-center gap-1.5 pl-6 sm:pl-0">
                      <button
                        type="button"
                        onClick={() =>
                          onMutate((draft) => {
                            if (draft.follower === p.id) {
                              draft.follower = null;
                            } else {
                              draft.follower = p.id;
                              const r = ensureRel(draft, p.id);
                              if (!r.tags!.includes('companion')) r.tags!.push('companion');
                            }
                          })
                        }
                        className={`inline-flex min-h-[38px] items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors whitespace-nowrap ${
                          isFollower
                            ? 'border-teal-700 bg-teal-700 text-white dark:border-teal-400 dark:bg-teal-500 dark:text-slate-950'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{isFollower ? 'กำลังติดตาม' : 'ตั้งผู้ติดตาม'}</span>
                      </button>

                      {!isBeast && (
                        <button
                          type="button"
                          onClick={() =>
                            onMutate((draft) => {
                              if (draft.spouseId === p.id) {
                                draft.married = false;
                                draft.spouseId = null;
                                draft.spouse = null;
                              } else {
                                draft.married = true;
                                draft.spouseId = p.id;
                                draft.spouse = { th, en };
                                const r = ensureRel(draft, p.id);
                                if (!r.tags!.includes('spouse')) r.tags!.push('spouse');
                              }
                            })
                          }
                          className={`inline-flex min-h-[38px] items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors whitespace-nowrap ${
                            isSpouse
                              ? 'border-rose-600 bg-rose-600 text-white dark:border-rose-400 dark:bg-rose-500 dark:text-slate-950'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                          }`}
                        >
                          <Heart className="h-3.5 w-3.5" />
                          <span>{isSpouse ? 'คู่สมรส' : 'ตั้งคู่สมรส'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <label className="mb-1 block text-xs text-slate-500">ชื่อ (ไทย)</label>
                          <input
                            type="text"
                            value={th}
                            onChange={(e) =>
                              onMutate((draft) => {
                                const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                  (x) => x.id === p.id
                                );
                                if (!target) return;
                                if (!target.name || typeof target.name !== 'object') {
                                  target.name = { th: e.target.value, en };
                                } else {
                                  target.name.th = e.target.value;
                                }
                              })
                            }
                            className="min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-slate-500">ขั้นบำเพ็ญ (pk)</label>
                          <select
                            value={Number(p.pk) || 0}
                            onChange={(e) =>
                              onMutate((draft) => {
                                const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                  (x) => x.id === p.id
                                );
                                if (target) target.pk = Number(e.target.value);
                              })
                            }
                            className="min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            {REALMS.map((r) => (
                              <option key={r.index} value={r.index}>
                                {r.index}: {r.th}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-slate-500">ขั้นยุทธภพ (mr)</label>
                          <select
                            value={Number(p.mr) || 0}
                            onChange={(e) =>
                              onMutate((draft) => {
                                const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                  (x) => x.id === p.id
                                );
                                if (target) target.mr = Number(e.target.value);
                              })
                            }
                            className="min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            {MARTIAL_RANKS.map((m) => (
                              <option key={m.index} value={m.index}>
                                {m.index}: {m.th}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() =>
                              onMutate((draft) => {
                                const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                  (x) => x.id === p.id
                                );
                                if (!target) return;
                                delete target.dead;
                                delete target.ghost;
                                target.d = Math.max(Number(target.d) || 0, ageMonths + 6000);
                              }, `ชุบชีวิต / ต่ออายุขัย ${th} +500 ปีแล้ว`)
                            }
                            className="min-h-[42px] w-full rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 sm:min-h-[36px] dark:border-teal-500/40 dark:bg-teal-950/50 dark:text-teal-300"
                          >
                            ชุบชีวิต &amp; ต่ออายุขัย +500 ปี
                          </button>
                        </div>
                      </div>

                      {isBeast && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs text-slate-500">สายพันธุ์ (sp)</label>
                            <select
                              value={Number(p.sp) || 0}
                              onChange={(e) =>
                                onMutate((draft) => {
                                  const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                    (x) => x.id === p.id
                                  );
                                  if (target) target.sp = Number(e.target.value);
                                })
                              }
                              className="min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                              {BEAST_SPECIES.map((b) => (
                                <option key={b.index} value={b.index}>
                                  #{b.index} {b.th} · {b.en}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-slate-500">ฉายาสัตว์ (ep)</label>
                            <select
                              value={Number(p.ep) || 0}
                              onChange={(e) =>
                                onMutate((draft) => {
                                  const target = ((draft.world as Record<string, unknown>)?.people as RawPerson[])?.find(
                                    (x) => x.id === p.id
                                  );
                                  if (target) target.ep = Number(e.target.value);
                                })
                              }
                              className="min-h-[42px] w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                              {BEAST_EPITHETS.map(([epTh, epEn], idx) => (
                                <option key={idx} value={idx}>
                                  {epTh} · {epEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Relationship Values */}
                      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/50">
                        <div className="mb-2.5 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            ค่าความสัมพันธ์ (world.rel[{p.id}])
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onMutate((draft) => {
                                const r = ensureRel(draft, p.id);
                                r.c = 100;
                                r.fv = 100;
                                r.gr = 0;
                              })
                            }
                            className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"
                          >
                            ตั้งความสนิท &amp; บุญคุณเต็ม 100
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                          {(
                            [
                              ['c', 'สนิท (c)'],
                              ['fv', 'บุญคุณ (fv)'],
                              ['ow', 'ฝ่ายนี้ติดหนี้ (ow)'],
                              ['io', 'เราติดหนี้ (io)'],
                              ['gr', 'ความแค้น (gr)'],
                            ] as const
                          ).map(([key, label]) => (
                            <div key={key}>
                              <label className="mb-1 block text-[11px] text-slate-500">{label}</label>
                              <input
                                type="number"
                                value={Number(rel?.[key]) || 0}
                                onChange={(e) => {
                                  const v = Number(e.target.value) || 0;
                                  onMutate((draft) => {
                                    const r = ensureRel(draft, p.id);
                                    r[key] = v;
                                  });
                                }}
                                className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-base text-slate-900 sm:min-h-[34px] sm:text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-3">
                          <p className="mb-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            แท็กความสัมพันธ์ (tags)
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {REL_TAGS.map(([tagId, tagTh]) => {
                              const active = tags.includes(tagId);
                              return (
                                <button
                                  key={tagId}
                                  type="button"
                                  onClick={() =>
                                    onMutate((draft) => {
                                      const r = ensureRel(draft, p.id);
                                      const cur = cloneState(r.tags || []);
                                      const idx = cur.indexOf(tagId);
                                      if (idx >= 0) cur.splice(idx, 1);
                                      else cur.push(tagId);
                                      r.tags = cur;
                                    })
                                  }
                                  className={`min-h-[34px] rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                                    active
                                      ? 'bg-teal-700 text-white dark:bg-teal-500 dark:text-slate-950'
                                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                                  }`}
                                >
                                  {REL_TAG_MAP.get(tagId)?.th || tagTh}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="tabular-nums font-mono">
              หน้า {safePage + 1} / {totalPages} ({filteredPeople.length} รายการ)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="min-h-[40px] rounded-lg border border-slate-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-slate-700"
              >
                ก่อนหน้า
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="min-h-[40px] rounded-lg border border-slate-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-slate-700"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
