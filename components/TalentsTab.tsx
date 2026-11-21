'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, Trash2, AlertCircle } from 'lucide-react';
import {
  ILL_MAX,
  STAT_LABELS,
  SaveObject,
  StatKey,
  TAL,
  TAL_MAP,
  TalentDef,
  countTalentsByKind,
  getGoodTalentMax,
  isConflict,
  isSlotsEnabled,
} from '@/lib/wox/tables';

interface TalentsTabProps {
  state: SaveObject;
  onAddTalent: (id: string) => void;
  onRemoveTalent: (index: number) => void;
}

type FilterMode = 'all' | 'good' | 'ill' | 'crossing';

function formatFx(fx: Record<string, number>): string {
  const entries = Object.entries(fx);
  if (!entries.length) return 'ไม่มีโบนัสค่าสถานะโดยตรง';
  return entries
    .map(([k, v]) => {
      const label = STAT_LABELS[k as StatKey]?.th ?? k;
      return `${v > 0 ? '+' : ''}${v} ${label}`;
    })
    .join(' · ');
}

export function TalentsTab({ state, onAddTalent, onRemoveTalent }: TalentsTabProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');

  const equippedIds = useMemo(
    () => (Array.isArray(state.talents) ? (state.talents as string[]) : []),
    [state.talents]
  );
  const slotsOn = isSlotsEnabled(state);
  const goodMax = getGoodTalentMax(state);
  const goodCount = countTalentsByKind(state, true);
  const illCount = countTalentsByKind(state, false);

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TAL.filter((t) => {
      if (filter === 'good' && (!t.good || t.crossing)) return false;
      if (filter === 'ill' && t.good) return false;
      if (filter === 'crossing' && !t.crossing) return false;
      if (!q) return true;
      return (
        t.id.toLowerCase().includes(q) ||
        t.th.toLowerCase().includes(q) ||
        t.en.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  if (!Array.isArray(state.talents)) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-[#121821] dark:text-slate-400">
        เซฟนี้ไม่มีฟิลด์ <span className="font-mono">talents</span> เป็นรายการ (array) สามารถตรวจสอบหรือเพิ่มได้ที่แท็บ “ข้อมูลทั้งหมด”
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              พรสวรรค์ที่ติดตัวอยู่ ({equippedIds.length})
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              เพิ่มหรือลบจะคำนวณ fx เข้า stats และ statSrc.*.talent ให้ตรงกับระบบเกม
            </p>
          </div>
          <div className="tabular-nums text-xs font-medium text-slate-700 dark:text-slate-300">
            {slotsOn ? (
              <span>
                ช่องพรสวรรค์ดี {goodCount}/{goodMax} · ร้าย {illCount}/{ILL_MAX}
              </span>
            ) : (
              <span>เซฟรุ่นเก่า (ไม่จำกัดช่อง)</span>
            )}
          </div>
        </div>

        {equippedIds.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            ยังไม่มีพรสวรรค์ในเซฟนี้ เลือกเพิ่มได้จากคลังด้านล่าง
          </p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {equippedIds.map((id, idx) => {
              const t: TalentDef | undefined = TAL_MAP.get(id);
              return (
                <div
                  key={`${id}-${idx}`}
                  className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t ? t.th : id}
                      </span>
                      {t && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {t.en}
                        </span>
                      )}
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {id}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-600 dark:text-slate-400">
                      {t ? (
                        <>
                          <span
                            className={
                              t.good
                                ? 'font-medium text-teal-700 dark:text-teal-400'
                                : 'font-medium text-red-600 dark:text-red-400'
                            }
                          >
                            {t.good ? `ดี ★${t.tier}` : `ร้าย ${t.tier}`}
                          </span>
                          {t.crossing && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-700 dark:text-amber-400">
                                ข้ามขีดจำกัด (ไม่นับช่อง)
                              </span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{formatFx(t.fx)}</span>
                        </>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400">
                          รหัสนี้ไม่อยู่ในตาราง 76 พรสวรรค์ของเกม (ไม่มี fx ให้คืน)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveTalent(idx)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 sm:min-h-[38px] sm:w-auto dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/40 whitespace-nowrap shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>นำออก</span>
                  </button>
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
              คลังพรสวรรค์จากเกม ({TAL.length} รายการ)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              พรสวรรค์ที่ขัดกันจะถูกถอดออกอัตโนมัติตามกติกาเกม · พรสวรรค์ร้ายที่ขัดกับพรสวรรค์ดีจะไม่ถูกเพิ่ม
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อไทย / อังกฤษ / id"
                className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[40px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
              />
            </div>

            <div className="grid w-full grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 sm:flex sm:w-auto dark:bg-slate-800/80">
              {(
                [
                  ['all', 'ทั้งหมด'],
                  ['good', 'ดี'],
                  ['ill', 'ร้าย'],
                  ['crossing', 'Crossing'],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFilter(k)}
                  className={`min-h-[38px] rounded-md px-2 py-1 text-xs font-medium transition-colors sm:min-h-[32px] sm:px-2.5 whitespace-nowrap shrink-0 ${
                    filter === k
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
          {filteredCatalog.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              ไม่พบพรสวรรค์ที่ตรงกับคำค้นหา
            </p>
          ) : (
            filteredCatalog.map((t) => {
              const isEquipped = equippedIds.includes(t.id);
              const clashes = equippedIds.filter((o) => isConflict(t.id, o));
              const clashNames = clashes.map((o) => TAL_MAP.get(o)?.th || o);
              const blockedByGood = !t.good && clashes.some((o) => TAL_MAP.get(o)?.good);

              return (
                <div
                  key={t.id}
                  className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {t.th}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {t.en}
                      </span>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {t.id}
                      </span>
                    </div>

                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-600 dark:text-slate-400">
                      <span
                        className={
                          t.good
                            ? 'font-medium text-teal-700 dark:text-teal-400'
                            : 'font-medium text-red-600 dark:text-red-400'
                        }
                      >
                        {t.good ? `ดี ★${t.tier}` : `ร้าย ${t.tier}`}
                      </span>
                      {t.crossing && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-700 dark:text-amber-400">crossing</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{formatFx(t.fx)}</span>
                    </div>

                    {clashes.length > 0 && !isEquipped && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>
                          {blockedByGood
                            ? `ขัดกับพรสวรรค์ดีที่มีอยู่ (${clashNames.join('、')})`
                            : `หากเพิ่มจะถอด「${clashNames.join('、')}」ที่ขัดกันออก`}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isEquipped || blockedByGood}
                    onClick={() => onAddTalent(t.id)}
                    className={`inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors sm:min-h-[38px] sm:w-auto whitespace-nowrap shrink-0 ${
                      isEquipped
                        ? 'border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'
                        : blockedByGood
                        ? 'border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500'
                        : 'border border-teal-700/30 bg-teal-50 text-teal-800 hover:bg-teal-100 dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-900/50'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{isEquipped ? 'มีอยู่แล้ว' : 'เพิ่มพรสวรรค์'}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
