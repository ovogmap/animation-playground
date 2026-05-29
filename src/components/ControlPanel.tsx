import type { Bezier, ComponentConfig, ComponentKey, Phase } from '../types';
import { COMPONENT_LABELS, COMPONENT_ORDER } from '../presets';
import { BezierEditor } from './BezierEditor';
import { DurationSlider } from './DurationSlider';

type Props = {
  active: ComponentKey;
  onActiveChange: (key: ComponentKey) => void;
  config: ComponentConfig;
  onConfigChange: (phase: Phase, partial: Partial<{ bezier: Bezier; duration: number }>) => void;
  onReset: () => void;
};

export function ControlPanel({
  active,
  onActiveChange,
  config,
  onConfigChange,
  onReset,
}: Props) {
  return (
    <div className="control-panel">
      <div className="tab-row">
        {COMPONENT_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            className={`tab-btn${active === key ? ' active' : ''}`}
            onClick={() => onActiveChange(key)}
          >
            {COMPONENT_LABELS[key]}
          </button>
        ))}
      </div>

      <PhaseSection
        title="Enter"
        config={config.enter}
        onBezier={(b) => onConfigChange('enter', { bezier: b })}
        onDuration={(d) => onConfigChange('enter', { duration: d })}
      />

      <PhaseSection
        title="Exit"
        config={config.exit}
        onBezier={(b) => onConfigChange('exit', { bezier: b })}
        onDuration={(d) => onConfigChange('exit', { duration: d })}
      />

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset to defaults
      </button>
    </div>
  );
}

type SectionProps = {
  title: string;
  config: { bezier: Bezier; duration: number };
  onBezier: (b: Bezier) => void;
  onDuration: (d: number) => void;
};

function PhaseSection({ title, config, onBezier, onDuration }: SectionProps) {
  return (
    <section className="phase-section">
      <h3 className="phase-title">{title}</h3>
      <BezierEditor value={config.bezier} onChange={onBezier} />
      <div className="duration-label">Duration</div>
      <DurationSlider value={config.duration} onChange={onDuration} />
    </section>
  );
}
