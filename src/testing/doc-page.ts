import { expect } from 'vitest';

/**
 * Comprueba que el índice de una página de documentación no tiene enlaces
 * rotos: cada entrada debe conservar la ruta actual y apuntar a una sección
 * que existe. Es el fallo más fácil de introducir al editar contenido.
 */
export function expectTocAnchorsResolve(host: HTMLElement, expectedCount: number): void {
  const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('.toc a'));

  expect(links.length, 'entradas del índice').toBe(expectedCount);

  for (const link of links) {
    const href = link.getAttribute('href')!;
    const [path, id] = href.split('#');

    // Un `href` que empieza por `#` se resolvería contra el `<base href="/">`
    // del index y llevaría a la landing en vez de a la sección.
    expect(path, `${href} no conserva la ruta actual`).not.toBe('');
    expect(id, `${href} no lleva fragmento`).toBeTruthy();
    expect(
      host.querySelector(`section[id="${id}"]`),
      `el índice apunta a #${id}, que no existe`,
    ).not.toBeNull();
  }
}
