Automation Wizard Canvas — SvelteKit

This repo is a visual automation builder focused on learning and doing the job
of an "AI Automation Wizard":

- Drag nodes (triggers, actions, conditions, outputs, AI agents).
- Drop role-based AI agents:
  - Teacher Agent
  - Software Developer Agent
  - AI Automation Wizard (Zapier/n8n/GoHighLevel/Ghost playbooks)
- Click the AI Automation Wizard node to:
  - View a "playbook" (description of a business workflow).
  - Generate a full graph of nodes and connections from that playbook (future backend hook).
- Use one-click **Templates** to instantly load common flows
  (e.g. a corporate tanning salon intake → CRM → membership upsell flow).

It’s designed both as:

1. A practical tool to sketch automation workflows (like Zapier/n8n/Make).
2. A learning sandbox for becoming an "AI Automation Wizard" yourself.

## Features

- Glassmorphism UI with a pan/zoom canvas.
- Drag-and-drop nodes that respect pan/zoom (dragging is done in world coordinates).
- Node palette with:
  - Core nodes (Triggers, Actions, Conditions, Outputs).
  - Role-based AI nodes (Teacher, Software Dev, Automation Wizard).
- Connections:
  - Drag from a node’s outbound port to another node to connect.
  - See a live list of connections in the left sidebar.
- Inspector:
  - Shows details for the selected node.
  - Role-aware sections (e.g., Automation Wizard node shows playbooks + "Generate graph" concept).
- Save / Load / Clear:
  - Save the current canvas to `localStorage` (key: `aw-canvas-v1`).
  - Load it back later.
  - Clear all nodes and connections.
- Templates Panel:
  - One-click load of prebuilt flows (e.g. Corporate Tanning Salon Intake & Upsell, Ghost Blog Syndication).

## Tech Stack

- SvelteKit
- TypeScript
- TailwindCSS
- Vite

## Getting Started

1. Rebuild repo from dump:

   ```bash
   python3 build_from_dump.py automation_wizard_dump.md ./automation-wizard-app
   cd automation-wizard-app
Install dependencies:

bash
Copy code
npm install
Run dev server:

bash
Copy code
npm run dev -- --host 0.0.0.0 --port 5173
Open in browser:

http://localhost:5173

Folder Structure
src/

lib/

types.ts

workflowStore.ts

utils.ts

templates.ts

components/

NodeCard.svelte

WireLayer.svelte

NodeTypeButton.svelte

Palette.svelte

Inspector.svelte

PanZoom.svelte

TemplatesPanel.svelte

nodes/

types.ts

defs.ts

routes/

+page.svelte

============================================================
