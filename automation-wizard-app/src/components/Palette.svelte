<script lang="ts">
  import { coreNodes, aiNodes } from '../nodes/defs';
  import NodeTypeButton from './NodeTypeButton.svelte';
</script>

<div class="glass p-3 space-y-3">
  <div>
    <h3 class="text-sm font-semibold mb-1">Core nodes</h3>
    <div class="space-y-1">
      {#each coreNodes as def}
        <NodeTypeButton {def} />
      {/each}
    </div>
  </div>

  <div class="pt-2 border-t border-white/10">
    <h3 class="text-sm font-semibold mb-1">AI agents</h3>
    <div class="space-y-1">
      {#each aiNodes as def}
        <NodeTypeButton {def} />
      {/each}
    </div>
  </div>
</div>
