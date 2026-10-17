import type { CSSProperties, ReactNode } from 'react';

// These scenes depict the actual state change described by each term, rather
// than reusing a neighbouring term's generic card animation.
export function SemanticMotionDemo({ slug }: { slug: string }): ReactNode {
  switch (slug) {
    case 'swipe-actions': return <div className="semantic-scene semantic-swipe-actions"><div className="semantic-actions">归档　删除</div><div className="semantic-message">✉　新的消息 <span>← 左滑</span></div></div>;
    case 'pagination': return <div className="semantic-scene semantic-pagination"><div className="semantic-results"><span>结果 01</span><span>结果 02</span><span>结果 03</span></div><div className="semantic-pages"><i>‹</i><b>1</b><b>2</b><i>›</i></div></div>;
    case 'shared-element': return <div className="semantic-scene semantic-shared"><div className="semantic-list-card">作品卡片 <i /></div><div className="semantic-detail-card">作品详情 <i /></div><span className="semantic-shared-image">✦</span></div>;
    case 'layout-transition': return <div className="semantic-scene semantic-layout">{['01', '02', '03', '04'].map((item) => <span key={item}>{item}</span>)}</div>;
    case 'drag-to-dismiss': return <div className="semantic-scene semantic-dismiss"><span>通知已送达　×</span><small>拖过边界才关闭 →</small></div>;
    case 'masonry-reflow': return <div className="semantic-scene semantic-masonry">{['01', '02', '03', '04', '05'].map((item) => <span key={item}>{item}</span>)}</div>;
    case 'focus-trap': return <div className="semantic-scene semantic-focus"><div>背景按钮　背景链接</div><section><strong>确认操作</strong><span>取消</span><span>确定</span></section><small>TAB ↻</small></div>;
    case 'scroll-lock': return <div className="semantic-scene semantic-scroll-lock"><div className="semantic-page-lines"><i /><i /><i /><i /></div><section>弹层打开<br /><small>背景保持原位</small></section></div>;
    case 'lightbox': return <div className="semantic-scene semantic-lightbox"><span className="semantic-thumb">✦</span><div className="semantic-lightbox-back"><i>✦</i></div></div>;
    case 'bottom-sheet': return <div className="semantic-scene semantic-sheet"><div className="semantic-screen">当前页面</div><section><i />筛选条件 <span>颜色　尺寸　排序</span></section></div>;
    case 'notification-center': return <div className="semantic-scene semantic-notifications"><b>♧ <i>2</i></b><section><strong>通知</strong><span>新评论　·　刚刚</span><span>更新完成　·　昨天</span></section></div>;
    case 'guided-tour': return <div className="semantic-scene semantic-tour"><div><span>搜索</span><span>筛选</span><span>收藏</span></div><i /><small>第 <b>1</b> / 3 步　下一步 →</small></div>;
    case 'pan-canvas': return <div className="semantic-scene semantic-pan"><div><span>IDEA</span><span>DESIGN</span><span>BUILD</span></div><b>↖</b><small>拖动空白处平移整张画布</small></div>;
    case 'scroll-spy': return <div className="semantic-scene semantic-spy"><nav><span>01 介绍</span><span>02 示例</span><span>03 做法</span></nav><section><i /><i /><i /><i /></section></div>;
    case 'breadcrumbs': return <div className="semantic-scene semantic-breadcrumbs"><span>首页</span><i>›</i><span>交互</span><i>›</i><b>当前术语</b></div>;
    case 'stepper': return <div className="semantic-scene semantic-stepper"><div><span>✓</span><i /><span>2</span><i /><span>3</span></div><small>已完成　　当前步骤　　待完成</small></div>;
    case 'scroll-restoration': return <div className="semantic-scene semantic-restoration"><div className="semantic-rest-list"><span>01　作品</span><span>02　作品</span><b>03　刚才看的卡片</b><span>04　作品</span></div><div className="semantic-rest-detail">作品详情<br /><small>← 返回列表</small></div></div>;
    case 'long-press': return <div className="semantic-scene semantic-longpress"><div>作品卡片 <i /></div><section>复制　分享　删除</section><small>按住 → 展开操作</small></div>;
    case 'hover-swap': return <div className="semantic-scene semantic-swap"><span>封面 A</span><span>封面 B</span><i>↖</i></div>;
    case 'context-menu': return <div className="semantic-scene semantic-context"><span>▧　素材卡片</span><section>复制<br />重命名<br />删除</section><small>右键 / 更多</small></div>;
    case 'mega-menu': return <div className="semantic-scene semantic-mega"><header>产品　⌄　　 案例　　 关于</header><section><div><b>探索</b><span>动效词典</span><span>组件示例</span></div><div><b>学习</b><span>使用指南</span><span>设计方法</span></div></section></div>;
    case 'nested-menu': return <div className="semantic-scene semantic-nested"><section className="semantic-nested-first">分类<br />动效　→<br />交互　→</section><section className="semantic-nested-second">← 返回<br />悬停效果<br />点击反馈</section></div>;
    case 'click-outside': return <div className="semantic-scene semantic-outside"><button type="button" tabIndex={-1}>更多 ⋯</button><section>复制<br />分享<br />删除</section><i>↖</i><small>点空白处关闭</small></div>;
    case 'keyboard-shortcut': return <div className="semantic-scene semantic-shortcut"><div><kbd>⌘</kbd><b>+</b><kbd>K</kbd></div><section>⌕　搜索所有效果</section></div>;
    case 'optimistic-ui': return <div className="semantic-scene semantic-optimistic"><b>♡</b><span>收藏 <i>12</i></span><small>立即更新 → 保存中 → 已保存</small></div>;
    case 'undo-action': return <div className="semantic-scene semantic-undo"><span>已添加的项目　×</span><section>已删除　 <b>撤销</b></section></div>;
    case 'overscroll': return <div className="semantic-scene semantic-overscroll"><div><span>评论 01</span><span>评论 02</span><span>评论 03</span><small>已到列表底部 ↓</small></div></div>;
    case 'menubar': return <div className="semantic-scene semantic-menubar"><div><span>文件</span><span>编辑</span><span>视图</span></div><section>新建　⌘ N<br />打开　⌘ O<br />保存　⌘ S</section><small>← → 切换　↓ 展开</small></div>;
    case 'determinate-ring': return <div className="semantic-scene semantic-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="36" /><circle cx="50" cy="50" r="36" /></svg><b>75%</b><small>已完成进度</small></div>;
    case 'retry-countdown': return <div className="semantic-scene semantic-countdown"><div>{[5, 4, 3, 2, 1].map((number) => <span key={number} style={{ '--i': 5 - number } as CSSProperties}>{number}</span>)}</div><b>秒后重试</b><small>失败后自动再试</small></div>;
    case 'tri-state-checkbox': return <div className="semantic-scene semantic-tristate"><div><i><em>−</em><b>✓</b></i><span>全部选项</span></div><small>未选 → 部分选择 → 全选</small></div>;
    case 'wavy-text': return <div className="semantic-scene semantic-wavy">{'MAKE IT MOVE'.split('').map((letter, index) => <span key={index} style={{ '--i': index } as CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>)}</div>;
    case 'handwriting-draw': return <div className="semantic-scene semantic-handwriting"><svg viewBox="0 0 240 90" aria-hidden="true"><path d="M12 65 C25 12 29 82 46 37 S62 71 78 38 C91 12 97 69 115 45 S142 29 151 53 Q166 70 181 31 Q193 12 207 46 T232 44" /></svg><small>笔画沿路径写出</small></div>;
    case 'text-on-path': return <div className="semantic-scene semantic-text-path"><svg viewBox="0 0 220 150" aria-hidden="true"><defs><path id="motionlex-text-arc" d="M28 102 A86 86 0 0 1 192 102" /></defs><path d="M28 102 A86 86 0 0 1 192 102" /><text><textPath href="#motionlex-text-arc" startOffset="50%" textAnchor="middle">MAKE IT MOVE ✳</textPath></text></svg></div>;
    case 'virtual-list': return <div className="semantic-scene semantic-virtual"><small>1,000 条结果 · 只呈现可见行</small><div>{['041', '042', '043', '044'].map((number) => <span key={number}>{number}　结果内容</span>)}</div><i /></div>;
    case 'load-more': return <div className="semantic-scene semantic-load-more"><div><span>01　已有内容</span><span>02　已有内容</span><span>03　新加入 ✦</span><span>04　新加入 ✦</span></div><b>加载更多 ↓</b></div>;
    case 'motion-path': return <div className="semantic-scene semantic-motion-path"><svg viewBox="0 0 230 120" aria-hidden="true"><path d="M15 95 C65 95 65 20 120 37 S185 90 215 20" /></svg><i>✦</i><small>START　　　　　　　　　END</small></div>;
    case 'keyframes': return <div className="semantic-scene semantic-keyframes"><div><span>起点</span><span>中段</span><span>终点</span></div><i>✦</i><small>0%　　50%　　100%</small></div>;
    case 'animation-delay': return <div className="semantic-scene semantic-delay"><span>标题先出现</span><span>说明随后出现</span><span>按钮最后出现</span></div>;
    case 'animation-duration': return <div className="semantic-scene semantic-duration"><div><span>快 150ms</span><i /></div><div><span>慢 500ms</span><i /></div></div>;
    case 'magnetic-button': return <div className="semantic-scene semantic-magnetic"><span>靠近我 ↗</span><i>↖</i></div>;
    case 'press-feedback': return <div className="semantic-scene semantic-press"><span>按一下 ↗</span><i>↖</i></div>;
    case 'double-click': return <div className="semantic-scene semantic-double"><span>✦</span><i>↖</i><small>点击 · 点击 → 放大</small></div>;
    case 'floating-action': return <div className="semantic-scene semantic-fab"><div><i /><i /><i /></div><b>＋</b><small>页面滚动时仍在右下角</small></div>;
    case 'dropdown-menu': return <div className="semantic-scene semantic-dropdown"><b>更多　⌄</b><section>复制链接<br />分享页面<br />删除项目</section></div>;
    case 'hotspot': return <div className="semantic-scene semantic-hotspot"><div>产品图片<span>1</span><span>2</span><span>3</span></div><aside>镜头细节 ↗</aside></div>;
    case 'hover-preview': return <div className="semantic-scene semantic-preview"><span>查看这个作品　↗</span><section><b>作品预览</b><i />点开前先看一眼</section></div>;
    case 'hover-card': return <div className="semantic-scene semantic-hover-card"><span>◉　认识设计师</span><section><b>设计师小雨</b><small>交互设计 · 查看主页 ↗</small></section></div>;
    case 'popover': return <div className="semantic-scene semantic-popover"><b>筛选　⌄</b><section><span>☑ 动效</span><span>□ 交互</span><span>□ 内容</span></section></div>;
    case 'count-up': return <div className="semantic-scene semantic-count-up"><div>{[0, 48, 176, 324].map((number, index) => <span key={number} style={{ '--i': index } as CSSProperties}>{number}</span>)}</div><small>个动效与交互术语</small></div>;
    case 'text-scramble': return <div className="semantic-scene semantic-scramble"><span>MX??I!O?</span><span>MOTI0N?</span><span>MOTIONLEX</span></div>;
    case 'anchor-scroll': return <div className="semantic-scene semantic-anchor"><nav><span>01 概览</span><span>02 示例 ↓</span><span>03 做法</span></nav><div><b>02 示例</b><i /><i /><i /></div></div>;
    case 'cursor-follow': return <div className="semantic-scene semantic-cursor-follow"><b>↖</b><span>跟着你</span><small>光标先到，标签稍后跟上</small></div>;
    case 'particle-field': return <div className="semantic-scene semantic-particles">{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--i': index, '--x': 8 + (index * 37) % 85, '--y': 9 + (index * 23) % 78 } as CSSProperties} />)}<b>↖</b></div>;
    case 'hover-lift': return <div className="semantic-scene semantic-hover-lift"><span>悬停卡片</span><i>↖</i></div>;
    case 'rotate-gesture': return <div className="semantic-scene semantic-rotate"><span>✦</span><i>◉</i><b>◉</b><small>两指转动，中心不变</small></div>;
    default: return null;
  }
}
