import type { ReactNode } from 'react';
import { familyFor } from '../data/taxonomy';
import { motionTerms } from '../data/terms';

const titles = new Map(motionTerms.map((term) => [term.slug, term.title]));

function Picture({ name }: { name: string }) {
  return <span className="demo-picture"><i /><b>{name}</b><em>✦</em></span>;
}

function Scene({ slug }: { slug: string }): ReactNode {
  switch (slug) {
    case 'search-suggest':
      return <div className="demo-search"><div>⌕ &nbsp; <b>滚动</b><i>│</i></div><span>↗ &nbsp; 滚动显现</span><span>↗ &nbsp; 滚动吸附</span><span>↗ &nbsp; 滚动进度</span></div>;
    case 'live-filter':
      return <div className="demo-live-filter"><div><b>全部</b><b>动效</b><b>交互</b></div><span/><span/><span/></div>;
    case 'count-up':
      return <div className="demo-counter"><b>120</b><span>IDEAS FOUND ✳</span></div>;
    case 'chart-entrance':
      return <div className="demo-chart"><i/><i/><i/><i/><i/><span>JAN &nbsp; FEB &nbsp; MAR &nbsp; APR &nbsp; MAY</span></div>;
    case 'scroll-linked':
      return <div className="demo-linked"><div><b>SCROLL</b><i/><i/><i/><i/></div><span>⇄</span><div><b>SCENE</b><em>✳</em></div></div>;
    case 'scroll-direction':
      return <div className="demo-direction"><div>☰ &nbsp; NAVIGATION</div><span>↓ SCROLL DOWN</span><span>↑ SCROLL UP</span></div>;
    case 'view-threshold':
      return <div className="demo-threshold"><span>VIEWPORT</span><div><i/><b>35%</b></div><em>✳ reveal!</em></div>;
    case 'back-to-top':
      return <div className="demo-backtop"><i/><i/><i/><b>↑</b><span>BACK TO TOP</span></div>;
    case 'pull-to-refresh':
      return <div className="demo-pull"><span>↓ PULL TO REFRESH</span><i/><i/><i/></div>;
    case 'typewriter':
      return <div className="demo-typewriter"><span>hello, web motion!<i>│</i></span></div>;
    case 'text-scramble':
      return <div className="demo-scramble"><span>MAKE IT CLEAR</span></div>;
    case 'form-validation':
      return <div className="demo-validation"><span>YOUR EMAIL</span><div>hello@</div><small>! &nbsp; 请输入完整的邮箱地址</small></div>;
    case 'drop-zone':
      return <div className="demo-drop"><span>⇧</span><b>拖到这里上传</b><small>or choose a file</small></div>;
    case 'drag-resize':
      return <div className="demo-resize"><span>LEFT PANEL</span><i>⋮</i><span>RIGHT PANEL</span></div>;
    case 'image-compare':
      return <div className="demo-compare"><div>BEFORE</div><div>AFTER</div><i>↔</i></div>;
    case 'video-on-scroll':
      return <div className="demo-video"><span>▶</span><b>FRAME 03 / 08</b><i/></div>;
    case 'mask-reveal': case 'clip-path-reveal':
      return <div className="demo-mask"><Picture name="REVEAL" /><i/></div>;
    case 'svg-path-draw':
      return <div className="demo-path"><svg viewBox="0 0 210 90"><path d="M4 72 C42 7 77 14 101 55 S161 79 204 8" /></svg><span>START ✳ END</span></div>;
    case 'gradient-shift':
      return <div className="demo-gradient"><span>soft color flow ✳</span></div>;
    case 'error-state':
      return <div className="demo-toast"><Picture name="TASK" /><span>! &nbsp; 出错了，请重试</span></div>;
    case 'scroll-reveal':
      return <div className="demo-viewport"><small>可视区域</small><i className="viewport-line" /><div className="viewport-card">进入视野 → 显现</div><span>↓ 页面滚动</span></div>;
    case 'stagger': case 'text-reveal': case 'exit-transition': case 'initial-entrance': case 'timeline-sequence':
      return <div className="demo-stack"><span>01 / IDEA</span><span>02 / DESIGN</span><span>03 / BUILD</span></div>;
    case 'parallax':
      return <div className="demo-landscape"><i className="sun" /><i className="hill hill-back" /><i className="hill hill-front" /><b>背景慢 · 前景快</b></div>;
    case 'pinned-story':
      return <div className="demo-pin"><b>固定画面 ✳</b><span>01 / 开始</span><span>02 / 展开</span><span>03 / 结束</span></div>;
    case 'horizontal-scroll':
      return <div className="demo-horizontal"><b>向下滚动 ↓</b><div><span>01</span><span>02</span><span>03</span></div><small>内容横向移动 →</small></div>;
    case 'pan-canvas':
      return <div className="demo-landscape"><i className="sun" /><i className="hill hill-back" /><i className="hill hill-front" /><b>DRAG TO EXPLORE</b></div>;
    case 'sticky-section':
      return <div className="demo-sticky"><b>目录 · 停在顶部</b><div><span>正文第一段</span><span>正文第二段</span><span>正文第三段</span></div><small>↓ 内容继续移动</small></div>;
    case 'scroll-spy': case 'anchor-scroll': case 'breadcrumbs': case 'stepper': case 'scroll-restoration':
      return <div className="demo-chapters"><b>CHAPTER 02</b><span>01 — Start</span><span>02 — Explore</span><span>03 — Create</span></div>;
    case 'scroll-progress':
      return <div className="demo-reading"><b>文章阅读进度</b><i><em /></i><div><span /><span /><span /><span /></div><small>0% → 100%</small></div>;
    case 'task-progress':
      return <div className="demo-progress"><b>WORK IN PROGRESS</b><span><i /></span><em>0 — 100%</em></div>;
    case 'scroll-snap':
      return <div className="demo-snap"><span>01</span><span>02</span><span>03</span><i>停在最近一屏 ↓</i></div>;
    case 'infinite-scroll':
      return <div className="demo-infinite"><b>接近列表底部 ↓</b><span>01 · 内容</span><span>02 · 内容</span><span>03 · 新内容</span><small>自动接上下一批</small></div>;
    case 'carousel': case 'swipe': case 'swipe-actions': case 'pagination':
      return <div className="demo-slide"><Picture name="01" /><Picture name="02" /><Picture name="03" /></div>;
    case 'skeleton-loading':
      return <div className="demo-skeleton"><span>内容加载中…</span><i /><i /><i /></div>;
    case 'virtual-list': case 'load-more': case 'shimmer':
      return <div className="demo-feed"><span /><span /><span /><small>MORE ···</small></div>;
    case 'page-transition':
      return <div className="demo-page-change"><span>页面 A</span><span>页面 B</span><i>点击链接 → 换页</i></div>;
    case 'crossfade':
      return <div className="demo-crossfade"><span>画面 A</span><span>画面 B</span><i>淡出 ↔ 淡入</i></div>;
    case 'morphing': case 'shared-element': case 'layout-transition': case 'shape-morph':
      return <div className="demo-shape"><i /><span>BEFORE</span><b>AFTER</b></div>;
    case 'spring-motion':
      return <div className="demo-spring"><span>松手</span><i className="spring-ball" /><i className="spring-target" /><b>目标位置</b><small>越过一点 → 回位</small></div>;
    case 'scroll-velocity':
      return <div className="demo-velocity"><b>慢慢滑 ↓</b><span className="velocity-slow">小幅移动</span><b>快速滑 ⇣</b><span className="velocity-fast">更快移动</span></div>;
    case 'easing': case 'inertia': case 'keyframes': case 'animation-delay': case 'animation-duration': case 'motion-path':
      return <div className="demo-track"><span>START</span><i /><span>FINISH</span></div>;
    case 'pulse': case 'loop-animation': case 'spinner':
      return <div className="demo-glow"><i /><span>✦</span><b>THE LITTLE SPARK</b></div>;
    case 'marquee':
      return <div className="demo-marquee"><span>MAKE IT MOVE ✳ MAKE IT MOVE ✳ MAKE IT MOVE ✳</span></div>;
    case 'tooltip':
      return <div className="demo-tooltip"><b>ⓘ</b><span>这是补充说明</span><small>悬停或聚焦时出现</small></div>;
    case 'hover-reveal': case 'dropdown-menu': case 'long-press': case 'hover-swap': case 'hotspot': case 'hover-preview': case 'context-menu': case 'hover-card':
      return <div className="demo-reveal"><Picture name="STORY" /><span>MORE TO EXPLORE ↗</span></div>;
    case 'magnetic-button': case 'press-feedback': case 'focus-ring': case 'ripple': case 'double-click': case 'toggle-button': case 'disabled-state': case 'active-state': case 'floating-action':
      return <div className="demo-button"><span>CLICK ME ↗</span><i>✳</i></div>;
    case 'cursor-trail': case 'cursor-follow': case 'particle-field':
      return <div className="demo-cursor"><i /><i /><i /><i /><b>↖</b></div>;
    case 'tilt-3d': case 'hover-lift': case 'rotate-gesture': case 'flip-card':
      return <div className="demo-tilt"><Picture name="PLAY" /></div>;
    case 'drag-reorder':
      return <div className="demo-reorder"><span>☰ &nbsp; IDEA</span><span>☰ &nbsp; PROTOTYPE</span><span>☰ &nbsp; LAUNCH</span><small>抓起 → 让位 → 排序</small></div>;
    case 'drag-to-dismiss': case 'masonry-reflow':
      return <div className="demo-drag"><span>☰ &nbsp; IDEA</span><span>☰ &nbsp; PROTOTYPE</span><span>☰ &nbsp; LAUNCH</span></div>;
    case 'pinch-zoom':
      return <div className="demo-zoom"><Picture name="ZOOM" /><i>＋</i></div>;
    case 'accordion': case 'expand-collapse':
      return <div className="demo-accordion"><span>01 &nbsp; What is motion? <b>−</b></span><p>It&apos;s a way to make change understandable.</p><span>02 &nbsp; Why use it? <b>＋</b></span></div>;
    case 'tabs':
      return <div className="demo-tabs"><span>OVERVIEW</span><span>EXAMPLE</span><span>PROMPT</span><Picture name="TAB 02" /></div>;
    case 'drawer':
      return <div className="demo-drawer"><span>当前页面</span><b>侧边面板 ↗<small>从右侧进入</small></b></div>;
    case 'modal-dialog': case 'alert-dialog':
      return <div className="demo-modal"><span>当前页面</span><b>确认操作？<small>取消　确定</small></b></div>;
    case 'command-palette': case 'scroll-lock': case 'click-outside': case 'keyboard-shortcut': case 'focus-trap': case 'mega-menu': case 'nested-menu': case 'popover': case 'lightbox': case 'bottom-sheet': case 'notification-center': case 'guided-tour':
      return <div className="demo-panel"><span>OPEN THE DETAILS</span><div><b>{slug === 'command-palette' ? '⌕  Search anything' : 'Hello there!'}</b><i>✳</i></div></div>;
    case 'toast': case 'optimistic-ui': case 'undo-action': case 'success-state':
      return <div className="demo-toast"><Picture name="TASK" /><span>✓ &nbsp; {slug === 'undo-action' ? 'Undo available' : 'All done!'}</span></div>;
    case 'backdrop-blur': case 'overscroll':
      return <div className="demo-blur"><Picture name="VIEW" /><span>SOFT GLASS</span></div>;
    default:
      return <div className="demo-glow"><i /><span>✳</span><b>TRY THE EFFECT</b></div>;
  }
}

export function MotionDemo({ slug, large = false }: { slug: string; large?: boolean }) {
  const family = familyFor(slug);
  return <div className={`motion-demo demo-${slug} ${large ? 'motion-demo-large' : ''}`} data-family={family?.id ?? 'visual'} aria-label={`${titles.get(slug) ?? slug} 动态示意`}>
    <span className="demo-corner">LIVE PREVIEW <i /></span>
    <Scene slug={slug} />
    <span className="demo-bottom">✦ &nbsp; MOTIONLEX</span>
  </div>;
}
