import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/doc/code-block';
import { DocPage } from '../../shared/doc/doc-page';
import { DocSection } from '../../shared/doc/doc-section';
import { TocItem } from '../../shared/doc/doc.types';

interface Difference {
  readonly aspect: string;
  readonly mcp: string;
  readonly skill: string;
}

@Component({
  selector: 'app-mcp-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocPage, DocSection, CodeBlock],
  templateUrl: './mcp-skills.html',
  styleUrl: './mcp-skills.css',
})
export class McpSkillsPage {
  readonly sections: readonly TocItem[] = [
    { id: 'que-es-mcp', label: '¿Qué es MCP?' },
    { id: 'mcp-vs-skills', label: 'MCP frente a Skills' },
    { id: 'context7', label: 'Configurar Context7' },
    { id: 'skills', label: 'Qué son las Skills' },
    { id: 'instalar-skills', label: 'Instalar una skill' },
  ];

  readonly differences: readonly Difference[] = [
    {
      aspect: 'Qué aporta',
      mcp: 'Capacidades: leer, escribir, consultar',
      skill: 'Criterio: cómo hacer bien una tarea',
    },
    {
      aspect: 'Dónde vive',
      mcp: 'Un proceso o servicio, dentro o fuera de tu máquina',
      skill: 'Un archivo de texto en el repositorio',
    },
    {
      aspect: 'Qué consume',
      mcp: 'Red, procesos y credenciales',
      skill: 'Solo contexto del modelo',
    },
    {
      aspect: 'Ejemplo',
      mcp: 'Consultar Jira, leer una base de datos',
      skill: 'Cómo diseñar una interfaz que no parezca de plantilla',
    },
  ];

  readonly remoteMcp = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true,
      "headers": {
        "CONTEXT7_API_KEY": "\${CONTEXT7_API_KEY}"
      }
    }
  }
}`;

  readonly localMcp = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "angular-cli": {
      "type": "local",
      "command": ["npx", "-y", "@angular/cli", "mcp"],
      "enabled": true
    }
  }
}`;

  readonly skillFile = `---
name: frontend-design
description: Guidance for distinctive, intentional visual design when
  building new UI or reshaping an existing one.
---

# Frontend Design

Approach this as the design lead at a small studio known for giving
every client a visual identity that could not be mistaken for anyone
else's...`;

  readonly skillTree = `.claude/
└── skills/
    └── frontend-design/
        ├── SKILL.md      ← el frontmatter y las instrucciones
        └── LICENSE.txt`;
}
