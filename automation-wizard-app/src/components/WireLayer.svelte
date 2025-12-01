<script lang="ts">
  import { nodes, connections, isConnecting, tempPos } from '../lib/workflowStore';
  import { bezierPath } from '../lib/utils';
  import { derived } from 'svelte/store';

  const wires = derived(
    [nodes, connections],
    ([$nodes, $connections]) => {
      const byId = new Map($nodes.map((n) => [n.id, n]));
      return $connections
        .map((c) => {
          const from = byId.get(c.from);
          const to = byId.get(c.to);
          if (!from || !to) return null;

          const fromX = (from.x + (from.w ?? 220)) + 4;
          const fromY = (from.y + (from.h ?? 90) / 2);
          const toX = to.x - 8;
          const toY = (to.y + (to.h ?? 90) / 2);

          return {
            d: bezierPath(fromX, fromY, toX, toY)
          };
        })
        .filter(Boolean) as { d: string }[];
    }
  );
</script>

<svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
  <g class="glow">
    {#each $wires as w}
      <path
        d={w.d}
        fill="none"
        stroke="rgba(56, 189, 248, 0.8)"
        stroke-width="2"
      />
    {/each}

    {#if $isConnecting && $tempPos}
      <path
        d={bezierPath(
          $isConnecting.x,
          $isConnecting.y,
          $tempPos.x,
          $tempPos.y
        )}
        fill="none"
        stroke="rgba(148, 163, 184, 0.9)"
        stroke-width="1.5"
        stroke-dasharray="4 4"
      />
    {/if}
  </g>
</svg>
