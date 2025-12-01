import { writable, derived } from 'svelte/store';
import type { NodeItem, Conn } from './types';

export const nodes = writable<NodeItem[]>([]);
export const connections = writable<Conn[]>([]);
export const selected = writable<number | null>(null);

export const nodeCounter = writable(1);

export const isConnecting = writable<{ from: number; x: number; y: number } | null>(null);
export const tempPos = writable<{ x: number; y: number } | null>(null);

export const nodeMap = derived(nodes, ($nodes) => {
  const m = new Map<number, NodeItem>();
  $nodes.forEach((n) => m.set(n.id, n));
  return m;
});

export function createCustomNode(
  type: NodeItem['type'],
  label: string,
  x: number,
  y: number,
  templateId?: string,
  meta?: any
) {
  let idVal = 1;
  nodeCounter.update((n) => {
    idVal = n;
    return n + 1;
  });

  const node: NodeItem = {
    id: idVal,
    type,
    label,
    x,
    y,
    meta: { templateId, ...(meta || {}) },
    role: meta?.role
  };

  nodes.update((arr) => [...arr, node]);
}

export function removeNode(id: number) {
  nodes.update((arr) => arr.filter((n) => n.id !== id));
  connections.update((arr) => arr.filter((c) => c.from !== id && c.to !== id));
  selected.update((s) => (s === id ? null : s));
}

export function removeConnection(index: number) {
  connections.update((arr) => arr.filter((_, i) => i !== index));
}

export function tryCreateConnection(from: number, to: number) {
  if (from === to) {
    throw new Error('Cannot connect a node to itself.');
  }
  let exists = false;
  connections.update((arr) => {
    if (arr.some((c) => c.from === from && c.to === to)) {
      exists = true;
      return arr;
    }
    return [...arr, { from, to }];
  });
  if (exists) {
    throw new Error('Connection already exists.');
  }
}
