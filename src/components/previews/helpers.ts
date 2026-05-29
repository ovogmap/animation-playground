import type { AnimationConfig } from '../../types';

export const buildTransition = (config: AnimationConfig, properties: string[]) => {
  const cb = `cubic-bezier(${config.bezier.join(', ')})`;
  return properties.map((p) => `${p} ${config.duration}ms ${cb}`).join(', ');
};

export const pickConfig = (isOpen: boolean, enter: AnimationConfig, exit: AnimationConfig) =>
  isOpen ? enter : exit;
