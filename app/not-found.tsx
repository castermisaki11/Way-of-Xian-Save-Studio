import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        ไม่พบหน้าที่ต้องการ
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        กลับไปยังหน้าหลักของ Way of Xian Save Studio เพื่อจัดการไฟล์เซฟ
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-[40px] items-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950"
      >
        กลับหน้าหลัก
      </Link>
    </main>
  );
}
