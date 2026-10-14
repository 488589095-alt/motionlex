'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { MotionDemo } from '../components/motion-demo';
import { MotionControl } from '../components/motion-control';
import { SiteLogo } from '../components/site-logo';
import { motionTerms } from '../data/terms';
import { familyFor, termFamilies, type Pillar } from '../data/taxonomy';
import type { IntentMatch } from '../lib/intent-search';

type Filter = 'all' | Pillar;
const filters = [
  { id: 'all', label: '全部效果', icon: 'layers' },
  { id: 'scroll', label: '滚动', icon: 'scroll' },
  { id: 'animation', label: '动效', icon: 'waves' },
  { id: 'interaction', label: '交互', icon: 'pointer' },
  { id: 'feedback', label: '内容与反馈', icon: 'book' },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    scroll: <><path d="M8 3v18m0-18-3 3m3-3 3 3M16 21V3m0 18-3-3m3 3 3-3"/></>,
    waves: <><path d="M2 8c3-4 5 4 8 0s5 4 8 0 3-1 4 0M2 16c3-4 5 4 8 0s5 4 8 0 3-1 4 0"/></>,
    pointer: <><path d="m5 3 14 9-6 1-3 6-5-16Z"/><path d="m13 13 4 7"/></>,
    book: <><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14"/></>,
    sparkle: <><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

type SearchResult = { query: string; mode: 'ai' | 'local'; matches: IntentMatch[] };
type SpeechInstance = { lang: string; interimResults: boolean; onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start: () => void; stop: () => void };

export default function Home() {
  const [filter, setFilter] = useState<Filter>('all');
  const [familyId, setFamilyId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const speechRef = useRef<SpeechInstance | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const voiceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRequestRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const nextFilter = params.get('type');
      const nextFamily = params.get('chapter');
      const restoredFilter = filters.some((item) => item.id === nextFilter) ? nextFilter as Filter : 'all';
      setFilter(restoredFilter);
      setFamilyId(termFamilies.some((item) => item.id === nextFamily && (restoredFilter === 'all' || item.pillar === restoredFilter)) ? nextFamily : null);
      const restoredQuery = params.get('q') ?? '';
      setQuery(restoredQuery);
      if (restoredQuery.trim()) void runSearch(restoredQuery);
      else setSearchResult(null);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  async function runSearch(value: string) {
    const phrase = value.trim();
    if (!phrase) { setSearchResult(null); setSearchError(''); return; }
    const requestId = ++searchRequestRef.current;
    setSearching(true);
    setSearchError('');
    try {
      const response = await fetch('/api/intent-search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: phrase }) });
      const data = await response.json() as { error?: string; mode?: 'ai' | 'local'; matches?: IntentMatch[] };
      if (!response.ok) throw new Error(data.error || '暂时无法查找，请稍后再试。');
      if (requestId !== searchRequestRef.current) return;
      setSearchResult({ query: phrase, mode: data.mode === 'ai' ? 'ai' : 'local', matches: data.matches ?? [] });
      setVisibleCount(12);
    } catch (error) {
      if (requestId !== searchRequestRef.current) return;
      setSearchError(error instanceof Error ? error.message : '暂时无法查找，请稍后再试。');
      setSearchResult(null);
    } finally { if (requestId === searchRequestRef.current) setSearching(false); }
  }

  const syncUrl = (nextFilter: Filter, nextFamily: string | null) => {
    const url = new URL(window.location.href);
    if (nextFilter === 'all') url.searchParams.delete('type');
    else url.searchParams.set('type', nextFilter);
    if (nextFamily) url.searchParams.set('chapter', nextFamily);
    else url.searchParams.delete('chapter');
    url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  };

  const matches = useMemo(() => {
    const selected = searchResult ? new Set(searchResult.matches.map((item) => item.slug)) : null;
    return motionTerms.filter((term) => {
      const family = familyFor(term.slug);
      if (filter !== 'all' && family?.pillar !== filter) return false;
      if (familyId && family?.id !== familyId) return false;
      return !selected || selected.has(term.slug);
    }).sort((a, b) => selected ? (searchResult?.matches.findIndex((item) => item.slug === a.slug) ?? 0) - (searchResult?.matches.findIndex((item) => item.slug === b.slug) ?? 0) : 0);
  }, [filter, familyId, searchResult]);

  const updateFilter = (value: Filter) => { setFilter(value); setFamilyId(null); setVisibleCount(12); syncUrl(value, null); };
  const updateFamily = (value: string | null) => { setFamilyId(value); setVisibleCount(12); syncUrl(filter, value); };
  const submitSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); syncUrl(filter, familyId); void runSearch(query); };
  const clearSearch = () => { searchRequestRef.current++; setSearching(false); setQuery(''); setSearchResult(null); setSearchError(''); syncUrl(filter, familyId); };
  const startVoice = async () => {
    if (listening) { speechRef.current?.stop(); recorderRef.current?.stop(); return; }
    const speechWindow = window as typeof window & { SpeechRecognition?: new () => SpeechInstance; webkitSpeechRecognition?: new () => SpeechInstance };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (Recognition) {
      const recognition = new Recognition();
      recognition.lang = 'zh-CN';
      recognition.interimResults = false;
      recognition.onresult = (event) => { const transcript = Array.from(event.results).map((item) => item[0]?.transcript ?? '').join(''); setQuery((current) => [current.trim(), transcript].filter(Boolean).join('，')); setSearchError(''); };
      recognition.onerror = () => setSearchError('语音识别未完成，请检查麦克风权限或改用文字输入。');
      recognition.onend = () => { setListening(false); speechRef.current = null; };
      speechRef.current = recognition;
      try { recognition.start(); setListening(true); setSearchError(''); } catch { setSearchError('无法启动麦克风，请改用文字输入。'); }
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') { setSearchError('当前浏览器暂时无法使用语音输入，请改用文字输入。'); return; }
    try {
      const capability = await fetch('/api/transcribe').then((response) => response.json()) as { available?: boolean };
      if (!capability.available) { setSearchError('语音输入暂时不可用，请改用文字输入。'); return; }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = async () => {
        setListening(false);
        stream.getTracks().forEach((track) => track.stop());
        if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);
        recorderRef.current = null;
        if (!chunks.length) { setSearchError('没有收到录音，请再试一次。'); return; }
        setTranscribing(true);
        try {
          const form = new FormData();
          const mimeType = recorder.mimeType || 'audio/webm';
          form.set('audio', new File(chunks, mimeType.includes('mp4') ? 'idea.mp4' : 'idea.webm', { type: mimeType }));
          const response = await fetch('/api/transcribe', { method: 'POST', body: form });
          const data = await response.json() as { transcript?: string; error?: string };
          if (!response.ok || !data.transcript) throw new Error(data.error || '语音转写失败。');
          setQuery((current) => [current.trim(), data.transcript].filter(Boolean).join('，'));
          setSearchError('');
        } catch (error) { setSearchError(error instanceof Error ? error.message : '语音转写失败。'); }
        finally { setTranscribing(false); }
      };
      recorderRef.current = recorder;
      recorder.start();
      setListening(true);
      setSearchError('');
      voiceTimeoutRef.current = setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, 60000);
    } catch { setSearchError('无法使用麦克风，请检查权限或改用文字输入。'); }
  };
  const availableFamilies = termFamilies.filter((item) => filter === 'all' || item.pillar === filter);
  const reasonFor = (slug: string) => searchResult?.matches.find((item) => item.slug === slug)?.reason;
  const visibleTerms = matches.slice(0, visibleCount);

  return <main>
    <a className="skip-link" href="#explore">跳到术语目录</a>
    <header className="site-header"><Link href="/" className="brand"><SiteLogo small /><span>MotionLex<small>会动的网页术语书</small></span></Link><nav aria-label="主导航"><a href="#explore">去探索 <span>↗</span></a><a href="#how">怎么用</a><MotionControl /></nav></header>

    <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><span className="eyebrow">给正在和 AI 一起做网页的人 ✳</span><h1 id="hero-title">那个效果，<br /><em>原来叫这个！</em></h1><p>先看它怎么动，再知道它叫什么。把准确的描述和验收标准复制给 AI，让网页更接近你脑海里的样子。</p><a className="hero-cta" href="#explore">开始找灵感 <span>↘</span></a><div className="hero-count"><b>{motionTerms.length}</b><span>个动效与交互术语<br />分成 {termFamilies.length} 个细分选项</span></div></div><div className="hero-art" aria-hidden="true"><div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/><span className="art-sticker art-sticker-top">看得见<br />才说得清 ♡</span><div className="art-window"><div className="art-window-bar"><i/><i/><i/><b>little interaction lab</b></div><div className="art-window-stage"><span className="art-dot dot-one"/><span className="art-dot dot-two"/><span className="art-dot dot-three"/><b>hover me!</b><i className="art-cursor">↖</i></div></div><span className="art-star star-one">✳</span><span className="art-star star-two">✦</span><span className="art-sticker art-sticker-bottom">从感觉 → 到实现</span></div></section>

    <div className="marquee-strip" aria-hidden="true"><span>SEE IT ✳ NAME IT ✳ MAKE IT ✳ SEE IT ✳ NAME IT ✳ MAKE IT ✳</span></div>

    <section className="explore" id="explore" aria-labelledby="explore-title"><div className="section-heading"><div><span className="eyebrow">THE LIVING INDEX / 01</span><h2 id="explore-title">翻翻这本<br /><em>会动的词典。</em></h2></div><p>每张卡片都是一个正在发生的小示例。</p></div>

      <div className="intent-search"><div className="intent-search-head"><span><Icon name="sparkle" size={19} /> 用自己的话找效果</span></div>
        <form className="intent-form" onSubmit={submitSearch}><Icon name="search" size={22} /><textarea value={query} onChange={(event) => setQuery(event.target.value)} maxLength={1200} rows={3} placeholder="例如：我想让首页的图片在往下滑时慢慢出现，背景移动得比文字慢；卡片进入画面后再一个个弹出来……" aria-label="描述你想实现的网页效果" />
          <div className="intent-actions"><button type="button" className={`voice-button ${listening ? 'listening' : ''}`} onClick={() => void startVoice()} disabled={transcribing} aria-label={listening ? '停止语音输入' : '开始语音输入'} aria-pressed={listening}><Icon name="mic" size={18} />{transcribing ? '正在转文字…' : listening ? '点击结束录音' : '语音输入'}</button><button className="intent-submit" type="submit" disabled={searching || !query.trim()}>{searching ? '正在查找…' : '找相关术语'} <span>↗</span></button></div></form>
        <div className="intent-search-foot"><span>试着描述触发时机、运动方向、速度或用户操作。</span>{(query || searchResult) && <button type="button" onClick={clearSearch}>清空描述</button>}</div>{searchError && <p className="intent-error" role="alert">{searchError}</p>}
        {searchResult && <div className="intent-summary" role="status"><b>{searchResult.matches.length ? `找到 ${searchResult.matches.length} 个相关术语` : '暂时没有找到'}</b><span>{searchResult.matches.length ? '点开卡片看看是不是你要的效果。' : '换个说法试试。'}</span></div>}
      </div>

      <div className="filter-panel"><div className="filter-step"><div className="filter-step-title"><b>01</b><span>先选效果大类</span></div><div className="filter-tabs" role="group" aria-label="按效果类型筛选">{filters.map((item) => { return <button type="button" key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => updateFilter(item.id as Filter)} aria-pressed={filter === item.id}><Icon name={item.icon} />{item.label}</button>; })}</div></div>
        <div className="filter-step"><div className="filter-step-title"><b>02</b><span>再选具体选项</span></div><div className="chapter-list" role="group" aria-label="按具体选项筛选"><button type="button" aria-pressed={!familyId} className={!familyId ? 'selected' : ''} onClick={() => updateFamily(null)}>全部选项</button>{availableFamilies.map((family) => <button type="button" key={family.id} aria-pressed={familyId === family.id} className={familyId === family.id ? 'selected' : ''} onClick={() => updateFamily(family.id)}>{family.title}<small>{family.hint}</small></button>)}</div></div>
      </div>

      <div className="explore-layout">

        <div className="results"><div className="results-head"><div><span>{familyId ? termFamilies.find((item) => item.id === familyId)?.english : filter === 'all' ? 'ALL THE LITTLE MOTIONS' : filters.find((item) => item.id === filter)?.label}</span><h3>{searchResult ? '这些术语可能是你要找的' : familyId ? termFamilies.find((item) => item.id === familyId)?.title : filter === 'all' ? '从这里开始逛逛' : `${filters.find((item) => item.id === filter)?.label}相关效果`}</h3></div><span role="status">{matches.length} 个效果 · 点击卡片看完整说明 ↗</span></div>
          {visibleTerms.length ? <div className="term-grid">{visibleTerms.map((term) => { const family = familyFor(term.slug); return <Link href={`/terms/${term.slug}`} className="term-card" key={term.slug}><MotionDemo slug={term.slug} /><div className="term-card-copy"><div><span>{family?.title ?? '动效'}</span><i>NO. {term.number}</i></div><h4>{term.title}<small>{term.english}</small></h4><p>{term.cue}</p>{reasonFor(term.slug) && <p className="match-reason"><Icon name="sparkle" size={13} />{reasonFor(term.slug)}</p>}<span className="term-card-arrow">↗</span></div></Link>; })}</div> : <div className="empty-results"><span>☁</span><h3>还没找到这个效果</h3><p>换个说法试试，或者调整上面的分类。</p><button type="button" onClick={() => { clearSearch(); setFilter('all'); setFamilyId(null); setVisibleCount(12); syncUrl('all', null); }}>查看全部术语 ↗</button></div>}
          {visibleCount < matches.length && <button className="load-more" type="button" onClick={() => setVisibleCount((count) => count + 12)}>再看 12 个效果 <span>↓</span></button>}
        </div></div></section>

    <section className="how" id="how"><span className="eyebrow">HOW IT WORKS / 02</span><h2>说出来 · 看明白 · 做出来 <span>✳</span></h2><div className="how-steps"><div><b>01</b><strong>说出想法</strong><p>打字或语音，说出你想要的画面。</p></div><div><b>02</b><strong>看动态</strong><p>从候选卡片里看真实示意，确认是不是你想要的效果。</p></div><div><b>03</b><strong>复制给 AI</strong><p>点开术语，把实现要求和验收要点一起发给 AI，再按真实页面检查。</p></div></div></section>

    <footer className="site-footer"><Link href="/" className="brand"><SiteLogo small /><span>MotionLex<small>会动的网页术语书</small></span></Link><span>© 2026 MOTIONLEX · MADE TO MAKE IDEAS CLEAR</span><a href="#hero-title">回到顶部 ↑</a></footer>
  </main>;
}
