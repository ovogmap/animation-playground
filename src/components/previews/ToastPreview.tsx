import type { AnimationConfig } from '../../types';
import { buildTransition, pickConfig } from './helpers';

type Props = {
  isOpen: boolean;
  enter: AnimationConfig;
  exit: AnimationConfig;
};

export function ToastPreview({ isOpen, enter, exit }: Props) {
  const config = pickConfig(isOpen, enter, exit);
  const transition = buildTransition(config, ['transform', 'opacity']);

  return (
    <div className="preview-stage">
      <div
        className="toast-card"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(24px)',
          transition,
        }}
      >
        <div className="toast-icon">✓</div>
        <div className="toast-text">Changes saved.</div>
      </div>
    </div>
  );
}
