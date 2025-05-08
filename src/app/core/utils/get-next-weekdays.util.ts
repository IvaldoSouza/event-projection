export function getNextWeekdays(count: number): Date[] {
    const days: Date[] = [];
    let date = new Date();
    
    while (days.length < count) {
        const day = date.getDay();
        if (day >= 1 && day <= 5) {
            days.push(new Date(date));
        }
        
        date.setDate(date.getDate() + 1);
    }

    return days;
}