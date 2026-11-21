'use client';

import {
  BG,
  EL5,
  ELX,
  FATE,
  FATE_MAP,
  PathSegment,
  ROOTT,
  ROOT_MAP,
  SINEW,
  STRUCT,
  SaveObject,
} from '@/lib/wox/tables';

interface OriginDestinyTabProps {
  state: SaveObject;
  onSetAt: (path: PathSegment[], value: unknown) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

export function OriginDestinyTab({ state, onSetAt, onNotify }: OriginDestinyTabProps) {
  const rootObj =
    state.root && typeof state.root === 'object' && !Array.isArray(state.root)
      ? (state.root as Record<string, unknown>)
      : null;

  const curRootType = rootObj && rootObj.type != null ? String(rootObj.type) : 'none';
  const rootMeta = ROOT_MAP.get(curRootType);
  const needCount = rootMeta?.count ?? 0;
  const elementPool = curRootType === 'special' ? ELX : EL5;
  const curElements = Array.isArray(rootObj?.elements) ? (rootObj.elements as string[]) : [];
  const validCurCount = curElements.filter((x) => elementPool.some((e) => e[0] === x)).length;

  const destinyObj =
    state.destiny && typeof state.destiny === 'object' && !Array.isArray(state.destiny)
      ? (state.destiny as Record<string, unknown>)
      : null;
  const curFateTier = destinyObj && destinyObj.tier != null ? String(destinyObj.tier) : '';
  const curFateId = destinyObj && destinyObj.id != null ? String(destinyObj.id) : '';

  const rootCost = rootMeta?.cost ?? 0;
  const fateCost = curFateTier && FATE_MAP.has(curFateTier) ? FATE_MAP.get(curFateTier)![3] : 0;

  const handleRootTypeChange = (nextType: string) => {
    const cnt = ROOT_MAP.get(nextType)?.count ?? 0;
    const pool = nextType === 'special' ? ELX : EL5;
    onSetAt(['root', 'type'], nextType === 'none' ? null : nextType);
    onSetAt(
      ['root', 'elements'],
      nextType === 'none' ? [] : pool.slice(0, cnt).map((e) => e[0])
    );
    onNotify(
      `เปลี่ยนรากปราณเป็น「${ROOT_MAP.get(nextType)?.th || nextType}」· ปรับธาตุให้ตรงจำนวนแล้ว`,
      true
    );
  };

  const toggleElement = (elId: string, checked: boolean) => {
    const base = curElements.filter((x) => elementPool.some((e) => e[0] === x));
    let next: string[];
    if (checked) {
      if (base.includes(elId)) return;
      if (base.length >= needCount) {
        onNotify(`รากระดับนี้รับได้ ${needCount} ธาตุเท่านั้น`, false);
        return;
      }
      next = elementPool.filter((e) => base.includes(e[0]) || e[0] === elId).map((e) => e[0]);
    } else {
      next = base.filter((x) => x !== elId);
    }
    onSetAt(['root', 'elements'], next);
  };

  const curCls = state.cls != null ? String(state.cls) : '';
  const curStruct = state.structure != null ? String(state.structure) : '';
  const curSinew = state.sinew != null ? String(state.sinew) : '';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:px-5 sm:py-4 dark:border-slate-800 dark:bg-[#121821]">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            กำเนิดและดวงชะตา (Origin &amp; Destiny)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            ค่าตอนเกิดที่เกมใช้คำนวณศักยภาพ เส้นทางชีวิต และเรื่องราวส่วนตัว
          </p>
        </div>
        <div className="tabular-nums text-xs text-slate-600 dark:text-slate-400">
          คะแนนสร้างตัวละคร (ราก + ดวงชะตา):{' '}
          <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
            {rootCost + fateCost}
          </span>{' '}
          ({rootCost} + {fateCost})
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            พื้นหลังตระกูลและสายเลือด
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="sel-cls"
                className="block text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                พื้นหลังตระกูล (cls)
              </label>
              <select
                id="sel-cls"
                value={curCls}
                onChange={(e) => onSetAt(['cls'], e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
              >
                {curCls !== '' && !BG.some((r) => r[0] === curCls) && (
                  <option value={curCls}>{curCls} · ในเซฟ</option>
                )}
                {BG.map(([v, th, en]) => (
                  <option key={v} value={v}>
                    {th} · {en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sel-struct"
                className="block text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                โครงสร้างครอบครัว (structure)
              </label>
              <select
                id="sel-struct"
                value={curStruct}
                onChange={(e) => onSetAt(['structure'], e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
              >
                {curStruct !== '' && !STRUCT.some((r) => r[0] === curStruct) && (
                  <option value={curStruct}>{curStruct} · ในเซฟ</option>
                )}
                {STRUCT.map(([v, th, en]) => (
                  <option key={v} value={v}>
                    {th} · {en}
                  </option>
                ))}
              </select>
              {curStruct === 'orphan' && curCls !== 'poor' && (
                <p className="mt-1.5 text-xs text-amber-700 dark:text-amber-400">
                  หมายเหตุ: ตอนสร้างตัวละครหากเลือกกำพร้า (orphan) เกมจะกำหนดพื้นหลังเป็น poor เสมอ
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="sel-sinew"
                className="block text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                เส้นเอ็น (sinew)
              </label>
              <select
                id="sel-sinew"
                value={curSinew}
                onChange={(e) => onSetAt(['sinew'], e.target.value)}
                className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
              >
                {curSinew !== '' && !SINEW.some((r) => r[0] === curSinew) && (
                  <option value={curSinew}>{curSinew} · ในเซฟ</option>
                )}
                {SINEW.map(([v, th, en]) => (
                  <option key={v} value={v}>
                    {th} · {en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            รากปราณ (root)
          </h3>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <label
                  htmlFor="sel-root-type"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  ระดับรากปราณ (root.type)
                </label>
                <select
                  id="sel-root-type"
                  value={curRootType}
                  onChange={(e) => handleRootTypeChange(e.target.value)}
                  className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
                >
                  {!ROOT_MAP.has(curRootType) && (
                    <option value={curRootType}>{curRootType} · ในเซฟ</option>
                  )}
                  {ROOTT.map(([v, cost, th, en]) => (
                    <option key={v} value={v}>
                      {th} · {en} ({cost})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5">
                <label
                  htmlFor="inp-purity"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  ความบริสุทธิ์ 1–100 (purity)
                </label>
                <input
                  id="inp-purity"
                  type="number"
                  step="any"
                  value={typeof rootObj?.purity === 'number' ? rootObj.purity : ''}
                  placeholder="1–100"
                  onChange={(e) => {
                    const n = parseFloat(e.target.value);
                    if (Number.isFinite(n)) onSetAt(['root', 'purity'], n);
                  }}
                  className={`tabular-nums mt-1.5 min-h-[44px] w-full rounded-lg border px-3 py-2 font-mono text-base focus:outline-none sm:text-sm ${
                    typeof rootObj?.purity === 'number' &&
                    (rootObj.purity < 1 || rootObj.purity > 100)
                      ? 'border-amber-400 bg-amber-50/40 text-slate-900 focus:border-amber-600 dark:border-amber-600/70 dark:bg-amber-950/20 dark:text-slate-100'
                      : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400'
                  }`}
                />
                {typeof rootObj?.purity === 'number' &&
                  (rootObj.purity < 1 || rootObj.purity > 100) && (
                    <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                      ค่าปกติของเกมอยู่ในช่วง 1–100 (ค่าปัจจุบันอาจเกินเพดาน)
                    </p>
                  )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-400">
                  ธาตุของราก (root.elements)
                </span>
                <span className="tabular-nums font-mono text-slate-700 dark:text-slate-300">
                  {validCurCount}/{needCount}
                </span>
              </div>

              {needCount === 0 ? (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  ระดับไม่มีรากปราณไม่ใช้ธาตุ
                </p>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  {elementPool.map(([id, th, en]) => {
                    const active = curElements.includes(id);
                    return (
                      <label
                        key={id}
                        title={en}
                        className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors sm:min-h-[40px] ${
                          active
                            ? 'border-teal-700 bg-teal-50 font-medium text-teal-900 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-200'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={(e) => toggleElement(id, e.target.checked)}
                          className="h-5 w-5 shrink-0 rounded border-slate-300 text-teal-700 focus:ring-teal-700 sm:h-4 sm:w-4 dark:border-slate-600 dark:bg-slate-800 dark:text-teal-400"
                        />
                        <span className="truncate">{th}</span>
                        <span className="hidden text-xs text-slate-500 sm:inline dark:text-slate-400">
                          {en}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-1">
              <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm text-slate-800 sm:min-h-[40px] dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={Boolean(rootObj?.known)}
                  onChange={(e) => onSetAt(['root', 'known'], e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-700 sm:h-4 sm:w-4 dark:border-slate-600 dark:bg-slate-800 dark:text-teal-400"
                />
                <span>เปิดเผยรากปราณแล้ว (root.known)</span>
              </label>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          ดวงชะตา (destiny)
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          เปลี่ยนระดับดาว (tier) ไม่เปลี่ยนเรื่องราวเดิมที่ผูกไว้ (id) ต้องแก้ช่อง story id ด้วยถ้าต้องการสลับเรื่อง · ระดับ dark ใช้ตัดสินเส้นทางมืด
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sel-fate-tier"
              className="block text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              ระดับดวงชะตา (destiny.tier)
            </label>
            <select
              id="sel-fate-tier"
              value={FATE_MAP.has(curFateTier) ? curFateTier : ''}
              onChange={(e) => {
                const v = e.target.value;
                onSetAt(['destiny', 'tier'], v || null);
                onNotify(
                  v ? `เปลี่ยนดวงชะตาเป็น「${FATE_MAP.get(v)![1]}」แล้ว` : 'ลบระดับดวงชะตาแล้ว',
                  true
                );
              }}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
            >
              <option value="">— ยังไม่มี (null) —</option>
              {FATE.map(([id, th, en, cost]) => (
                <option key={id} value={id}>
                  {th} · {en} {cost ? `(${cost})` : '(0)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="inp-fate-id"
              className="block text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              รหัสเรื่องราวที่ผูกไว้ (destiny.id)
            </label>
            <input
              id="inp-fate-id"
              type="text"
              value={curFateId}
              placeholder="เว้นว่าง = null (ไม่ผูกเรื่อง)"
              onChange={(e) => {
                const trimmed = e.target.value.trim();
                onSetAt(['destiny', 'id'], trimmed || null);
              }}
              className="mt-1.5 min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
