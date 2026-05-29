import { useState } from 'react';
import type { Bezier, ComponentKey, Phase, PlaygroundState } from './types';
import { DEFAULT_STATE } from './presets';
import { ControlPanel } from './components/ControlPanel';
import { CssOutput } from './components/CssOutput';
import { ModalPreview } from './components/previews/ModalPreview';
import { DropdownPreview } from './components/previews/DropdownPreview';
import { ToastPreview } from './components/previews/ToastPreview';
import { SidepanelPreview } from './components/previews/SidepanelPreview';
import './App.css';

function App() {
  const [state, setState] = useState<PlaygroundState>(DEFAULT_STATE);
  const [active, setActive] = useState<ComponentKey>('modal');
  const [isOpen, setIsOpen] = useState(false);

  const config = state[active];

  const updateConfig = (
    phase: Phase,
    partial: Partial<{ bezier: Bezier; duration: number }>,
  ) => {
    setState((prev) => ({
      ...prev,
      [active]: {
        ...prev[active],
        [phase]: { ...prev[active][phase], ...partial },
      },
    }));
  };

  const resetActive = () => {
    setState((prev) => ({ ...prev, [active]: DEFAULT_STATE[active] }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Animation Playground</h1>
        <p className="app-subtitle">
          베지어 곡선과 duration 을 조절하며 등장 · 퇴장 애니메이션을 시각적으로 테스트하세요.
        </p>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <ControlPanel
            active={active}
            onActiveChange={(key) => {
              setActive(key);
              setIsOpen(false);
            }}
            config={config}
            onConfigChange={updateConfig}
            onReset={resetActive}
          />
          <CssOutput componentKey={active} config={config} />
        </aside>

        <main className="preview-area">
          <div className="preview-frame">
            {active === 'modal' && (
              <ModalPreview isOpen={isOpen} enter={config.enter} exit={config.exit} />
            )}
            {active === 'dropdown' && (
              <DropdownPreview isOpen={isOpen} enter={config.enter} exit={config.exit} />
            )}
            {active === 'toast' && (
              <ToastPreview isOpen={isOpen} enter={config.enter} exit={config.exit} />
            )}
            {active === 'sidepanel' && (
              <SidepanelPreview isOpen={isOpen} enter={config.enter} exit={config.exit} />
            )}
          </div>

          <div className="trigger-row">
            <button
              type="button"
              className="trigger-btn open"
              onClick={() => setIsOpen(true)}
              disabled={isOpen}
            >
              Open
            </button>
            <button
              type="button"
              className="trigger-btn close"
              onClick={() => setIsOpen(false)}
              disabled={!isOpen}
            >
              Close
            </button>
            <button
              type="button"
              className="trigger-btn toggle"
              onClick={() => setIsOpen((v) => !v)}
            >
              Toggle
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
