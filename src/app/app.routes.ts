import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';

/**
 * `Layout` es el shell de toda la aplicación, así que se carga con la ruta
 * padre. Las páginas son hijas y se cargan de forma diferida.
 *
 * Los paths coinciden con `shared/navigation.ts`, que alimenta el sidebar y la
 * landing; `app.routes.spec.ts` comprueba que no se desincronicen.
 */
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
        title: 'Desarrollo con IA · Programa con agentes',
      },
      {
        path: 'fundamentos-ia',
        loadComponent: () =>
          import('./pages/fundamentos-ia/fundamentos-ia').then((m) => m.FundamentosIaPage),
        title: 'Fundamentos de IA · Desarrollo con IA',
      },
      {
        path: 'opencode',
        loadComponent: () => import('./pages/opencode/opencode').then((m) => m.OpencodePage),
        title: 'OpenCode · Desarrollo con IA',
      },
      {
        path: 'mcp-skills',
        loadComponent: () => import('./pages/mcp-skills/mcp-skills').then((m) => m.McpSkillsPage),
        title: 'MCP y Skills · Desarrollo con IA',
      },
      {
        path: 'sdd-ciclo',
        loadComponent: () => import('./pages/sdd-ciclo/sdd-ciclo').then((m) => m.SddCicloPage),
        title: 'Ciclo SDD · Desarrollo con IA',
      },
      {
        path: 'multiagente-loops',
        loadComponent: () =>
          import('./pages/multiagente-loops/multiagente-loops').then((m) => m.MultiagenteLoopsPage),
        title: 'Multiagentes y loops · Desarrollo con IA',
      },
      {
        path: 'recursos',
        loadComponent: () => import('./pages/recursos/recursos').then((m) => m.RecursosPage),
        title: 'Recursos · Desarrollo con IA',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
