<script lang="ts">
  import type { NodeItem } from '../lib/types';
  import { selected } from '../lib/workflowStore';
  import { createEventDispatcher } from 'svelte';

  export let node: NodeItem;

  const dispatch = createEventDispatcher<{ remove: { id: number } }>();

  function handleRemove(event: PointerEvent) {
    event.stopPropagation();
    dispatch('remove', { id: node.id });
  }
</script>

<div
  class="absolute select-none node-card"
  class:selected={$selected === node.id}
  style={`left:${node.x}px;top:${node.y}px;width:${node.w ?? 220}px;height:${node.h ?? 90}px;`}
>
  <div class="glass w-full h-full p-3 flex flex-col justify-between cursor-move">
    <div class="flex items-start justify-between gap-2">
      <div>
        <div class="text-[11px] uppercase tracking-wide text-slate-400">
          {node.type === 'ai' ? 'AI Agent' : node.type}
        </div>
        <div class="font-semibold text-sm leading-snug">
          {node.label}
        </div>
        {#if node.role}
          <div class="text-[11px] text-slate-300 mt-0.5">
            {node.role === 'teacher'
              ? 'Explain & quiz about automation platforms.'
              : node.role === 'dev'
              ? 'Turn flows into implementation hints.'
              : 'Generate workflows from business playbooks.'}
          </div>
        {/if}
      </div>
      <button
        class="text-slate-400 hover:text-rose-300 text-xs"
        on:click={handleRemove}
        title="Remove node"
      >
        ✕
      </button>
    </div>

    <div class="flex items-center justify-end mt-2">
      <div class="text-[10px] text-slate-500">
        ID {node.id}
      </div>
    </div>
  </div>
</div>

<style>
  .node-card {
    transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
    border: 1px solid transparent;
  }
  .node-card.selected {
    border-color: rgba(56, 189, 248, 0.9);
    box-shadow:
      0 0 0 1px rgba(56, 189, 248, 0.7),
      0 0 24px rgba(56, 189, 248, 0.3);
  }
</style>
