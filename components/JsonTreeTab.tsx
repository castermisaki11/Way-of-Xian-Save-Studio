'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Code2, Lock, Plus, Search, Trash2 } from 'lucide-react';
import {
  PathSegment,
  SaveObject,
  TYPE_OPTIONS,
  ValueType,
  convertValue,
  getAtPath,
  isProtectedPath,
  typeOfValue,
} from '@/lib/wox/tables';

interface JsonTreeTabProps {
  state: SaveObject;
  onSetAt: (path: PathSegment[], value: unknown) => void;
  onDeleteAt: (path: PathSegment[]) => void;
  onAddAt: (parentPath: PathSegment[], keyName: string | null, value: unknown) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

function ArmDeleteButton({
  label,
  onConfirm,
}: {
  label: string;
  onConfirm: () => void;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const id = setTimeout(() => setArmed(false), 2500);
    return () => clearTimeout(id);
  }, [armed]);

  return (
    <button
      type="button"
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
      className={`inline-flex min-h-[40px] items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors sm:min-h-[36px] whitespace-nowrap shrink-0 ${
        armed
          ? 'border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-500 dark:text-slate-950'
          : 'border-slate-200 bg-transparent text-red-600 hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/40'
      }`}
    >
      <Trash2 className="h-3.5 w-3.5" />
      <span>{armed ? 'ยืนยัน?' : label}</span>
    </button>
  );
}

function AddChildBar({
  parentObj,
  parentPath,
  onAddAt,
  onNotify,
}: {
  parentObj: unknown[] | Record<string, unknown>;
  parentPath: PathSegment[];
  onAddAt: (parentPath: PathSegment[], keyName: string | null, value: unknown) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}) {
  const isArr = Array.isArray(parentObj);
  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<ValueType>('string');

  const handleAdd = () => {
    if (!isArr) {
      const k = newKey.trim();
      if (!k) {
        onNotify('ใส่ชื่อคีย์ก่อน', false);
        return;
      }
      if (Object.prototype.hasOwnProperty.call(parentObj, k)) {
        onNotify('มีคีย์นี้อยู่แล้ว', false);
        return;
      }
      if (!parentPath.length && k === 'tampered') {
        onNotify('คีย์ tampered เพิ่มหรือแก้ไม่ได้', false);
        return;
      }
      onAddAt(parentPath, k, convertValue(null, newType));
      setNewKey('');
    } else {
      onAddAt(parentPath, null, convertValue(null, newType));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!isArr && (
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="ชื่อคีย์ใหม่"
          className="min-h-[44px] min-w-0 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[36px] sm:w-auto sm:min-w-[140px] sm:flex-1 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
        />
      )}
      <select
        value={newType}
        onChange={(e) => setNewType(e.target.value as ValueType)}
        aria-label="ชนิดข้อมูลใหม่"
        className="min-h-[44px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-base text-slate-800 focus:border-teal-700 focus:outline-none sm:min-h-[36px] sm:flex-none sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {TYPE_OPTIONS.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-lg bg-slate-900 px-3.5 py-1 text-xs font-medium text-white transition-colors hover:bg-slate-800 sm:min-h-[36px] sm:px-3 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white whitespace-nowrap shrink-0"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>เพิ่ม</span>
      </button>
    </div>
  );
}

