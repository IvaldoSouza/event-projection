export interface EventProjection {
    day: number;
    events: {
      meetings: number;
      emails: number;
      calls: number;
      follows: number;
    }
}