import { Cycle } from "../models/cycle.model";
import { AggregatedEvent } from "../models/aggregated-event.model";

// export function getEventsForToday(cycle: Cycle): number {
//     if (!cycle.assignedEntities || cycle.assignedEntities === 0) 
//         return 0;

//     const dayOne = cycle.structure.find(s => s.day === 1);
//     if (!dayOne) return 0;

//     return (
//         (dayOne.meetings + dayOne.emails + dayOne.calls + dayOne.follows) *
//         cycle.assignedEntities
//     );
// }



// export function calculateEvents(cycles: Cycle[]): AggregatedEvent {
//     const result: AggregatedEvent = {};

//     cycles.forEach(cycle => {
//         cycle.structure.forEach(event => {
//             const quantity = event.quantity * (cycle.selectedEntities || 0);
//             if (!result[event.day]) 
//                 result[event.day] = {};

//             if (!result[event.day][event.type])
//                 result[event.day][event.type] = 0;

//             result[event.day][event.type] += quantity;
//         });
//     });

//     return result;
// }
