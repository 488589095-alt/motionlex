import { extraTerms } from './extra-terms';
import { expandedTerms } from './expanded-terms';
import { familyFor, termFamilies } from './taxonomy';

export type MotionCategory = '滚动叙事' | '时间与节奏' | '指针交互' | '状态反馈';

export interface MotionTerm {
  slug: string;
  number: string;
  category: MotionCategory;
  title: string;
  english: string;
  cue: string;
  description: string;
  prompt: string;
  checks: string[];
}

export const motionCategories: MotionCategory[] = ['滚动叙事', '时间与节奏', '指针交互', '状态反馈'];

const authoredTerms: MotionTerm[] = [
  {
    slug: 'scroll-reveal', number: '01', category: '滚动叙事', title: '滚动显现', english: 'Scroll Reveal',
    cue: '内容进入视野，逐项浮现。',
    description: '元素到达可视区域时才开始进场，适合长页面中的章节标题、图文和成果卡片。',
    prompt: '在当前页面的作品卡片上实现滚动显现：卡片进入视口约 20% 时，从下方 20px 淡入到原位，持续约 500ms。每张卡片只触发一次；不要改变卡片的最终布局。尊重 prefers-reduced-motion，让减少动态效果的用户直接看到内容。',
    checks: ['进入视口之前内容占位不变', '快速上下滚动时不会反复闪烁', '减少动态效果模式下内容立即可见'],
  },
  {
    slug: 'parallax', number: '02', category: '滚动叙事', title: '视差滚动', english: 'Parallax',
    cue: '前景与背景以不同速度移动。',
    description: '用不同图层的位移速度制造纵深感，适合主视觉或章节过渡；文字应始终稳定可读。',
    prompt: '给首页主视觉加入克制的视差滚动：背景纹理随页面滚动移动得比前景插画更慢，标题保持在正常文档流中。限制位移范围，避免露出图层边缘。移动端和 prefers-reduced-motion 下关闭视差。',
    checks: ['背景与前景速度明显不同', '滚动时标题仍清晰稳定', '移动端没有空白边缘或横向溢出'],
  },
  {
    slug: 'sticky-section', number: '03', category: '滚动叙事', title: '吸顶定位', english: 'Sticky Positioning',
    cue: '标签停在原位，内容继续走。',
    description: '某个元素在容器内随滚动停靠在指定位置，常见于目录、章节标签和操作栏。',
    prompt: '把文章左侧的章节目录做成吸顶定位：桌面端距顶部导航 96px 时停住，只在文章容器内保持吸顶；到文章底部后自然结束。手机端改回普通布局，避免挡住正文。',
    checks: ['不会覆盖固定导航', '离开父容器时自然结束', '窄屏正文没有被遮挡'],
  },
  {
    slug: 'scroll-progress', number: '04', category: '滚动叙事', title: '阅读进度条', english: 'Scroll Progress',
    cue: '细线随着阅读向前推进。',
    description: '把阅读进度映射到一条连续的视觉轨道，让长内容中的位置感更明确。',
    prompt: '在文章顶部添加一条 2px 的阅读进度条，进度按文章内容容器的已阅读比例计算，从 0% 平滑更新到 100%。不要按整站滚动高度计算；窗口尺寸变化时也要重新计算，并避免频繁更新造成卡顿。',
    checks: ['文章起点为 0%，末尾为 100%', '窗口尺寸改变后进度正确', '滚动顺畅且不影响原布局'],
  },
  {
    slug: 'stagger', number: '05', category: '时间与节奏', title: '错峰入场', english: 'Staggered Entrance',
    cue: '一组元素按顺序接力出现。',
    description: '用短暂的时间差让同一组元素依次进入，比所有元素一起出现更容易看出层级。',
    prompt: '让这组 4 张功能卡片在区域出现时依次淡入上移，每张之间间隔约 90ms，整组在 750ms 内完成。只动画 opacity 和 transform；不要让后出现的卡片改变栅格尺寸。减少动态效果模式下一次性展示全部。',
    checks: ['顺序与阅读顺序一致', '整组动画不过长', '卡片位置在播放前后不跳动'],
  },
  {
    slug: 'spring-motion', number: '06', category: '时间与节奏', title: '弹性回位', english: 'Spring Motion',
    cue: '越过目标一点，再轻轻停下。',
    description: '接近真实物体的回弹节奏，适合拖拽松手或轻量面板入场；过量回弹会影响精确感。',
    prompt: '拖拽卡片松开后，让卡片以轻微弹性回到目标位置：最多一次小幅越界，然后在约 450ms 内稳定。只改变位置，不修改卡片内容或拖拽规则。减少动态效果时直接回到目标位置。',
    checks: ['只有一次轻微回弹', '连续拖拽不会积累动画', '卡片不会盖住邻近控件'],
  },
  {
    slug: 'easing', number: '07', category: '时间与节奏', title: '缓动曲线', english: 'Easing',
    cue: '起步、加速、停下都要有节奏。',
    description: '同样的距离和时长，用不同速度曲线会产生完全不同的手感。',
    prompt: '调整导航抽屉的进入和退出节奏：进入时快速启动并柔和减速，退出时稍快；保留原来的位置与时长范围，不使用线性匀速。只动画 transform 与 opacity，避免宽度动画带来布局重排。',
    checks: ['开始和结束都没有生硬停顿', '打开关闭节奏一致', '低性能设备上没有明显掉帧'],
  },
  {
    slug: 'morphing', number: '08', category: '时间与节奏', title: '形态过渡', english: 'Morphing',
    cue: '同一个元素自然变成另一种形状。',
    description: '在两个状态之间保持视觉连续性，常用于播放控件、加载状态和品牌符号。',
    prompt: '让提交按钮在发送后平滑变成“处理中”状态：按钮宽度保持不变，图标和圆角在 250ms 内过渡，不重新创建一个跳位置的新按钮。完成后恢复可点击状态，并向屏幕阅读器说明结果。',
    checks: ['切换时按钮不改变周围布局', '处理中状态不可重复提交', '成功与失败都有可读反馈'],
  },
  {
    slug: 'hover-reveal', number: '09', category: '指针交互', title: '悬停揭示', english: 'Hover Reveal',
    cue: '指针靠近时，第二层信息出现。',
    description: '把补充信息留在悬停状态，让预览保持干净；关键信息不能只靠悬停获取。',
    prompt: '在作品卡片上加入悬停揭示：指针进入时，底部项目信息层轻微上移并淡入，离开时平滑收回。键盘 focus-visible 和触屏点击也能打开同样的信息，项目标题始终直接可见。',
    checks: ['键盘和触屏可获取同样信息', '揭示层不遮住标题', '指针移出后状态正常恢复'],
  },
  {
    slug: 'magnetic-button', number: '10', category: '指针交互', title: '磁吸按钮', english: 'Magnetic Button',
    cue: '按钮轻轻朝指针方向靠近。',
    description: '在有限半径里响应指针位置，为重要操作增加一点物理感；位移不应影响实际点击目标。',
    prompt: '给主按钮做轻量磁吸交互：指针进入按钮附近 80px 范围时，视觉层最多跟随 10px，离开后平滑回中。真实按钮的点击区域和 DOM 位置保持不变；触屏与减少动态效果模式下禁用磁吸。',
    checks: ['实际点击区域没有漂移', '按钮不会追着指针跑', '触屏和减少动态效果模式正常'],
  },
  {
    slug: 'drag-reorder', number: '11', category: '指针交互', title: '拖拽排序', english: 'Drag to Reorder',
    cue: '抓起一项，其他项让出位置。',
    description: '在直接操作中重新排列内容，重点是抓取反馈、占位和松手后的稳定状态。',
    prompt: '让这组任务卡支持拖拽排序：拖起时原位置保留占位，邻近卡片平滑让位，松手后更新顺序。提供键盘可用的上移/下移操作和明确的当前位置提示；不要只做看似拖动的视觉动画。',
    checks: ['松手后顺序真正更新', '拖拽中列表高度不跳动', '键盘用户也能调整顺序'],
  },
  {
    slug: 'skeleton-loading', number: '12', category: '状态反馈', title: '骨架屏', english: 'Skeleton Loading',
    cue: '数据来之前，先看见内容轮廓。',
    description: '用与最终内容接近的占位结构降低等待的不确定感，不能无限停留在占位状态。',
    prompt: '为文章卡片列表添加骨架屏：加载中保留封面、标题和两行摘要的固定占位，真实数据到达后平滑替换。加载失败时显示错误和重试入口；减少动态效果模式下不播放闪光动画。',
    checks: ['占位尺寸接近真实内容', '加载失败能退出骨架状态', '切换到内容时页面不明显跳动'],
  },
  {
    slug: 'page-transition', number: '13', category: '时间与节奏', title: '页面转场', english: 'Page Transition',
    cue: '从旧页面自然进入新页面。',
    description: '在路由切换时保留视觉连续性，让用户知道自己从哪里来、到了哪里。',
    prompt: '给列表到详情页加入克制的页面转场：旧内容淡出，新内容从下方 12px 淡入；切换期间保持页面容器高度稳定，导航和浏览器历史行为照常工作。减少动态效果时立即切换。',
    checks: ['路由实际切换且返回键可用', '页面高度不会突然跳动', '减少动态效果模式直接显示内容'],
  },
  {
    slug: 'shared-element', number: '14', category: '时间与节奏', title: '共享元素过渡', english: 'Shared Element Transition',
    cue: '同一张图从卡片延续到详情页。',
    description: '让列表中的视觉元素在详情状态中延续，帮助用户理解前后两个界面的关系。',
    prompt: '点击作品卡片时，让封面图从卡片位置平滑过渡到详情页顶部的封面区域。图片宽高比保持正确，过渡结束后详情页内容可正常滚动；返回列表时反向过渡。减少动态效果模式跳过动画。',
    checks: ['封面不会闪烁或变形', '返回列表能找到原卡片', '键盘导航不被过渡打断'],
  },
  {
    slug: 'text-reveal', number: '15', category: '时间与节奏', title: '文字揭示', english: 'Text Reveal',
    cue: '标题按行或按词轻轻出现。',
    description: '用少量位移和透明度强调标题入场，文字应保持真实可选择、可朗读。',
    prompt: '给首屏主标题做逐行揭示：每行从下方 16px 淡入，相邻行间隔 100ms，整体不超过 700ms。文字保留在 DOM 中供选择与屏幕阅读器读取；减少动态效果模式直接展示。',
    checks: ['文字可选择和复制', '换行后动画顺序正确', '不会导致标题区域高度变化'],
  },
  {
    slug: 'pulse', number: '16', category: '时间与节奏', title: '呼吸脉冲', english: 'Pulse',
    cue: '一个轻柔的信号周期性亮起。',
    description: '用于标示可交互热点或实时状态；避免快速闪烁和持续抢夺注意。',
    prompt: '给可点击的预览热点加轻微呼吸脉冲：外圈每 2.4 秒透明度和缩放缓慢变化一次，中心图标保持清晰稳定。用户悬停或聚焦时停止循环；减少动态效果模式保持静态标记。',
    checks: ['没有快速闪烁', '热点可通过键盘到达', '动画不遮挡正文或其他控件'],
  },
  {
    slug: 'tooltip', number: '17', category: '状态反馈', title: '提示气泡', english: 'Tooltip',
    cue: '悬停或聚焦时解释一个短标签。',
    description: '补充解释图标或缩写，位置需避开视口边缘，关键操作不能只靠提示气泡说明。',
    prompt: '给工具栏图标添加提示气泡：鼠标悬停 400ms 或键盘聚焦时显示，离开和按 Escape 时关闭；靠近窗口边缘时自动换边。把提示文本与触发按钮关联，不遮挡当前操作。',
    checks: ['键盘聚焦也能看到说明', '气泡不会被窗口边缘裁掉', 'Escape 可以关闭'],
  },
  {
    slug: 'accordion', number: '18', category: '状态反馈', title: '折叠面板', english: 'Accordion',
    cue: '点开一项，内容在原处展开。',
    description: '以渐进展示组织长内容，展开状态应清楚且可用键盘操作。',
    prompt: '把常见问题改为可展开的折叠面板：点击标题或按 Enter/Space 展开正文，图标随状态变化；多个面板允许独立展开。内容在关闭时不接收键盘焦点，动画结束前后布局不跳。',
    checks: ['按钮有 aria-expanded 状态', '展开内容不被裁切', '键盘可展开并关闭'],
  },
  {
    slug: 'tabs', number: '19', category: '状态反馈', title: '内容切换标签', english: 'Tabs',
    cue: '在同一位置切换几组内容。',
    description: '适合并列的短内容视图，当前项与键盘切换规则必须明确。',
    prompt: '把三个产品示例做成标签页：选中标签下方的指示线平滑移动，内容区域切换时短暂淡入。左右方向键可在标签之间移动，当前标签和面板有正确的关联；面板最小高度固定以避免页面跳动。',
    checks: ['当前标签清晰可辨', '方向键切换符合预期', '切换时整页不抖动'],
  },
  {
    slug: 'drawer', number: '20', category: '状态反馈', title: '侧边抽屉', english: 'Drawer',
    cue: '辅助信息从边缘滑入。',
    description: '让用户在原任务上下文里查看设置或详情，打开后应正确管理焦点和关闭方式。',
    prompt: '点击“筛选”时从右侧打开抽屉：抽屉以位移加淡入进入，背景加低透明遮罩；打开后焦点移入抽屉，按 Escape、点关闭按钮或遮罩可关闭，关闭后焦点回到触发按钮。',
    checks: ['背景内容不会误触', '焦点不会丢失', '移动端抽屉仍可完整操作'],
  },
  {
    slug: 'toast', number: '21', category: '状态反馈', title: '轻提示', english: 'Toast',
    cue: '操作结果短暂出现并离开。',
    description: '对保存、复制等轻量操作给出反馈；重要错误需要可持续查看的说明。',
    prompt: '点击复制后显示“已复制到剪贴板”的轻提示，约 3 秒后淡出。多次点击时更新同一个提示而不堆叠；复制失败时显示可操作的错误说明。使用合适的实时区域向屏幕阅读器播报。',
    checks: ['成功和失败反馈不同', '连续触发不堆叠', '提示不会挡住主要操作'],
  },
  {
    slug: 'press-feedback', number: '22', category: '指针交互', title: '按压反馈', english: 'Press Feedback',
    cue: '按钮按下时给出短暂回应。',
    description: '让点击、触摸和键盘激活有一致的确认感，动画不应拖慢实际操作。',
    prompt: '给主要按钮添加按压反馈：按下时视觉层缩小到 0.97，松开后在约 160ms 内回到原尺寸。真实点击区域和文字排版保持不变；鼠标、触屏和键盘激活都可感知反馈。',
    checks: ['点击事件不会被动画延迟', '按钮命中区域不缩小', '键盘激活也有反馈'],
  },
  {
    slug: 'swipe', number: '23', category: '指针交互', title: '滑动手势', english: 'Swipe Gesture',
    cue: '用手指左右移动内容。',
    description: '常见于移动端图片画廊和卡片浏览，需要明确阈值与非手势替代操作。',
    prompt: '让移动端案例画廊支持左右滑动：只有水平位移超过 48px 且方向明确时切换一页，否则回弹原位。保留上一个/下一个按钮供键盘和非触屏用户操作；不要阻断页面正常纵向滚动。',
    checks: ['纵向滚动不被抢走', '滑动阈值避免误触', '按钮和键盘可完成同样操作'],
  },
  {
    slug: 'command-palette', number: '24', category: '状态反馈', title: '命令面板', english: 'Command Palette',
    cue: '按快捷键快速搜索并执行动作。',
    description: '集中呈现站内操作或跳转，适合功能较多的工具；结果列表要易搜索、易读。',
    prompt: '为站内页面加入命令面板：按 Cmd/Ctrl+K 打开，输入后实时过滤页面与操作，方向键选择、Enter 执行、Escape 关闭。打开时输入框自动聚焦，关闭后焦点回到之前的位置；手机端提供可见的搜索按钮。',
    checks: ['键盘全流程可用', '空结果有明确提示', '关闭后焦点返回原位置'],
  },
  ...extraTerms,
  ...expandedTerms,
];

const termBySlug = new Map(authoredTerms.map((term) => [term.slug, term]));
export const motionTerms: MotionTerm[] = termFamilies.flatMap((family) => family.slugs).map((slug, index) => {
  const term = termBySlug.get(slug);
  if (!term) throw new Error(`Missing MotionLex term: ${slug}`);
  return { ...term, number: String(index + 1).padStart(3, '0') };
});

export function motionTermMarkdown(term: MotionTerm) {
  return `# ${term.title} / ${term.english}\n\n章节：${familyFor(term.slug)?.title ?? term.category}\n\n## 想实现的效果\n${term.description}\n\n## 给 AI 的提示词\n${term.prompt}\n\n## 验收要点\n${term.checks.map((check) => `- ${check}`).join('\n')}`;
}

