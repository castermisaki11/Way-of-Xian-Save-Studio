'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Plus, Search, Trash2 } from 'lucide-react';
import {
  MASTERY_THRESHOLDS,
  SKILLS_CATALOG,
  SKILL_KIND_LABELS,
  SKILL_MAP,
  getMasteryLevel,
} from '@/lib/wox/catalog';
import { SaveObject } from '@/lib/wox/tables';

interface SkillsArtsTabProps {
  state: SaveObject;
  onSetTechXp: (skillId: string, xp: number) => void;
  onMaxAllTechs: () => void;
  onBatchLearnTechs: (skillIds: string[], xp: number) => void;
  onRemoveTech: (skillId: string) => void;
  onSetSlot: (kind: string, skillId: string, active: boolean) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

type KindFilter = 'all' | 'main' | 'combat' | 'movement' | 'defense' | 'support';

export function SkillsArtsTab({
  state,
  onSetTechXp,
  onMaxAllTechs,
  onBatchLearnTechs,
  onRemoveTech,
  onSetSlot,
  onNotify,
}: SkillsArtsTabProps) {
  const [query, setQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [customId, setCustomId] = useState('');

  const isXian = Boolean(state.cultivating);

  const techs = useMemo(() => {
    const raw = state.techs;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return raw as Record<string, number>;
  }, [state.techs]);

  const slots = useMemo(() => {
    const raw = state.slots;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    return raw as {
      main?: string | null;
      combat?: string[];
      movement?: string | null;
      defense?: string | null;
      support?: string[];
    };
  }, [state.slots]);

  const learnedEntries = useMemo(() => {
    return Object.entries(techs).sort(([idA, xpA], [idB, xpB]) => {
      const tA = SKILL_MAP.get(idA)?.tier ?? 0;
      const tB = SKILL_MAP.get(idB)?.tier ?? 0;
      if (tB !== tA) return tB - tA;
      return (xpB || 0) - (xpA || 0);
    });
  }, [techs]);

  const isEquippedInSlot = (skillId: string, kind: string): boolean => {
    if (!slots) return false;
    if (kind === 'main') return slots.main === skillId;
    if (kind === 'movement') return slots.movement === skillId;
    if (kind === 'defense') return slots.defense === skillId;
    if (kind === 'combat') return Array.isArray(slots.combat) && slots.combat.includes(skillId);
    if (kind === 'support') return Array.isArray(slots.support) && slots.support.includes(skillId);
    return false;
  };

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS_CATALOG.filter((sk) => {
      if (kindFilter !== 'all' && sk.kind !== kindFilter) return false;
      if (!q) return true;
      return (
        sk.id.toLowerCase().includes(q) ||
        sk.th.toLowerCase().includes(q) ||
        sk.en.toLowerCase().includes(q)
      );
    });
  }, [query, kindFilter]);

