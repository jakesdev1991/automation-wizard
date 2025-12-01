import { nodes, connections, nodeCounter } from './workflowStore';
import type { NodeItem, Conn } from './types';

export interface TemplateDef {
  id: string;
  name: string;
  description: string;
}

export const templates: TemplateDef[] = [
  {
    id: 'tanning-salon',
    name: 'Corporate Tanning Salon Funnel',
    description: 'Lead intake → membership upsell → reminder + review request.'
  },
  {
    id: 'ghost-blog',
    name: 'Ghost Blog Content Loop',
    description: 'Idea intake → AI draft → review → schedule publish.'
  }
];

export function applyTemplate(id: string) {
  let baseId = 1;
  let nodesData: NodeItem[] = [];
  let conns: Conn[] = [];

  if (id === 'tanning-salon') {
    nodesData = [
      { id: baseId++, type: 'trigger', label: 'New Lead (Form/Webhook)', x: 120, y: 160 },
      {
        id: baseId++,
        type: 'ai',
        label: 'Automation Wizard (Upsell Plan)',
        x: 380,
        y: 160,
        role: 'wizard',
        meta: { notes: 'Map promo, membership, follow-ups.' }
      },
      { id: baseId++, type: 'action', label: 'Create/Update CRM Contact', x: 680, y: 140 },
      { id: baseId++, type: 'action', label: 'Send Intro Offer SMS/Email', x: 980, y: 120 },
      { id: baseId++, type: 'output', label: 'Log in Analytics / BI', x: 1280, y: 160 }
    ];
    conns = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 }
    ];
  } else if (id === 'ghost-blog') {
    nodesData = [
      { id: baseId++, type: 'trigger', label: 'New Idea / Topic', x: 120, y: 160 },
      {
        id: baseId++,
        type: 'ai',
        label: 'Teacher Agent (SEO Brief)',
        x: 380,
        y: 160,
        role: 'teacher',
        meta: { notes: 'Clarify structure + intent.' }
      },
      {
        id: baseId++,
        type: 'ai',
        label: 'Developer Agent (Ghost Config)',
        x: 680,
        y: 150,
        role: 'dev'
      },
      { id: baseId++, type: 'action', label: 'Create Draft in Ghost', x: 980, y: 150 },
      { id: baseId++, type: 'output', label: 'Publish / Queue Post', x: 1280, y: 150 }
    ];
    conns = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 }
    ];
  }

  if (!nodesData.length) return;

  nodes.set(nodesData);
  connections.set(conns);
  nodeCounter.set(nodesData.length + 1);
}
