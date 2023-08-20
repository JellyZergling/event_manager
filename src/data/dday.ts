export function calculateDDay(startdate: string) {
    const eventDate = new Date(startdate);
    const today = new Date();
    const timeDiff = eventDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    if(daysDiff === 0){
        return 'Day';
    }
    return daysDiff;
}