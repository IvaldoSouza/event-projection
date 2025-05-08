export interface CycleStructure {
  day: number;
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}

export interface Cycle {
    name: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    availableEntities: number;
    selectedEntities: number;
    structure: CycleStructure[];

    selected?: boolean;
    assignedEntities?: number;
}