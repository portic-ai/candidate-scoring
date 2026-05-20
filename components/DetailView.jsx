// Detail view — candidate profile with pipeline drill-down, radar, factors +/−/vs ideal, and evidence drawer.
const DetailView = ({ candidate, onBack, tweaks }) => {
  const c = candidate;
  const [activeDim, setActiveDim] = React.useState(() => {
    const firstWithScore = window.DIMENSIONS.find(d => c.scores[d.id] != null);
    return firstWithScore ? firstWithScore.id : 'comm';
  });
  const [phase, setPhase] = React.useState('all'); // all | cv | interview | psico
  const [evTab, setEvTab] = React.useState('transcript');

  const showIdeal = tweaks.compare === 'ideal' || tweaks.compare === 'both';
  const showAvg   = tweaks.compare === 'average' || tweaks.compare === 'both';

  const dim = window.DIMENSIONS.find(d => d.id === activeDim) || window.DIMENSIONS[0];
  const dimScore = c.scores[activeDim];
  const dimStages = (window.DIM_STAGE[c.id] && window.DIM_STAGE[c.id][activeDim]) || { cv:null, interview:null, psico:null, note:'' };
  const transcript = (window.TRANSCRIPTS[c.id] && window.TRANSCRIPTS[c.id][activeDim]) || [];
  const cvExtract  = (window.CV_EXTRACTS[c.id] && window.CV_EXTRACTS[c.id][activeDim]);
  const psico      = (window.PSICO[c.id] && window.PSICO[c.id][activeDim]) || [];

  // Keep evTab consistent with phase
  React.useEffect(() => {
    if (phase === 'cv') setEvTab('cv');
    else if (phase === 'interview') setEvTab('transcript');
    else if (phase === 'psico') setEvTab('psico');
  }, [phase]);

  // Final score ring
  const ringR = 54;
  const ringC = 2 * Math.PI * ringR;
  const finalScore = c.score ?? 0;

  const hasScores = c.score != null && Object.keys(c.scores).length > 0;

  return (
    <div className="detail" data-screen-label={`02 Detalle · ${c.name}`}>
      {/* LEFT column */}
      <div className="detail-left">
        <button className="back-link" onClick={onBack}>← Volver a candidatos</button>

        <div className="cand-hero">
          <div className="avatar-lg">{c.initials}</div>
          <div className="cand-hero-info">
            <h2>{c.name}</h2>
            <div className="meta">
              <span>{c.prev}</span>
              <span className="meta-sep"> · </span>
              <span>{c.city}</span>
              <span className="meta-sep"> · </span>
              <span>{c.exp_years} años de exp.</span>
            </div>
            <div style={{marginTop:10, display:'flex', gap:8, flexWrap:'wrap'}}>
              {c.tier === 'strong' && <span className="tier strong"><span className="d"></span>Recomendado</span>}
              {c.tier === 'review' && <span className="tier review"><span className="d"></span>Revisar</span>}
              {c.tier === 'weak'   && <span className="tier weak"><span className="d"></span>Descartar</span>}
              {c.tier === 'pending'&& <span style={{fontSize:11, color:'var(--ink-4)', textTransform:'uppercase', letterSpacing:'0.08em'}}>— En cola</span>}
              <button className="btn ghost" style={{padding:'2px 10px', fontSize:11, color:'var(--ink-3)', background:'var(--bg-soft)'}}>↗ CV completo</button>
              {c.stage>=1 && <button className="btn ghost" style={{padding:'2px 10px', fontSize:11, color:'var(--ink-3)', background:'var(--bg-soft)'}}>↗ Grabación</button>}
            </div>
          </div>
        </div>

        {hasScores && (
          <div className="score-block">
            <div className="score-ring">
              <svg viewBox="0 0 128 128">
                <circle className="ring-bg" cx="64" cy="64" r={ringR} />
                <circle className="ring-target" cx="64" cy="64" r={ringR}
                  strokeDasharray={`${(82/100)*ringC} ${ringC}`} />
                <circle className="ring-fg" cx="64" cy="64" r={ringR}
                  strokeDasharray={`${(finalScore/100)*ringC} ${ringC}`} />
              </svg>
              <div className="score-ring-center">
                <div>
                  <div className="big">{finalScore}<span style={{fontSize:20, color:'var(--ink-3)'}}>%</span></div>
                  <div className="sub">match vs ideal</div>
                </div>
              </div>
            </div>
            <div className="score-block-info">
              <div className="label">Resumen IA · Retention</div>
              <h3 className="serif">{c.name.split(' ')[0]} {
                c.tier==='strong' ? 'se aproxima al perfil ideal con señales consistentes entre fases.' :
                c.tier==='review' ? 'tiene señales mixtas — conviene revisar con cuidado antes de decidir.' :
                c.tier==='weak' ? 'no alcanza el umbral mínimo para el rol en este ciclo.' :
                'está en cola de análisis.'
              }</h3>
              <p>{c.summary}</p>
            </div>
          </div>
        )}

        {hasScores && (
          <PipelineModule
            c={c}
            phase={phase}
            onPhaseChange={setPhase}
          />
        )}

        {/* Factors */}
        {hasScores && <FactorsVsIdeal c={c} onSelect={setActiveDim} activeDim={activeDim} />}
      </div>

      {/* RIGHT column */}
      <div className="detail-right">
        {hasScores && (
          <div className="radar-card">
            <div className="radar-card-head">
              <div>
                <h3>Ajuste por dimensión</h3>
                <p>Haz click en un eje para ver la evidencia que soporta la nota.</p>
              </div>
              <div className="radar-legend">
                <span><span className="legend-swatch" style={{background:'var(--rt)'}}></span>Candidato</span>
                {showIdeal && <span><span className="legend-swatch" style={{background:'transparent', border:'1px dashed var(--ink-3)'}}></span>Ideal</span>}
                {showAvg && <span><span className="legend-swatch" style={{background:'transparent', border:'1px dashed var(--warn)'}}></span>Promedio</span>}
              </div>
            </div>
            <div className="radar-wrap">
              <RadarChart
                scores={c.scores} ideal={window.IDEAL} average={window.AVERAGE}
                dimensions={window.DIMENSIONS}
                activeDim={activeDim} onSelect={setActiveDim} onHover={()=>{}}
                showIdeal={showIdeal} showAverage={showAvg}
              />
            </div>
            <div className="dim-list">
              {window.DIMENSIONS.map((d, i) => (
                <div key={d.id} className={`dim-row ${activeDim===d.id?'active':''}`} onClick={()=>setActiveDim(d.id)}>
                  <span className="dim-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="dim-name">{d.name}</span>
                  <div className="dim-bar"><span style={{width:`${c.scores[d.id]||0}%`}}></span></div>
                  <span className="dim-score">{c.scores[d.id]!=null ? c.scores[d.id]+'%' : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasScores && (
          <div className="evidence-panel">
            <div className="ev-head">
              <div className="ev-head-info">
                <div className="eyebrow">Evidencia · {dim.block}</div>
                <h3 className="serif">{dim.name}</h3>
                <p style={{margin:'6px 0 0', color:'var(--ink-3)', fontSize:12.5, lineHeight:1.5}}>
                  {dimStages.note}
                </p>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="ev-score-mini">{dimScore!=null?dimScore:'—'}<small>% match</small></div>
                <div style={{fontSize:11, color:'var(--ink-4)', marginTop:4}}>ideal: {window.IDEAL[activeDim]}% · prom: {window.AVERAGE[activeDim]}%</div>
              </div>
            </div>

            {/* Phase tabs */}
            <div className="ev-phase-tabs">
              {[['all','Todas las fases'],['cv','CV'],['interview','Entrevista'],['psico','Psicotécnico']].map(([k,label]) => (
                <button key={k} className={phase===k?'on':''} onClick={()=>setPhase(k)}>{label}</button>
              ))}
            </div>

            {/* Stage cards (highlighted if matches phase) */}
            <div style={{padding:'14px 22px 4px'}}>
              <div className="stage-contrib">
                {['cv','interview','psico'].map(k => {
                  const s = dimStages[k];
                  const labels = { cv:'Análisis CV', interview:'Entrevista', psico:'Psicotécnico' };
                  const weights = { cv:'25%', interview:'45%', psico:'30%' };
                  const highlight = phase === k;
                  return (
                    <div key={k} className={`stage-card ${highlight?'highlight':''}`}>
                      <div className="eyebrow">{labels[k]}</div>
                      <div className="stage-score">
                        {s!=null ? <>{s}<small>/100</small></> : <span style={{color:'var(--ink-4)', fontSize:13}}>no aplica</span>}
                      </div>
                      <div className="stage-weight">peso {weights[k]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="ev-tabs" style={{marginTop:14}}>
              <button className={`ev-tab ${evTab==='transcript'?'active':''}`} onClick={()=>setEvTab('transcript')}>
                Transcripción<span className="tag">{transcript.length}</span>
              </button>
              <button className={`ev-tab ${evTab==='cv'?'active':''}`} onClick={()=>setEvTab('cv')}>
                Extracto CV
              </button>
              <button className={`ev-tab ${evTab==='psico'?'active':''}`} onClick={()=>setEvTab('psico')}>
                Psicotécnico<span className="tag">{psico.length || 0}</span>
              </button>
              <div style={{flex:1}}/>
              <button className="ev-tab" style={{color:'var(--ink-4)'}}>⇲ Exportar</button>
            </div>

            <div className="ev-body">
              {evTab === 'transcript' && <TranscriptView lines={transcript} />}
              {evTab === 'cv' && cvExtract && (
                <div className="cv-extract" dangerouslySetInnerHTML={{__html: `<h5>${cvExtract.title}</h5>${cvExtract.body}`}} />
              )}
              {evTab === 'cv' && !cvExtract && (
                <div style={{color:'var(--ink-4)', fontSize:13}}>Sin extracto de CV para esta dimensión.</div>
              )}
              {evTab === 'psico' && <PsicoView items={psico} />}
            </div>
          </div>
        )}

        {!hasScores && (
          <div className="radar-card">
            <h3>Análisis en cola</h3>
            <p style={{color:'var(--ink-3)', fontSize:13, margin:'8px 0 0'}}>
              Este candidato aún no ha sido evaluado. La evaluación automática del CV se dispara en los próximos minutos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ---- Pipeline module with fused view + drill-down ----
const PipelineModule = ({ c, phase, onPhaseChange }) => {
  const segs = [
    { key:'cv', label:'CV', score:c.stageScores.cv, weight:25 },
    { key:'interview', label:'Entrevista', score:c.stageScores.interview, weight:45 },
    { key:'psico', label:'Psicotécnico', score:c.stageScores.psico, weight:30 },
  ];
  const weightedSum = segs.reduce((acc, s) => acc + (s.score!=null ? s.score * s.weight/100 : 0), 0);
  const weightTotal = segs.reduce((acc, s) => acc + (s.score!=null ? s.weight : 0), 0);
  const final = weightTotal>0 ? Math.round(weightedSum * 100 / weightTotal) : null;

  const tierCls = (sc) => sc==null?'pending' : sc>=80?'done-strong' : sc>=65?'done-ok' : sc>=55?'done-review' : 'done-weak';
  const tierTag = (sc) => sc==null?'—' : sc>=80?'Muy por encima' : sc>=65?'Sobre meta' : sc>=55?'Bajo meta' : 'Muy bajo';

  return (
    <div className="pipeline-module">
      <div className="pipeline-module-head">
        <h4>Pipeline de evaluación</h4>
        <span className="hint">Ancho = peso en la nota final · Click para enfocar evidencia</span>
      </div>

      <div className="pipeline-tabs">
        {[['all','Todas'],['cv','CV'],['interview','Entrevista'],['psico','Psicotécnico']].map(([k,l]) => (
          <button key={k} className={phase===k?'on':''} onClick={()=>onPhaseChange(k)}>{l}</button>
        ))}
      </div>

      <div className="pipeline-fused">
        {segs.map(s => {
          const active = phase === s.key;
          return (
            <div key={s.key}
              className={`fseg ${tierCls(s.score)} ${active?'active':''} ${s.score==null?'pending':''}`}
              style={{flex: s.weight}}
              onClick={()=>onPhaseChange(active?'all':s.key)}>
              <div className="fseg-top">
                <span className="fseg-label">
                  <span className="fseg-idx">{s.score!=null?'✓':'·'}</span>
                  {s.label}
                </span>
                <span className="fseg-weight">{s.weight}%</span>
              </div>
              <div className="fseg-fill"><span style={{width: s.score!=null?`${s.score}%`:'0%'}}></span></div>
              <div className="fseg-bot">
                {s.score!=null ? (
                  <>
                    <span className="fseg-score">{s.score}<small>/100</small></span>
                    <span className="fseg-tag">{tierTag(s.score)}</span>
                  </>
                ) : (
                  <span className="fseg-tag">Pendiente</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pipeline-final">
        <span className="pf-label">Nota final ponderada</span>
        <span className="pf-val">{final!=null?final:'—'}<small>/100</small></span>
      </div>
    </div>
  );
};

// ---- Factors: + / − / vs ideal ----
const FactorsVsIdeal = ({ c, onSelect, activeDim }) => {
  const pos = c.factorsPos || [];
  const neg = c.factorsNeg || [];

  // Compute per-dimension delta vs ideal
  const gaps = window.DIMENSIONS
    .map(d => ({ id:d.id, name:d.short, full:d.name, delta: (c.scores[d.id]||0) - window.IDEAL[d.id] }))
    .filter(g => c.scores[g.id] != null);
  const negGaps = [...gaps].filter(g => g.delta < 0).sort((a,b) => a.delta - b.delta).slice(0, 3);
  const posGaps = [...gaps].filter(g => g.delta >= 0).sort((a,b) => b.delta - a.delta).slice(0, 3);
  const orderedGaps = [...negGaps, ...posGaps];
  const maxAbs = Math.max(...orderedGaps.map(g => Math.abs(g.delta)), 15);

  const srcChip = (src) => <span className="src-chip"><span className="s"></span>{src}</span>;

  return (
    <>
      {pos.length > 0 && (
        <div className="factor-block pos">
          <div className="factor-block-head">
            <span className="icon">+</span>
            <h4>Suben la nota</h4>
            <span className="count">{pos.length}</span>
          </div>
          {pos.map((f,i) => (
            <div key={i} className="factor-item" onClick={()=>onSelect && onSelect(f.id)} style={{cursor:'pointer'}}>
              <div className="row1">
                <strong>{f.title}</strong>
                <span className="factor-delta">{f.delta}</span>
              </div>
              {f.body && <p>{f.body}</p>}
              {f.src && srcChip(f.src)}
            </div>
          ))}
        </div>
      )}

      {neg.length > 0 && (
        <div className="factor-block neg">
          <div className="factor-block-head">
            <span className="icon">−</span>
            <h4>Bajan la nota</h4>
            <span className="count">{neg.length}</span>
          </div>
          {neg.map((f,i) => (
            <div key={i} className="factor-item" onClick={()=>onSelect && onSelect(f.id)} style={{cursor:'pointer'}}>
              <div className="row1">
                <strong>{f.title}</strong>
                <span className="factor-delta">{f.delta}</span>
              </div>
              {f.body && <p>{f.body}</p>}
              {f.src && srcChip(f.src)}
            </div>
          ))}
        </div>
      )}

      {orderedGaps.length > 0 && (
        <div className="factor-block gap">
          <div className="factor-block-head">
            <span className="icon">△</span>
            <h4>Brecha vs. candidato ideal</h4>
            <span className="count">por dimensión</span>
          </div>
          {orderedGaps.map(g => {
            const sign = g.delta >= 0 ? 'pos' : 'neg';
            const w = Math.min(50, Math.abs(g.delta) / maxAbs * 50);
            return (
              <div key={g.id} className="gap-row" onClick={()=>onSelect && onSelect(g.id)} title={g.full}>
                <span className="gname">{g.full}</span>
                <div className="gbar">
                  <div className="center-line"></div>
                  <div className={`gfill ${sign}`} style={sign==='pos' ? {width:`${w}%`} : {width:`${w}%`}}></div>
                </div>
                <span className={`gval ${sign}`}>{g.delta>=0?'+':''}{g.delta}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// ---- Transcript / Psico subviews ----
const TranscriptView = ({ lines }) => {
  if (!lines.length) return <div style={{color:'var(--ink-4)', fontSize:13, padding:'20px 0'}}>Sin fragmentos de entrevista para esta dimensión.</div>;
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14, padding:'8px 12px', background:'var(--bg-soft)', borderRadius:8, fontSize:12, color:'var(--ink-3)'}}>
        <span style={{width:8, height:8, borderRadius:'50%', background:'var(--bad)', flexShrink:0}}></span>
        Entrevista grabada · 62 min · Moderada por Ana R. · Extractos relevantes
        <span style={{marginLeft:'auto', fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-4)'}}>▶ reproducir momento</span>
      </div>
      {lines.map((l, i) => (
        <div key={i} className={`transcript-line ${l.highlight==='good'?'good-highlight':''} ${l.highlight==='bad'?'bad-highlight':''}`}>
          <div className="transcript-head">
            <span className={`transcript-who ${l.role==='int'?'int':''}`}>{l.who}</span>
            {l.role === 'int' && <span style={{fontSize:10, color:'var(--ink-4)', textTransform:'uppercase', letterSpacing:'0.06em'}}>Entrevistador</span>}
            <span className="transcript-time">⏵ {l.t}</span>
          </div>
          <div className="transcript-text">{l.text}</div>
        </div>
      ))}
    </div>
  );
};

const PsicoView = ({ items }) => {
  if (!items || !items.length || items[0].name?.startsWith('N/A')) return <div style={{color:'var(--ink-4)', fontSize:13, padding:'20px 0'}}>Esta dimensión no se mide en el psicotécnico, o el candidato aún no lo ha realizado.</div>;
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10, padding:'8px 12px', background:'var(--bg-soft)', borderRadius:8, fontSize:12, color:'var(--ink-3)'}}>
        <span style={{width:8, height:8, borderRadius:'50%', background:'var(--rt)', flexShrink:0}}></span>
        Batería Hogan + cuestionario propio · 38 min <span style={{marginLeft:'auto', color:'var(--ink-4)'}}>línea vertical = percentil objetivo</span>
      </div>
      <div className="psico-grid">
        {items.map((p, i) => {
          const cls = p.score >= p.ideal ? 'good' : (p.score >= p.ideal - 8 ? 'warn' : 'bad');
          return (
            <div className="psico-item" key={i}>
              <div className="psico-name">{p.name}</div>
              <div className="psico-bar-wrap">
                <div className={`psico-bar-fill ${cls}`} style={{width:`${p.score}%`}}></div>
                <div className="psico-ideal-mark" style={{left:`${p.ideal}%`}}></div>
              </div>
              <div className="psico-score">{p.score}<small>p</small></div>
            </div>
          );
        })}
      </div>
      <div className="psico-note">
        Los percentiles comparan contra una norma de 1.240 asesores de seguros activos en Colombia. El objetivo se fija por análisis predictivo de desempeño a 12 meses en el rol.
      </div>
    </div>
  );
};

window.DetailView = DetailView;
