import { Cycle } from "../models/cycle.model";

export function distributeEntities(total: number, cycles: Cycle[]): Cycle[] {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    let remaining = total;

    const selectedCycles = cycles.some(c => c.selected)
        ? cycles.filter(c => c.selected)
        : cycles.map(c => ({ ...c, selected: true }));

    const ordered = [...selectedCycles].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    const updatedMap = new Map<string, number>();

    for (const cycle of ordered) {
        if (remaining <= 0) break;

        const toAssign = Math.min(cycle.availableEntities, remaining);
        updatedMap.set(cycle.name, toAssign);
        remaining -= toAssign;
    }

    return cycles.map(cycle => {
        const assigned = updatedMap.get(cycle.name) ?? 0;
        return {
            ...cycle,
            assignedEntities: assigned
        };
    });
}
