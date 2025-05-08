export interface AggregatedEvent {
    [day: number]: {
        [type: string]: number;
    };
}