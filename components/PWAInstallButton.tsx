'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Download, Smartphone, WifiOff, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const emptySubscribe = () => () => {};

function getStandaloneSnapshot(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function getIOSSnapshot(): boolean {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function getOnlineSnapshot(): boolean {
  return navigator.onLine;
}

function subscribeOnline(cb: () => void): () => void {
  window.addEventListener('online', cb);
  window.addEventListener('offline', cb);
  return () => {
    window.removeEventListener('online', cb);
    window.removeEventListener('offline', cb);
  };
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installedNow, setInstalledNow] = useState(false);

  const isStandalone = useSyncExternalStore(emptySubscribe, getStandaloneSnapshot, () => false);
  const isIOS = useSyncExternalStore(emptySubscribe, getIOSSnapshot, () => false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstalledNow(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalledNow(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled: isStandalone || installedNow,
    isIOS,
    install,
  };
}

export function PWAInstallButton({ compact = false }: { compact?: boolean }) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-teal-700/30 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100 dark:border-teal-500/40 dark:bg-teal-950/50 dark:text-teal-300 dark:hover:bg-teal-950 whitespace-nowrap shrink-0 ${
          compact ? 'min-h-[40px]' : 'min-h-[44px] sm:min-h-[40px]'
        }`}
      >
        <Download className="h-3.5 w-3.5" />
        <span>ติดตั้งแอป</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 ${
            compact ? 'min-h-[40px]' : 'min-h-[44px] sm:min-h-[40px]'
          }`}
        >
          <Smartphone className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400" />
          <span>ติดตั้งบน iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[1px]">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-[#121821]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  ติดตั้งบน iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="ปิด"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>1. เปิดหน้านี้ในเบราว์เซอร์ Safari</li>
                <li>
                  2. กดปุ่ม <strong className="text-slate-900 dark:text-slate-100">แชร์ (Share)</strong> ที่แถบเครื่องมือ
                </li>
                <li>
                  3. เลื่อนลงแล้วเลือก{' '}
                  <strong className="text-slate-900 dark:text-slate-100">เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)</strong>
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 min-h-[44px] w-full rounded-lg bg-teal-700 py-2 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}

export function PwaRuntime() {
  const isOnline = useSyncExternalStore(subscribeOnline, getOnlineSnapshot, () => true);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
          // Ignore when blocked by browser privacy policy
        });
      } else {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          for (const r of regs) r.unregister().catch(() => {});
        });
        if ('caches' in window) {
          caches.keys().then((keys) => {
            for (const k of keys) {
              if (k.startsWith('wox2-studio-')) caches.delete(k).catch(() => {});
            }
          });
        }
      }
    }
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-lg lg:bottom-4">
      <WifiOff className="h-3.5 w-3.5 shrink-0" />
      <span>โหมดออฟไลน์ · ใช้งานข้อมูลที่แคชไว้ในเครื่อง</span>
    </div>
  );
}
