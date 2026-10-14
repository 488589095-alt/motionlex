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
