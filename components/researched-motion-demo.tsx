import { familyFor } from '../data/taxonomy';
import { researchedTerms } from '../data/researched-terms';

const titles = new Map(researchedTerms.map((term) => [term.slug, term.title]));

export function ResearchedMotionDemo({ slug }: { slug: string }) {
  const title = titles.get(slug) ?? '';
  const family = familyFor(slug)?.id;
  const label = <b className="research-title">{title}</b>;
  switch (family) {
    case 'scroll':
      return <div className="research-scene research-scroll"><small>SCROLL ↓</small><div className="research-scroll-view"><span className="research-scroll-panel research-scroll-a">01</span><span className="research-scroll-panel research-scroll-b">02</span><i className="research-scroll-path" /><em className="research-scroll-word">MOVE</em></div><i className="research-scroll-rail" />{label}</div>;
    case 'scroll-nav':
      return <div className="research-scene research-scrollnav"><small>JUMP THROUGH THE PAGE</small><div className="research-scrollnav-view"><span>01　INTRO</span><span>02　EXPLORE</span><span>03　CREATE</span><span>04　FINISH</span><i className="research-scrollnav-thumb" /></div>{label}</div>;
    case 'transition':
      return <div className="research-scene research-transition"><small>PAGE A → PAGE B</small><div className="research-transition-view"><span className="research-transition-old">A</span><span className="research-transition-new">B</span><i className="research-transition-mask" /></div>{label}</div>;
    case 'timing':
      return <div className="research-scene research-timing"><small>WATCH THE RHYTHM</small><div className="research-timing-view"><span className="research-timing-object">✳</span><i className="research-timing-shadow" /><em>START　→　END</em></div>{label}</div>;
    case 'pointer':
      return <div className="research-scene research-pointer"><small>MOVE THE POINTER</small><div className="research-pointer-view"><div className="research-pointer-image"><i /><strong>IMAGE</strong></div><span className="research-pointer-light" /><span className="research-pointer-trail">✦　✧　✦</span><em className="research-pointer-icon">↖</em></div>{label}</div>;
    case 'click':
      return <div className="research-scene research-click"><small>CLICK / TAP</small><div className="research-click-view"><span className="research-click-primary">{slug === 'toggle-switch' ? '' : slug === 'star-rating' ? '★★★★★' : slug === 'hamburger-morph' ? '☰' : slug === 'theme-toggle' ? '☀' : slug === 'tri-state-checkbox' ? '✓' : slug === 'floating-label' ? 'EMAIL' : slug === 'expanding-search' ? '⌕' : slug === 'add-to-cart-fly' ? '▣' : 'CLICK'}</span><span className="research-click-result">{slug === 'star-rating' ? '★★★★★' : slug === 'theme-toggle' ? '☾' : slug === 'hamburger-morph' ? '×' : slug === 'add-to-cart-fly' ? 'CART' : slug === 'expanding-search' ? 'Search…' : '✓ DONE'}</span><i className="research-click-trail">✦　✧　✦</i></div>{label}</div>;
    case 'gesture':
      return <div className="research-scene research-gesture"><small>DRAG / SWIPE</small><div className="research-gesture-view"><span>01　IDEA</span><span className="research-gesture-card">☰　DESIGN</span><span>03　BUILD</span><i className="research-gesture-cursor">↖</i><em className="research-gesture-range" /></div>{label}</div>;
    case 'navigation':
      return <div className="research-scene research-navigation"><small>FIND YOUR WAY</small><div className="research-navigation-view"><div className="research-navigation-head">⌕　Search or choose <i>⌄</i></div><span>01　概览</span><span className="research-navigation-active">02　设置　↗</span><span>03　更多内容</span><em className="research-navigation-sub">　└ 高级选项</em></div>{label}</div>;
    case 'overlay':
      return <div className="research-scene research-overlay"><small>OPEN ANOTHER LAYER</small><div className="research-overlay-view"><span>当前页面</span><span>•••</span><i className="research-overlay-scrim" /><div className="research-overlay-panel">{slug === 'hover-menu-bridge' ? '首页　作品　关于' : slug === 'drag-dismiss-sheet' ? '向下拉即可关闭 ↓' : slug === 'contextual-inspector' ? '颜色　位置　尺寸' : slug === 'anchored-callout' ? '这里可以查看详情' : '确定操作？　取消'}</div></div>{label}</div>;
    case 'feedback':
      return <div className="research-scene research-feedback"><small>SYSTEM RESPONSE</small><div className="research-feedback-view"><span className="research-feedback-symbol">{slug === 'typing-indicator' ? '● ● ●' : slug === 'offline-banner' ? '!' : slug === 'success-confetti' ? '✓' : '↗'}</span><strong>{slug === 'offline-banner' ? '网络已断开' : slug === 'typing-indicator' ? '正在输入…' : slug === 'inline-alert' ? '这项需要检查' : slug === 'retry-countdown' ? '即将重试 05' : slug === 'success-confetti' ? '完成！' : '处理中…'}</strong><span className="research-feedback-bar"><i /></span><em className="research-feedback-confetti">✦　✧　✦</em></div>{label}</div>;
    case 'visual':
      return <div className="research-scene research-visual"><small>AMBIENT MOTION</small><div className="research-visual-view"><i className="research-visual-shape shape-one" /><i className="research-visual-shape shape-two" /><i className="research-visual-shape shape-three" /><span className="research-visual-lines" /><b>✦</b></div>{label}</div>;
    case 'content':
      return <div className="research-scene research-content"><small>WORDS & DATA</small><div className="research-content-view">{slug === 'word-by-word-reveal' ? <div className="research-content-words"><span>先看</span><span>怎么动</span><span>再命名</span></div> : <><span className="research-content-word">{slug === 'chart-line-draw' ? 'DATA' : 'MAKE IT'}</span><span className="research-content-next">{slug === 'rotating-words' ? 'CLEAR' : 'MOVE'}</span></>}<i className="research-content-highlight" /><svg viewBox="0 0 120 38" className="research-content-chart"><path d="M5 31 L30 23 L55 27 L80 9 L112 5" /></svg></div>{label}</div>;
    default:
      return null;
  }
}
