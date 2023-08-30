export function calculateDDay(startdate: string, enddate: string) {
  const eventStartDate = new Date(startdate);
  const eventEndDate = new Date(enddate);
  const today = new Date();

  const startDiff = Math.ceil((eventStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const endDiff = Math.ceil((eventEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (startDiff === 0 && endDiff === 0) {
    return 'D-Day';
  }

  if (startDiff < 0 && endDiff >= 0) {
    return 'D-Day';
  }

  return startDiff > 0 ? `D-${startDiff}` : `D+${Math.abs(startDiff)}`;
}