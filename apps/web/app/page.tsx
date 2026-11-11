'use client';

import { useMemo, useState } from 'react';
import { BookOpen, BrainCircuit, Check, ChevronRight, Clock3, FileText, Folder, GraduationCap, LayoutDashboard, Menu, Plus, Search, Settings, Sparkles, UploadCloud, X, Network, ArrowUpRight } from 'lucide-react';

type Topic = { id: number; title: string; group: string; status: 'Ready' | 'Needs review' | 'In progress'; detail: string; progress: number };
const initialTopics: Topic[] = [
  { id: 1, title: 'GraphPlan', group: 'Non-Forward Search', status: 'Ready', detail: 'Planning graphs, mutex relations, and backward extraction.', progress: 100 },
  { id: 2, title: 'Planning as SAT', group: 'Non-Forward Search', status: 'In progress', detail: 'Encoding planning problems as propositional satisfiability.', progress: 42 },
  { id: 3, title: 'Partial-Order Planning', group: 'Non-Forward Search', status: 'Needs review', detail: 'Causal links, threats, and plan-space search.', progress: 0 },
  { id: 4, title: 'Simple Temporal Networks', group: 'Temporal Planning', status: 'Ready', detail: 'Time-point constraints and consistency checking.', progress: 76 },
  { id: 5, title: 'PDDL 2.1', group: 'Temporal Planning', status: 'In progress', detail: 'Durative actions, numeric fluents, and temporal semantics.', progress: 25 },
];

