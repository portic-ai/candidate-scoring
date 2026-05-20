// Compare view — side-by-side radar + table for up to 4 candidates, with phase drill-down.
const COMPARE_COLORS = [
  'var(--cmp-1)',
  'var(--cmp-2)',
  'var(--cmp-3)',
  'var(--cmp-4)',
];

const CompareView = ({ candidates, selected, onOpen, onRemove, onBack, onAdd }) => {
  const size = 440;
  const cx = size/2, cy = size/2;
  const R = size * 0.34;
  const dims = window.DIMENSIONS;
  const n = dims.length;
  const [phase, setPhase] = React.useState('final');  // final | cv | interview | psico
  const [addOpen, setAddOpen] = React.useState(false);
  const [addQuery, setAddQuery] = React.useState('');

  const angle = i => (-Math.PI/2) + (i * 2*Math.PI / n);
  const point = (i, v) => {
    const a = angle(i); const r = (v/100) * R;
    return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
  };
  const polyPts = (vals) => dims.map((d,i)=>point(i, vals[d.id]||0)).map(p=>p.join(',')).join(' ');

  const selCands = candidates.filter(c => selected.includes(c.id));

  // Derive per-phase scores for a candidate.
  const phaseScoresFor = (c) => {
    if (phase === 'final') return c.scores || {};
    const dimStage = window.DIM_STAGE[c.id] || {};
    const out = {};
    dims.forEach(d => {
      const ds = dimStage[d.id];
      out[d.id] = ds ? ds[phase] : null;
    });
    return out;
  };

  const hasPhaseData = (c) => {
    if (phase === 'final') return c.score != null;
    return c.stageScores && c.stageScores[phase] != null;
  };

  // Candidates available to add
  const available = candidates
    .filter(c => !selected.includes(c.id) && c.score != null)
    .filter(c => !addQuery || c.name.toLowerCase().includes(addQuery.toLowerCase()))
    .sort((a,b) => (b.score||0) - (a.score||0));

  const handleAdd = (id) => {
    setAddOpen(false);
    setAddQuery('');
    onAdd && onAdd(id);
  };

  return (
    <div className="compare-page" data-screen-label="03 Comparar">
      <button className="back-link" onClick={onBack}>← Volver a candidatos</button>
      <div className="compare-head">
        <h2 className="serif">Comparación lado a lado</h2>
        <span style={{fontSize:12, color:'var(--ink-3)'}}>{selCands.length} candidatos · Asesor Comercial de Seguros · Máx. 4</span>
      </div>

      <div className="compare-chips">
        {selCands.map((c, i) => (
          <div key={c.id} className="compare-chip">
            <div className="avatar" style={{background: COMPARE_COLORS[i], color:'white'}}>{c.initials}</div>
            <span>{c.name}</span>
            <span style={{color:'var(--ink-4)'}}>· {c.score}%</span>
            <button className="x" onClick={()=>onRemove(c.id)}>×</button>
          </div>
        ))}
        {selCands.length < 4 && (
          <div className="compare-chip add" onClick={()=>setAddOpen(v=>!v)}>
            + añadir candidato
            {addOpen && (
              <div className="cand-popover" onClick={e=>e.stopPropagation()}>
                <div className="cand-popover-search">
                  <input
                    placeholder="Buscar candidato…"
                    value={addQuery}
                    autoFocus
                    onChange={e=>setAddQuery(e.target.value)} />
                </div>
                <div className="cand-popover-list">
                  {available.length === 0 && (
                    <div style={{padding:'14px 12px', fontSize:12, color:'var(--ink-4)'}}>Sin candidatos disponibles con ese filtro.</div>
                  )}
                  {available.map(c => (
                    <div key={c.id} className="cand-popover-row" onClick={()=>handleAdd(c.id)}>
                      <div className="avatar">{c.initials}</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div className="cpr-name">{c.name}</div>
                        <div className="cpr-meta">{c.prev} · {c.city}</div>
                      </div>
                      <div className="cpr-score">{c.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Phase tabs */}
      <div className="compare-phase-tabs">
        {[['final','Score final'],['cv','CV'],['interview','Entrevista'],['psico','Psicotécnico']].map(([k,l]) => (
          <button key={k} className={phase===k?'on':''} onClick={()=>setPhase(k)}>{l}</button>
        ))}
      </div>

      <div className="compare-layout">
        {/* Big overlaid radar */}
        <div className="compare-radar-big">
          <div className="comp-legend">
            {selCands.map((c, i) => (
              <div key={c.id} className="comp-legend-item">
                <span className="sw" style={{background: COMPARE_COLORS[i]}}></span>
                <span style={{color:'var(--ink-2)'}}>{c.name.split(' ').slice(0,2).join(' ')}</span>
                {!hasPhaseData(c) && <span style={{color:'var(--ink-4)', fontSize:10, marginLeft:4}}>(sin datos)</span>}
              </div>
            ))}
            <div className="comp-legend-item" style={{marginLeft:'auto'}}>
              <span className="sw" style={{background:'transparent', border:'1px dashed var(--ink-3)'}}></span>
              <span style={{color:'var(--ink-3)'}}>Ideal</span>
            </div>
          </div>
          <svg viewBox={`0 0 ${size} ${size}`} style={{width:'100%', aspectRatio:1, overflow:'visible'}}>
            {[0.25, 0.5, 0.75, 1].map((r,idx)=>(
              <circle key={idx} cx={cx} cy={cy} r={R*r}
                fill="none" stroke="var(--line)" strokeWidth="1"
                strokeDasharray={idx===1?'2 4':'0'} opacity={idx===1?0.7:0.5} />
            ))}
            {dims.map((d,i)=>{
              const [x,y] = point(i, 100);
              return <line key={d.id} className="radar-grid-axis" x1={cx} y1={cy} x2={x} y2={y} />;
            })}
            {/* Ideal */}
            <polygon className="radar-ideal-fill" points={polyPts(window.IDEAL)} />
            {/* Each candidate */}
            {selCands.map((c, i) => {
              if (!hasPhaseData(c)) return null;
              const sc = phaseScoresFor(c);
              return (
                <polygon key={c.id}
                  className="compare-radar-fill"
                  points={polyPts(sc)}
                  style={{fill: COMPARE_COLORS[i], stroke: COMPARE_COLORS[i]}} />
              );
            })}
            {/* Labels */}
            {dims.map((d,i) => {
              const a = angle(i);
              const lr = R + 20;
              const lx = cx + lr*Math.cos(a), ly = cy + lr*Math.sin(a);
              const anchor = Math.abs(Math.cos(a)) < 0.2 ? 'middle' : (Math.cos(a)>0 ? 'start' : 'end');
              return <text key={d.id} x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" className="radar-label">{d.short}</text>;
            })}
          </svg>
        </div>

        {/* Comparison table */}
        <div className="compare-table-wrap">
          <table className="comp-table">
            <thead>
              <tr>
                <th>Dimensión</th>
                {selCands.map((c,i)=>(
                  <th key={c.id} className="num" style={{color: COMPARE_COLORS[i]}}>{c.initials}</th>
                ))}
                <th className="num" style={{color:'var(--ink-4)'}}>Ideal</th>
              </tr>
            </thead>
            <tbody>
              {dims.map(d => {
                const vals = selCands.map(c => {
                  const sc = phaseScoresFor(c);
                  return sc[d.id];
                });
                const validVals = vals.filter(v => v != null);
                const max = validVals.length > 0 ? Math.max(...validVals) : null;
                return (
                  <tr key={d.id}>
                    <td style={{fontSize:12, color:'var(--ink-2)'}}>{d.name}</td>
                    {selCands.map((c, i) => {
                      const v = vals[i];
                      if (v == null) return <td key={c.id} className="num na">—</td>;
                      return <td key={c.id} className={`num ${v===max?'winner':''}`}>{v}</td>;
                    })}
                    <td className="num" style={{color:'var(--ink-4)'}}>{window.IDEAL[d.id]}</td>
                  </tr>
                );
              })}
              <tr style={{background:'var(--bg-soft)'}}>
                <td style={{fontWeight:500, color:'var(--ink)'}}>
                  {phase==='final' ? 'Match final' : `Score ${phase==='cv'?'CV':phase==='interview'?'Entrevista':'Psicotécnico'}`}
                </td>
                {selCands.map((c, i) => {
                  const v = phase==='final' ? c.score : (c.stageScores && c.stageScores[phase]);
                  const maxFinal = Math.max(...selCands.map(x => {
                    return phase==='final' ? (x.score||0) : ((x.stageScores && x.stageScores[phase]) || 0);
                  }));
                  if (v == null) return <td key={c.id} className="num na">—</td>;
                  return <td key={c.id} className={`num ${v===maxFinal?'winner':''}`} style={{fontWeight:600, fontSize:14}}>{v}%</td>;
                })}
                <td className="num" style={{color:'var(--ink-4)'}}>82%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{marginTop:20, display:'flex', gap:10, flexWrap:'wrap'}}>
        {selCands.map(c => (
          <button key={c.id} className="btn" onClick={()=>onOpen(c.id)}>Ver detalle de {c.name.split(' ')[0]} →</button>
        ))}
      </div>
    </div>
  );
};

window.CompareView = CompareView;
