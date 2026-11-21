import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Way of Xian Save Studio',
    short_name: 'WOX2 Studio',
    description:
      'ตัวแก้ไขและตรวจสอบไฟล์เซฟเกม Way of Xian (WOX2) แบบทำงานในเครื่อง 100% ใช้งานออฟไลน์ได้',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0B0F14',
    theme_color: '#0F766E',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
