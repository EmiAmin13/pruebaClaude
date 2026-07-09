import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../../shared/card/card';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface Resource {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  /** Descarga servida desde `public/`; el resto son enlaces externos. */
  readonly download?: boolean;
  /** Formato y peso, para que nadie abra 9 MB sin querer desde el móvil. */
  readonly meta?: string;
}

@Component({
  selector: 'app-recursos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, Card],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class RecursosPage {
  readonly sections: readonly TocItem[] = [
    { id: 'material', label: 'Material del curso' },
    { id: 'documentacion', label: 'Documentación' },
    { id: 'herramientas', label: 'Herramientas' },
  ];

  readonly material: readonly Resource[] = [
    {
      title: 'Guía esencial de Claude Code',
      description: 'El PDF del curso, con los comandos y flujos de trabajo del día a día.',
      href: 'claude-code-guia-esencial.pdf',
      download: true,
      meta: 'PDF · 9,2 MB',
    },
    {
      title: 'Plantilla SDD',
      description: 'La estructura de spec/ lista para copiar a tu proyecto y rellenar.',
      href: 'spec_template.zip',
      download: true,
      meta: 'ZIP · constitution + una feature de ejemplo',
    },
  ];

  readonly documentation: readonly Resource[] = [
    {
      title: 'Documentación de OpenCode',
      description: 'Instalación, agentes, comandos y configuración, en la fuente original.',
      href: 'https://opencode.ai/docs',
    },
    {
      title: 'Context7',
      description: 'Documentación actualizada de librerías, servida al agente bajo demanda.',
      href: 'https://context7.com',
    },
    {
      title: 'skills.sh',
      description: 'Catálogo de skills para instalar y punto de partida para escribir la tuya.',
      href: 'https://skills.sh',
    },
    {
      title: 'Especificación de MCP',
      description: 'El protocolo por dentro, si quieres escribir tu propio servidor.',
      href: 'https://modelcontextprotocol.io',
    },
  ];

  readonly tools: readonly Resource[] = [
    {
      title: 'OpenCode',
      description: 'Agente de terminal, de código abierto y agnóstico del proveedor de modelos.',
      href: 'https://opencode.ai',
    },
    {
      title: 'Claude Code',
      description: 'El agente de Anthropic para terminal, escritorio, web y editores.',
      href: 'https://claude.com/claude-code',
    },
    {
      title: 'Cursor',
      description: 'Editor con IA integrada, si prefieres no salir de una interfaz gráfica.',
      href: 'https://cursor.com',
    },
  ];
}
