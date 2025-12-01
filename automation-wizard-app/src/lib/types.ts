export type NodeType = 'trigger' | 'action' | 'condition' | 'output' | 'ai';

export interface NodeMeta {
  templateId?: string;
  notes?: string;
  [key: string]: any;
}

export interface NodeItem {
  id: number;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  role?: 'teacher' | 'dev' | 'wizard';
  meta?: NodeMeta;
}

export interface Conn {
  from: number;
  to: number;
}

export interface PanState {
  x: number;
  y: number;
  scale: number;
}
