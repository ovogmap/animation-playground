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
        <div className="app-header-text">
          <h1>Animation Playground</h1>
          <p className="app-subtitle">
            베지어 곡선과 duration 을 조절하며 등장 · 퇴장 애니메이션을 시각적으로 테스트하세요.
          </p>
        </div>
        <a
          href="https://github.com/ovogmap/animation-playground"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.97.13 2.9.39 2.21-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"
            />
          </svg>
        </a>
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
