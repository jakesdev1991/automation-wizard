<script lang="ts">
  import { templates, applyTemplate } from '../lib/templates';
</script>

<div class="glass p-3 space-y-2">
  <h3 class="text-sm font-semibold mb-1">Templates</h3>
  <p class="text-xs text-slate-300">
    One-click starting points for common flows.
  </p>

  {#each templates as t}
    <div class="bg-white/5 rounded p-2 text-xs space-y-1">
      <div class="font-semibold">{t.name}</div>
      <div class="text-slate-300 text-[11px]">
        {t.description}
      </div>
      <button
        class="mt-1 w-full bg-emerald-500/80 hover:bg-emerald-500 text-[11px] py-1 rounded"
        on:click={() => applyTemplate(t.id)}
      >
        Load template
      </button>
    </div>
  {/each}
</div>
