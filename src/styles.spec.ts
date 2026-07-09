import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * axe-core no puede evaluar contraste bajo jsdom (no rasteriza), así que este
 * test cubre ese hueco leyendo los tokens reales de `styles.css` y calculando
 * el ratio WCAG. Parsea el archivo en vez de replicar los valores: una copia
 * pasaría el test aunque la paleta real estuviese rota.
 */

type Tokens = Record<string, string>;

function extractBlock(css: string, selector: string): Tokens {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(css);
  if (!match) throw new Error(`No se encontró el bloque "${selector}" en styles.css`);

  const tokens: Tokens = {};
  for (const [, name, value] of match[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
}

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const value = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channelLuminance((value >> 16) & 255) +
    0.7152 * channelLuminance((value >> 8) & 255) +
    0.0722 * channelLuminance(value & 255)
  );
}

function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

const css = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');
const light = extractBlock(css, ':root');
const dark = extractBlock(css, 'body.dark');

/** Texto normal: WCAG AA exige >= 4.5:1 */
const AA_NORMAL_TEXT = 4.5;

/** Pares (primer plano, fondo) que renderizan texto en la interfaz. */
const TEXT_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['--color-text', '--color-bg'],
  ['--color-text', '--color-surface'],
  ['--color-text-muted', '--color-bg'],
  ['--color-text-muted', '--color-surface'],
  ['--color-primary', '--color-bg'],
  ['--color-primary', '--color-surface'],
  ['--color-accent', '--color-bg'],
  ['--color-accent', '--color-surface'],
];

describe('tokens de color', () => {
  it('define en body.dark todos los tokens de color de :root', () => {
    const colorTokens = Object.keys(light).filter((name) => name.startsWith('--color-'));
    expect(colorTokens.length).toBeGreaterThan(0);
    for (const token of colorTokens) {
      expect(dark, `body.dark no redefine ${token}`).toHaveProperty(token);
    }
  });

  it('usa hex de 6 dígitos en todos los tokens de color', () => {
    for (const tokens of [light, dark]) {
      for (const [name, value] of Object.entries(tokens)) {
        if (name.startsWith('--color-')) {
          expect(value, `${name} no es un hex de 6 dígitos`).toMatch(/^#[0-9a-f]{6}$/i);
        }
      }
    }
  });

  describe.each([
    ['tema claro', light],
    ['tema oscuro', dark],
  ])('%s', (_name, tokens) => {
    it.each(TEXT_PAIRS)('%s sobre %s cumple WCAG AA', (foreground, background) => {
      const ratio = contrastRatio(tokens[foreground], tokens[background]);
      expect(ratio, `ratio ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  });
});
