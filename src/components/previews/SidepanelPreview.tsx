import type { AnimationConfig } from '../../types';
import { buildTransition, pickConfig } from './helpers';

type Props = {
  isOpen: boolean;
  enter: AnimationConfig;
  exit: AnimationConfig;
};

export function SidepanelPreview({ isOpen, enter, exit }: Props) {
  const config = pickConfig(isOpen, enter, exit);
  const transition = buildTransition(config, ['transform']);

  return (
    <div className="preview-stage">
      <div
        className="sidepanel-backdrop"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: buildTransition(config, ['opacity']),
        }}
      />
      <div
        className="sidepanel-card"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition,
        }}
      >
        <div className="sidepanel-title">Side Panel</div>
        <div className="sidepanel-body">Filter / Settings</div>
      </div>
    </div>
  );
}
