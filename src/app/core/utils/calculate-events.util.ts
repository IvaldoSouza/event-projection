import { Cycle } from "../models/cycle.model";
import { AggregatedEvent } from "../models/aggregated-event.model";


export function calculateEvents(cycles: Cycle[]): AggregatedEvent {
    const result: AggregatedEvent = {};

    // cycles.forEach(cycle => {
    //     cycle.eventsPerDay.forEach(event => {
    //         const quantity = event.quantity * (cycle.selectedEntities || 0);
    //         if (!result[event.day]) 
    //             result[event.day] = {};

    //         if (!result[event.day][event.type])
    //             result[event.day][event.type] = 0;
            
    //         result[event.day][event.type] += quantity;
    //     });
    // });
    
    return result;
}
