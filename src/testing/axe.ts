import axe from 'axe-core';

/**
 * jsdom no rasteriza, así que axe no puede medir contraste de color: la regla
 * `color-contrast` se desactiva aquí y se cubre aparte en `styles.spec.ts`,
 * que calcula los ratios sobre los tokens.
 */
export async function expectNoA11yViolations(element: Element): Promise<void> {
  const results = await axe.run(element, {
    rules: { 'color-contrast': { enabled: false } },
  });

  if (results.violations.length > 0) {
    const detail = results.violations
      .map(
        (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.html).join('\n    ')}`,
      )
      .join('\n  ');
    throw new Error(`Violaciones de accesibilidad:\n  ${detail}`);
  }
}
