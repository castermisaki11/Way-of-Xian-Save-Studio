'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  Archive,
  Backpack,
  BookOpen,
  Braces,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Compass,
  Copy,
  Download,
  FileJson,
  FolderOpen,
  LayoutGrid,
  Lock,
  Redo2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Undo2,
  Users,
  X,
} from 'lucide-react';
import { compressGzip, readSaveFile, sealWox, unsealWox } from '@/lib/wox/codec';
import {
  ILL_MAX,
  PathSegment,
  QUICK_FIELDS,
  STAT_KEYS,
  SaveObject,
  StatKey,
  TAL,
  TAL_MAP,
  applyTalentFx,
  cloneState,
  countTalentsByKind,
  createSandboxSave,
  diffSaveStates,
  getAtPath,
  getGoodTalentMax,
  isConflict,
  isProtectedPath,
  isSlotsEnabled,
  lintSaveState,
  reconcileStatSources,
  revertAtPath,
  setAtPath,
  setStatInState,
} from '@/lib/wox/tables';
import { REALMS } from '@/lib/wox/catalog';
import { ThemeToggle } from './ThemeToggle';
import { DraftPreviewMeta, SaveUploader } from './SaveUploader';
import { QuickEditTab } from './QuickEditTab';
import { OriginDestinyTab } from './OriginDestinyTab';
import { TalentsTab } from './TalentsTab';
import { BagEquipTab } from './BagEquipTab';
import { SkillsArtsTab } from './SkillsArtsTab';
import { SectWorldTab } from './SectWorldTab';
import { JsonTreeTab } from './JsonTreeTab';
import { InspectorTab } from './InspectorTab';
import { PWAInstallButton } from './PWAInstallButton';

type WorkspaceTab =
  | 'quick'
  | 'origin'
  | 'talents'
  | 'bag'
  | 'skills'
  | 'world'
  | 'tree'
  | 'inspect';

interface Notice {
  text: string;
  ok: boolean;
}

interface StoredDraft {
  state: SaveObject;
  originalState: SaveObject;
  originalRaw: string | null;
  baseName: string;
  currentFileLabel: string;
  isSandbox: boolean;
  savedAt: number;
}

const DRAFT_STORAGE_KEY = 'wox_studio_draft_v1';
let cachedDraftRaw: string | null = null;
let cachedDraftMeta: DraftPreviewMeta | null = null;

function getDraftSnapshot(): DraftPreviewMeta | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (raw === cachedDraftRaw) return cachedDraftMeta;
    cachedDraftRaw = raw;
    if (!raw) {
      cachedDraftMeta = null;
      return null;
    }
    const parsed = JSON.parse(raw) as StoredDraft;
    const th = String((parsed?.state?.name as Record<string, unknown> | undefined)?.th || 'ไม่ทราบชื่อ');
    cachedDraftMeta = {
      label: parsed.currentFileLabel || parsed.baseName || 'draft',
      savedAt: Number(parsed.savedAt) || Date.now(),
      charName: th,
    };
    return cachedDraftMeta;
  } catch {
    return null;
  }
}

function subscribeDraft(cb: () => void): () => void {
  window.addEventListener('wox-draft-change', cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener('wox-draft-change', cb);
    window.removeEventListener('storage', cb);
  };
}

const MAX_HISTORY = 60;

