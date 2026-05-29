export type Bezier = readonly [number, number, number, number];

export type AnimationConfig = {
  bezier: Bezier;
  duration: number;
};

export type ComponentKey = 'modal' | 'dropdown' | 'toast' | 'sidepanel';

export type ComponentConfig = {
  enter: AnimationConfig;
  exit: AnimationConfig;
};

export type PlaygroundState = Record<ComponentKey, ComponentConfig>;

export type Phase = 'enter' | 'exit';
