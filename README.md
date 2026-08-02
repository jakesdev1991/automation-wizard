# Automation Wizard

Svelte-based automation workflow builder with visual drag-and-drop interface. Create, manage, and execute complex automation pipelines.

## Overview

Automation Wizard provides:

- **Visual Pipeline Builder**: Drag-and-drop workflow construction
- **Node Library**: Pre-built automation nodes (HTTP, Transform, Conditional, Loop)
- **Execution Engine**: Local and remote pipeline execution
- **State Management**: Persistent workflow state with undo/redo
- **Template System**: Reusable workflow templates

## Structure

```
automation-wizard/
├── automation-wizard-app/    # SvelteKit frontend
├── docs/                     # Documentation
├── automation_wizard_dump.md # Architecture notes
└── LICENSE                   # MIT License
```

## Quick Start

```bash
cd automation-wizard-app
npm install
npm run dev
```

## Development

```bash
# Type check
npm run check

# Lint
npm run lint

# Build
npm run build

# Test
npm run test
```

## Configuration

See `automation-wizard-app/.env.example` for environment variables.

## License

MIT License - see [LICENSE](LICENSE) for details.