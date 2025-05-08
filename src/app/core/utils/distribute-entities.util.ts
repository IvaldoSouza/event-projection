import { Cycle } from "../models/cycle.model";

export function distributeEntities(total: number, cycles: Cycle[]): Cycle[] {
    const result: Cycle[] = [];

    const priorityOrder = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1
    }

    const sortedCycles = [...cycles].filter(c => c.selected).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    let remanining = total;

    for (const cycle of sortedCycles) {
        const canAssign = Math.min(remanining, cycle.availableEntities);
        const updated: Cycle = { ...cycle, assignedEntities: canAssign };

        remanining -= canAssign;
        result.push(updated);

        if (remanining === 0) break;
    }

    return result
}
