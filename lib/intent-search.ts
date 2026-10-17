import { motionTerms } from '../data/terms';
import { familyFor } from '../data/taxonomy';

export interface IntentMatch { slug: string; reason: string; score?: number }

const intentRules: { pattern: RegExp; slugs: string[]; reason: string; weight?: number }[] = [
  { pattern: /滚动.*穿过|滚动.*走进|滑.*进入.*画面|镜头.*穿过/, slugs: ['scroll-portal-walk', 'image-tunnel'], reason: '画面随阅读向前穿行' },
  { pattern: /立体.*转|3d.*转|模型.*跟.*滚|滚动.*模型/, slugs: ['scroll-3d-pose', 'cylindrical-carousel'], reason: '立体对象随操作改变朝向' },
  { pattern: /圆筒.*卡|环形.*卡|卡片.*围成.*圈/, slugs: ['cylindrical-carousel', 'orbit-gallery'], reason: '卡片沿立体圆周排列' },
  { pattern: /手牌|扇形.*卡|照片.*翻堆|照片.*一叠/, slugs: ['fan-deck', 'photo-stack'], reason: '卡片以实体堆叠方式展开' },
  { pattern: /图片.*隧道|照片.*穿梭|图片.*通道/, slugs: ['image-tunnel'], reason: '图片沿纵深方向连续排列' },
  { pattern: /网格.*变形|网格.*凹|橡皮布.*鼠标/, slugs: ['mesh-warp', 'grid-warp-text'], reason: '局部网格受到指针影响' },
  { pattern: /粒子.*地球|点.*地球|星球.*转/, slugs: ['particle-globe'], reason: '由点阵组成的球体持续转动' },
  { pattern: /玻璃.*竖纹|竖纹.*折射|毛玻璃.*条纹/, slugs: ['fluted-glass'], reason: '竖向玻璃纹路改变图片呈现' },
  { pattern: /词.*聚焦|文字.*聚焦|一个词.*清楚/, slugs: ['focus-frame-text'], reason: '聚焦框依次让词组清晰' },
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
  { pattern: /卡片.*叠|一层层叠|重叠.*滚|越滑越叠/, slugs: ['stacking-cards'], reason: '卡片随滚动逐张叠放' },
  { pattern: /像翻书|翻页|卷起来|卷页/, slugs: ['page-curl', 'cube-transition'], reason: '画面像实体页面一样翻转' },
  { pattern: /幕布|拉开.*画面|遮住.*揭开/, slugs: ['curtain-reveal', 'circle-reveal'], reason: '用遮挡层揭示新画面' },
  { pattern: /开关|切换开关|打开.*关闭|白天.*黑夜|日夜/, slugs: ['toggle-switch', 'theme-toggle'], reason: '控件在两个状态之间切换' },
  { pattern: /星级|打分|评分|几颗星/, slugs: ['star-rating'], reason: '选择并显示评分等级' },
  { pattern: /长按|按住.*确认|按住.*删除/, slugs: ['hold-to-confirm'], reason: '按住达到时长后才确认操作' },
  { pattern: /边输入.*候选|输入.*选项|下拉.*搜索/, slugs: ['combobox', 'search-suggest'], reason: '输入时从候选中选择' },
  { pattern: /底部.*下拉|往下拉.*关闭|拖.*弹层/, slugs: ['drag-dismiss-sheet'], reason: '下拉手势关闭底部弹层' },
  { pattern: /极光|流光|波纹|粒子|星空|背景.*动/, slugs: ['aurora', 'ambient-ripples', 'particle-constellation', 'starfield'], reason: '背景中的持续视觉动效' },
  { pattern: /文字.*逐个|一个词.*出现|字.*写出来|字.*填色/, slugs: ['word-by-word-reveal', 'handwriting-draw', 'text-fill-on-scroll'], reason: '文字按阅读顺序逐步显现' },
  { pattern: /曲线.*画|图表.*长出来|折线.*出现/, slugs: ['chart-line-draw'], reason: '图表线条沿数据路径画出' },
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
