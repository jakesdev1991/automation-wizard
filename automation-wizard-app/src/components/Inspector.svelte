<script lang="ts">
  import { nodes, selected, nodeMap } from '../lib/workflowStore';

  let labelEdit = '';
  let roleNotes = '';

  $: currentId = $selected;
  $: currentNode = currentId ? $nodeMap.get(currentId) : null;

  $: if (currentNode) {
    labelEdit = currentNode.label;
    roleNotes =
      currentNode.meta?.notes ??
      (currentNode.role === 'wizard'
        ? 'Paste a business workflow playbook here.'
        : currentNode.role === 'teacher'
        ? 'Write down quiz focus areas or topics.'
        : currentNode.role === 'dev'
        ? 'Write down implementation notes / stacks.'
        : '');
  }

  function updateNode() {
    if (!currentNode) return;
    const id = currentNode.id;
    nodes.update((list) =>
      list.map((n) =>
        n.id === id
          ? {
              ...n,
              label: labelEdit,
              meta: {
                ...n.meta,
                notes: roleNotes
              }
            }
          : n
      )
    );
  }
</script>

<div class="glass p-3 space-y-2">
  <h3 class="text-sm font-semibold mb-1">Inspector</h3>

  {#if !currentNode}
    <div class="text-xs text-slate-400">
      Select a node to view details and role-specific helpers.
    </div>
  {:else}
    <div class="text-xs text-slate-400 mb-1">
      Node #{currentNode.id} · {currentNode.type}
    </div>

    <div class="space-y-1">
      <label class="block text-[11px] text-slate-400" for="node-label">Label</label>
      <input
        id="node-label"
        class="w-full bg-slate-900/70 border border-slate-600/80 rounded px-2 py-1 text-xs"
        bind:value={labelEdit}
        on:blur={updateNode}
      />
    </div>

    {#if currentNode.role === 'wizard'}
      <div class="mt-2 space-y-1">
        <div class="text-[11px] font-semibold text-fuchsia-300">
          Automation Wizard Playbook
        </div>
        <p class="text-[11px] text-slate-300">
          Paste a plain-language description of a workflow here
          (e.g., "Corporate tanning salon: intake & upsell").
        </p>
        <textarea
          class="w-full bg-slate-900/70 border border-fuchsia-400/60 rounded px-2 py-1 text-[11px] h-24"
          bind:value={roleNotes}
          on:blur={updateNode}
        ></textarea>
        <button
          class="w-full mt-1 bg-fuchsia-500/80 hover:bg-fuchsia-500 text-xs py-1 rounded"
          on:click={() =>
            alert('In a real app, this would call the AI backend to generate a node graph.')
          }
        >
          Generate graph from playbook (concept)
        </button>
      </div>
    {:else if currentNode.role === 'teacher'}
      <div class="mt-2 space-y-1">
        <div class="text-[11px] font-semibold text-amber-300">
          Teacher Agent Notes
        </div>
        <p class="text-[11px] text-slate-300">
          Define what you want to be quizzed on (Zapier, n8n, GoHighLevel, Ghost, etc.).
        </p>
        <textarea
          class="w-full bg-slate-900/70 border border-amber-400/60 rounded px-2 py-1 text-[11px] h-20"
          bind:value={roleNotes}
          on:blur={updateNode}
        ></textarea>
      </div>
    {:else if currentNode.role === 'dev'}
      <div class="mt-2 space-y-1">
        <div class="text-[11px] font-semibold text-sky-300">
          Developer Agent Notes
        </div>
        <p class="text-[11px] text-slate-300">
          Describe target stack, platforms, or integration style.
        </p>
        <textarea
          class="w-full bg-slate-900/70 border border-sky-400/60 rounded px-2 py-1 text-[11px] h-20"
          bind:value={roleNotes}
          on:blur={updateNode}
        ></textarea>
      </div>
    {/if}
  {/if}
</div>
