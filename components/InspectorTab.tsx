'use client';

import { useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Copy,
  FolderOpen,
  RotateCcw,
  Search,
  Wrench,
} from 'lucide-react';
import { readSaveFile, unsealWox } from '@/lib/wox/codec';
import {
  PathSegment,
  SaveObject,
  diffSaveStates,
  isProtectedPath,
  lintSaveState,
} from '@/lib/wox/tables';

interface InspectorTabProps {
  originalState: SaveObject;
  state: SaveObject;
  edited: boolean;
  currentFileLabel: string;
  onResetAll: () => void;
  onRevertPath: (rawPath: PathSegment[]) => void;
  onReconcileStatSrc: () => void;
  onNotify: (msg: string, ok?: boolean) => void;
}

type DiffMode = 'session' | 'compare';
type KindFilter = 'all' | '+' | '-' | '~';

export function InspectorTab({
  originalState,
  state,
  edited,
  currentFileLabel,
  onResetAll,
  onRevertPath,
  onReconcileStatSrc,
  onNotify,
}: InspectorTabProps) {
  const compareInputRef = useRef<HTMLInputElement>(null);

  const [diffMode, setDiffMode] = useState<DiffMode>('session');
  const [kindFilter, setKindFilter] = useState<KindFilter>('all');
  const [pathQuery, setPathQuery] = useState('');

  const [compareState, setCompareState] = useState<SaveObject | null>(null);
  const [compareLabel, setCompareLabel] = useState<string>('');
  const [compareError, setCompareError] = useState<string | null>(null);
  const [reverseCompare, setReverseCompare] = useState(false);

  const lint = useMemo(() => lintSaveState(state), [state]);
  const sessionDiffs = useMemo(
    () => diffSaveStates(originalState, state),
    [originalState, state]
  );

  const compareDiffs = useMemo(() => {
    if (!compareState) return [];
    return reverseCompare
      ? diffSaveStates(compareState, state)
      : diffSaveStates(state, compareState);
  }, [compareState, state, reverseCompare]);

  const activeDiffs = diffMode === 'session' ? sessionDiffs : compareDiffs;

  const filteredDiffs = useMemo(() => {
    const q = pathQuery.trim().toLowerCase();
    return activeDiffs.filter((d) => {
      if (kindFilter !== 'all' && d.kind !== kindFilter) return false;
      if (!q) return true;
      return d.path.toLowerCase().includes(q) || d.detail.toLowerCase().includes(q);
    });
  }, [activeDiffs, kindFilter, pathQuery]);

  const handleSelectCompareFile = async (file: File) => {
    setCompareError(null);
    try {
      const { raw, wasGzip } = await readSaveFile(file);
      const text = raw.startsWith('WOX2') ? unsealWox(raw) : raw;
      const parsed = JSON.parse(text) as SaveObject;
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('ไฟล์ที่เลือกไม่ใช่ JSON object ของเซฟ');
      }
      setCompareState(parsed);
      setCompareLabel(`${file.name}${wasGzip ? ' (gzip)' : ''}`);
    } catch (err) {
      setCompareError((err as Error).message || 'เปิดไฟล์ที่ 2 ไม่สำเร็จ');
    }
  };

  const errors = lint.findings.filter((f) => f.level === 'error');
  const warnings = lint.findings.filter((f) => f.level === 'warn');

  const countPlus = activeDiffs.filter((d) => d.kind === '+').length;
  const countMinus = activeDiffs.filter((d) => d.kind === '-').length;
  const countEdit = activeDiffs.filter((d) => d.kind === '~').length;

  const hasStatSrcIssue = lint.findings.some((f) => f.message.includes('statSrc.'));

  const handleCopyReport = async () => {
    const lines = [
      `Way of Xian Save Studio — รายงานตรวจเซฟ (${currentFileLabel})`,
      `Lint: error ${errors.length}, warn ${warnings.length}`,
      ...lint.findings.map((f) => `[${f.level.toUpperCase()}] ${f.message}`),
      '',
      `Diff (${activeDiffs.length} จุด):`,
      ...activeDiffs.slice(0, 100).map((d) => `${d.kind} ${d.path}: ${d.detail}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      onNotify('คัดลอกรายงาน Lint & Diff ลงคลิปบอร์ดแล้ว', true);
    } catch {
      onNotify('ไม่สามารถคัดลอกรายงานได้', false);
    }
  };

  return (
    <div className="space-y-6">
      <input
        ref={compareInputRef}
        type="file"
        accept=".json,.wox,.txt"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleSelectCompareFile(f);
          e.target.value = '';
        }}
      />

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              ตรวจสอบความสมเหตุสมผลของเซฟ (Save Lint)
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              ตรวจตามตารางเกมและเกณฑ์ wox.js (พรสวรรค์ คู่ขัดกัน ราก ธาตุ กำเนิด statSrc+fx capSeen equip/bag slots/techs และเพดานเงิน)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasStatSrcIssue && (
              <button
                type="button"
                onClick={onReconcileStatSrc}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-700 whitespace-nowrap"
              >
                <Wrench className="h-3.5 w-3.5" />
                <span>ซ่อม statSrc + fx</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>คัดลอกรายงาน</span>
            </button>
            <div className="tabular-nums font-mono text-xs font-medium text-slate-700 dark:text-slate-300">
              error {errors.length} · warn {warnings.length}
            </div>
          </div>
        </div>

        {lint.findings.length === 0 ? (
          <div className="mt-4 flex items-center gap-2.5 text-sm font-medium text-teal-700 dark:text-teal-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>ไม่พบปัญหาโครงสร้างหรือความขัดแย้งของข้อมูล</span>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
            {lint.findings.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2.5 py-2.5 text-sm">
                {f.level === 'error' ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                )}
                <span
                  className={
                    f.level === 'error'
                      ? 'text-red-800 dark:text-red-300'
                      : 'text-amber-800 dark:text-amber-300'
                  }
                >
                  {f.level === 'error' ? '[Error] ' : '[Warn] '}
                  {f.message}
                </span>
              </li>
            ))}
          </ul>
        )}

        {lint.skipped.length > 0 && (
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            ฟิลด์ที่ไม่มีในเซฟนี้ (ข้ามการตรวจ):{' '}
            <span className="font-mono">{lint.skipped.join(', ')}</span>
          </p>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              เปรียบเทียบข้อมูล (Save Diff)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {diffMode === 'session'
                ? edited
                  ? 'แสดงทุกจุดที่แก้จากต้นฉบับ สามารถย้อนคืนเฉพาะจุดที่ต้องการได้'
                  : 'ยังไม่มีการแก้ไข หากกดบันทึกจะได้ไฟล์เดิมตรงทุกตัวอักษร'
                : 'เทียบไฟล์เซฟปัจจุบันกับไฟล์เซฟอีกไฟล์หนึ่ง (รองรับทั้ง WOX2 และ JSON)'}
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 sm:flex sm:w-auto dark:bg-slate-800/80">
            <button
              type="button"
              onClick={() => setDiffMode('session')}
              className={`min-h-[40px] truncate rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:min-h-[34px] sm:px-3 whitespace-nowrap ${
                diffMode === 'session'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              เทียบการแก้ไข ({sessionDiffs.length})
            </button>
            <button
              type="button"
              onClick={() => setDiffMode('compare')}
              className={`min-h-[40px] truncate rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:min-h-[34px] sm:px-3 whitespace-nowrap ${
                diffMode === 'compare'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              เทียบกับไฟล์อื่น
            </button>
          </div>
        </div>

        {diffMode === 'compare' && (
          <div className="mt-4 space-y-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                {compareState ? (
                  <span>
                    กำลังเทียบ:{' '}
                    <strong className="font-mono text-slate-900 dark:text-slate-100">
                      {reverseCompare ? compareLabel : currentFileLabel}
                    </strong>{' '}
                    →{' '}
                    <strong className="font-mono text-slate-900 dark:text-slate-100">
                      {reverseCompare ? currentFileLabel : compareLabel}
                    </strong>
                  </span>
                ) : (
                  <span>เลือกไฟล์เซฟที่ 2 เพื่อเทียบความเปลี่ยนแปลงกับไฟล์ปัจจุบัน</span>
                )}
              </div>

              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                {compareState && (
                  <button
                    type="button"
                    onClick={() => setReverseCompare((r) => !r)}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:min-h-[38px] sm:flex-none dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <ArrowLeftRight className="h-3.5 w-3.5" />
                    <span>สลับทิศทาง</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => compareInputRef.current?.click()}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 sm:min-h-[38px] sm:flex-none dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white whitespace-nowrap shrink-0"
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  <span>{compareState ? 'เปลี่ยนไฟล์เทียบ' : 'เลือกไฟล์เซฟที่ 2'}</span>
                </button>
              </div>
            </div>

            {compareError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>{compareError}</span>
              </div>
            )}
          </div>
        )}

        {(diffMode === 'session' || compareState) && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative w-full sm:w-48">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={pathQuery}
                  onChange={(e) => setPathQuery(e.target.value)}
                  placeholder="กรองชื่อคีย์หรือค่า..."
                  className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 pr-2.5 pl-8 text-base text-slate-900 focus:border-teal-700 focus:outline-none sm:min-h-[36px] sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid w-full grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 sm:flex sm:w-auto dark:bg-slate-800/80">
                {(
                  [
                    ['all', `ทั้งหมด ${activeDiffs.length}`],
                    ['+', `+${countPlus}`],
                    ['-', `−${countMinus}`],
                    ['~', `~${countEdit}`],
                  ] as const
                ).map(([k, lb]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKindFilter(k)}
                    className={`tabular-nums min-h-[36px] truncate rounded-md px-1.5 py-1 text-xs font-medium transition-colors sm:min-h-[28px] sm:px-2 whitespace-nowrap ${
                      kindFilter === k
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {lb}
                  </button>
                ))}
              </div>
            </div>

            {diffMode === 'session' && edited && (
              <button
                type="button"
                onClick={onResetAll}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[36px] sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>ย้อนกลับทั้งหมด</span>
              </button>
            )}
          </div>
        )}

        {diffMode === 'compare' && !compareState ? (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            ยังไม่ได้เลือกไฟล์เซฟที่ 2
          </p>
        ) : filteredDiffs.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {activeDiffs.length === 0
              ? 'ไม่พบจุดที่แตกต่าง (เหมือนกันทุกประการ)'
              : 'ไม่พบรายการที่ตรงกับตัวกรอง'}
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-200 font-mono text-xs dark:divide-slate-800">
            {filteredDiffs.slice(0, 200).map((d, i) => {
              const canRevert =
                diffMode === 'session' &&
                d.rawPath.length > 0 &&
                !isProtectedPath(d.rawPath);

              return (
                <div
                  key={`${d.path}-${i}`}
                  className="grid grid-cols-1 items-center gap-2 py-2.5 md:grid-cols-12 md:gap-3"
                >
                  <div className="flex items-center gap-2 md:col-span-4">
                    <span
                      className={`shrink-0 font-semibold ${
                        d.kind === '+'
                          ? 'text-teal-700 dark:text-teal-400'
                          : d.kind === '-'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {d.kind === '+' ? '+ เพิ่ม' : d.kind === '-' ? '− ลบ' : '~ แก้'}
                    </span>
                    <span className="truncate text-slate-900 dark:text-slate-100" title={d.path}>
                      {d.path}
                    </span>
                  </div>

                  <div
                    className={`break-all text-slate-600 dark:text-slate-400 ${
                      canRevert ? 'md:col-span-6' : 'md:col-span-8'
                    }`}
                  >
                    {d.detail}
                  </div>

                  {canRevert && (
                    <div className="flex justify-end md:col-span-2">
                      <button
                        type="button"
                        onClick={() => onRevertPath(d.rawPath)}
                        className="inline-flex min-h-[40px] w-full items-center justify-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 font-sans text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[32px] sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>ย้อนคืนค่านี้</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredDiffs.length > 200 && (
              <p className="pt-3 text-slate-500 dark:text-slate-400">
                แสดง 200 จากทั้งหมด {filteredDiffs.length} รายการ (พิมพ์ค้นหาเพื่อดูรายการเฉพาะเจาะจง)
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
