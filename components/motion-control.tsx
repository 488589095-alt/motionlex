'use client';

import { useEffect, useState } from 'react';

const oldStorageKey = 'motionlex-motion-paused';

export function MotionControl() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motionPaused = 'false';
    // Old versions saved a pause across visits, which made every demo look broken.
    try { window.localStorage.removeItem(oldStorageKey); } catch { /* Storage may be unavailable. */ }
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motionPaused = String(next);
  };

  return <button className="motion-control" type="button" aria-pressed={paused} onClick={toggle}>
    <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>{paused ? '播放动效' : '暂停动效'}
  </button>;
}
