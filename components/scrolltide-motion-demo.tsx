// Original MotionLex miniatures for 3D, scroll and pointer concepts.
import type { CSSProperties } from 'react';
const gallerySlugs = new Set(['cylindrical-carousel', 'fan-deck', 'spiral-slider', 'photo-stack', 'depth-carousel', 'orbit-gallery']);
const pointerSlugs = new Set(['mesh-warp', 'elastic-frame', 'dither-lens']);

export function ScrolltideMotionDemo({ slug }: { slug: string }) {
  if (gallerySlugs.has(slug)) return <div className="st-gallery" aria-hidden="true">
    <div className="st-gallery-cards">{[1, 2, 3, 4, 5].map((number) => <span key={number} style={{ '--i': number - 1 } as CSSProperties}><i />{String(number).padStart(2, '0')}</span>)}</div>
    <small>{slug === 'photo-stack' ? '翻到下一张 ↗' : '换个角度看看 ↗'}</small>
  </div>;

  if (slug === 'scroll-portal-walk') return <div className="st-portal" aria-hidden="true"><div className="st-portal-back"><span>下一幕</span><i>✦</i></div><div className="st-portal-door"><span>走进去 ↗</span></div><small>SCROLL ↓</small></div>;
  if (slug === 'scroll-scene-index') return <div className="st-scene-index" aria-hidden="true"><div className="st-scene-main"><b>01</b><span>正在浏览的作品</span></div><div className="st-scene-thumbs"><i>01</i><i>02</i><i>03</i></div></div>;
  if (slug === 'scroll-3d-pose') return <div className="st-3d-pose" aria-hidden="true"><div className="st-cube"><span>正面</span><span>侧面</span><span>背面</span><span>侧面</span></div><small>SCROLL ↔ ROTATE</small></div>;
  if (slug === 'scroll-seam-morph') return <div className="st-seam" aria-hidden="true"><div>SCENE 01</div><div>SCENE 02</div><i /></div>;
  if (slug === 'intro-loader') return <div className="st-intro" aria-hidden="true"><span>HELLO ✳</span><i /><i /></div>;

  if (pointerSlugs.has(slug)) return <div className="st-pointer" aria-hidden="true">
    <div className="st-pointer-picture"><span>✦</span><div className="st-pointer-grid">{Array.from({ length: 36 }, (_, index) => <i key={index} />)}</div></div><b className="st-pointer-cursor">↖</b>
  </div>;
  if (slug === 'depth-keypress') return <div className="st-keypress" aria-hidden="true"><span>↵</span><small>PRESS</small></div>;
  if (slug === 'ready-send-button') return <div className="st-ready" aria-hidden="true"><div><span>写点什么…</span><i /></div><b>↑</b><small>输入后就绪</small></div>;
  if (slug === 'expanding-card-rail') return <div className="st-card-rail" aria-hidden="true">{['01', '02', '03', '04'].map((number) => <span key={number}>{number}<b>EXPLORE ↗</b></span>)}</div>;
  if (slug === 'media-folder') return <div className="st-folder" aria-hidden="true"><span>▧</span><i>01</i><i>02</i><i>03</i><small>OPEN ME ↗</small></div>;
  if (slug === 'particle-globe') return <div className="st-globe" aria-hidden="true"><div>{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div><span>OUR LITTLE WORLD ✳</span></div>;
  if (slug === 'isometric-block-field') return <div className="st-blocks" aria-hidden="true">{Array.from({ length: 25 }, (_, index) => <span key={index} style={{ '--i': index } as CSSProperties} />)}</div>;
  if (slug === 'fluted-glass') return <div className="st-fluted" aria-hidden="true"><div><i /><b>LOOK<br />CLOSER</b></div><span /></div>;
  if (slug === 'image-tunnel') return <div className="st-tunnel" aria-hidden="true">{[1, 2, 3, 4].map((number) => <span key={number}>{number.toString().padStart(2, '0')}</span>)}<b>→</b></div>;
  if (slug === 'focus-frame-text') return <div className="st-focus-text" aria-hidden="true"><span>SEE</span><span>THE</span><span>IDEA</span><i /></div>;
  if (slug === 'grid-warp-text') return <div className="st-warp-text" aria-hidden="true"><span>MAKE</span><span>IT</span><span>MOVE</span></div>;
  return null;
}
