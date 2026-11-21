'use client';

import { useMemo, useState } from 'react';
import { Minus, PackagePlus, Plus, Search, Shield, Trash2 } from 'lucide-react';
import {
  EQUIP_SLOTS,
  EQUIP_SLOT_LABELS,
  ITEMS_CATALOG,
  ITEM_MAP,
  ITEM_SLOT_LABELS,
} from '@/lib/wox/catalog';
import { SaveObject } from '@/lib/wox/tables';

interface BagEquipTabProps {
  state: SaveObject;
  onSetBagCount: (itemId: string, count: number) => void;
  onBatchBoostBag: (delta: number) => void;
  onBatchAddItems: (itemIds: string[], amount: number) => void;
  onEquipItem: (slot: string, itemId: string | null) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

type ItemCategoryFilter = 'all' | 'gear' | 'pill_tal' | 'material_tool' | 'scroll';

export function BagEquipTab({
  state,
  onSetBagCount,
  onBatchBoostBag,
  onBatchAddItems,
  onEquipItem,
  onNotify,
}: BagEquipTabProps) {
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState<ItemCategoryFilter>('all');
  const [addAmount, setAddAmount] = useState(1);
  const [customId, setCustomId] = useState('');
  const [customCount, setCustomCount] = useState(1);

  const bag = useMemo(() => {
    const raw = state.bag;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return raw as Record<string, number>;
  }, [state.bag]);

  const equip = useMemo(() => {
    const raw = state.equip;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return raw as Record<string, string | null | undefined>;
  }, [state.equip]);

  const bagEntries = useMemo(() => {
    return Object.entries(bag)
      .filter(([, count]) => typeof count === 'number' && count > 0)
      .sort(([idA], [idB]) => {
        const tierA = ITEM_MAP.get(idA)?.tier ?? -1;
        const tierB = ITEM_MAP.get(idB)?.tier ?? -1;
        if (tierB !== tierA) return tierB - tierA;
        return idA.localeCompare(idB);
      });
  }, [bag]);

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS_CATALOG.filter((item) => {
      if (catFilter === 'gear') {
        if (!['weapon', 'armor', 'accessory', 'treasure'].includes(item.slot)) return false;
      } else if (catFilter === 'pill_tal') {
        if (!['pill', 'talisman'].includes(item.slot)) return false;
      } else if (catFilter === 'material_tool') {
        if (!['material', 'tool', 'supply'].includes(item.slot)) return false;
      } else if (catFilter === 'scroll') {
        if (item.slot !== 'scroll') return false;
      }
      if (!q) return true;
      return (
        item.id.toLowerCase().includes(q) ||
        item.th.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q)
      );
    });
  }, [query, catFilter]);

  const handleAddCustom = () => {
    const id = customId.trim();
    if (!id) return;
    const amt = Math.max(1, Math.floor(customCount || 1));
    onSetBagCount(id, (bag[id] || 0) + amt);
    onNotify(`เพิ่ม「${ITEM_MAP.get(id)?.th || id}」×${amt} ลงกระเป๋าแล้ว`, true);
    setCustomId('');
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="border-b border-slate-200 pb-3.5 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            อุปกรณ์ที่สวมใส่อยู่ (equip)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            4 ช่องหลักตามโครงสร้างเกม (weapon · armor · accessory · treasure)
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {EQUIP_SLOTS.map((slot) => {
            const itemId = equip[slot];
            const meta = itemId ? ITEM_MAP.get(itemId) : undefined;
            return (
              <div
                key={slot}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-3 sm:px-4 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {EQUIP_SLOT_LABELS[slot] || slot}
                  </p>
                  {itemId ? (
                    <div className="mt-0.5">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {meta ? meta.th : itemId}
                      </p>
                      <p className="truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                        {meta ? `${meta.en} · ★${meta.tier} · ${itemId}` : itemId}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">ว่างอยู่</p>
                  )}
                </div>

                {itemId && (
                  <button
                    type="button"
                    onClick={() => onEquipItem(slot, null)}
                    className="min-h-[40px] rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:min-h-[36px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
                  >
                    ถอดออก
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3.5 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              ของในกระเป๋า ({bagEntries.length} ชนิด)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ปรับจำนวนได้ทันที · หากลดเหลือ 0 ระบบจะลบคีย์ออกจาก bag ให้อัตโนมัติ
            </p>
          </div>
          {bagEntries.length > 0 && (
            <button
              type="button"
              onClick={() => onBatchBoostBag(10)}
              className="min-h-[40px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:min-h-[36px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              +10 ทุกรายการที่มีอยู่
            </button>
          )}
        </div>

        {bagEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            กระเป๋าว่างเปล่า เพิ่มไอเทมได้จากคลังด้านล่าง
          </p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {bagEntries.map(([id, count]) => {
              const meta = ITEM_MAP.get(id);
              const canEquip = meta && EQUIP_SLOTS.includes(meta.slot);
              const isEquipped = canEquip && equip[meta.slot] === id;

              return (
                <div
                  key={id}
                  className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
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
                          <span>{ITEM_SLOT_LABELS[meta.slot] || meta.slot}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">ระดับ ★{meta.tier}</span>
                          {meta.martial && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>สายยุทธ์</span>
                            </>
                          )}
                          {isEquipped && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-teal-700 dark:text-teal-400">
                                กำลังสวมใส่
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400">
                          ไอเทมจากภาคเสริม/ข้อมูลภายนอก (รักษารหัสเดิมไว้ให้)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                      <button
                        type="button"
                        aria-label={`ลดจำนวน ${id}`}
                        onClick={() => onSetBagCount(id, Math.max(0, count - 1))}
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-600 hover:text-slate-900 sm:min-h-[36px] sm:min-w-[36px] dark:text-slate-300 dark:hover:text-white"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={count}
                        onChange={(e) => {
                          const n = Math.max(0, Math.floor(Number(e.target.value) || 0));
                          onSetBagCount(id, n);
                        }}
                        className="tabular-nums min-h-[44px] w-16 bg-transparent text-center font-mono text-base font-semibold text-slate-900 focus:outline-none sm:min-h-[36px] sm:text-xs dark:text-slate-100"
                      />
                      <button
                        type="button"
                        aria-label={`เพิ่มจำนวน ${id}`}
                        onClick={() => onSetBagCount(id, count + 1)}
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-600 hover:text-slate-900 sm:min-h-[36px] sm:min-w-[36px] dark:text-slate-300 dark:hover:text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {canEquip && !isEquipped && (
                      <button
                        type="button"
                        onClick={() => {
                          onEquipItem(meta.slot, id);
                          onNotify(`สวมใส่「${meta.th}」ในช่อง ${meta.slot} แล้ว`, true);
                        }}
                        className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 hover:bg-teal-100 sm:min-h-[36px] sm:px-2.5 dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 whitespace-nowrap shrink-0"
                      >
                        <Shield className="h-3.5 w-3.5" />
                        <span>สวมใส่</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSetBagCount(id, 0)}
                      aria-label={`ลบ ${id}`}
                      className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 sm:min-h-[36px] sm:px-2.5 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/40 whitespace-nowrap shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>ลบ</span>
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
              คลังไอเทมจากเกม ({ITEMS_CATALOG.length} รายการ)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ดึงจากตาราง c-GZJ7HVMK (อาวุธ เกราะ เครื่องประดับ ของวิเศษ โอสถ ยันต์ วัตถุดิบ และคัมภีร์)
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <label className="flex items-center justify-between gap-2 text-xs text-slate-600 sm:justify-start dark:text-slate-400">
              <span>จำนวนที่เพิ่ม</span>
              <input
                type="number"
                min={1}
                max={999}
                value={addAmount}
                onChange={(e) => setAddAmount(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                className="tabular-nums min-h-[44px] w-20 rounded-lg border border-slate-200 bg-slate-50 px-2 text-center font-mono text-base text-slate-900 sm:min-h-[38px] sm:w-16 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>

            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อไอเทม / id"
                className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="flex w-full flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 lg:w-auto dark:bg-slate-800/80">
            {(
              [
                ['all', 'ทั้งหมด'],
                ['gear', 'อาวุธ/เกราะ/ของวิเศษ'],
                ['pill_tal', 'โอสถ/ยันต์'],
                ['material_tool', 'วัตถุดิบ/อุปกรณ์'],
                ['scroll', 'คัมภีร์วิชา'],
              ] as const
            ).map(([k, lb]) => (
              <button
                key={k}
                type="button"
                onClick={() => setCatFilter(k)}
                className={`min-h-[38px] flex-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:min-h-[32px] sm:flex-none whitespace-nowrap shrink-0 ${
                  catFilter === k
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {lb}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto">
            <input
              type="text"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              placeholder="รหัส ID เฉพาะ (ถ้ามี)"
              className="min-h-[44px] min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 font-mono text-base text-slate-900 sm:min-h-[36px] sm:w-40 sm:flex-none sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <input
              type="number"
              min={1}
              value={customCount}
              onChange={(e) => setCustomCount(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
              className="tabular-nums min-h-[44px] w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 text-center font-mono text-base text-slate-900 sm:min-h-[36px] sm:w-14 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              disabled={!customId.trim()}
              onClick={handleAddCustom}
              className="min-h-[44px] rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 sm:min-h-[36px] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
            >
              เพิ่ม ID นี้
            </button>
            {filteredCatalog.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  onBatchAddItems(
                    filteredCatalog.map((item) => item.id),
                    addAmount
                  )
                }
                className="min-h-[44px] rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 hover:bg-teal-100 sm:min-h-[36px] dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 whitespace-nowrap shrink-0"
              >
                เติมรายการที่กรอง ({filteredCatalog.length}) +{addAmount}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
          {filteredCatalog.slice(0, 120).map((item) => {
            const owned = bag[item.id] || 0;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-2.5 py-3 sm:flex-row sm:items-center sm:py-2.5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.th}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.en}</span>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {item.id}
                    </span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{ITEM_SLOT_LABELS[item.slot] || item.slot}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">★{item.tier}</span>
                    {owned > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-medium text-teal-700 dark:text-teal-400">
                          ในกระเป๋า {owned}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSetBagCount(item.id, owned + addAmount);
                    onNotify(`เพิ่ม「${item.th}」×${addAmount} ลงกระเป๋าแล้ว`, true);
                  }}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100 sm:min-h-[36px] sm:w-auto dark:border-teal-400/30 dark:bg-teal-950/40 dark:text-teal-300 dark:hover:bg-teal-900/50 whitespace-nowrap shrink-0"
                >
                  <PackagePlus className="h-3.5 w-3.5" />
                  <span>ใส่กระเป๋า +{addAmount}</span>
                </button>
              </div>
            );
          })}
          {filteredCatalog.length > 120 && (
            <p className="py-3 text-xs text-slate-500 dark:text-slate-400">
              แสดง 120 จาก {filteredCatalog.length} รายการ (พิมพ์ค้นหาเพื่อดูรายการอื่น)
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
