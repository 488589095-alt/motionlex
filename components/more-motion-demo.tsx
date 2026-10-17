import { familyFor } from '../data/taxonomy';
import { moreTerms } from '../data/more-terms';

const titleBySlug = new Map(moreTerms.map((term) => [term.slug, term.title]));

export function MoreMotionDemo({ slug }: { slug: string }) {
  const title = titleBySlug.get(slug) ?? '';
  switch (familyFor(slug)?.id) {
    case 'scroll':
      return <div className="more-scene more-scroll"><span className="more-label">SCROLL ↓</span><div className="more-scroll-window"><i className="more-scroll-line" /><div className="more-scroll-object">✦</div><span>画面跟着页面变化</span></div><div className="more-scroll-progress"><i /></div><b>{title}</b></div>;
    case 'scroll-nav':
      return <div className="more-scene more-scrollnav"><span className="more-label">页面 ↓</span><div className="more-scrollnav-window"><div className="more-scrollnav-content"><span>01　第一段内容</span><span>02　继续往下看</span><span>03　当前阅读位置</span><span>04　下一段内容</span></div><i className="more-scrollnav-target">↘</i><i className="more-scrollnav-shadow" /></div><b>{title}</b></div>;
    case 'transition':
      return <div className="more-scene more-transition"><span className="more-label">BEFORE → AFTER</span><div className="more-transition-window"><span className="more-transition-a">旧画面</span><span className="more-transition-b">新画面 ✳</span></div><b>{title}</b></div>;
    case 'timing':
      return <div className="more-scene more-timing"><span className="more-label">START　→　FINISH</span><div className="more-timing-track"><i className="more-timing-start" /><i className="more-timing-end" /><span className="more-timing-ball">✦</span><em className="more-timing-tail" /></div><b>{title}</b></div>;
    case 'pointer':
      return <div className="more-scene more-pointer"><span className="more-label">MOVE THE CURSOR</span><div className="more-pointer-card"><div className="more-pointer-picture">✳</div><strong>查看作品</strong><i className="more-pointer-line" /><span className="more-pointer-extra">打开预览 ↗</span></div><i className="more-pointer-cursor">↖</i><b>{title}</b></div>;
    case 'click':
      return <div className="more-scene more-click"><span className="more-label">CLICK TO CHANGE</span><div className="more-click-board"><span className="more-click-control">{slug === 'checkbox-check' ? '✓' : slug === 'radio-select' ? '●' : slug === 'like-burst' ? '♥' : slug === 'copy-feedback' ? '复制' : '列表'}</span><span className="more-click-control more-click-second">{slug === 'copy-feedback' ? '已复制 ✓' : slug === 'segmented-control' ? '网格' : slug === 'radio-select' ? '○' : '✓'}</span><i className="more-click-burst">✦　✧　✦</i></div><b>{title}</b></div>;
    case 'gesture':
      return <div className="more-scene more-gesture"><span className="more-label">DRAG → RELEASE</span><div className="more-gesture-board"><span>☰　IDEA</span><span className="more-gesture-item">☰　DESIGN</span><span>☰　BUILD</span><i className="more-gesture-cursor">↖</i><i className="more-gesture-selection" /></div><b>{title}</b></div>;
    case 'navigation':
      return <div className="more-scene more-navigation"><span className="more-label">CHOOSE A PATH</span><div className="more-navigation-board"><span className="more-navigation-head">概览　　 示例　　 设置</span><i className="more-navigation-indicator" /><div className="more-navigation-row">▸　项目目录</div><div className="more-navigation-sub">　　└ 页面与动效</div><div className="more-navigation-row">▸　更多内容</div></div><b>{title}</b></div>;
    case 'overlay':
      return <div className="more-scene more-overlay"><span className="more-label">OPEN A LAYER</span><div className="more-overlay-browser"><span>页面内容</span><span>⋯</span><i className="more-overlay-scrim" /><div className="more-overlay-panel">{slug === 'floating-toolbar' ? '复制　 标注　 分享' : slug === 'confirmation-popover' ? '确定删除？　取消' : slug === 'sheet-snap-points' ? '筛选条件　⌃' : slug === 'full-screen-menu' ? '首页　作品　关于' : '这里是焦点 ✳'}</div></div><b>{title}</b></div>;
    case 'feedback':
      return <div className="more-scene more-feedback"><span className="more-label">ACTION → RESULT</span><div className="more-feedback-board"><span className="more-feedback-icon">{slug === 'empty-state' ? '○' : slug === 'retry-state' ? '!' : '↑'}</span><strong>{slug === 'save-indicator' ? '保存中 → 已保存' : slug === 'upload-progress' ? '正在上传文件' : slug === 'empty-state' ? '这里还没有内容' : slug === 'retry-state' ? '加载失败 · 重试' : '正在处理 → 完成'}</strong><div className="more-feedback-track"><i /></div></div><b>{title}</b></div>;
    case 'visual':
      return <div className="more-scene more-visual"><span className="more-label">VISUAL LAYERS</span><div className="more-visual-frame"><i className="more-visual-sun" /><i className="more-visual-back" /><i className="more-visual-front" /><span>little landscape</span></div><b>{title}</b></div>;
    case 'content':
      return <div className="more-scene more-content"><span className="more-label">CONTENT UPDATED</span><div className="more-content-board"><div className="more-content-number"><span>8</span><span>9</span></div><div className="more-content-list"><span>01　灵感</span><span className="more-content-new">02　新内容 ✳</span><span>03　作品</span></div></div><b>{title}</b></div>;
    default:
      return null;
  }
}