  const handleLearnCustom = () => {
    const id = customId.trim();
    if (!id) return;
    if (id in techs) {
      onNotify(`มีวิชา「${id}」อยู่แล้ว`, false);
      return;
    }
    onSetTechXp(id, 0);
    onNotify(`เพิ่มวิชา「${SKILL_MAP.get(id)?.th || id}」แล้ว`, true);
    setCustomId('');
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {slots && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
          <div className="border-b border-slate-200 pb-3.5 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              ช่องวิชาที่ใช้งานอยู่ (slots)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              แสดงวิชาที่ติดตั้งในช่อง main, combat, movement, defense และ support
            </p>
          </div>

          <dl className="mt-3 divide-y divide-slate-200 text-sm dark:divide-slate-800">
            {(
              [
                ['main', 'เคล็ดวิถีหลัก (main)', slots.main ? [slots.main] : []],
                ['combat', 'วิชาต่อสู้ (combat)', Array.isArray(slots.combat) ? slots.combat : []],
                ['movement', 'วิชาตัวเบา (movement)', slots.movement ? [slots.movement] : []],
                ['defense', 'วิชาป้องกัน (defense)', slots.defense ? [slots.defense] : []],
                ['support', 'วิชาเสริม (support)', Array.isArray(slots.support) ? slots.support : []],
              ] as const
            ).map(([kind, label, list]) => (
              <div
                key={kind}
                className="flex flex-col gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="flex flex-wrap items-center gap-2">
                  {list.length === 0 ? (
                    <span className="text-xs text-slate-400 dark:text-slate-500">ว่างอยู่</span>
                  ) : (
                    list.map((sid) => {
                      const meta = SKILL_MAP.get(sid);
                      return (
                        <button
                          key={sid}
                          type="button"
                          onClick={() => onSetSlot(kind, sid, false)}
                          title="คลิกเพื่อถอดออกจากช่อง"
                          className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800 hover:border-red-300 hover:bg-red-50 hover:text-red-700 sm:min-h-[32px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-red-800 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                        >
                          <span>{meta ? meta.th : sid}</span>
                          <span className="text-slate-400">×</span>
                        </button>
                      );
                    })
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3.5 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              วิชาที่เรียนแล้ว ({learnedEntries.length})
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ปรับค่าประสบการณ์ (XP) เพื่อเลื่อนระดับความชำนาญ (0 ถึง 28,000 สูงสุด)
            </p>
          </div>
          {learnedEntries.length > 0 && (
            <button
              type="button"
              onClick={onMaxAllTechs}
              className="min-h-[40px] rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 sm:min-h-[36px] dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 whitespace-nowrap"
            >
              อัปวิชาที่มีทั้งหมดเต็ม 28,000
            </button>
          )}
        </div>

        {learnedEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            ยังไม่มีวิชาใน techs เลือกเรียนเพิ่มได้จากคลังด้านล่าง
          </p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {learnedEntries.map(([id, xp]) => {
              const meta = SKILL_MAP.get(id);
              const mastery = getMasteryLevel(Number(xp) || 0, isXian);
              const equipped = meta ? isEquippedInSlot(id, meta.kind) : false;

              return (
                <div
                  key={id}
                  className="flex flex-col justify-between gap-3 py-3.5 lg:flex-row lg:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {meta ? meta.th : id}
                      </span>
                      {meta && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {meta.en}
                        </span>
                      )}
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {id}
                      </span>
                    </div>

                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                      {meta ? (
                        <>
                          <span>{SKILL_KIND_LABELS[meta.kind] || meta.kind}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">★{meta.tier}</span>
                          <span aria-hidden="true">·</span>
                        </>
                      ) : (
                        <>
                          <span className="text-amber-700 dark:text-amber-400">
                            วิชาจากภาคเสริม/ข้อมูลภายนอก
                          </span>
                          <span aria-hidden="true">·</span>
                        </>
                      )}
                      <span className="font-medium text-teal-700 dark:text-teal-400">
                        ระดับ {mastery.level}: {mastery.th} ({mastery.en})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      step={50}
                      value={Math.floor(Number(xp) || 0)}
                      onChange={(e) => {
                        const n = Math.max(0, Math.floor(Number(e.target.value) || 0));
                        onSetTechXp(id, n);
                      }}
                      className="tabular-nums min-h-[44px] w-24 rounded-lg border border-slate-200 bg-slate-50 px-2.5 font-mono text-base text-slate-900 sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />

                    <button
                      type="button"
                      onClick={() => onSetTechXp(id, MASTERY_THRESHOLDS[MASTERY_THRESHOLDS.length - 1])}
                      className="tabular-nums min-h-[44px] rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-[36px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
                    >
                      เต็ม 28,000
                    </button>

                    {slots && meta && (
                      <button
                        type="button"
                        onClick={() => onSetSlot(meta.kind, id, !equipped)}
                        className={`min-h-[44px] rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors sm:min-h-[36px] whitespace-nowrap shrink-0 ${
                          equipped
                            ? 'border-teal-700 bg-teal-50 text-teal-800 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {equipped ? 'ถอดจากช่อง' : 'ใส่ช่องใช้งาน'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onRemoveTech(id)}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 sm:min-h-[36px] dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/40 whitespace-nowrap shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>ลืม</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              คลังวิชาจากเกม ({SKILLS_CATALOG.length} รายการ)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ดึงจากตาราง c-GZJ7HVMK (เคล็ดวิถีหลัก วิชาต่อสู้ ตัวเบา ป้องกัน และสายอาชีพ)
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อวิชา / id"
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="flex w-full flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 lg:w-auto dark:bg-slate-800/80">
            {(
              [
                ['all', 'ทั้งหมด'],
                ['main', 'main'],
                ['combat', 'combat'],
                ['movement', 'movement'],
                ['defense', 'defense'],
                ['support', 'support'],
              ] as const
            ).map(([k, lb]) => (
              <button
                key={k}
                type="button"
                onClick={() => setKindFilter(k)}
                className={`min-h-[38px] flex-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:min-h-[32px] sm:flex-none whitespace-nowrap shrink-0 ${
                  kindFilter === k
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {lb}
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-2 lg:w-auto">
            <input
              type="text"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              placeholder="รหัสวิชาเฉพาะ (ถ้ามี)"
              className="min-h-[44px] min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 font-mono text-base text-slate-900 sm:min-h-[36px] sm:w-44 sm:flex-none sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              disabled={!customId.trim()}
              onClick={handleLearnCustom}
              className="min-h-[44px] rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 sm:min-h-[36px] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              เพิ่มวิชานี้
            </button>
            {filteredCatalog.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  onBatchLearnTechs(
                    filteredCatalog.map((s) => s.id),
                    28000
                  )
                }
                className="min-h-[44px] rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 hover:bg-teal-100 sm:min-h-[36px] dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 whitespace-nowrap shrink-0"
              >
                เรียนหมวดนี้ทั้งหมด ({filteredCatalog.length})
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
          {filteredCatalog.map((sk) => {
            const already = sk.id in techs;
            return (
              <div
                key={sk.id}
                className="flex flex-col justify-between gap-2 py-2.5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {sk.th}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{sk.en}</span>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {sk.id}
                    </span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{SKILL_KIND_LABELS[sk.kind] || sk.kind}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">★{sk.tier}</span>
                    {sk.element && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>ธาตุ {sk.element}</span>
                      </>
                    )}
                    {sk.demonic && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-red-600 dark:text-red-400">สายมาร</span>
                      </>
                    )}
                    {sk.martial && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>สายยุทธ์</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button
                    type="button"
                    disabled={already}
                    onClick={() => {
                      onSetTechXp(sk.id, 0);
                      onNotify(`เรียนวิชา「${sk.th}」แล้ว`, true);
                    }}
                    className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:min-h-[36px] sm:flex-none whitespace-nowrap shrink-0 ${
                      already
                        ? 'border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'
                        : 'border border-teal-700/30 bg-teal-50 text-teal-800 hover:bg-teal-100 dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-900/50'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{already ? 'เรียนแล้ว' : 'เรียน (0 XP)'}</span>
                  </button>

                  {!already && (
                    <button
                      type="button"
                      onClick={() => {
                        onSetTechXp(sk.id, 28000);
                        onNotify(`เรียนวิชา「${sk.th}」ระดับสูงสุด (28,000 XP) แล้ว`, true);
                      }}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-[36px] sm:flex-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>เต็มขั้น</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
