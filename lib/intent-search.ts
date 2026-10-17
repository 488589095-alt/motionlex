import { motionTerms } from '../data/terms';
import { familyFor } from '../data/taxonomy';

export interface IntentMatch { slug: string; reason: string; score?: number }

const intentRules: { pattern: RegExp; slugs: string[]; reason: string; weight?: number }[] = [
  { pattern: /滑动|滚动|往下看|往下翻|下滑/, slugs: ['scroll-reveal', 'scroll-linked'], reason: '与你描述的页面滚动有关', weight: 2 },
  { pattern: /进入视野|滑到.*出现|滚到.*出现|一边滚.*一边出现|往下滑.*出现|慢慢出现|出现.*屏幕/, slugs: ['scroll-reveal', 'view-threshold'], reason: '内容进入屏幕时触发' },
  { pattern: /前景|背景|不同速度|有层次|纵深|景深/, slugs: ['parallax'], reason: '前景和背景移动速度不同' },
  { pattern: /固定|停在顶部|吸顶|不跟着走|钉住/, slugs: ['sticky-section', 'pinned-story'], reason: '元素停留而页面继续滚动' },
  { pattern: /进度|读到哪里|读了多少|完成百分比/, slugs: ['scroll-progress', 'task-progress'], reason: '用进度提示当前位置或完成量' },
  { pattern: /一张张|一个接一个|一个个|依次|排队出现|逐个/, slugs: ['stagger', 'timeline-sequence'], reason: '多个元素按顺序出现' },
  { pattern: /弹|回弹|弹性|蹦|越过.*回来|松手.*回来/, slugs: ['spring-motion', 'inertia'], reason: '动作超过目标后回位' },
  { pattern: /慢慢停|先快后慢|缓动|速度曲线/, slugs: ['easing'], reason: '描述了运动速度的变化' },
  { pattern: /鼠标|指针|悬停|移上去|靠近/, slugs: ['hover-reveal', 'magnetic-button', 'tooltip'], reason: '由鼠标或指针位置触发' },
  { pattern: /跟着鼠标|追着鼠标|吸着鼠标|磁吸/, slugs: ['magnetic-button', 'cursor-follow'], reason: '视觉元素响应指针位置' },
  { pattern: /点开|弹出|浮层|盖在页面|对话框/, slugs: ['modal-dialog', 'popover', 'drawer'], reason: '在当前页面上方打开内容' },
  { pattern: /侧边|从旁边滑出|抽屉/, slugs: ['drawer'], reason: '面板从页面边缘进入' },
  { pattern: /拖动|拖拽|换顺序|重新排序/, slugs: ['drag-reorder', 'drag-to-dismiss'], reason: '通过拖动直接操作内容' },
  { pattern: /加载|等待|还没出来|占位/, slugs: ['skeleton-loading', 'spinner', 'shimmer'], reason: '内容加载过程中的状态反馈' },
  { pattern: /输入.*建议|打字.*提示|搜索.*推荐/, slugs: ['search-suggest', 'live-filter'], reason: '输入时即时给出建议或结果' },
  { pattern: /数字.*增长|从零.*数字|数字.*跳/, slugs: ['count-up'], reason: '数值由起点连续增长' },
  { pattern: /越滑越清楚|滑动.*透明|滚动.*透明/, slugs: ['scroll-opacity', 'scroll-blur'], reason: '视觉变化与滚动位置连续对应' },
  { pattern: /滑动.*放大|滚动.*缩放|往下滑.*拉近/, slugs: ['scroll-scale', 'ken-burns'], reason: '画面在阅读过程中逐渐放大' },
  { pattern: /图片.*放大|悬停.*放大|鼠标.*拉近/, slugs: ['hover-zoom', 'zoom-transition'], reason: '图片在指针靠近或打开时放大' },
  { pattern: /下划线.*长|链接.*划线/, slugs: ['hover-underline'], reason: '链接的下划线随悬停展开' },
  { pattern: /勾选|点赞|喜欢|复制.*成功|已复制/, slugs: ['checkbox-check', 'like-burst', 'copy-feedback'], reason: '操作后在控件原位给出反馈' },
  { pattern: /框选|圈选|批量选中/, slugs: ['drag-select'], reason: '拖出选择区域一次选中多个对象' },
  { pattern: /自动保存|已保存|保存中/, slugs: ['save-indicator'], reason: '编辑内容的保存状态会变化' },
  { pattern: /上传.*进度|传了多少|文件.*百分比/, slugs: ['upload-progress'], reason: '上传过程需要显示实际进度' },
  { pattern: /空状态|没有内容|没有结果/, slugs: ['empty-state'], reason: '内容为空时提供说明和下一步' },
  { pattern: /排序.*动画|排序.*移动|重排/, slugs: ['sort-transition', 'list-insert'], reason: '列表顺序或内容发生变化' },
];

function grams(value: string) {
  const normalized = value.toLocaleLowerCase().replace(/[\s，。！？、,.!?：:；;（）()“”"']/g, '');
  const result = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i++) result.add(normalized.slice(i, i + 2));
  return result;
}

export function localIntentSearch(query: string): IntentMatch[] {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return [];
  const queryGrams = grams(needle);
  const matchedRules = intentRules.filter((rule) => rule.pattern.test(needle));

  return motionTerms.map((term) => {
    const family = familyFor(term.slug);
    const text = `${term.title} ${term.english} ${term.cue} ${term.description} ${family?.title ?? ''}`.toLocaleLowerCase();
    const termGrams = grams(text);
    let score = 0;
    let reason = term.cue;
    if (needle.includes(term.title.toLocaleLowerCase()) || needle.includes(term.english.toLocaleLowerCase())) score += 30;
    if (text.includes(needle)) score += 18;
    for (const gram of queryGrams) if (termGrams.has(gram)) score += 0.5;
    for (const rule of matchedRules) if (rule.slugs.includes(term.slug)) {
      score += (rule.weight ?? 8) + (rule.slugs.length - rule.slugs.indexOf(term.slug)) * 2;
      reason = rule.reason;
    }
    return { slug: term.slug, reason, score };
  }).filter((match) => match.score >= (matchedRules.some((rule) => rule.weight === undefined) ? 8 : 4)).sort((a, b) => b.score - a.score).slice(0, 12);
}
