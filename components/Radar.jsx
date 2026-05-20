// Radar — classic spider/web chart with overlays (candidate · ideal · average).

const RadarChart = ({
  scores, ideal, average,
  dimensions, size = 460,
  activeDim, onHover, onSelect,
  showIdeal = true, showAverage = true,
}) => {
  const cx = size / 2, cy = size / 2;
  const R = size * 0.36;
  const n = dimensions.length;

  const angle = (i) => (-Math.PI / 2) + (i * 2 * Math.PI / n);
  const point = (i, v) => {
    const a = angle(i);
    const r = (v / 100) * R;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const polyPath = (vals) => dimensions.map((d, i) => point(i, vals[d.id] || 0))
    .map(([x,y], i) => (i===0?'M':'L') + ` ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ') + ' Z';

  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      {/* Concentric ring grid */}
      {rings.map((r, idx) => {
        const pts = dimensions.map((_, i) => {
          const a = angle(i);
          return [cx + R*r*Math.cos(a), cy + R*r*Math.sin(a)];
        });
        return <polygon key={idx} className="radar-grid-ring" points={pts.map(p=>p.join(',')).join(' ')} />;
      })}
      {/* Axes */}
      {dimensions.map((d, i) => {
        const [x, y] = point(i, 100);
        return <line key={d.id} className="radar-grid-axis" x1={cx} y1={cy} x2={x} y2={y} />;
      })}

      {/* Ideal polygon */}
      {showIdeal && <path className="radar-ideal-fill" d={polyPath(ideal)} />}
      {/* Average polygon */}
      {showAverage && average && <path className="radar-avg-fill" d={polyPath(average)} />}
      {/* Candidate polygon */}
      <path className="radar-cand-fill" d={polyPath(scores)} />

      {/* Labels */}
      {dimensions.map((d, i) => {
        const a = angle(i);
        const labelR = R + 22;
        const lx = cx + labelR * Math.cos(a);
        const ly = cy + labelR * Math.sin(a);
        const anchor = Math.abs(Math.cos(a)) < 0.2 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
        const isActive = activeDim === d.id;
        const s = scores[d.id];
        return (
          <g key={d.id} style={{cursor:'pointer'}}
             onClick={() => onSelect && onSelect(d.id)}
             onMouseEnter={() => onHover && onHover(d.id)}
             onMouseLeave={() => onHover && onHover(null)}>
            <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle"
              className={`radar-label ${isActive?'active':''}`}>
              {d.short}
            </text>
            {s!=null && <text x={lx} y={ly+14} textAnchor={anchor} dominantBaseline="middle"
              className="radar-label-score">{s}%</text>}
          </g>
        );
      })}

      {/* Candidate points */}
      {dimensions.map((d, i) => {
        const v = scores[d.id];
        if (v == null) return null;
        const [x, y] = point(i, v);
        return (
          <circle key={d.id} cx={x} cy={y} r={activeDim===d.id?6.5:5}
            className={`radar-point ${activeDim===d.id?'active':''}`}
            onClick={() => onSelect && onSelect(d.id)}
            onMouseEnter={() => onHover && onHover(d.id)}
            onMouseLeave={() => onHover && onHover(null)}
          />
        );
      })}
    </svg>
  );
};

// RadialBars kept as alternate render (not used by default, but still exported
// in case someone wants the concentric-ring-bar look)
const RadialBars = ({ scores, ideal, dimensions, size = 460, activeDim, onHover, onSelect }) => {
  const cx = size / 2, cy = size / 2;
  const Rmax = size * 0.36, Rmin = size * 0.12;
  const n = dimensions.length;
  const sliceAng = (2 * Math.PI) / n;
  const gap = 0.04;

  const arc = (r1, r2, aStart, aEnd) => {
    const x1 = cx + r1 * Math.cos(aStart), y1 = cy + r1 * Math.sin(aStart);
    const x2 = cx + r2 * Math.cos(aStart), y2 = cy + r2 * Math.sin(aStart);
    const x3 = cx + r2 * Math.cos(aEnd),   y3 = cy + r2 * Math.sin(aEnd);
    const x4 = cx + r1 * Math.cos(aEnd),   y4 = cy + r1 * Math.sin(aEnd);
    const large = (aEnd - aStart) > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} L ${x2} ${y2} A ${r2} ${r2} 0 ${large} 1 ${x3} ${y3} L ${x4} ${y4} A ${r1} ${r1} 0 ${large} 0 ${x1} ${y1} Z`;
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={Rmin - 4} fill="var(--bg-soft)" stroke="var(--line)" />
      {dimensions.map((d, i) => {
        const a0 = -Math.PI/2 + i*sliceAng + gap/2;
        const a1 = a0 + sliceAng - gap;
        const v = scores[d.id] || 0;
        const iv = ideal[d.id] || 0;
        const rCand = Rmin + (Rmax - Rmin) * (v/100);
        const rIdeal = Rmin + (Rmax - Rmin) * (iv/100);
        const aMid = (a0+a1)/2;
        const labelR = Rmax + 22;
        const lx = cx + labelR*Math.cos(aMid);
        const ly = cy + labelR*Math.sin(aMid);
        const anchor = Math.abs(Math.cos(aMid)) < 0.25 ? 'middle' : (Math.cos(aMid)>0 ? 'start' : 'end');
        return (
          <g key={d.id} style={{cursor:'pointer'}}
             onClick={()=>onSelect&&onSelect(d.id)}
             onMouseEnter={()=>onHover&&onHover(d.id)}
             onMouseLeave={()=>onHover&&onHover(null)}>
            <path d={arc(Rmin, Rmax, a0, a1)} fill="var(--bg-sunken)" opacity="0.6"/>
            <path d={arc(Rmin, rCand, a0, a1)} fill="var(--rt)" opacity={activeDim===d.id?0.95:0.8}/>
            <path d={arc(rIdeal-1, rIdeal+1, a0, a1)} fill="var(--ink-3)" />
            <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" className={`radar-label ${activeDim===d.id?'active':''}`}>{d.short}</text>
            <text x={lx} y={ly+14} textAnchor={anchor} dominantBaseline="middle" className="radar-label-score">{v}%</text>
          </g>
        );
      })}
    </svg>
  );
};

window.RadarChart = RadarChart;
window.RadialBars = RadialBars;
