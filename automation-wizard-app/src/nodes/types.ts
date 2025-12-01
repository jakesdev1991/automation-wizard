import type { NodeType } from '../lib/types';

export interface NodeDefinition {
  id: string;
  type: NodeType;
  label: string;
  description?: string;
  icon: string;
  color: string;
  meta?: Record<string, any>;
}
