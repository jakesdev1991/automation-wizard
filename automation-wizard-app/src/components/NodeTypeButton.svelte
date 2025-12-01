<script lang="ts">
  import type { NodeDefinition } from '../nodes/types';
  import { createCustomNode, nodes } from '../lib/workflowStore';
  import { get } from 'svelte/store';

  export let def: NodeDefinition;

  function handleClick() {
    const existing = get(nodes).length;
    const col = existing % 4;
    const row = Math.floor(existing / 4);

    const x = 160 + col * 260;
    const y = 140 + row * 140;

    createCustomNode(def.type, def.label, x, y, def.id, def.meta);
  }
</script>

<button
  class="flex items-center gap-3 p-2 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors border border-white/5 w-full text-left"
  on:click={handleClick}
  title={def.description}
>
  <div
    class={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br \${def.color} text-slate-900 text-lg`}
  >
    {def.icon}
  </div>
  <div class="text-left">
    <div class="font-medium text-sm">{def.label}</div>
    {#if def.description}
      <div class="text-[11px] text-slate-300 line-clamp-2">{def.description}</div>
    {/if}
  </div>
</button>
