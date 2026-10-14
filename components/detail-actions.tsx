'use client';

import { useState } from 'react';
import { MotionDemo } from './motion-demo';

export function ReplayDemo({ slug }: { slug: string }) {
  const [play, setPlay] = useState(0);
  return <><MotionDemo key={play} slug={slug} large /><button className="replay-button" type="button" onClick={() => setPlay((value) => value + 1)}>↻ &nbsp; 再看一遍</button></>;
}

export function CopyMarkdown({ markdown }: { markdown: string }) {
  const [status, setStatus] = useState('复制 Markdown 给 AI');
  const copy = async () => {
    try { await navigator.clipboard.writeText(markdown); setStatus('已复制，去和 AI 说说吧 ✓'); }
    catch { setStatus('复制失败，请检查浏览器权限'); }
    window.setTimeout(() => setStatus('复制 Markdown 给 AI'), 3000);
  };
  return <button className="copy-button" type="button" onClick={copy} aria-live="polite">{status} <span>↗</span></button>;
}
