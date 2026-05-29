type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function DurationSlider({ value, onChange, min = 0, max = 1000, step = 10 }: Props) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  return (
    <div className="duration-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-input"
      />
      <div className="duration-value">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          className="number-input"
        />
        <span className="unit">ms</span>
      </div>
    </div>
  );
}
