'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowUpRight, ChevronDown, ChevronRight, Wrench, Zap } from 'lucide-react';
import {
  PathSegment,
  QUICK_FIELDS,
  SaveObject,
  STAT_KEYS,
  StatKey,
  getAtPath,
  getMoneyAlertThreshold,
} from '@/lib/wox/tables';
import { MARTIAL_RANKS, REALMS } from '@/lib/wox/catalog';

interface QuickEditTabProps {
  state: SaveObject;
  onSetAt: (path: PathSegment[], value: unknown) => void;
  onSetStat: (stat: StatKey, value: number) => void;
  onMaxAllStats: () => void;
  onMaxEverything: () => void;
  onReconcileStatSrc: () => void;
}

export function QuickEditTab({
  state,
  onSetAt,
  onSetStat,
  onMaxAllStats,
  onMaxEverything,
  onReconcileStatSrc,
}: QuickEditTabProps) {
  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const capSeen = (state.capSeen as Record<string, number> | undefined) ?? {};
  const statSrc = (state.statSrc as Record<string, Record<string, number>> | undefined) ?? {};
  const moneyThreshold = getMoneyAlertThreshold(state.ageMonths);
  const totalMonths = Math.max(0, Math.floor(Number(state.ageMonths) || 0));
  const ageYears = Math.floor(totalMonths / 12);
  const ageRemMonths = totalMonths % 12;

  const curRealmIdx = typeof state.realm === 'number' ? state.realm : null;
  const curRealmMeta = curRealmIdx !== null ? REALMS[curRealmIdx] : undefined;

  const martialObj =
    state.martial && typeof state.martial === 'object' && !Array.isArray(state.martial)
      ? (state.martial as Record<string, unknown>)
      : null;

  const groups: Array<{
    title: string;
    items: Array<{ label: string; path: PathSegment[]; max?: number }>;
  }> = [];
  const groupMap = new Map<
    string,
    Array<{ label: string; path: PathSegment[]; max?: number }>
  >();

  for (const field of QUICK_FIELDS) {
    const val = getAtPath(state, field.path);
    if (val === undefined || val === null || typeof val === 'object') continue;
    if (!groupMap.has(field.group)) {
      const arr: Array<{ label: string; path: PathSegment[]; max?: number }> = [];
      groupMap.set(field.group, arr);
      groups.push({ title: field.group, items: arr });
    }
    groupMap.get(field.group)!.push({
      label: field.label,
      path: field.path,
      max: field.max,
    });
  }

  const personality = state.personality;
  if (personality && typeof personality === 'object' && !Array.isArray(personality)) {
    const pItems: Array<{ label: string; path: PathSegment[] }> = [];
    for (const k of Object.keys(personality)) {
      const val = (personality as Record<string, unknown>)[k];
      if (val !== undefined && val !== null && typeof val !== 'object') {
        pItems.push({ label: `บุคลิก · ${k}`, path: ['personality', k] });
      }
    }
    if (pItems.length) {
      groups.push({ title: 'บุคลิก (personality)', items: pItems });
    }
  }

  const getFieldWarning = (
    pathStr: string,
    val: unknown,
    statName: StatKey | null,
    srcObj?: Record<string, number>
  ): string | null => {
    if (typeof val !== 'number') return null;
    if (pathStr === 'money') {
      if (val < 0) return 'เงินต้องมีค่ามากกว่าหรือเท่ากับ 0';
      if (val > moneyThreshold) {
        return `เกินเกณฑ์ตรวจจับของเกม (~${moneyThreshold.toLocaleString()} ตำลึง สำหรับอายุ ${ageYears} ปี) · ฝั่งออนไลน์อาจปฏิเสธ`;
      }
    }
    if (pathStr === 'health' && (val < 0 || val > 100)) {
      return 'สุขภาพอยู่นอกช่วงปกติ (0–100) · เกมอาจปรับค่ากลับตอนโหลด';
    }
    if (pathStr === 'ageMonths' && val < 0) {
      return 'อายุต้องมีค่ามากกว่าหรือเท่ากับ 0';
    }
    if (pathStr === 'layer' && curRealmMeta && curRealmMeta.layers > 0 && val > curRealmMeta.layers) {
      return `ขั้น「${curRealmMeta.th}」มีสูงสุด ${curRealmMeta.layers} ชั้น`;
    }
    if (statName) {
      const cap = capSeen[statName];
      if (typeof cap === 'number' && val > cap) {
        return `เกินเพดาน capSeen.${statName} (${cap}) · เกมอาจตัดค่ากลับตอนโหลด`;
      }
      if (val < 1) {
        return 'ค่าสถานะต่ำกว่า 1';
      }
      if (srcObj) {
        const sum = Object.values(srcObj).reduce((a, b) => a + (+b || 0), 0);
        if (Math.abs(sum - val) > 1e-6) {
          return `ผลรวม statSrc.${statName} (${sum}) ไม่ตรงกับค่านี้ (${val}) · เกมอาจ rescale`;
        }
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            ปรับค่าด่วน (Quick Actions)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            ปรับค่าสถานะผ่าน statSrc.event อัตโนมัติ เลือกขั้นบำเพ็ญตรงตามตารางเกม พร้อมเตือนเกณฑ์ตรวจจับ
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
          <button
            type="button"
            onClick={onReconcileStatSrc}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <Wrench className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>ซิงก์ statSrc + fx</span>
          </button>
          <button
            type="button"
            onClick={onMaxAllStats}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 sm:min-h-[40px] sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
          >
            <ArrowUpRight className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
            <span>ค่าสถานะทั้ง 5 → สูงสุด</span>
          </button>
          <button
            type="button"
            onClick={onMaxEverything}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 sm:min-h-[40px] sm:w-auto dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 whitespace-nowrap shrink-0"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>เต็มทุกอย่าง</span>
          </button>
        </div>
      </div>

      {martialObj && typeof martialObj.rank === 'number' && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
            <div className="md:col-span-5">
              <label
                htmlFor="fld-martial-rank"
                className="block text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                ระดับวิถียุทธ์ (martial.rank)
              </label>
              <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                สายจอมยุทธ์ · 7 ระดับจาก c-GZJ7HVMK
              </p>
            </div>
            <div className="md:col-span-7">
              <select
                id="fld-martial-rank"
                value={martialObj.rank}
                onChange={(e) => onSetAt(['martial', 'rank'], Number(e.target.value))}
                className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {!MARTIAL_RANKS.some((r) => r.index === martialObj.rank) && (
                  <option value={martialObj.rank}>ขั้น {martialObj.rank} (ในเซฟ)</option>
                )}
                {MARTIAL_RANKS.map((r) => (
                  <option key={r.id} value={r.index}>
                    {r.index}. {r.th} · {r.en} (เพดานค่าสถานะ {r.statCap})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      )}

      {groups.map((grp) => (
        <section
          key={grp.title}
          className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#121821]"
        >
          <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {grp.title}
            </h3>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {grp.items.map((item) => {
              const pathStr = item.path.join('.');
              const val = getAtPath(state, item.path);
              const isStat =
                item.path[0] === 'stats' && STAT_KEYS.includes(item.path[1] as StatKey);
              const statName = isStat ? (item.path[1] as StatKey) : null;
              const maxVal = statName ? capSeen[statName] : item.max;
              const srcObj = statName ? statSrc[statName] : undefined;
              const isExpanded = expandedStat === pathStr;
              const warning = getFieldWarning(pathStr, val, statName, srcObj);

              return (
                <div key={pathStr} className="px-4 py-3.5 sm:px-5">
                  <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <label
                        htmlFor={`fld-${pathStr}`}
                        className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                      >
                        {item.label}
                      </label>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <span>{pathStr}</span>
                        {pathStr === 'money' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">
                              เกณฑ์เกม ~{moneyThreshold.toLocaleString()}
                            </span>
                          </>
                        )}
                        {pathStr === 'realm' && curRealmMeta && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums font-sans">
                              อายุขัย {curRealmMeta.lifespan.toLocaleString()} ปี · เพดาน{' '}
                              {curRealmMeta.statCap}
                            </span>
                          </>
                        )}
                        {pathStr === 'ageMonths' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums font-sans">
                              {ageYears} ปี {ageRemMonths} เดือน
                            </span>
                          </>
                        )}
                        {statName && srcObj && (
                          <>
                            <span aria-hidden="true">·</span>
                            <button
                              type="button"
                              onClick={() => setExpandedStat(isExpanded ? null : pathStr)}
                              className="inline-flex min-h-[36px] items-center gap-0.5 px-1 text-teal-700 hover:underline sm:min-h-0 sm:px-0 dark:text-teal-400"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                              )}
                              <span>ดู statSrc</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      {pathStr === 'realm' && typeof val === 'number' ? (
                        <select
                          id={`fld-${pathStr}`}
                          value={val}
                          onChange={(e) => {
                            const nextIdx = Number(e.target.value);
                            onSetAt(item.path, nextIdx);
                            const nextMeta = REALMS[nextIdx];
                            if (nextMeta && typeof state.layer === 'number') {
                              if (nextMeta.layers === 0 && state.layer !== 0) {
                                onSetAt(['layer'], 0);
                              } else if (nextMeta.layers > 0 && state.layer > nextMeta.layers) {
                                onSetAt(['layer'], nextMeta.layers);
                              } else if (nextMeta.layers > 0 && state.layer < 1) {
                                onSetAt(['layer'], 1);
                              }
                            }
                          }}
                          className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        >
                          {!REALMS.some((r) => r.index === val) && (
                            <option value={val}>ขั้น {val} (นอกตาราง)</option>
                          )}
                          {REALMS.map((r) => (
                            <option key={r.id} value={r.index}>
                              {r.index}. {r.th} · {r.en}{' '}
                              {r.layers > 0 ? `(1–${r.layers} ชั้น)` : '(ไม่มีชั้น)'}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          {typeof val === 'boolean' ? (
                            <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                              <input
                                id={`fld-${pathStr}`}
                                type="checkbox"
                                checked={val}
                                onChange={(e) => onSetAt(item.path, e.target.checked)}
                                className="h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-700 dark:border-slate-600 dark:bg-slate-800 dark:text-teal-400"
                              />
                              <span>{val ? 'เปิด (true)' : 'ปิด (false)'}</span>
                            </label>
                          ) : typeof val === 'number' ? (
                            <>
                              <input
                                id={`fld-${pathStr}`}
                                type="number"
                                step="any"
                                value={Number.isFinite(val) ? val : 0}
                                onChange={(e) => {
                                  const n = parseFloat(e.target.value);
                                  if (Number.isFinite(n)) {
                                    if (statName) onSetStat(statName, n);
                                    else onSetAt(item.path, n);
                                  }
                                }}
                                className={`tabular-nums min-h-[44px] min-w-[110px] flex-1 rounded-lg border px-3 py-2 font-mono text-base focus:outline-none sm:min-h-[40px] sm:text-sm ${
                                  warning
                                    ? 'border-amber-400 bg-amber-50/40 text-slate-900 focus:border-amber-600 dark:border-amber-600/70 dark:bg-amber-950/20 dark:text-slate-100'
                                    : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-teal-700 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400'
                                }`}
                              />
                              {pathStr === 'ageMonths' && (
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    aria-label="อายุเป็นปี"
                                    value={ageYears}
                                    min={0}
                                    onChange={(e) => {
                                      const y = Math.max(0, Math.floor(Number(e.target.value) || 0));
                                      onSetAt(['ageMonths'], y * 12 + ageRemMonths);
                                    }}
                                    className="tabular-nums min-h-[44px] w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-2 font-mono text-base text-slate-900 sm:min-h-[40px] sm:text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                  />
                                  <span className="text-xs text-slate-500">ปี</span>
                                </div>
                              )}
                              {maxVal != null && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (statName) onSetStat(statName, maxVal);
                                    else onSetAt(item.path, maxVal);
                                  }}
                                  className="tabular-nums min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
                                >
                                  สูงสุด {maxVal.toLocaleString()}
                                </button>
                              )}
                            </>
                          ) : (
                            <input
                              id={`fld-${pathStr}`}
                              type="text"
                              value={String(val ?? '')}
                              onChange={(e) => onSetAt(item.path, e.target.value)}
                              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none sm:min-h-[40px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
                            />
                          )}
                        </div>
                      )}

                      {warning && (
                        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span>{warning}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isExpanded && srcObj && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-slate-50 px-3.5 py-2 font-mono text-xs text-slate-600 dark:bg-slate-900/70 dark:text-slate-400">
                      {Object.entries(srcObj).map(([k, v]) => (
                        <span key={k} className="tabular-nums">
                          {k}: <strong className="text-slate-900 dark:text-slate-200">{v}</strong>
                        </span>
                      ))}
                      <span className="tabular-nums text-teal-700 dark:text-teal-400">
                        รวม = {Object.values(srcObj).reduce((a, b) => a + (+b || 0), 0)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
