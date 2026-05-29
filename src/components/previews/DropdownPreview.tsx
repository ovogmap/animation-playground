import type { AnimationConfig } from '../../types';
import { buildTransition, pickConfig } from './helpers';

type Props = {
  isOpen: boolean;
  enter: AnimationConfig;
  exit: AnimationConfig;
};

export function DropdownPreview({ isOpen, enter, exit }: Props) {
  const config = pickConfig(isOpen, enter, exit);
  const transition = buildTransition(config, ['transform', 'opacity']);

  return (
    <div className="preview-stage dropdown-stage">
      <div className="dropdown-anchor">Menu ▾</div>
      <div
        className="dropdown-menu"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition,
          transformOrigin: 'top center',
        }}
      >
        <div className="dropdown-item">Profile</div>
        <div className="dropdown-item">Settings</div>
        <div className="dropdown-item">Log out</div>
      </div>
    </div>
  );
}