export function SaveEditorWorkspace() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<SaveObject | null>(null);
  const [originalState, setOriginalState] = useState<SaveObject | null>(null);
  const [originalRaw, setOriginalRaw] = useState<string | null>(null);
  const [past, setPast] = useState<SaveObject[]>([]);
  const [future, setFuture] = useState<SaveObject[]>([]);

  const [baseName, setBaseName] = useState('save');
  const [currentFileLabel, setCurrentFileLabel] = useState('save');
  const [fileInfo, setFileInfo] = useState<string>('');
  const [isSandbox, setIsSandbox] = useState(false);

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('quick');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [fallbackExport, setFallbackExport] = useState<string | null>(null);

  const draftMeta = useSyncExternalStore(subscribeDraft, getDraftSnapshot, () => null);

  const edited = useMemo(() => {
    if (!state || !originalState) return false;
    return diffSaveStates(originalState, state).length > 0;
  }, [originalState, state]);

  useEffect(() => {
    if (!state || !originalState) return;
    try {
      const payload: StoredDraft = {
        state,
        originalState,
        originalRaw,
        baseName,
        currentFileLabel,
        isSandbox,
        savedAt: Date.now(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota / private browsing errors
    }
  }, [state, originalState, originalRaw, baseName, currentFileLabel, isSandbox]);

  const notify = (text: string, ok = true) => {
    setNotice({ text, ok });
  };

  const handleRestoreDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw) as StoredDraft;
      if (!d?.state || !d?.originalState) return;
      setState(d.state);
      setOriginalState(d.originalState);
      setOriginalRaw(d.originalRaw ?? null);
      setPast([]);
      setFuture([]);
      setBaseName(d.baseName || 'save');
      setCurrentFileLabel(d.currentFileLabel || 'draft');
      setIsSandbox(Boolean(d.isSandbox));
      setLoadError(null);
      setFallbackExport(null);
      setActiveTab('quick');
      setFileInfo(`${d.currentFileLabel || 'draft'} · กู้คืนจาก Draft`);
      notify('กู้คืนงานแก้ไขที่ค้างไว้เรียบร้อยแล้ว', true);
    } catch {
      notify('ไม่สามารถกู้คืน Draft ได้ (ข้อมูลเสียหาย)', false);
    }
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      window.dispatchEvent(new Event('wox-draft-change'));
    } catch {
      // Ignore
    }
  };

  const openFromRaw = (raw: string, nameBase: string, label: string, sandbox = false) => {
    const text = unsealWox(raw);
    const parsed = JSON.parse(text) as SaveObject;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('โครงสร้างเซฟไม่ถูกต้อง (ต้องเป็น JSON object)');
    }
    const exactMatch = sealWox(JSON.stringify(parsed)) === raw;
    setState(parsed);
    setOriginalState(cloneState(parsed));
    setOriginalRaw(raw);
    setPast([]);
    setFuture([]);
    setBaseName(nameBase);
    setCurrentFileLabel(label);
    setIsSandbox(sandbox);
    setLoadError(null);
    setFallbackExport(null);
    setActiveTab('quick');
    setFileInfo(
      `${label} · ${Object.keys(parsed).length} คีย์` +
        (exactMatch ? ' · ตราตรวจสอบถูกต้อง' : ' · ถอดรหัสสำเร็จ')
    );
    setNotice(null);
  };

  const handleFileSelect = async (file: File) => {
    setIsBusy(true);
    setLoadError(null);
    try {
      const { raw, wasGzip } = await readSaveFile(file);
      const nameBase = file.name.replace(/\.[^.]+$/, '') || 'save';
      openFromRaw(raw, nameBase, `${file.name}${wasGzip ? ' (gzip)' : ''}`, false);
    } catch (err) {
      setLoadError((err as Error).message || 'เปิดไฟล์ไม่สำเร็จ');
    } finally {
      setIsBusy(false);
    }
  };

  const handlePasteRaw = (raw: string, label: string) => {
    setLoadError(null);
    try {
      openFromRaw(raw, label, 'ข้อความที่วาง', false);
    } catch (err) {
      setLoadError((err as Error).message || 'ถอดรหัสข้อความไม่สำเร็จ');
    }
  };

  const handleLoadSandbox = () => {
    setLoadError(null);
    const sample = createSandboxSave();
    const sealed = sealWox(JSON.stringify(sample));
    openFromRaw(sealed, 'sandbox-save', 'เซฟตัวอย่าง (Sandbox)', true);
    notify('เปิดเซฟตัวอย่างแล้ว คุณสามารถทดลองแก้ไข ตรวจสอบ และส่งออกได้ตามปกติ', true);
  };

  const mutateState = useCallback(
    (mutator: (draft: SaveObject) => void) => {
      if (!state) return;
      const snapshot = cloneState(state);
      const next = cloneState(state);
      mutator(next);
      setPast((prev) => [...prev.slice(-(MAX_HISTORY - 1)), snapshot]);
      setFuture([]);
      setState(next);
      setNotice({ text: 'มีการแก้ไขที่ยังไม่บันทึก', ok: false });
    },
    [state]
  );

  const handleMutateWithMessage = (mutator: (draft: SaveObject) => void, msg?: string) => {
    mutateState(mutator);
    if (msg) notify(msg, true);
  };

  const handleUndo = useCallback(() => {
    if (!state || past.length === 0) return;
    const prevSnapshot = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [cloneState(state), ...f.slice(0, MAX_HISTORY - 1)]);
    setState(prevSnapshot);
    setNotice({ text: 'เลิกทำการแก้ไขล่าสุดแล้ว (Undo)', ok: true });
  }, [past, state]);

  const handleRedo = useCallback(() => {
    if (!state || future.length === 0) return;
    const nextSnapshot = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p.slice(-(MAX_HISTORY - 1)), cloneState(state)]);
    setState(nextSnapshot);
    setNotice({ text: 'ทำซ้ำการแก้ไขแล้ว (Redo)', ok: true });
  }, [future, state]);

  useEffect(() => {
    if (!state) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) {
        return;
      }
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey)) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state, handleUndo, handleRedo]);

  const handleSetAt = (path: PathSegment[], value: unknown) => {
    if (isProtectedPath(path)) return;
    mutateState((draft) => {
      setAtPath(draft, path, value);
    });
  };

  const handleSetStat = (stat: StatKey, value: number) => {
    mutateState((draft) => {
      setStatInState(draft, stat, value);
    });
  };

  const handleMaxAllStats = () => {
    mutateState((draft) => {
      const cap = (draft.capSeen as Record<string, number> | undefined) ?? {};
      const stats = draft.stats as Record<string, unknown> | undefined;
      for (const n of STAT_KEYS) {
        if (stats && n in stats && cap[n] != null) {
          setStatInState(draft, n, cap[n]);
        }
      }
    });
    notify('ปรับค่าสถานะทั้ง 5 เป็นค่าสูงสุดตาม capSeen แล้ว', true);
  };

  const handleMaxEverything = () => {
    mutateState((draft) => {
      const cap = (draft.capSeen as Record<string, number> | undefined) ?? {};
      const stats = draft.stats as Record<string, unknown> | undefined;
      for (const n of STAT_KEYS) {
        if (stats && n in stats && cap[n] != null) {
          setStatInState(draft, n, cap[n]);
        }
      }
      for (const f of QUICK_FIELDS) {
        if (f.max != null && typeof getAtPath(draft, f.path) === 'number') {
          setAtPath(draft, f.path, f.max);
        }
      }
    });
    notify('ปรับค่าสถานะและค่าที่รองรับทั้งหมดเป็นค่าสูงสุดแล้ว', true);
  };

  const handleReconcileStatSrc = () => {
    let fixedCount = 0;
    mutateState((draft) => {
      fixedCount = reconcileStatSources(draft);
    });
    notify(
      fixedCount > 0
        ? `ซิงก์ statSrc + fx พรสวรรค์ครบ ${fixedCount} ค่าสถานะแล้ว`
        : 'statSrc ทั้ง 5 ค่าตรงกับพรสวรรค์และ stats อยู่แล้ว',
      true
    );
  };

  const handleAddTalent = (rawInput: string) => {
    if (!state || !Array.isArray(state.talents)) return;
    const trimmed = rawInput.trim();
    const lo = trimmed.toLowerCase();
    const t =
      TAL_MAP.get(trimmed) ||
      TAL.find(
        (x) =>
          x.id.toLowerCase() === lo ||
          x.th === trimmed ||
          x.en.toLowerCase() === lo
      );

    if (!t) {
      notify(`ไม่พบ “${trimmed}” ในตารางพรสวรรค์ของเกม`, false);
      return;
    }

    const current = state.talents as string[];
    if (current.includes(t.id)) {
      notify(`มี「${t.th}」อยู่แล้ว`, false);
      return;
    }

    const clash = current.filter((o) => isConflict(t.id, o));
    if (!t.good && clash.some((o) => TAL_MAP.get(o)?.good)) {
      notify(
        `「${t.th}」ขัดกับพรสวรรค์ดี「${clash.map((o) => TAL_MAP.get(o)?.th || o).join('、')}」ที่มีอยู่ ลบตัวนั้นก่อนถ้าต้องการเพิ่ม`,
        false
      );
      return;
    }

    if (isSlotsEnabled(state) && !t.crossing) {
      const gm = getGoodTalentMax(state);
      if (t.good && countTalentsByKind(state, true, clash) >= gm) {
        notify(
          `ช่องพรสวรรค์ดีเต็มแล้ว (${gm}/${gm}) ลบตัวเดิมก่อน หรือเพิ่ม talentSlotsUp (สูงสุด 8) ในแท็บข้อมูลทั้งหมด`,
          false
        );
        return;
      }
      if (!t.good && countTalentsByKind(state, false, clash) >= ILL_MAX) {
        notify(`พรสวรรค์ร้ายเต็ม ${ILL_MAX} แล้ว ลบตัวเดิมก่อน`, false);
        return;
      }
    }

    mutateState((draft) => {
      const list = draft.talents as string[];
      for (const o of clash) {
        const ot = TAL_MAP.get(o);
        if (ot) applyTalentFx(draft, ot, -1);
        const idx = list.indexOf(o);
        if (idx >= 0) list.splice(idx, 1);
      }
      list.push(t.id);
      applyTalentFx(draft, t, 1);
    });

    const fxNote = Object.keys(t.fx).length
      ? ' · ปรับค่าสถานะตาม fx และ statSrc.*.talent ให้แล้ว'
      : '';
    const clashNote = clash.length
      ? ` · ถอด「${clash.map((o) => TAL_MAP.get(o)?.th || o).join('、')}」ที่ขัดกันออก`
      : '';
    notify(`เพิ่ม「${t.th}」แล้ว${fxNote}${clashNote}`, true);
  };

  const handleRemoveTalent = (index: number) => {
    if (!state || !Array.isArray(state.talents)) return;
    const id = (state.talents as string[])[index];
    const t = TAL_MAP.get(id);

    mutateState((draft) => {
      const list = draft.talents as string[];
      if (t) applyTalentFx(draft, t, -1);
      list.splice(index, 1);
    });

    notify(
      `ลบ「${t ? t.th : id}」แล้ว` +
        (t && Object.keys(t.fx).length
          ? ' · คืนค่าสถานะตาม fx ให้แล้ว'
          : t
          ? ''
          : ' · รหัสนี้ไม่อยู่ในตาราง จึงไม่มี fx ให้คืน'),
      true
    );
  };

  const handleSetBagCount = (itemId: string, count: number) => {
    mutateState((draft) => {
      if (!draft.bag || typeof draft.bag !== 'object' || Array.isArray(draft.bag)) {
        draft.bag = {};
      }
      const bag = draft.bag as Record<string, number>;
      if (count <= 0) {
        delete bag[itemId];
        if (draft.equip && typeof draft.equip === 'object') {
          const eq = draft.equip as Record<string, string | null>;
          for (const slot of Object.keys(eq)) {
            if (eq[slot] === itemId) eq[slot] = null;
          }
        }
      } else {
        bag[itemId] = count;
      }
    });
  };

  const handleEquipItem = (slot: string, itemId: string | null) => {
    mutateState((draft) => {
      if (!draft.equip || typeof draft.equip !== 'object' || Array.isArray(draft.equip)) {
        draft.equip = {};
      }
      const eq = draft.equip as Record<string, string | null>;
      if (itemId === null) {
        delete eq[slot];
      } else {
        eq[slot] = itemId;
        if (!draft.bag || typeof draft.bag !== 'object') draft.bag = {};
        const bag = draft.bag as Record<string, number>;
        if (!bag[itemId] || bag[itemId] <= 0) bag[itemId] = 1;
      }
    });
  };

  const handleSetTechXp = (skillId: string, xp: number) => {
    mutateState((draft) => {
      if (!draft.techs || typeof draft.techs !== 'object' || Array.isArray(draft.techs)) {
        draft.techs = {};
      }
      (draft.techs as Record<string, number>)[skillId] = xp;
    });
  };

  const handleRemoveTech = (skillId: string) => {
    mutateState((draft) => {
      if (draft.techs && typeof draft.techs === 'object' && !Array.isArray(draft.techs)) {
        delete (draft.techs as Record<string, number>)[skillId];
      }
      if (draft.slots && typeof draft.slots === 'object') {
        const sl = draft.slots as Record<string, unknown>;
        if (sl.main === skillId) sl.main = null;
        if (sl.movement === skillId) sl.movement = null;
        if (sl.defense === skillId) sl.defense = null;
        if (Array.isArray(sl.combat)) sl.combat = sl.combat.filter((x) => x !== skillId);
        if (Array.isArray(sl.support)) sl.support = sl.support.filter((x) => x !== skillId);
      }
    });
  };

  const handleSetSlot = (kind: string, skillId: string, active: boolean) => {
    mutateState((draft) => {
      if (!draft.slots || typeof draft.slots !== 'object' || Array.isArray(draft.slots)) {
        draft.slots = { main: null, combat: [], movement: null, defense: null, support: [] };
      }
      const sl = draft.slots as Record<string, unknown>;
      if (kind === 'main' || kind === 'movement' || kind === 'defense') {
        sl[kind] = active ? skillId : null;
      } else {
        const cur = Array.isArray(sl[kind]) ? ([...(sl[kind] as string[])]) : [];
        if (active) {
          if (!cur.includes(skillId)) cur.push(skillId);
        } else {
          const idx = cur.indexOf(skillId);
          if (idx >= 0) cur.splice(idx, 1);
        }
        sl[kind] = cur;
      }
    });
  };

  const handleBatchBoostBag = (delta: number) => {
    mutateState((draft) => {
      if (!draft.bag || typeof draft.bag !== 'object' || Array.isArray(draft.bag)) return;
      const bag = draft.bag as Record<string, number>;
      for (const k of Object.keys(bag)) {
        if (typeof bag[k] === 'number' && bag[k] > 0) {
          bag[k] += delta;
        }
      }
    });
    notify(`เพิ่มจำนวนไอเทมที่มีอยู่ในกระเป๋าทุกรายการ +${delta} แล้ว`, true);
  };

  const handleBatchAddItems = (itemIds: string[], amount: number) => {
    if (!itemIds.length) return;
    mutateState((draft) => {
      if (!draft.bag || typeof draft.bag !== 'object' || Array.isArray(draft.bag)) {
        draft.bag = {};
      }
      const bag = draft.bag as Record<string, number>;
      for (const id of itemIds) {
        bag[id] = (bag[id] || 0) + amount;
      }
    });
    notify(`เติมไอเทม ${itemIds.length} รายการ (×${amount}) ลงกระเป๋าแล้ว`, true);
  };

  const handleMaxAllTechs = () => {
    mutateState((draft) => {
      if (!draft.techs || typeof draft.techs !== 'object' || Array.isArray(draft.techs)) return;
      const techs = draft.techs as Record<string, number>;
      for (const k of Object.keys(techs)) {
        techs[k] = 28000;
      }
    });
    notify('ปรับ XP วิชาที่เรียนทั้งหมดเป็น 28,000 (ระดับสูงสุด) แล้ว', true);
  };

  const handleBatchLearnTechs = (skillIds: string[], xp: number) => {
    if (!skillIds.length) return;
    mutateState((draft) => {
      if (!draft.techs || typeof draft.techs !== 'object' || Array.isArray(draft.techs)) {
        draft.techs = {};
      }
      const techs = draft.techs as Record<string, number>;
      for (const id of skillIds) {
        techs[id] = Math.max(Number(techs[id]) || 0, xp);
      }
    });
    notify(`เพิ่มวิชา ${skillIds.length} รายการ (${xp.toLocaleString()} XP) แล้ว`, true);
  };

  const handleDeleteAt = (path: PathSegment[]) => {
    if (isProtectedPath(path) || !path.length) return;
    mutateState((draft) => {
      const parentPath = path.slice(0, -1);
      const key = path[path.length - 1];
      const parent = parentPath.length ? getAtPath(draft, parentPath) : draft;
      if (Array.isArray(parent) && typeof key === 'number') {
        parent.splice(key, 1);
      } else if (parent && typeof parent === 'object') {
        delete (parent as Record<string, unknown>)[String(key)];
      }
    });
  };

  const handleAddAt = (parentPath: PathSegment[], keyName: string | null, value: unknown) => {
    if (!parentPath.length && keyName === 'tampered') {
      notify('คีย์ tampered เพิ่มหรือแก้ไม่ได้', false);
      return;
    }
    mutateState((draft) => {
      const target = parentPath.length ? getAtPath(draft, parentPath) : draft;
      if (Array.isArray(target)) {
        target.push(value);
      } else if (target && typeof target === 'object' && keyName) {
        (target as Record<string, unknown>)[keyName] = value;
      }
    });
  };

  const handleRevertPath = (rawPath: PathSegment[]) => {
    if (!originalState || !rawPath.length || isProtectedPath(rawPath)) return;
    mutateState((draft) => {
      revertAtPath(draft, originalState, rawPath);
    });
    notify(`ย้อนคืนค่า ${rawPath.join('.')} กลับเป็นต้นฉบับแล้ว`, true);
  };

  const handleResetAll = () => {
    if (!originalState || !state) return;
    setPast((p) => [...p.slice(-(MAX_HISTORY - 1)), cloneState(state)]);
    setFuture([]);
    setState(cloneState(originalState));
    notify('ย้อนข้อมูลทั้งหมดกลับเป็นค่าตอนเปิดไฟล์แล้ว', true);
  };

  const prepareSealedOutput = () => {
    if (!state) return null;
    let out: string;
    let plainText: string;
    let hasTampered = Boolean(state.tampered);

    if (!edited && originalRaw) {
      out = originalRaw;
      plainText = unsealWox(originalRaw);
    } else {
      const nextToSave = cloneState(state);
      if (edited && !nextToSave.tampered) {
        nextToSave.tampered = { at: Date.now(), why: 'hand' };
      }
      if (edited) {
        nextToSave.savedAt = Math.max(Date.now(), (+(nextToSave.savedAt as number) || 0) + 1);
      }
      hasTampered = Boolean(nextToSave.tampered);
      plainText = JSON.stringify(nextToSave);
      out = sealWox(plainText);
      if (unsealWox(out) !== plainText) {
        throw new Error('ตรวจย้อนกลับไม่ผ่าน');
      }
      setState(nextToSave);
    }
    return { out, plainText, hasTampered };
  };

  const handleSave = () => {
    if (!state) return;
    try {
      const prepared = prepareSealedOutput();
      if (!prepared) return;
      const { out, hasTampered } = prepared;

      const filename = `${baseName}-edited.json`;
      try {
        const blob = new Blob([out], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        notify(
          `บันทึกแล้ว: ${filename}` +
            (hasTampered ? ' · ติดป้ายชีวิตที่ถูกแก้ไข (เล่นเดี่ยวได้ปกติ)' : ''),
          true
        );
      } catch {
        setFallbackExport(out);
        notify('ดาวน์โหลดอัตโนมัติไม่สำเร็จ คัดลอกข้อความเซฟด้านล่างไปบันทึกเป็นไฟล์เอง', false);
      }
    } catch (err) {
      notify(`บันทึกไม่สำเร็จ: ${(err as Error).message}`, false);
    }
  };

  const handleSaveGzip = async () => {
    if (!state) return;
    try {
      const prepared = prepareSealedOutput();
      if (!prepared) return;
      const gzBytes = await compressGzip(prepared.out);
      const ab = new Uint8Array(gzBytes).buffer;
      const blob = new Blob([ab], { type: 'application/gzip' });
      const filename = `${baseName}-edited.wox.gz`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      notify(`ส่งออกไฟล์บีบอัดแล้ว: ${filename}`, true);
    } catch (err) {
      notify(`ส่งออก .gz ไม่สำเร็จ: ${(err as Error).message}`, false);
    }
  };

  const handleCopyWox2 = async () => {
    if (!state) return;
    try {
      const prepared = prepareSealedOutput();
      if (!prepared) return;
      await navigator.clipboard.writeText(prepared.out);
      notify('คัดลอกสตริง WOX2 ลงคลิปบอร์ดแล้ว', true);
    } catch {
      notify('คัดลอก WOX2 ไม่สำเร็จ', false);
    }
  };

  const handleCopyPlainJson = async () => {
    if (!state) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(state, null, 2));
      notify('คัดลอก JSON (อ่านง่าย) ลงคลิปบอร์ดแล้ว', true);
    } catch {
      notify('คัดลอก JSON ไม่สำเร็จ', false);
    }
  };

  const handleCopyFallback = async () => {
    if (!fallbackExport) return;
    try {
      await navigator.clipboard.writeText(fallbackExport);
      notify('คัดลอกข้อความเซฟลงคลิปบอร์ดแล้ว', true);
    } catch {
      notify('กรุณาเลือกข้อความในกล่องแล้วคัดลอกด้วยตนเอง', false);
    }
  };

  const charNameTh = String((state?.name as Record<string, unknown> | undefined)?.th || '—');
  const charNameEn = String((state?.name as Record<string, unknown> | undefined)?.en || '');
  const lintSummary = state ? lintSaveState(state) : null;
  const lintIssueCount = lintSummary ? lintSummary.findings.length : 0;

  const realmIdx = typeof state?.realm === 'number' ? state.realm : null;
  const realmLabel =
    realmIdx !== null && REALMS[realmIdx]
      ? `${REALMS[realmIdx].th} (${realmIdx} · ${String(state?.layer ?? 0)})`
      : `${String(state?.realm ?? '—')} · ${String(state?.layer ?? '—')}`;

  const bagCount =
    state?.bag && typeof state.bag === 'object' && !Array.isArray(state.bag)
      ? Object.values(state.bag as Record<string, number>).filter((n) => n > 0).length
      : 0;
  const techCount =
    state?.techs && typeof state.techs === 'object' && !Array.isArray(state.techs)
      ? Object.keys(state.techs as Record<string, number>).length
      : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.wox,.txt"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileSelect(f);
          e.target.value = '';
        }}
      />

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-[#0B0F14]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:gap-8 sm:px-6 sm:py-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (state) setActiveTab('quick');
            }}
            className="min-w-0 truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base dark:text-slate-50 whitespace-nowrap"
          >
            Way of Xian Save Studio
          </a>

          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex dark:text-slate-400">
            {!state ? (
              <>
                <a
                  href="#top"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap shrink-0"
                >
                  นำเข้าไฟล์
                </a>
                <a
                  href="#spec"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap shrink-0"
                >
                  โครงสร้าง WOX2
                </a>
                <a
                  href="#safety"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100 whitespace-nowrap shrink-0"
                >
                  ข้อควรระวัง
                </a>
              </>
            ) : (
              (
                [
                  ['quick', 'แก้ไขด่วน'],
                  ['origin', 'กำเนิด'],
                  ['talents', 'พรสวรรค์'],
                  ['bag', 'กระเป๋า'],
                  ['skills', 'วิชา'],
                  ['world', 'สำนัก & โลก'],
                  ['tree', 'JSON'],
                  ['inspect', 'ตรวจ & เทียบ'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`border-b-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === id
                      ? 'border-teal-700 font-semibold text-teal-700 dark:border-teal-400 dark:text-teal-400'
                      : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {label}
                </button>
              ))
            )}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <PWAInstallButton compact />
            {!state ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 sm:gap-2 sm:px-4 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 whitespace-nowrap shrink-0"
              >
                <FolderOpen className="h-4 w-4" />
                <span>เปิดไฟล์เซฟ</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 sm:gap-2 sm:px-4 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400 whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>บันทึกเซฟ</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {!state ? (
          <>
            <div className="mx-auto flex max-w-6xl justify-end px-4 pt-3 sm:px-6 sm:pt-4">
              <ThemeToggle />
            </div>
            <SaveUploader
              onFileSelect={handleFileSelect}
              onPasteRaw={handlePasteRaw}
              onLoadSandbox={handleLoadSandbox}
              draftMeta={draftMeta}
              onRestoreDraft={handleRestoreDraft}
              onDiscardDraft={handleDiscardDraft}
              errorMsg={loadError}
              isBusy={isBusy}
            />
          </>
        ) : (
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-24 sm:px-6 sm:pt-6 lg:pb-8">
            <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between dark:border-slate-800">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="break-all sm:break-normal">{fileInfo}</span>
                </span>
                {isSandbox && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-amber-700 dark:text-amber-400">
                      โหมดตัวอย่าง (Sandbox)
                    </span>
                  </>
                )}
                {Boolean(state.tampered) && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        tampered ({String((state.tampered as Record<string, unknown>).why || '?')})
                      </span>
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={past.length === 0}
                    onClick={handleUndo}
                    title="เลิกทำ (Ctrl+Z)"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                    <span>Undo</span>
                    {past.length > 0 && (
                      <span className="tabular-nums font-mono text-[11px] text-slate-400">
                        ({past.length})
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={future.length === 0}
                    onClick={handleRedo}
                    title="ทำซ้ำ (Ctrl+Y)"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <Redo2 className="h-3.5 w-3.5" />
                    <span>Redo</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleSaveGzip}
                    title="ส่งออกไฟล์บีบอัด .wox.gz"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <Archive className="h-3.5 w-3.5" />
                    <span>.wox.gz</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyWox2}
                    title="คัดลอกข้อความ WOX2"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>คัดลอก WOX2</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPlainJson}
                    title="คัดลอก JSON ดิบ"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <FileJson className="h-3.5 w-3.5" />
                    <span>JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>เปิดไฟล์อื่น</span>
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {notice && (
              <div
                role="status"
                className={`mb-5 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
                  notice.ok
                    ? 'border-teal-200 bg-teal-50/70 text-teal-900 dark:border-teal-900/60 dark:bg-teal-950/30 dark:text-teal-200'
                    : 'border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {notice.ok ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{notice.text}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice(null)}
                  aria-label="ปิดการแจ้งเตือน"
                  className="rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {fallbackExport && (
              <div className="mb-5 space-y-2 rounded-xl border border-amber-300 bg-amber-50/70 p-4 dark:border-amber-900/70 dark:bg-amber-950/20">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                    คัดลอกข้อมูลเซฟ WOX2 นี้ไปบันทึกเป็นไฟล์ {baseName}-edited.json
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyFallback}
                    className="inline-flex min-h-[34px] items-center gap-1 rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>คัดลอก</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  value={fallbackExport}
                  rows={4}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  className="w-full rounded-lg border border-amber-200 bg-white p-2.5 font-mono text-xs text-slate-900 dark:border-amber-900/60 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
              <aside className="space-y-4 lg:sticky lg:top-20 lg:col-span-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-[#121821]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        ตัวละครปัจจุบัน
                      </p>
                      <h2 className="mt-0.5 truncate text-base font-bold text-slate-900 sm:text-lg dark:text-slate-50">
                        {charNameTh}
                      </h2>
                      {charNameEn && (
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {charNameEn}
                        </p>
                      )}
                      {!mobileSummaryOpen && (
                        <p className="mt-1 truncate text-xs text-slate-600 lg:hidden dark:text-slate-300">
                          <span className="tabular-nums">{realmLabel}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="tabular-nums font-mono">
                            {typeof state.money === 'number'
                              ? `${state.money.toLocaleString()} ตำลึง`
                              : '—'}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setMobileSummaryOpen((v) => !v)}
                      aria-expanded={mobileSummaryOpen}
                      className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap shrink-0"
                    >
                      <span>{mobileSummaryOpen ? 'ซ่อน' : 'รายละเอียด'}</span>
                      {mobileSummaryOpen ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <dl
                    className={`mt-4 divide-y divide-slate-200 text-xs lg:block dark:divide-slate-800 ${
                      mobileSummaryOpen ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 py-2">
                      <dt className="text-slate-500 dark:text-slate-400">ขั้นบำเพ็ญ</dt>
                      <dd className="tabular-nums truncate font-medium text-slate-900 dark:text-slate-100">
                        {realmLabel}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-slate-500 dark:text-slate-400">อายุ</dt>
                      <dd className="tabular-nums font-mono font-medium text-slate-900 dark:text-slate-100">
                        {typeof state.ageMonths === 'number'
                          ? `${Math.floor(state.ageMonths / 12)} ปี ${state.ageMonths % 12} ด.`
                          : '—'}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-slate-500 dark:text-slate-400">เงิน (ตำลึง)</dt>
                      <dd className="tabular-nums font-mono font-medium text-slate-900 dark:text-slate-100">
                        {typeof state.money === 'number'
                          ? state.money.toLocaleString()
                          : '—'}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-slate-500 dark:text-slate-400">สุขภาพ / ลมปราณ</dt>
                      <dd className="tabular-nums font-mono font-medium text-slate-900 dark:text-slate-100">
                        {String(state.health ?? '—')} / {String(state.qi ?? '—')}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <dt className="text-slate-500 dark:text-slate-400">สถานะไฟล์</dt>
                      <dd
                        className={`font-medium ${
                          edited
                            ? 'text-amber-700 dark:text-amber-400'
                            : 'text-teal-700 dark:text-teal-400'
                        }`}
                      >
                        {edited ? 'มีค่าที่ยังไม่บันทึก' : 'ตรงกับต้นฉบับ'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="hidden rounded-xl border border-slate-200 bg-white p-2 lg:block dark:border-slate-800 dark:bg-[#121821]">
                  {(
                    [
                      ['quick', 'แก้ไขด่วน'],
                      ['origin', 'กำเนิด & ดวงชะตา'],
                      [
                        'talents',
                        `พรสวรรค์ (${Array.isArray(state.talents) ? state.talents.length : 0})`,
                      ],
                      ['bag', `กระเป๋า & อุปกรณ์ (${bagCount})`],
                      ['skills', `วิชา & วรยุทธ์ (${techCount})`],
                      ['world', 'สำนัก & โลก NPC'],
                      ['tree', 'ข้อมูลทั้งหมด (JSON)'],
                      ['inspect', `ตรวจสอบ & เทียบผล (${lintIssueCount})`],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`flex min-h-[40px] w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeTab === id
                          ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                <details className="hidden rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 lg:block dark:border-slate-800 dark:bg-[#121821] dark:text-slate-400">
                  <summary className="cursor-pointer font-semibold text-slate-800 dark:text-slate-200">
                    ข้อควรรู้ก่อนใช้ไฟล์ที่แก้
                  </summary>
                  <p className="mt-2.5 leading-relaxed">
                    สำรองไฟล์เดิมไว้ก่อนเสมอ · ปุ่ม “สูงสุด” ใช้ค่าเพดานจาก{' '}
                    <span className="font-mono">capSeen</span> ในเซฟ ส่วนสุขภาพใช้ 100 และเงินใช้
                    99,999,999 (เกมอาจปรับลดค่าที่เกินเพดานตอนโหลด) · เมื่อบันทึกไฟล์ที่มีการแก้ไข
                    ระบบจะใส่ป้าย <span className="font-mono">tampered</span> และอัปเดต{' '}
                    <span className="font-mono">savedAt</span> ตามกติกาเกม
                  </p>
                </details>
              </aside>

              <div className="min-w-0 lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {activeTab === 'quick' && (
                      <QuickEditTab
                        state={state}
                        onSetAt={handleSetAt}
                        onSetStat={handleSetStat}
                        onMaxAllStats={handleMaxAllStats}
                        onMaxEverything={handleMaxEverything}
                        onReconcileStatSrc={handleReconcileStatSrc}
                      />
                    )}
                    {activeTab === 'origin' && (
                      <OriginDestinyTab
                        state={state}
                        onSetAt={handleSetAt}
                        onNotify={notify}
                      />
                    )}
                    {activeTab === 'talents' && (
                      <TalentsTab
                        state={state}
                        onAddTalent={handleAddTalent}
                        onRemoveTalent={handleRemoveTalent}
                      />
                    )}
                    {activeTab === 'bag' && (
                      <BagEquipTab
                        state={state}
                        onSetBagCount={handleSetBagCount}
                        onBatchBoostBag={handleBatchBoostBag}
                        onBatchAddItems={handleBatchAddItems}
                        onEquipItem={handleEquipItem}
                        onNotify={notify}
                      />
                    )}
                    {activeTab === 'skills' && (
                      <SkillsArtsTab
                        state={state}
                        onSetTechXp={handleSetTechXp}
                        onMaxAllTechs={handleMaxAllTechs}
                        onBatchLearnTechs={handleBatchLearnTechs}
                        onRemoveTech={handleRemoveTech}
                        onSetSlot={handleSetSlot}
                        onNotify={notify}
                      />
                    )}
                    {activeTab === 'world' && (
                      <SectWorldTab
                        state={state}
                        onSetAt={handleSetAt}
                        onMutate={handleMutateWithMessage}
                        onNotify={notify}
                      />
                    )}
                    {activeTab === 'tree' && (
                      <JsonTreeTab
                        state={state}
                        onSetAt={handleSetAt}
                        onDeleteAt={handleDeleteAt}
                        onAddAt={handleAddAt}
                        onNotify={notify}
                      />
                    )}
                    {activeTab === 'inspect' && originalState && (
                      <InspectorTab
                        originalState={originalState}
                        state={state}
                        edited={edited}
                        currentFileLabel={currentFileLabel}
                        onResetAll={handleResetAll}
                        onRevertPath={handleRevertPath}
                        onReconcileStatSrc={handleReconcileStatSrc}
                        onNotify={notify}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </main>

      {state && (
        <>
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-xs"
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="pb-safe absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl dark:border-slate-800 dark:bg-[#121821]"
                >
                  <div className="mx-auto my-2 h-1.5 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      หมวดการแก้ไขทั้งหมด
                    </h3>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="ปิดเมนู"
                      className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {(
                      [
                        ['quick', 'แก้ไขด่วน', SlidersHorizontal],
                        ['origin', 'กำเนิด & ดวงชะตา', Compass],
                        [
                          'talents',
                          `พรสวรรค์ (${Array.isArray(state.talents) ? state.talents.length : 0})`,
                          Sparkles,
                        ],
                        ['bag', `กระเป๋า & อุปกรณ์ (${bagCount})`, Backpack],
                        ['skills', `วิชา & วรยุทธ์ (${techCount})`, BookOpen],
                        ['world', 'สำนัก & โลก NPC', Users],
                        ['tree', 'ข้อมูลทั้งหมด (JSON)', Braces],
                        ['inspect', `ตรวจสอบ & เทียบผล (${lintIssueCount})`, ShieldCheck],
                      ] as const
                    ).map(([id, label, Icon]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveTab(id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                          activeTab === id
                            ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                            : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/70'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <nav
            aria-label="เมนูหลักบนมือถือ"
            className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-[#0B0F14]/95"
          >
            <div className="grid h-14 grid-cols-5 items-center">
              {(
                [
                  ['quick', 'แก้ไขด่วน', SlidersHorizontal],
                  ['talents', 'พรสวรรค์', Sparkles],
                  ['bag', 'กระเป๋า', Backpack],
                  ['skills', 'วิชา', BookOpen],
                ] as const
              ).map(([id, label, Icon]) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveTab(id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex h-full flex-col items-center justify-center gap-0.5 px-1 transition-colors ${
                      active
                        ? 'text-teal-700 dark:text-teal-400'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="truncate text-[10px] font-medium tracking-tight">{label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`flex h-full flex-col items-center justify-center gap-0.5 px-1 transition-colors ${
                  activeTab === 'origin' ||
                  activeTab === 'world' ||
                  activeTab === 'tree' ||
                  activeTab === 'inspect'
                    ? 'text-teal-700 dark:text-teal-400'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="truncate text-[10px] font-medium tracking-tight">ทั้งหมด</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
