import type { NodeDefinition } from './types';

export const coreNodes: NodeDefinition[] = [
  {
    id: 'trigger',
    type: 'trigger',
    label: 'Trigger',
    description: 'Entry point: webhook / schedule / form submit.',
    icon: '⏱',
    color: 'from-emerald-400 to-emerald-300'
  },
  {
    id: 'condition',
    type: 'condition',
    label: 'Condition',
    description: 'Branch based on fields or AI decisions.',
    icon: '◇',
    color: 'from-sky-400 to-sky-300'
  },
  {
    id: 'action',
    type: 'action',
    label: 'Action',
    description: 'Call API, send email, push to CRM.',
    icon: '⚙',
    color: 'from-indigo-400 to-indigo-300'
  },
  {
    id: 'output',
    type: 'output',
    label: 'Output',
    description: 'Final output / report / webhook.',
    icon: '⬤',
    color: 'from-amber-400 to-amber-300'
  }
];

export const aiNodes: NodeDefinition[] = [
  {
    id: 'teacher-agent',
    type: 'ai',
    label: 'Teacher Agent',
    description: 'Quiz you on Zapier / n8n / GoHighLevel / Ghost workflows.',
    icon: '🎓',
    color: 'from-amber-300 to-amber-200',
    meta: { role: 'teacher' }
  },
  {
    id: 'dev-agent',
    type: 'ai',
    label: 'Developer Agent',
    description: 'Turn node graph into implementable stack hints.',
    icon: '👨‍💻',
    color: 'from-sky-300 to-sky-200',
    meta: { role: 'dev' }
  },
  {
    id: 'wizard-agent',
    type: 'ai',
    label: 'Automation Wizard',
    description: 'Paste business playbook, get full workflow graph.',
    icon: '🧙‍♂️',
    color: 'from-fuchsia-300 to-fuchsia-200',
    meta: { role: 'wizard' }
  }
];
