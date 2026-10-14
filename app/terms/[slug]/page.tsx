import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyMarkdown, ReplayDemo } from '../../../components/detail-actions';
import { SiteLogo } from '../../../components/site-logo';
import { MotionControl } from '../../../components/motion-control';
import { motionTermMarkdown, motionTerms } from '../../../data/terms';
import { familyFor } from '../../../data/taxonomy';

export function generateStaticParams() { return motionTerms.map((term) => ({ slug: term.slug })); }

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = motionTerms.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const term = motionTerms[index];
  const family = familyFor(term.slug);
  const previous = motionTerms[(index - 1 + motionTerms.length) % motionTerms.length];
  const next = motionTerms[(index + 1) % motionTerms.length];
  return <main className="term-detail">
    <a className="skip-link" href="#term-content">跳到术语内容</a>
    <header className="site-header"><Link href="/" className="brand"><SiteLogo small /><span>MotionLex<small>会动的网页术语书</small></span></Link><nav aria-label="主导航"><Link href="/#explore">目录 ↗</Link><MotionControl /></nav></header>
    <div className="detail-shell" id="term-content"><Link className="detail-back" href="/#explore">← 返回全部术语</Link><div className="detail-head"><div><span className="eyebrow">{family?.title} / TERM {term.number}</span><h1>{term.title}<span>{term.english}</span></h1><p>{term.cue}</p></div><span className="detail-number">{term.number}</span></div>
      <div className="detail-grid"><div className="detail-preview"><ReplayDemo slug={term.slug} /></div><div className="detail-content"><section className="detail-box"><h2><i>01</i> 这个效果是什么</h2><p>{term.description}</p></section><section className="detail-box prompt-box"><h2><i>02</i> 可以这样告诉 AI</h2><p>{term.prompt}</p><CopyMarkdown markdown={motionTermMarkdown(term)} /></section><section className="detail-box"><h2><i>03</i> 做好后看什么</h2><ul>{term.checks.map((check) => <li key={check}>{check}</li>)}</ul></section></div></div>
      <nav className="detail-next" aria-label="相邻术语"><Link href={`/terms/${previous.slug}`}>← 上一个：{previous.title}</Link><Link href={`/terms/${next.slug}`}>下一个：{next.title} →</Link></nav></div>
  </main>;
}
