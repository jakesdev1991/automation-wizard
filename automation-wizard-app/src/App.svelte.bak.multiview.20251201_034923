<script lang="ts">
  type NodeType = 'trigger' | 'action' | 'output' | 'ai';

  interface Node {
    id: number;
    label: string;
    type: NodeType;
    x: number;
    y: number;
  }

  type TemplateKind = 'demo' | 'tanning' | 'ghost';

  let activeView: 'canvas' | 'report' | 'onboarding' = 'canvas';
  let currentTemplateName = 'Demo: Lead enrichment';
  let helperMessage = 'Pick a template on the right, then drag the steps to tell the story of your automation.';

  let nodes: Node[] = makeTemplate('demo');

  // Drag state
  let draggingId: number | null = null;
  let dragOffset = { x: 0, y: 0 };
  let canvasRect: DOMRect | null = null;
  let canvasEl: HTMLDivElement | null = null;

  // Report
  let reportText = '';

  function verticalLayout(steps: { label: string; type: NodeType }[]): Node[] {
    return steps.map((step, i) => ({
      id: i + 1,
      ...step,
      x: 40,
      y: 40 + i * 70
    }));
  }

  function makeTemplate(kind: TemplateKind): Node[] {
    if (kind === 'tanning') {
      const steps = [
        { label: 'New lead form', type: 'trigger' as NodeType },
        { label: 'AI qualify lead', type: 'action' },
        { label: 'Create CRM contact', type: 'action' },
        { label: 'Membership upsell', type: 'action' },
        { label: 'Review request', type: 'output' }
      ];
      return verticalLayout(steps);
    }

    if (kind === 'ghost') {
      const steps = [
        { label: 'New idea intake', type: 'trigger' as NodeType },
        { label: 'AI outline draft', type: 'action' },
        { label: 'AI full draft', type: 'action' },
        { label: 'Human review', type: 'action' },
        { label: 'Schedule + publish', type: 'output' }
      ];
      return verticalLayout(steps);
    }

    // demo
    const steps = [
      { label: 'Trigger', type: 'trigger' as NodeType },
      { label: 'AI Enrich Lead', type: 'action' },
      { label: 'Create CRM Record', type: 'action' },
      { label: 'Notify Slack', type: 'output' }
    ];
    return verticalLayout(steps);
  }

  function setTemplate(kind: TemplateKind) {
    if (kind === 'tanning') {
      currentTemplateName = 'Corporate Tanning Salon Funnel';
      helperMessage =
        'This flow takes a new tanning lead, checks if they are a good fit, creates them in the CRM, offers a membership, and then asks nicely for a review.';
    } else if (kind === 'ghost') {
      currentTemplateName = 'Ghost Blog Content Loop';
      helperMessage =
        'This flow starts with a raw idea, lets AI draft the post, sends it to a human to polish, and then schedules it to go live on Ghost.';
    } else {
      currentTemplateName = 'Demo: Lead enrichment';
      helperMessage =
        'This flow enriches a lead with AI, creates a CRM record, and pings Slack so humans know what happened.';
    }

    nodes = makeTemplate(kind);
    activeView = 'canvas';
  }

  // Core nodes – clicking adds nodes to the current flow
  function addNode(type: NodeType) {
    const nextId = nodes.length ? Math.max(...nodes.map((n) => n.id)) + 1 : 1;
    const baseY = nodes.length ? Math.max(...nodes.map((n) => n.y)) + 70 : 40;
    const labelMap: Record<NodeType, string> = {
      trigger: 'New trigger',
      action: 'New action',
      output: 'New output',
      ai: 'AI helper step'
    };

    nodes = [
      ...nodes,
      {
        id: nextId,
        type,
        label: labelMap[type],
        x: 40,
        y: baseY
      }
    ];
  }

  // AI agents – for now they just guide the user and switch views
  function useTeacherAgent() {
    activeView = 'onboarding';
    helperMessage =
      'Teacher Agent: Start with the Canvas tab. Choose a template, then read the Onboarding tab from top to bottom. Pretend you are explaining it to a curious 10-year-old.';
  }

  function useDeveloperAgent() {
    activeView = 'report';
    helperMessage =
      'Developer Agent: Use the Canvas to shape the steps, then hit "Generate report" to get a plain-language spec you could hand to a junior dev or Zap builder.';
  }

  function useAutomationWizardAgent() {
    activeView = 'canvas';
    helperMessage =
      'Automation Wizard: Imagine your client is sitting next to you. Build the flow from left to right (top to bottom here), then use the Report tab to summarize it for them.';
  }

  // Drag handlers
  function handleNodePointerDown(event: PointerEvent, nodeId: number) {
    if (!canvasEl) return;
    const rect = canvasEl.getBoundingClientRect();
    canvasRect = rect;
    draggingId = nodeId;

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    dragOffset.x = pointerX - node.x;
    dragOffset.y = pointerY - node.y;

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handlePointerMove(event: PointerEvent) {
    if (draggingId === null || !canvasRect) return;

    const pointerX = event.clientX - canvasRect.left;
    const pointerY = event.clientY - canvasRect.top;

    const newX = pointerX - dragOffset.x;
    const newY = pointerY - dragOffset.y;

    const maxX = canvasRect.width - 160;
    const maxY = canvasRect.height - 60;

    nodes = nodes.map((n) =>
      n.id === draggingId
        ? {
            ...n,
            x: Math.min(Math.max(20, newX), maxX),
            y: Math.min(Math.max(20, newY), maxY)
          }
        : n
    );
  }

  function handlePointerUp() {
    draggingId = null;
    canvasRect = null;
  }

  // Report generation – child-level instructions
  function buildReport() {
    if (!nodes.length) {
      reportText =
        'There are no steps yet.\n\nGo to the Canvas tab, add a few steps, then come back here and generate the report again.';
      return;
    }

    const lines = nodes
      .sort((a, b) => a.y - b.y)
      .map((node, idx) => {
        const step = idx + 1;
        if (node.type === 'trigger') {
          return `${step}. WHEN this happens: "${node.label}". This is the starting bell.`;
        }
        if (node.type === 'action') {
          return `${step}. THEN we do this automatically: "${node.label}". No human needs to click anything.`;
        }
        if (node.type === 'output') {
          return `${step}. FINALLY we finish with: "${node.label}". This is the part humans see or receive.`;
        }
        return `${step}. Helper step: "${node.label}". This is where AI helps decide or transform something.`;
      });

    reportText =
      `High-level workflow for "${currentTemplateName}"\n\n` +
      lines.join('\n') +
      `\n\nExplain it like this to a child:\n` +
      `- First, something happens that starts the chain.\n` +
      `- Then the computer quietly does a few chores in the background.\n` +
      `- At the end, someone gets a message, an email, or a finished thing.\n`;
  }
</script>

<svelte:window
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
/>

<main class="aw-shell">
  <header class="aw-header glass">
    <div class="aw-header-left">
      <div class="aw-logo">AW</div>
      <div>
        <h1>Automation Wizard Canvas</h1>
        <p>
          Drag nodes, drop AI agents, and sketch automations (Zapier / n8n / GoHighLevel / Ghost).
        </p>
      </div>
    </div>
    <div class="aw-header-right">
      <span class="pill pill-primary">v0.2 · Interactive shell</span>
      <span class="pill">Interview prep mode</span>
    </div>
  </header>

  <!-- Simple multi-page nav -->
  <nav class="aw-nav glass">
    <button
      class:nav-active={activeView === 'canvas'}
      on:click={() => (activeView = 'canvas')}
    >
      Canvas
    </button>
    <button
      class:nav-active={activeView === 'report'}
      on:click={() => (activeView = 'report')}
    >
      Report
    </button>
    <button
      class:nav-active={activeView === 'onboarding'}
      on:click={() => (activeView = 'onboarding')}
    >
      Onboarding
    </button>
  </nav>

  {#if activeView === 'canvas'}
    <!-- CANVAS VIEW -->
    <section class="aw-grid">
      <!-- LEFT: Core + AI agents -->
      <div class="aw-column glass">
        <h2 class="section-title">Core nodes</h2>
        <p class="section-sub">
          Click to add steps to your flow. These map to Zapier / n8n primitives.
        </p>

        <div class="node-grid">
          <button class="node-card clickable" on:click={() => addNode('trigger')}>
            <div class="node-icon trigger">⚡</div>
            <div class="node-body">
              <h3>Trigger</h3>
              <p>Webhook / schedule / form submit. Starts the flow.</p>
            </div>
          </button>

          <button class="node-card clickable" on:click={() => addNode('action')}>
            <div class="node-icon condition">◇</div>
            <div class="node-body">
              <h3>Condition / Action</h3>
              <p>Branch on fields or call an API, send email, etc.</p>
            </div>
          </button>

          <button class="node-card clickable" on:click={() => addNode('output')}>
            <div class="node-icon output">●</div>
            <div class="node-body">
              <h3>Output</h3>
              <p>Final report, response payload, or webhook result.</p>
            </div>
          </button>
        </div>

        <h2 class="section-title mt">AI agents</h2>
        <p class="section-sub">
          Use these when you want help learning, coding, or designing the automation itself.
        </p>

        <div class="node-grid">
          <button class="node-card clickable" on:click={useTeacherAgent}>
            <div class="node-icon ai">📚</div>
            <div class="node-body">
              <h3>Teacher Agent</h3>
              <p>Walks you through the concepts step by step.</p>
              <span class="tag">Learning mode</span>
            </div>
          </button>

          <button class="node-card clickable" on:click={useDeveloperAgent}>
            <div class="node-icon ai">💻</div>
            <div class="node-body">
              <h3>Developer Agent</h3>
              <p>Helps turn the graph into an implementation plan.</p>
              <span class="tag">Dev helper</span>
            </div>
          </button>

          <button class="node-card clickable" on:click={useAutomationWizardAgent}>
            <div class="node-icon ai">🧙‍♂️</div>
            <div class="node-body">
              <h3>Automation Wizard</h3>
              <p>Focuses on business outcomes and client language.</p>
              <span class="tag tag-highlight">Workflow designer</span>
            </div>
          </button>
        </div>
      </div>

      <!-- MIDDLE: Canvas -->
      <div class="aw-column glass aw-canvas-column">
        <h2 class="section-title">Canvas</h2>
        <p class="section-sub">
          This is where the graph lives: nodes, connections, and AI annotations.
          Drag nodes around, swap templates, and talk through the flow.
        </p>

        <div class="canvas-label">
          Current flow: <span>{currentTemplateName}</span> · {nodes.length} steps
        </div>

        <div class="canvas-preview" bind:this={canvasEl}>
          {#each nodes as node}
            <div
              class={`canvas-node ${node.type}`}
              style={`left:${node.x}px; top:${node.y}px;`}
              on:pointerdown={(event) => handleNodePointerDown(event, node.id)}
            >
              {node.label}
            </div>
          {/each}
        </div>

        <ul class="hint-list">
          <li>Drag any node to reorder the story you tell about the automation.</li>
          <li>
            Add extra triggers/actions/outputs from the left to match the real business flow.
          </li>
          <li>When it feels right, switch to the Report tab and generate the explanation.</li>
        </ul>
      </div>

      <!-- RIGHT: Templates -->
      <div class="aw-column glass">
        <h2 class="section-title">Templates</h2>
        <p class="section-sub">
          One-click starting points for common flows. Good for interview answers *and* client projects.
        </p>

        <div class="template-card">
          <h3>Corporate Tanning Salon Funnel</h3>
          <p>Lead intake → membership upsell → reminder + review request.</p>
          <button class="btn-primary" on:click={() => setTemplate('tanning')}>
            Load template
          </button>
          <div class="template-meta">
            <span class="tag">Sales funnel</span>
            <span class="tag">Zapier / n8n</span>
          </div>
        </div>

        <div class="template-card">
          <h3>Ghost Blog Content Loop</h3>
          <p>Idea intake → AI draft → human review → schedule + publish.</p>
          <button class="btn-primary" on:click={() => setTemplate('ghost')}>
            Load template
          </button>
          <div class="template-meta">
            <span class="tag">Content ops</span>
            <span class="tag">Ghost</span>
          </div>
        </div>

        <div class="template-card">
          <h3>Demo: Lead Enrichment</h3>
          <p>Basic example you can rearrange freely.</p>
          <button class="btn-secondary" on:click={() => setTemplate('demo')}>
            Reset to demo
          </button>
        </div>
      </div>
    </section>
  {:else if activeView === 'report'}
    <!-- REPORT VIEW -->
    <section class="aw-grid single">
      <div class="aw-column glass">
        <h2 class="section-title">Workflow report</h2>
        <p class="section-sub">
          Turn the current canvas into a plain-language description you can hand to a child,
          a client, or a junior automation builder.
        </p>

        <button class="btn-primary mt-small" on:click={buildReport}>
          Generate report from current canvas
        </button>

        <textarea
          class="report-area"
          rows="14"
          readonly
          placeholder="Click 'Generate report' to create a description of your flow."
          bind:value={reportText}
        ></textarea>

        <p class="section-sub">
          Tip: In an interview, you can read the top part as a technical spec, and then read the
          child-friendly bullets as proof you can communicate with non-technical clients.
        </p>
      </div>
      <div class="aw-column glass helper">
        <h2 class="section-title">Developer notes</h2>
        <p class="section-sub">
          This is where you would eventually export JSON for n8n / Zapier or generate code stubs.
          For now, treat the text report as the "single source of truth" for the flow.
        </p>
        <ul class="hint-list">
          <li>Keep step names short and clear on the Canvas – it makes the report read better.</li>
          <li>Mention external tools explicitly: “Create contact in HubSpot”, “Send email via Gmail”.</li>
          <li>Use this page to practice turning graphs into specs in under 5 minutes.</li>
        </ul>
      </div>
    </section>
  {:else}
    <!-- ONBOARDING VIEW -->
    <section class="aw-grid single">
      <div class="aw-column glass">
        <h2 class="section-title">Onboarding: Learn this in one day</h2>
        <p class="section-sub">
          The goal: by the end of today, you can design, explain, and spec an automation for a real
          business – even if you have never used Zapier or n8n before.
        </p>

        <ol class="onboard-steps">
          <li>
            <strong>Pick a template on the Canvas tab.</strong><br />
            Example: the tanning salon or Ghost blog loop. Read each step out loud.
          </li>
          <li>
            <strong>Rename steps in your own words.</strong><br />
            Double-check: could a 10-year-old guess what happens from the label alone?
          </li>
          <li>
            <strong>Drag steps until the story feels right.</strong><br />
            Think of it as a comic strip: start, middle, end.
          </li>
          <li>
            <strong>Generate a report on the Report tab.</strong><br />
            Read the result out loud as if you were talking to a client.
          </li>
          <li>
            <strong>Translate that report into real tools.</strong><br />
            For each step, answer: “Is this a Trigger, an Action, or an Output in Zapier / n8n?”
          </li>
        </ol>
      </div>

      <div class="aw-column glass helper">
        <h2 class="section-title">Teacher Agent tips</h2>
        <p class="section-sub">
          Use this checklist while you practice. If you can honestly say “yes” to these,
          you’re job-ready for basic automation work.
        </p>
        <ul class="hint-list">
          <li>I can explain any flow using only 5–8 short steps.</li>
          <li>I know what counts as a Trigger, Action, and Output in common tools.</li>
          <li>I can describe what AI does in the flow without hand-waving.</li>
          <li>I can talk like a human, not a robot, when I explain the system.</li>
        </ul>
      </div>
    </section>
  {/if}

  <section class="helper-bar glass">
    <p>{helperMessage}</p>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Inter", "Segoe UI", sans-serif;
    background: radial-gradient(circle at top, #1e293b 0, #020617 55%, #020617 100%);
    color: #e5e7eb;
  }

  .aw-shell {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 20px 40px;
  }

  .glass {
    backdrop-filter: blur(14px) saturate(130%);
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.82));
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.8);
  }

  .aw-header {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 16px;
  }

  .aw-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .aw-logo {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: radial-gradient(circle at 30% 20%, #38bdf8, #6366f1 55%, #0f172a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    letter-spacing: 0.08em;
    font-size: 18px;
  }

  .aw-header h1 {
    font-size: 22px;
    margin: 0;
  }

  .aw-header p {
    margin: 2px 0 0;
    font-size: 13px;
    color: #cbd5f5;
  }

  .aw-header-right {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
  }

  .pill {
    font-size: 11px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    color: #e5e7eb;
  }

  .pill-primary {
    background: linear-gradient(135deg, #38bdf8, #a855f7);
    color: #020617;
    border-color: transparent;
    font-weight: 600;
  }

  .aw-nav {
    display: inline-flex;
    gap: 8px;
    padding: 4px;
    margin-bottom: 16px;
  }

  .aw-nav button {
    border-radius: 999px;
    border: none;
    background: transparent;
    padding: 6px 16px;
    font-size: 13px;
    color: #e5e7eb;
    cursor: pointer;
  }

  .aw-nav button.nav-active {
    background: linear-gradient(135deg, #38bdf8, #a855f7);
    color: #020617;
    font-weight: 600;
  }

  .aw-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.3fr) minmax(0, 1.1fr);
    gap: 18px;
  }

  .aw-grid.single {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.2fr);
  }

  .aw-column {
    padding: 16px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .section-title {
    font-size: 15px;
    font-weight: 600;
    margin: 0;
  }

  .section-title.mt {
    margin-top: 10px;
  }

  .section-sub {
    margin: 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .node-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
    margin-top: 8px;
  }

  .node-card {
    display: flex;
    gap: 10px;
    padding: 10px 11px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: radial-gradient(circle at top left, rgba(148, 163, 184, 0.16), rgba(15, 23, 42, 0.95));
    transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
    text-align: left;
  }

  .node-card.clickable {
    cursor: pointer;
    background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.95));
  }

  .node-card.clickable:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.9);
    border-color: rgba(56, 189, 248, 0.9);
  }

  .node-card button {
    background: none;
    border: none;
  }

  .node-icon {
    width: 40px;
    height: 40px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .node-icon.trigger {
    background: radial-gradient(circle at 30% 20%, #22c55e, #a3e635);
  }

  .node-icon.condition {
    background: radial-gradient(circle at 30% 20%, #facc15, #fb923c);
  }

  .node-icon.action {
    background: radial-gradient(circle at 30% 20%, #38bdf8, #6366f1);
  }

  .node-icon.output {
    background: radial-gradient(circle at 30% 20%, #a855f7, #f97316);
  }

  .node-icon.ai {
    background: radial-gradient(circle at 30% 20%, #2dd4bf, #818cf8);
  }

  .node-body h3 {
    margin: 0 0 2px;
    font-size: 13px;
  }

  .node-body p {
    margin: 0;
    font-size: 12px;
    color: #9ca3af;
  }

  .tag {
    display: inline-flex;
    margin-top: 6px;
    font-size: 10px;
    padding: 3px 7px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    color: #e5e7eb;
  }

  .tag-highlight {
    border-color: rgba(251, 191, 36, 0.9);
    color: #facc15;
  }

  /* Canvas */

  .aw-canvas-column {
    position: relative;
  }

  .canvas-label {
    margin-top: 6px;
    font-size: 12px;
    color: #cbd5f5;
  }

  .canvas-label span {
    font-weight: 600;
  }

  .canvas-preview {
    margin-top: 10px;
    padding: 18px 14px;
    border-radius: 14px;
    border: 1px dashed rgba(148, 163, 184, 0.45);
    background: radial-gradient(circle at top, rgba(148, 163, 184, 0.18), rgba(15, 23, 42, 0.96));
    position: relative;
    min-height: 260px;
    max-height: 260px;
    overflow: hidden;
  }

  .canvas-node {
    position: absolute;
    padding: 7px 11px;
    border-radius: 999px;
    font-size: 12px;
    white-space: nowrap;
    border: 1px solid rgba(148, 163, 184, 0.6);
    background: rgba(15, 23, 42, 0.9);
    cursor: grab;
    user-select: none;
  }

  .canvas-node:active {
    cursor: grabbing;
  }

  .canvas-node.trigger {
    border-color: #22c55e;
    color: #bbf7d0;
  }

  .canvas-node.action {
    border-color: #38bdf8;
    color: #bae6fd;
  }

  .canvas-node.output {
    border-color: #a855f7;
    color: #e9d5ff;
  }

  .hint-list {
    margin: 10px 0 0;
    padding-left: 18px;
    font-size: 11px;
    color: #9ca3af;
  }

  .hint-list li + li {
    margin-top: 4px;
  }

  /* Templates */

  .template-card {
    margin-top: 4px;
    padding: 12px 13px;
    border-radius: 13px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: radial-gradient(circle at top left, rgba(251, 191, 36, 0.12), rgba(15, 23, 42, 0.96));
  }

  .template-card h3 {
    margin: 0 0 4px;
    font-size: 14px;
  }

  .template-card p {
    margin: 0 0 8px;
    font-size: 12px;
    color: #d1d5db;
  }

  .template-meta {
    margin-top: 6px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 4px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #38bdf8, #a855f7);
    color: #020617;
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.4);
  }

  .btn-secondary {
    background: rgba(15, 23, 42, 0.9);
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.7);
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 40px rgba(56, 189, 248, 0.6);
  }

  .mt-small {
    margin-top: 4px;
  }

  .report-area {
    margin-top: 10px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: rgba(15, 23, 42, 0.96);
    color: #e5e7eb;
    padding: 10px;
    font-size: 12px;
    resize: vertical;
  }

  .onboard-steps {
    margin: 4px 0 0;
    padding-left: 18px;
    font-size: 12px;
    color: #e5e7eb;
  }

  .onboard-steps li + li {
    margin-top: 6px;
  }

  .helper-bar {
    margin-top: 18px;
    padding: 10px 14px;
    font-size: 12px;
    color: #e5e7eb;
  }

  .helper-bar p {
    margin: 0;
  }

  .helper.aw-column {
    align-self: flex-start;
  }

  @media (max-width: 960px) {
    .aw-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .aw-grid.single {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
