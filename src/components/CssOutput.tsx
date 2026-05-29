import { useState } from 'react';
import type { ComponentConfig, ComponentKey } from '../types';

const PROPS_BY_COMPONENT: Record<ComponentKey, string[]> = {
  modal: ['transform', 'opacity'],
  dropdown: ['transform', 'opacity'],
  toast: ['transform', 'opacity'],
  sidepanel: ['transform', 'opacity'],
};

const buildBlock = (selector: string, properties: string[], duration: number, bezier: readonly number[]) => {
  const cb = `cubic-bezier(${bezier.join(', ')})`;
  const transition = properties.map((p) => `${p} ${duration}ms ${cb}`).join(',\n              ');
  return `${selector} {\n  transition: ${transition};\n}`;
};

const buildCss = (key: ComponentKey, config: ComponentConfig) => {
  const props = PROPS_BY_COMPONENT[key];
  const enterBlock = buildBlock(`.${key}-enter`, props, config.enter.duration, config.enter.bezier);
  const exitBlock = buildBlock(`.${key}-exit`, props, config.exit.duration, config.exit.bezier);
  return `${enterBlock}\n\n${exitBlock}`;
};

type Props = {
  componentKey: ComponentKey;
  config: ComponentConfig;
};

export function CssOutput({ componentKey, config }: Props) {
  const [copied, setCopied] = useState(false);
  const css = buildCss(componentKey, config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="css-output">
      <div className="css-output-header">
        <h3>CSS Output</h3>
        <button type="button" className="copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="css-code">{css}</pre>
    </section>
  );
}
