export type Pillar = 'scroll' | 'animation' | 'interaction' | 'feedback';
export interface TermFamily { id: string; title: string; english: string; hint: string; icon: string; pillar: Pillar; slugs: string[] }

// Chapters are organized by trigger and user goal, not by a specific library.
// Each term has one primary chapter; text search covers overlapping concepts.
export const termFamilies: TermFamily[] = [
  { id:'scroll', title:'滚动触发与定位', english:'SCROLL TRIGGERS', hint:'页面一滑，画面如何响应', icon:'↕', pillar:'scroll', slugs:['scroll-reveal','parallax','sticky-section','scroll-progress','pinned-story','scroll-linked','horizontal-scroll','scroll-velocity','scroll-direction','view-threshold'] },
  { id:'scroll-nav', title:'滚动浏览与导航', english:'SCROLL NAVIGATION', hint:'怎样在长页面里移动', icon:'↓', pillar:'scroll', slugs:['scroll-snap','infinite-scroll','scroll-spy','back-to-top','anchor-scroll','scroll-lock','overscroll','pull-to-refresh','virtual-list','scroll-restoration'] },
  { id:'transition', title:'入场与布局转场', english:'ENTRANCE & TRANSITION', hint:'内容出现、消失与换场', icon:'✳', pillar:'animation', slugs:['stagger','morphing','page-transition','shared-element','text-reveal','exit-transition','layout-transition','crossfade','expand-collapse','initial-entrance'] },
  { id:'timing', title:'动画节奏与物理', english:'TIMING & PHYSICS', hint:'动作快慢、回弹与轨迹', icon:'〰', pillar:'animation', slugs:['spring-motion','easing','pulse','keyframes','inertia','animation-delay','animation-duration','loop-animation','timeline-sequence','motion-path'] },
  { id:'pointer', title:'悬停与光标', english:'HOVER & CURSOR', hint:'鼠标靠近时发生什么', icon:'↗', pillar:'interaction', slugs:['hover-reveal','magnetic-button','tooltip','cursor-trail','tilt-3d','hover-swap','hover-lift','hotspot','hover-preview','cursor-follow'] },
  { id:'click', title:'点击与键盘焦点', english:'CLICK & FOCUS', hint:'按下、选中和键盘操作', icon:'◎', pillar:'interaction', slugs:['press-feedback','focus-ring','ripple','double-click','toggle-button','keyboard-shortcut','focus-trap','disabled-state','active-state','click-outside'] },
  { id:'gesture', title:'拖拽与触摸手势', english:'DRAG & GESTURE', hint:'直接拿起、滑动和缩放', icon:'☝', pillar:'interaction', slugs:['drag-reorder','swipe','drop-zone','pinch-zoom','long-press','drag-to-dismiss','drag-resize','pan-canvas','rotate-gesture','swipe-actions'] },
  { id:'navigation', title:'导航与内容展开', english:'NAVIGATION & DISCLOSURE', hint:'在信息之间切换或深入', icon:'☰', pillar:'interaction', slugs:['accordion','tabs','drawer','command-palette','carousel','dropdown-menu','breadcrumbs','mega-menu','stepper','nested-menu'] },
  { id:'overlay', title:'浮层与对话', english:'OVERLAYS & DIALOGS', hint:'在当前页面上方处理任务', icon:'▣', pillar:'interaction', slugs:['modal-dialog','popover','context-menu','lightbox','bottom-sheet','alert-dialog','hover-card','floating-action','notification-center','guided-tour'] },
  { id:'feedback', title:'加载与系统反馈', english:'LOADING & FEEDBACK', hint:'让人知道系统在做什么', icon:'✓', pillar:'feedback', slugs:['skeleton-loading','toast','form-validation','task-progress','optimistic-ui','undo-action','spinner','shimmer','success-state','error-state'] },
  { id:'visual', title:'媒体与视觉层', english:'MEDIA & VISUAL LAYERS', hint:'模糊、遮罩和图像动态', icon:'◒', pillar:'animation', slugs:['backdrop-blur','mask-reveal','marquee','gradient-shift','image-compare','video-on-scroll','particle-field','clip-path-reveal','svg-path-draw','shape-morph'] },
  { id:'content', title:'内容与数据呈现', english:'CONTENT & DATA', hint:'数字、文字和列表如何变化', icon:'▥', pillar:'feedback', slugs:['chart-entrance','count-up','typewriter','text-scramble','flip-card','masonry-reflow','pagination','load-more','live-filter','search-suggest'] },
];

const familyBySlug = new Map(termFamilies.flatMap((family) => family.slugs.map((slug) => [slug, family] as const)));
export function familyFor(slug: string) { return familyBySlug.get(slug); }
