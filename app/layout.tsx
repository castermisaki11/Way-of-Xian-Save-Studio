import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Noto_Sans_Thai, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PwaRuntime } from '@/components/PWAInstallButton';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const notoThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-thai',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F766E' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F14' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Way of Xian Save Studio — ตัวแก้ไขเซฟ WOX2',
  description:
    'ตัวแก้ไขและตรวจสอบไฟล์เซฟเกม Way of Xian (WOX2) แบบทำงานในเครื่อง 100% รองรับการถอดรหัส แก้ค่าสถานะ กำเนิด ดวงชะตา พรสวรรค์ และต้นไม้ข้อมูล JSON',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WOX2 Studio',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Way of Xian Save Studio — ตัวแก้ไขเซฟ WOX2',
    description:
      'ตัวแก้ไขและตรวจสอบไฟล์เซฟเกม Way of Xian (WOX2) แบบทำงานในเครื่อง 100% รองรับการถอดรหัส แก้ค่าสถานะ กำเนิด ดวงชะตา พรสวรรค์ และต้นไม้ข้อมูล JSON',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Way of Xian Save Studio — ตัวแก้ไขเซฟ WOX2',
    description:
      'ตัวแก้ไขและตรวจสอบไฟล์เซฟเกม Way of Xian (WOX2) แบบทำงานในเครื่อง 100% รองรับการถอดรหัส แก้ค่าสถานะ กำเนิด ดวงชะตา พรสวรรค์ และต้นไม้ข้อมูล JSON',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${notoThai.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen overflow-x-hidden">
        {children}
        <PwaRuntime />
      </body>
    </html>
  );
}
