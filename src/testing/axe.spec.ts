import { expectNoA11yViolations } from './axe';

describe('sanity check del helper de axe', () => {
  it('detecta un botón sin nombre accesible', async () => {
    const host = document.createElement('div');
    host.innerHTML = '<button></button>';
    document.body.appendChild(host);

    await expect(expectNoA11yViolations(host)).rejects.toThrow(/button-name/);

    host.remove();
  });
});