export default function Home() {
  const [topics, setTopics] = useState(initialTopics);
  const [active, setActive] = useState('Overview');
  const [selected, setSelected] = useState<Topic | null>(null);
  const [query, setQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [toast, setToast] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const filtered = useMemo(() => topics.filter(t => `${t.title} ${t.group}`.toLowerCase().includes(query.toLowerCase())), [topics, query]);
  const pending = topics.filter(t => t.status === 'Needs review').length;
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const nav = [{ label: 'Overview', icon: LayoutDashboard }, { label: 'My library', icon: Folder }, { label: 'Topic review', icon: Check }, { label: 'Revision', icon: BrainCircuit }];

  return <main className="shell">
    <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={19}/></div><span>studyforge</span><button className="icon-btn close-menu" onClick={() => setMobileMenu(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="workspace"><div className="workspace-avatar">AI</div><span><b>MSc Artificial Intelligence</b><small>King’s College London</small></span></div>
      <nav>{nav.map(n => <button key={n.label} className={`nav-item ${active === n.label ? 'active' : ''}`} onClick={() => { setActive(n.label); setMobileMenu(false); setReviewMode(n.label === 'Topic review'); }}><n.icon size={18}/>{n.label}{n.label === 'Topic review' && pending > 0 && <span className="nav-count">{pending}</span>}</button>)}</nav>
      <div className="sidebar-divider"/><div className="workspace-label">YOUR SUBJECTS</div>
      <div className="subject-link selected-subject"><span className="subject-dot purple"/>Artificial Intelligence <span className="subject-number">12</span></div>
      <div className="subject-link"><span className="subject-dot blue"/>Machine Learning <span className="subject-number">8</span></div>
      <div className="subject-link"><span className="subject-dot orange"/>Computer Vision <span className="subject-number">6</span></div>
      <button className="add-subject" onClick={() => notify('Subject creation will be connected to the database next.')}><Plus size={15}/> Add subject</button>
      <div className="sidebar-bottom"><button className="nav-item" onClick={() => notify('Settings are coming in the next build.')}><Settings size={18}/>Settings</button><div className="profile"><div className="profile-avatar">SD</div><div><b>Shaun Dias</b><small>Student workspace</small></div></div></div>
    </aside>
    {mobileMenu && <button className="scrim" onClick={() => setMobileMenu(false)} aria-label="Close menu"/>}
    <section className="main-area">
      <header className="topbar"><button className="icon-btn mobile-menu-btn" onClick={() => setMobileMenu(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <b>{active}</b></div><div className="top-actions"><span>Study workspace</span><div className="top-avatar">SD</div></div></header>
      <div className="content">
        <div className="welcome-row"><div><div className="eyebrow">YOUR PERSONAL LEARNING WORKSPACE</div><h1>{reviewMode ? 'Review your topics' : active === 'Overview' ? 'Good afternoon, Shaun' : active}</h1><p>{reviewMode ? 'Check the topics StudyForge found before generating your study material.' : 'Your learning workspace is ready. Let’s make progress today.'}</p></div><button className="primary-btn" onClick={() => setShowUpload(true)}><UploadCloud size={17}/> Upload lectures</button></div>
        {active === 'Overview' && !reviewMode && <>
          <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Topics in your library</span><BookOpen size={17}/></div><div className="stat-value">26</div><div className="stat-foot"><span className="trend">+5</span> extracted this week</div></div><div className="stat-card"><div className="stat-top"><span>Learning resources</span><FileText size={17}/></div><div className="stat-value">14</div><div className="stat-foot">Across 3 subjects</div></div><div className="stat-card"><div className="stat-top"><span>Awaiting your review</span><Clock3 size={17}/></div><div className="stat-value">{pending}</div><div className="stat-foot">Approve before generation</div></div><div className="stat-card"><div className="stat-top"><span>Study progress</span><BrainCircuit size={17}/></div><div className="stat-value">38<span className="percent">%</span></div><div className="progress-track"><span style={{width:'38%'}}/></div></div></div>
          <div className="section-heading"><div><h2>Continue learning</h2><p>Pick up where you left off</p></div><button className="text-btn" onClick={() => setActive('My library')}>View library <ArrowUpRight size={15}/></button></div>
          <button className="continue-card" onClick={() => setSelected(topics[0])}><div className="continue-icon"><Network size={23}/></div><div className="continue-copy"><span className="tag">AI PLANNING · NON-FORWARD SEARCH</span><h3>GraphPlan</h3><p>Understand planning graphs, mutex relations and solution extraction.</p><div className="continue-progress"><div className="progress-track"><span style={{width:'100%'}}/></div><small>Completed · Review anytime</small></div></div><span className="arrow-circle"><ArrowUpRight size={18}/></span></button>
        </>}
        <div className="section-heading topic-heading"><div><h2>{reviewMode ? 'Topics to review' : 'Your AI Planning topics'}</h2><p>{reviewMode ? 'Review these sample topic candidates.' : 'A snapshot of your current subject library'}</p></div><div className="topic-actions"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics"/></div><button className="filter-btn" onClick={() => setReviewMode(!reviewMode)}>{reviewMode ? 'All topics' : 'Review queue'}</button></div></div>
        <div className="topic-list">{filtered.filter(t => !reviewMode || t.status === 'Needs review').map(topic => <button className="topic-row" key={topic.id} onClick={() => setSelected(topic)}><div className="topic-file"><FileText size={18}/></div><div className="topic-info"><b>{topic.title}</b><small>{topic.group} <span>·</span> {topic.detail}</small></div><span className={`status status-${topic.status.toLowerCase().replace(' ','-')}`}><i/>{topic.status}</span><ChevronRight className="topic-chevron" size={17}/></button>)}{filtered.filter(t => !reviewMode || t.status === 'Needs review').length === 0 && <div className="empty-state">No topics match this view.</div>}</div>
        <div className="bottom-grid"><div className="tip-card"><div className="tip-icon"><Sparkles size={18}/></div><div><b>Your study system, getting smarter</b><p>Upload lecture slides and StudyForge will identify topics, connect related material and prepare structured learning resources — with your approval.</p></div></div><div className="source-card"><div className="source-icon"><GraduationCap size={20}/></div><div><b>Current course</b><p>MSc Artificial Intelligence</p><small>King’s College London</small></div></div></div>
        <footer>StudyForge <span>·</span> Your knowledge, organised.</footer>
      </div>
    </section>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="topic-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-btn" onClick={() => setSelected(null)}><X size={19}/></button><span className="tag">{selected.group.toUpperCase()}</span><h2>{selected.title}</h2><p>{selected.detail}</p><div className="modal-section"><h4>Learning resource</h4><p>This is a prototype preview. The connected version will include a beginner explanation, deeper theory, diagrams, worked examples and exam preparation.</p></div><div className="modal-section"><h4>Study progress</h4><div className="progress-track"><span style={{width:`${selected.progress}%`}}/></div><small>{selected.progress}% complete</small></div>{selected.status === 'Needs review' && <button className="primary-btn full-btn" onClick={() => {setTopics(prev => prev.map(t => t.id === selected.id ? {...t,status:'In progress'} : t)); setSelected(null); notify('Topic approved in this demo.');}}> <Check size={17}/> Approve topic</button>}</div></div>}
    {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}><div className="upload-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-btn" onClick={() => setShowUpload(false)}><X size={19}/></button><div className="upload-symbol"><UploadCloud size={25}/></div><h2>Upload lecture materials</h2><p>Add your PowerPoint or PDF files. Real extraction and storage will be connected in a later implementation stage.</p><label className="dropzone"><input type="file" accept=".pdf,.ppt,.pptx" multiple onChange={e => {if(e.target.files?.length){setUploaded(true);}}}/><UploadCloud size={25}/><b>{uploaded ? 'Files selected' : 'Choose files or drop them here'}</b><small>PDF, PPT and PPTX · Multiple files supported</small></label>{uploaded && <div className="success-note"><Check size={16}/> Files selected locally for this demo.</div>}<button className="primary-btn full-btn" onClick={() => {setShowUpload(false); notify(uploaded ? 'Demo upload captured. Files are not stored yet.' : 'Choose a file first.');}}>{uploaded ? 'Continue' : 'Got it'}</button></div></div>}
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </main>;
}