interface TreeNodeProps {
  label: string;
  value: unknown;
  path: PathSegment[];
  onSetAt: (path: PathSegment[], value: unknown) => void;
  onDeleteAt: (path: PathSegment[]) => void;
  onAddAt: (parentPath: PathSegment[], keyName: string | null, value: unknown) => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

function TreeNode({
  label,
  value,
  path,
  onSetAt,
  onDeleteAt,
  onAddAt,
  onNotify,
}: TreeNodeProps) {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(100);
  const [jsonOpen, setJsonOpen] = useState(false);
  const [jsonDraft, setJsonDraft] = useState('');

  const prot = isProtectedPath(path);
  const t = typeOfValue(value);
  const isContainer = value !== null && typeof value === 'object';

  if (isContainer) {
    const container = value as unknown[] | Record<string, unknown>;
    const keys = Object.keys(container);
    const shownKeys = keys.slice(0, limit);
    const countTag = Array.isArray(container) ? `[${container.length}]` : `{${keys.length}}`;

    const toggleJson = () => {
      if (jsonOpen) {
        setJsonOpen(false);
        return;
      }
      const txt = JSON.stringify(value, null, 2);
      if (txt.length > 1500000) {
        onNotify('กลุ่มนี้ใหญ่เกินกว่าจะแก้เป็น JSON ทั้งก้อน แก้ทีละคีย์แทน', false);
        return;
      }
      setJsonDraft(txt);
      setJsonOpen(true);
    };

    const applyJson = () => {
      try {
        const parsed = JSON.parse(jsonDraft);
        onSetAt(path, parsed);
        setJsonOpen(false);
        onNotify(`อัปเดต ${path.join('.')} สำเร็จ`, true);
      } catch (e) {
        onNotify(`JSON ผิดรูปแบบ: ${(e as Error).message}`, false);
      }
    };

    return (
      <div className="border-b border-slate-200/80 last:border-b-0 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex min-h-[42px] min-w-0 items-center gap-1.5 text-left text-sm font-medium text-slate-900 hover:text-teal-700 sm:min-h-[36px] dark:text-slate-100 dark:hover:text-teal-400"
          >
            {open ? (
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
            )}
            <span className="truncate font-mono">{label}</span>
            <span className="tabular-nums shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">
              {countTag}
            </span>
            {prot && (
              <span className="inline-flex shrink-0 items-center gap-1 text-xs text-amber-700 dark:text-amber-400">
                <Lock className="h-3 w-3" />
                <span>ป้องกัน</span>
              </span>
            )}
          </button>

          {open && !prot && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleJson}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-[34px] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>{jsonOpen ? 'ปิด JSON' : 'แก้เป็น JSON'}</span>
              </button>
              <select
                value={t}
                aria-label={`เปลี่ยนชนิดของ ${label}`}
                onChange={(e) => onSetAt(path, convertValue(value, e.target.value as ValueType))}
                className="min-h-[40px] rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-base text-slate-800 sm:min-h-[34px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ArmDeleteButton label="ลบทั้งกลุ่ม" onConfirm={() => onDeleteAt(path)} />
            </div>
          )}
        </div>

        {open && (
          <div className="mb-3 ml-1.5 space-y-3 border-l border-slate-200 pl-2.5 sm:ml-3 sm:pl-4 dark:border-slate-800">
            {!prot && (
              <AddChildBar
                parentObj={container}
                parentPath={path}
                onAddAt={onAddAt}
                onNotify={onNotify}
              />
            )}

            {jsonOpen && !prot && (
              <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                <textarea
                  value={jsonDraft}
                  onChange={(e) => setJsonDraft(e.target.value)}
                  rows={8}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2.5 font-mono text-xs text-slate-900 focus:border-teal-700 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setJsonOpen(false)}
                    className="min-h-[36px] rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={applyJson}
                    className="min-h-[36px] rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
                  >
                    ใช้ค่านี้
                  </button>
                </div>
              </div>
            )}

            <div>
              {shownKeys.map((k) => {
                const seg = Array.isArray(container) ? Number(k) : k;
                const childVal = (container as Record<string | number, unknown>)[seg];
                return (
                  <TreeNode
                    key={k}
                    label={k}
                    value={childVal}
                    path={[...path, seg]}
                    onSetAt={onSetAt}
                    onDeleteAt={onDeleteAt}
                    onAddAt={onAddAt}
                    onNotify={onNotify}
                  />
                );
              })}
              {keys.length > limit && (
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + 100)}
                  className="mt-2 min-h-[36px] rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  แสดงเพิ่ม ({keys.length - limit})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-center gap-2 border-b border-slate-200/80 py-2.5 last:border-b-0 md:grid-cols-12 dark:border-slate-800/80">
      <div className="flex items-center gap-2 md:col-span-5">
        <span className="truncate font-mono text-xs font-medium text-slate-800 dark:text-slate-200" title={label}>
          {label}
        </span>
        {prot && <Lock className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />}
      </div>

      <div className="flex flex-wrap items-center gap-2 md:col-span-7">
        {prot || t === 'null' ? (
          <input
            type="text"
            disabled
            value={prot ? JSON.stringify(value) : ''}
            placeholder={prot ? '' : 'null · เปลี่ยนชนิดด้านขวาเพื่อใส่ค่า'}
            title={
              prot
                ? 'ป้ายนี้เกมใช้ตัดสินสิทธิ์ขึ้นทำเนียบ/แข่งออนไลน์ จึงแก้ไม่ได้'
                : 'null'
            }
            className="min-h-[44px] min-w-0 w-full rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1.5 font-mono text-base text-slate-500 sm:min-h-[38px] sm:w-auto sm:min-w-[140px] sm:flex-1 sm:text-xs dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-500"
          />
        ) : t === 'bool' ? (
          <label className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center gap-2 text-xs text-slate-800 sm:min-h-[38px] dark:text-slate-200">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onSetAt(path, e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-700 sm:h-4 sm:w-4 dark:border-slate-600 dark:bg-slate-800"
            />
            <span className="font-mono">{Boolean(value) ? 'true' : 'false'}</span>
          </label>
        ) : t === 'number' ? (
          <input
            type="number"
            step="any"
            value={Number.isFinite(value as number) ? (value as number) : 0}
            onChange={(e) => {
              const n = parseFloat(e.target.value);
              if (Number.isFinite(n)) onSetAt(path, n);
            }}
            className="tabular-nums min-h-[44px] min-w-0 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:w-auto sm:min-w-[120px] sm:flex-1 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        ) : typeof value === 'string' && (value.length > 60 || value.includes('\n')) ? (
          <textarea
            value={value}
            rows={3}
            onChange={(e) => onSetAt(path, e.target.value)}
            className="min-w-0 w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:w-auto sm:min-w-[180px] sm:flex-1 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        ) : (
          <input
            type="text"
            value={String(value ?? '')}
            onChange={(e) => onSetAt(path, e.target.value)}
            className="min-h-[44px] min-w-0 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[38px] sm:w-auto sm:min-w-[140px] sm:flex-1 sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        )}

        {!prot && (
          <>
            <select
              value={t}
              aria-label={`ชนิดข้อมูลของ ${label}`}
              onChange={(e) => onSetAt(path, convertValue(value, e.target.value as ValueType))}
              className="min-h-[40px] flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-base text-slate-800 sm:min-h-[36px] sm:flex-none sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArmDeleteButton label="ลบ" onConfirm={() => onDeleteAt(path)} />
          </>
        )}
      </div>
    </div>
  );
}

export function JsonTreeTab({
  state,
  onSetAt,
  onDeleteAt,
  onAddAt,
  onNotify,
}: JsonTreeTabProps) {
  const [query, setQuery] = useState('');
  const [rootLimit, setRootLimit] = useState(100);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matches: Array<{ path: PathSegment[]; label: string }> = [];
    let seen = 0;

    function walk(v: unknown, p: PathSegment[]) {
      if (matches.length >= 150 || seen > 400000) return;
      if (v !== null && typeof v === 'object') {
        const isArr = Array.isArray(v);
        for (const k of Object.keys(v)) {
          walk(
            (v as Record<string | number, unknown>)[k],
            [...p, isArr ? Number(k) : k]
          );
          if (matches.length >= 150) return;
        }
        return;
      }
      seen++;
      const pathStr = p.join('.');
      if (pathStr.toLowerCase().includes(q) || String(v).toLowerCase().includes(q)) {
        matches.push({ path: p, label: pathStr });
      }
    }

    walk(state, []);
    return matches;
  }, [state, query]);

  const rootKeys = Object.keys(state);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              ต้นไม้ข้อมูลทั้งหมด ({rootKeys.length} คีย์หลัก)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ค้นหา แก้ค่า เปลี่ยนชนิดข้อมูล เพิ่มหรือลบคีย์ได้ทุกจุด ยกเว้นป้าย tampered ที่ถูกล็อก
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อคีย์หรือค่า เช่น money, wind, 144"
              className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[40px] sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
            />
          </div>
        </div>

        {!searchResults && (
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <AddChildBar
              parentObj={state}
              parentPath={[]}
              onAddAt={onAddAt}
              onNotify={onNotify}
            />
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 sm:px-5 dark:border-slate-800 dark:bg-[#121821]">
        {searchResults ? (
          searchResults.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              ไม่พบคีย์หรือค่าที่ตรงกับ “{query}”
            </p>
          ) : (
            <div>
              {searchResults.map((item) => (
                <TreeNode
                  key={item.label}
                  label={item.label}
                  value={getAtPath(state, item.path)}
                  path={item.path}
                  onSetAt={onSetAt}
                  onDeleteAt={onDeleteAt}
                  onAddAt={onAddAt}
                  onNotify={onNotify}
                />
              ))}
              {searchResults.length >= 150 && (
                <p className="py-3 text-xs text-slate-500 dark:text-slate-400">
                  แสดง 150 รายการแรก ลองค้นหาให้เจาะจงขึ้น
                </p>
              )}
            </div>
          )
        ) : (
          <div>
            {rootKeys.slice(0, rootLimit).map((k) => (
              <TreeNode
                key={k}
                label={k}
                value={state[k]}
                path={[k]}
                onSetAt={onSetAt}
                onDeleteAt={onDeleteAt}
                onAddAt={onAddAt}
                onNotify={onNotify}
              />
            ))}
            {rootKeys.length > rootLimit && (
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => setRootLimit((l) => l + 100)}
                  className="min-h-[38px] rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  แสดงเพิ่ม ({rootKeys.length - rootLimit})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
