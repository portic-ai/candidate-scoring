// Tweaks panel — two minimal variation controls.
const TweaksPanel = ({ tweaks, onChange, visible }) => {
  if (!visible) return null;
  const set = (key) => (val) => onChange({...tweaks, [key]: val});

  const Row = ({ label, value, options, onSet }) => (
    <div className="tweak-group">
      <label>{label}</label>
      <div className="tweak-options">
        {options.map(([k, lbl]) => (
          <button key={k} className={value===k?'on':''} onClick={()=>onSet(k)}>{lbl}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tweaks-panel">
      <h4>Ajustes <small>variaciones</small></h4>
      <Row label="Overlays del radar" value={tweaks.compare} onSet={set('compare')}
        options={[['ideal','Ideal'],['average','Promedio'],['both','Ambos']]} />
      <Row label="Densidad de la lista" value={tweaks.density} onSet={set('density')}
        options={[['comfy','Cómoda'],['compact','Compacta']]} />
    </div>
  );
};

window.TweaksPanel = TweaksPanel;
