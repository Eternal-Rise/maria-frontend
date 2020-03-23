export const formatDuration = (dur: number): string => {
  if (Number.isInteger(dur)) {
    if (dur < 60) return `${dur}min`;

    const minutes = dur % 60;
    const hours = dur / 60 - minutes;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}min`
  }
  return '?';
}