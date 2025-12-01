<script lang="ts">
  import type { PanState } from '$lib/types';

  export let pan: PanState;
  export let container: HTMLDivElement | null = null;

  let wheelHandler: ((e: WheelEvent) => void) | null = null;

  function attach() {
    if (!container) return;
    detach();
    wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY, clientX, clientY } = e;

      const factor = deltaY < 0 ? 1.1 : 0.9;
      const rect = container.getBoundingClientRect();

      const offsetX = clientX - rect.left - pan.x;
      const offsetY = clientY - rect.top - pan.y;

      const newScale = Math.min(Math.max(pan.scale * factor, 0.2), 2.5);

      pan.x -= offsetX * (newScale / pan.scale - 1);
      pan.y -= offsetY * (newScale / pan.scale - 1);

      pan.scale = newScale;
    };
    container.addEventListener('wheel', wheelHandler, { passive: false });
  }

  function detach() {
    if (container && wheelHandler) {
      container.removeEventListener('wheel', wheelHandler);
      wheelHandler = null;
    }
  }

  $: attach();

  import { onDestroy } from 'svelte';
  onDestroy(detach);
</script>
