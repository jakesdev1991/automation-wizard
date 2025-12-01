# Automation Wizard (Project Root)

This repo contains the source for **Automation Wizard Canvas**, a Svelte 5 + Vite app designed to help non-technical users and junior automation builders design, explain, and document workflows for tools like Zapier, n8n, GoHighLevel, and Ghost.

## Layout

- \`automation-wizard-app/\`  
  Svelte 5 + Vite front-end application.  
  Contains the interactive Canvas, Report, and Onboarding views.  
  See \`automation-wizard-app/README.md\` for full technical details and usage.

- \`docs/\`  
  Checkpoints, design notes, and planning material used while building the project.

- \`automation_wizard_dump.md\`  
  Consolidated dump/spec file used as a source of truth while iterating on the UI.

## Running the app

```bash
cd automation-wizard-app
npm install
npm run dev
Then open the URL shown in the terminal (usually `http://localhost:5173\`
).

This repo is primarily a portfolio piece to demonstrate:

Practical UI implementation on Svelte 5.

Ability to model real-world business automations as visual flows.

Translating those flows into plain-language specs that a client or junior builder can follow.
EOF
