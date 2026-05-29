import type { Bezier, ComponentKey, PlaygroundState } from './types';

export type Preset = {
  name: string;
  value: Bezier;
};

export const BEZIER_PRESETS: Preset[] = [
  { name: 'linear', value: [0, 0, 1, 1] },
  { name: 'ease', value: [0.25, 0.1, 0.25, 1] },
  { name: 'ease-in', value: [0.42, 0, 1, 1] },
  { name: 'ease-out', value: [0, 0, 0.58, 1] },
  { name: 'ease-in-out', value: [0.42, 0, 0.58, 1] },
  { name: 'Material', value: [0.4, 0, 0.2, 1] },
  { name: 'iOS', value: [0.25, 0.1, 0.25, 1] },
  { name: 'overshoot', value: [0.34, 1.56, 0.64, 1] },
];

export const DEFAULT_STATE: PlaygroundState = {
  modal: {
    enter: { bezier: [0, 0, 0.2, 1], duration: 240 },
    exit: { bezier: [0.4, 0, 1, 1], duration: 180 },
  },
  dropdown: {
    enter: { bezier: [0, 0, 0.2, 1], duration: 180 },
    exit: { bezier: [0.4, 0, 1, 1], duration: 120 },
  },
  toast: {
    enter: { bezier: [0.34, 1.56, 0.64, 1], duration: 320 },
    exit: { bezier: [0.4, 0, 1, 1], duration: 200 },
  },
  sidepanel: {
    enter: { bezier: [0, 0, 0.2, 1], duration: 320 },
    exit: { bezier: [0.4, 0, 1, 1], duration: 240 },
  },
};

export const COMPONENT_LABELS: Record<ComponentKey, string> = {
  modal: 'Modal',
  dropdown: 'Dropdown',
  toast: 'Toast',
  sidepanel: 'Sidepanel',
};

export const COMPONENT_ORDER: ComponentKey[] = ['modal', 'dropdown', 'toast', 'sidepanel'];
