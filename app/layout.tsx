import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MotionLex · 网页动效与交互术语',
  description: '120 个可视化网页动效与交互术语。看见效果、认识名称，再复制清楚的实现提示与验收要点给 AI。',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
