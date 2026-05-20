// List view — ranked pipeline with Top-N selector, stage filters and tier segmented control.
const STAGE_LABELS = { 0:'CV recibido', 1:'CV aprobado', 2:'Entrevista lista', 3:'Proceso completo' };
const STAGE_FILTER = [
  ['all','Todas'],
  ['0','CV'],
  ['1','Entrevista'],
  ['2','Psicotécnico'],
  ['3','Completo'],
];
const TIER_FILTER = [
  ['all','Todos'],
  ['strong','Fuerte'],
  ['review','Revisar'],
  ['weak','Débil'],
  ['pending','Pendiente'],
];

const ListView = ({ candidates, onOpen, onCompare, compareSet, density = 'comfy' }) => {
  const [stageFilter, setStageFilter] = React.useState('all');
  const [tierFilter, setTierFilter]   = React.useState('all');
  const [sortBy, setSortBy]           = React.useState('score');
  const [topN, setTopN]               = React.useState(() => {
    try { return parseInt(localStorage.getItem('rt_topn') || '0') || 0; } catch(e){ return 0; }
  });

  React.useEffect(() => { localStorage.setItem('rt_topn', String(topN)); }, [topN]);

  // Apply filters
  let working = candidates.filter(c => {
    if (stageFilter !== 'all' && c.stage !== parseInt(stageFilter)) return false;
    if (tierFilter !== 'all' && c.tier !== tierFilter) return false;
    return true;
  });

  // Sort
  const sorters = {
    score: (a,b) => (b.score ?? -1) - (a.score ?? -1),
    recent: (a,b) => a.id.localeCompare(b.id),
    years: (a,b) => b.exp_years - a.exp_years,
    stage: (a,b) => b.stage - a.stage,
  };
  working = [...working].sort(sorters[sortBy] || sorters.score);

  // Top-N applies to the currently sorted/visible list by rank
  const topSet = new Set();
  if (topN > 0) working.slice(0, topN).forEach(c => topSet.add(c.id));

  // Counts for chips
  const tierCounts = {
    all: candidates.length,
    strong: candidates.filter(c => c.tier==='strong').length,
    review: candidates.filter(c => c.tier==='review').length,
    weak:   candidates.filter(c => c.tier==='weak').length,
    pending:candidates.filter(c => c.tier==='pending').length,
  };
  const stageCounts = {
    all: candidates.length,
    '0': candidates.filter(c => c.stage===0).length,
    '1': candidates.filter(c => c.stage===1).length,
    '2': candidates.filter(c => c.stage===2).length,
    '3': candidates.filter(c => c.stage===3).length,
  };

  return (
    <div className="page" data-screen-label="01 Lista de candidatos">
      <div className="role-header">
        <div>
          <div className="role-sub serif" style={{fontStyle:'italic', fontSize:13}}>Posición abierta</div>
          <h1 className="role-title">Asesor Comercial de Seguros <em>— Regional Andina</em></h1>
          <div className="role-sub">Aseguradora nacional · Bogotá / Medellín / Cali · 6 vacantes · Cierre 12 may</div>
        </div>
        <div className="role-stats">
          <div className="role-stat"><span className="n">{candidates.length}</span><div className="l">aplicantes</div></div>
          <div className="role-stat"><span className="n">{candidates.filter(c => c.stage>0).length}</span><div className="l">en pipeline</div></div>
          <div className="role-stat"><span className="n" style={{color:'var(--good-ink)'}}>{candidates.filter(c => c.tier==='strong').length}</span><div className="l">recomendados</div></div>
        </div>
      </div>

      <div className="filters-bar">
        {/* Top-N */}
        <div className="topn-group">
          <span className="tlbl">Top</span>
          <input
            type="number" min="0" max={candidates.length}
            className="topn-input"
            value={topN}
            onChange={e => setTopN(Math.max(0, Math.min(candidates.length, parseInt(e.target.value)||0)))}
          />
          {topN > 0 && <button className="topn-clear" onClick={()=>setTopN(0)} title="Limpiar">×</button>}
        </div>

        {/* Stage */}
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="filters-label">Etapa</span>
          <div className="seg">
            {STAGE_FILTER.map(([k,label]) => (
              <button key={k} className={stageFilter===k?'on':''} onClick={()=>setStageFilter(k)}>
                {label}<span className="c">{stageCounts[k]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tier */}
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="filters-label">Tier</span>
          <div className="seg">
            {TIER_FILTER.map(([k,label]) => (
              <button key={k} className={tierFilter===k?'on':''} onClick={()=>setTierFilter(k)}>
                {label}<span className="c">{tierCounts[k]}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{flex:1}} />

        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="filters-label">Ordenar</span>
          <select className="sort-select" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="score">Match %</option>
            <option value="recent">Última actividad</option>
            <option value="years">Años exp.</option>
            <option value="stage">Etapa</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className={`table ${density==='compact'?'compact':''}`}>
          <thead>
            <tr>
              <th style={{width:42}}>#</th>
              <th style={{width:'26%'}}>Candidato</th>
              <th style={{width:'16%'}}>Pipeline</th>
              <th style={{width:'20%'}}>Match final</th>
              <th style={{width:'12%'}}>Tier</th>
              <th style={{width:'10%'}}>Último mov.</th>
              <th style={{width:'10%'}}></th>
            </tr>
          </thead>
          <tbody>
            {working.map((c, i) => (
              <ListRow
                key={c.id}
                c={c}
                rank={i+1}
                isTop={topSet.has(c.id)}
                onOpen={onOpen}
                onCompare={onCompare}
                inCompare={compareSet.has(c.id)}
              />
            ))}
            {working.length === 0 && (
              <tr><td colSpan={7} style={{textAlign:'center', padding:'30px 0', color:'var(--ink-4)', fontSize:12}}>Sin candidatos con los filtros actuales.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{marginTop:14, display:'flex', gap:12, color:'var(--ink-4)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em'}}>
        <span>Actualizado hace 12 min</span>
        <span>·</span>
        <span>Modelo v4.2</span>
        <span>·</span>
        <span>{working.length} de {candidates.length} candidatos</span>
      </div>
    </div>
  );
};

const ListRow = ({ c, rank, isTop, onOpen, onCompare, inCompare }) => {
  const scoreColor = c.tier==='strong' ? 'var(--good)' : c.tier==='review' ? 'var(--warn)' : c.tier==='weak' ? 'var(--bad)' : 'var(--ink-4)';
  const relTime = ['hace 2h','hace 1d','hace 2d','hace 4h','hace 3d','hace 5h','hace 1d','hace 2d','hace 6h','hace 2h','hace 8h','hace 1d','hace 3d','hace 12h','hace 6h','hace 1d','hace 2d','hace 4h','ayer','hace 1h'];
  const idx = parseInt(c.id.slice(1))-1;
  return (
    <tr onClick={() => onOpen(c.id)} className={isTop?'top-n':''}>
      <td>
        <span className={`rank-cell ${isTop?'top':''}`}>{rank}</span>
      </td>
      <td>
        <div className="cand-cell">
          <div className="avatar">{c.initials}</div>
          <div>
            <div className="cand-name">{c.name}</div>
            <div className="cand-meta">{c.prev} · {c.city} · {c.exp_years}a</div>
          </div>
        </div>
      </td>
      <td>
        <div className="pipeline-mini">
          <div className={`pipe-step ${c.stageScores.cv!=null?'done':'pending'} ${tierOfStage(c.stageScores.cv)}`}></div>
          <div className={`pipe-step ${c.stageScores.interview!=null?'done':'pending'} ${tierOfStage(c.stageScores.interview)}`}></div>
          <div className={`pipe-step ${c.stageScores.psico!=null?'done':'pending'} ${tierOfStage(c.stageScores.psico)}`}></div>
        </div>
        <div style={{fontSize:11, color:'var(--ink-4)', marginTop:6}}>{STAGE_LABELS[c.stage]}</div>
      </td>
      <td>
        {c.score != null ? (
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <span className="score-pill" style={{color:scoreColor}}>{c.score}<span className="pct">%</span></span>
            <div className="score-bar">
              <span style={{width:`${c.score}%`, background:scoreColor}}></span>
              <span className="target-mark" style={{left:'82%'}}></span>
            </div>
          </div>
        ) : <span style={{color:'var(--ink-4)', fontSize:12}}>— pendiente</span>}
      </td>
      <td>
        {c.tier === 'strong' && <span className="tier strong"><span className="d"></span>Recomendado</span>}
        {c.tier === 'review' && <span className="tier review"><span className="d"></span>Revisar</span>}
        {c.tier === 'weak'   && <span className="tier weak"><span className="d"></span>Descartar</span>}
        {c.tier === 'pending'&& <span style={{fontSize:11, color:'var(--ink-4)', textTransform:'uppercase', letterSpacing:'0.08em'}}>— En cola</span>}
      </td>
      <td style={{color:'var(--ink-3)', fontSize:12}}>{relTime[idx] || 'hace 1d'}</td>
      <td onClick={e=>e.stopPropagation()}>
        <button
          className="btn ghost"
          style={{padding:'4px 8px', fontSize:11, color: inCompare ? 'var(--rt-ink)' : 'var(--ink-3)'}}
          onClick={()=>onCompare(c.id)}
          title="Añadir a comparación">
          {inCompare ? '✓ Comparar' : '+ Comparar'}
        </button>
      </td>
    </tr>
  );
};

const tierOfStage = (score) => {
  if (score == null) return '';
  if (score >= 75) return 'good';
  if (score >= 60) return 'warn';
  return 'bad';
};

window.ListView = ListView;
