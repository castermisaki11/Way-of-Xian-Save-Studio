'use client';

import { useRef, useState } from 'react';
import {
  AlertTriangle,
  FileCode2,
  FolderOpen,
  History,
  Lock,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';

export interface DraftPreviewMeta {
  label: string;
  savedAt: number;
  charName: string;
}

interface SaveUploaderProps {
  onFileSelect: (file: File) => void;
  onPasteRaw: (raw: string, label: string) => void;
  onLoadSandbox: () => void;
  draftMeta?: DraftPreviewMeta | null;
  onRestoreDraft?: () => void;
  onDiscardDraft?: () => void;
  errorMsg: string | null;
  isBusy: boolean;
}

export function SaveUploader({
  onFileSelect,
  onPasteRaw,
  onLoadSandbox,
  draftMeta,
  onRestoreDraft,
  onDiscardDraft,
  errorMsg,
  isBusy,
}: SaveUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState('');

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handlePasteSubmit = () => {
    const trimmed = pasteText.trim();
    if (!trimmed) return;
    onPasteRaw(trimmed, 'pasted-save');
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col justify-between gap-5 lg:col-span-7 lg:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs font-medium tracking-wide text-teal-700 dark:text-teal-400">
              Way of Xian · WOX2 Save Studio
            </p>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
              เปิด แก้ไข และตรวจสอบไฟล์เซฟเกมอย่างแม่นยำในเครื่องคุณ
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              ถอดรหัสและผนึกกลับด้วยอัลกอริทึม WOX2 ตรงตามต้นฉบับเกม 100% รองรับไฟล์{' '}
              <span className="font-mono text-sm text-slate-800 dark:text-slate-200">.wox</span>{' '}
              (รวมถึง gzip),{' '}
              <span className="font-mono text-sm text-slate-800 dark:text-slate-200">.json</span>{' '}
              และ{' '}
              <span className="font-mono text-sm text-slate-800 dark:text-slate-200">.txt</span>{' '}
              ไม่มีการอัปโหลดหรือส่งข้อมูลออกนอกเบราว์เซอร์
            </p>
          </div>

          {draftMeta && onRestoreDraft && onDiscardDraft && (
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4 sm:flex-row sm:items-center dark:border-teal-900/60 dark:bg-teal-950/30">
              <div className="flex items-start gap-2.5">
                <History className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" />
                <div className="text-xs">
                  <p className="font-semibold text-teal-900 dark:text-teal-200">
                    พบงานแก้ไขที่บันทึกอัตโนมัติค้างไว้: {draftMeta.charName}
                  </p>
                  <p className="mt-0.5 text-teal-800/80 dark:text-teal-300/80">
                    {draftMeta.label} · {new Date(draftMeta.savedAt).toLocaleString('th-TH')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onRestoreDraft}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 sm:flex-none dark:bg-teal-500 dark:text-slate-950 whitespace-nowrap"
                >
                  กู้คืนงานค้าง
                </button>
                <button
                  type="button"
                  onClick={onDiscardDraft}
                  aria-label="ลบ Draft"
                  className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-teal-700/20 px-2.5 py-1.5 text-xs font-medium text-teal-900 hover:bg-teal-100 dark:border-teal-500/30 dark:text-teal-200 dark:hover:bg-teal-900/50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`rounded-xl border p-4 transition-colors sm:p-6 ${
              dragging
                ? 'border-teal-700 bg-teal-50/60 dark:border-teal-400 dark:bg-teal-950/30'
                : 'border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-[#121821]'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".json,.wox,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelect(file);
                e.target.value = '';
              }}
            />

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-teal-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-teal-400">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ลากไฟล์เซฟมาวางที่นี่ หรือกดเลือกจากเครื่อง
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    รองรับ WOX2 sealed (.wox / .json / .txt) · คลาย gzip ให้อัตโนมัติ
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50 sm:w-auto dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 dark:focus-visible:ring-teal-400 whitespace-nowrap shrink-0"
              >
                <FolderOpen className="h-4 w-4" />
                <span>{isBusy ? 'กำลังอ่านไฟล์...' : 'เลือกไฟล์เซฟ'}</span>
              </button>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-2.5 border-t border-slate-200 pt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowPaste((v) => !v)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:min-h-[40px] sm:w-auto dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                <FileCode2 className="h-3.5 w-3.5" />
                <span>{showPaste ? 'ซ่อนช่องวางข้อความ' : 'วางข้อความ WOX2 โดยตรง'}</span>
              </button>

              <button
                type="button"
                onClick={onLoadSandbox}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-transparent px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:min-h-[40px] sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                <Sparkles className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
                <span>ทดลองเปิดเซฟตัวอย่าง (Sandbox)</span>
              </button>
            </div>

            {showPaste && (
              <div className="mt-4 space-y-2.5">
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  rows={4}
                  placeholder="วางข้อความเซฟที่ขึ้นต้นด้วย WOX2... ที่นี่"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none sm:text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!pasteText.trim()}
                    onClick={handlePasteSubmit}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-40 sm:min-h-[40px] sm:w-auto dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white whitespace-nowrap shrink-0"
                  >
                    ถอดรหัสข้อความนี้
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside
          id="spec"
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 sm:p-6 lg:col-span-5 dark:border-slate-800 dark:bg-[#121821]"
        >
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              สถาปัตยกรรมและความปลอดภัยของข้อมูล
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              ทำงานตรงกับโครงสร้าง bundle ของเกม Way of Xian (WOX2)
            </p>

            <dl className="mt-5 divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-slate-600 dark:text-slate-400">รูปแบบผนึกไฟล์</dt>
                <dd className="break-all font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                  WOX2&lt;16-hex&gt;~payload
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-slate-600 dark:text-slate-400">ตารางพรสวรรค์ / คู่ขัดกัน</dt>
                <dd className="tabular-nums font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                  76 รายการ · 41 คู่
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-slate-600 dark:text-slate-400">กำเนิด &amp; ดวงชะตา</dt>
                <dd className="tabular-nums font-mono text-xs font-medium text-slate-900 dark:text-slate-100">
                  12 ตระกูล · 7 ราก · 6 ดวง
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-slate-600 dark:text-slate-400">การคำนวณค่าสถานะ</dt>
                <dd className="text-xs font-medium text-slate-900 sm:text-right dark:text-slate-100">
                  ซิงก์ statSrc / capSeen / yearFrom
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-slate-600 dark:text-slate-400">การประมวลผล</dt>
                <dd className="text-xs font-medium text-teal-700 sm:text-right dark:text-teal-400">
                  Local 100% (ไม่ส่งข้อมูลออกเน็ต)
                </dd>
              </div>
            </dl>
          </div>

          <div
            id="safety"
            className="mt-6 space-y-2.5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400"
          >
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-200">
              <Lock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>ข้อกำหนดป้ายชีวิตที่ถูกแก้ไข (tampered)</span>
            </div>
            <p>
              เมื่อบันทึกไฟล์ที่มีการเปลี่ยนแปลง ระบบจะบันทึกป้าย{' '}
              <span className="font-mono text-slate-800 dark:text-slate-200">
                tampered: {'{ why: "hand" }'}
              </span>{' '}
              และอัปเดต{' '}
              <span className="font-mono text-slate-800 dark:text-slate-200">savedAt</span>{' '}
              ตามกติกาเกม เล่นเดี่ยวได้ตามปกติ แต่จะไม่ขึ้นทำเนียบหรือแข่งออนไลน์
            </p>
            <div className="flex items-center gap-2 pt-1 font-medium text-slate-700 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
              <span>แนะนำให้สำรองไฟล์ต้นฉบับไว้ก่อนนำไฟล์ที่แก้ไปใช้งานเสมอ</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
