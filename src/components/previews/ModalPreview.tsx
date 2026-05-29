import type { AnimationConfig } from '../../types';
import { buildTransition, pickConfig } from './helpers';

type Props = {
  isOpen: boolean;
  enter: AnimationConfig;
  exit: AnimationConfig;
};

export function ModalPreview({ isOpen, enter, exit }: Props) {
  const config = pickConfig(isOpen, enter, exit);
  const transition = buildTransition(config, ['transform', 'opacity']);

  return (
    <div className="preview-stage">
      <div
        className="modal-backdrop"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: buildTransition(config, ['opacity']),
        }}
      />
      <div
        className="modal-card"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.92)',
          transition,
        }}
      >
        <div className="modal-title">Modal Title</div>
        <div className="modal-body">Lorem ipsum dolor sit amet.</div>
      </div>
    </div>
  );
}
