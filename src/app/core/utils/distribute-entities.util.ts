import { Cycle } from "../models/cycle.model";

export function distributeEntities(total: number, cycles: Cycle[]): Cycle[] {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    let remaining = total;

    // Define os ciclos que participarão da distribuição:
    const selectedCycles = cycles.some(c => c.selected)
        ? cycles.filter(c => c.selected)
        : cycles.map(c => ({ ...c, selected: true }));

    // Ordena por prioridade
    const ordered = [...selectedCycles].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    // Distribui entidades
    const updatedMap = new Map<string, number>();

    for (const cycle of ordered) {
        if (remaining <= 0) break;

        const toAssign = Math.min(cycle.availableEntities, remaining);
        updatedMap.set(cycle.name, toAssign);
        remaining -= toAssign;
    }

    // Retorna todos os ciclos atualizados
    return cycles.map(cycle => {
        const assigned = updatedMap.get(cycle.name) ?? 0;
        return {
            ...cycle,
            assignedEntities: assigned
        };
    });
}


export function distributeEntities2(total: number, cycles: Cycle[]): Cycle[] {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

    const sortedCycles = cycles
        .filter(c => c.selected)
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    let remaining = total;

    return sortedCycles.map(cycle => {
        const toAssign = Math.min(remaining, cycle.availableEntities);

        remaining -= toAssign;

        return {
            ...cycle,
            assignedEntities: toAssign
        };
    }).concat(
        cycles.filter(c => !c.selected).map(c => ({
            ...c,
            assignedEntities: 0
        }))
    );
}


// export function distributeEntities(total: number, cycles: Cycle[]): Cycle[] {
//     const result: Cycle[] = [];

//     const priorityOrder = {
//         HIGH: 3,
//         MEDIUM: 2,
//         LOW: 1
//     }

//     const sortedCycles = [...cycles].filter(c => c.selected).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
//     let remanining = total;

//     // const sortedCycles = [...cycles].sort(
//     //     (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//     // );

//     for (const cycle of sortedCycles) {
//         const canAssign = Math.min(remanining, cycle.availableEntities);
//         const updated: Cycle = { ...cycle, assignedEntities: canAssign };

//         remanining -= canAssign;
//         result.push(updated);

//         if (remanining === 0) break;
//     }

//     return result
// }
