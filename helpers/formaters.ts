export const formatDuration = (dur: number, total?: number): string => {

  const res = (() => {
    if (Number.isInteger(dur)) {
      if (dur < 60) return `${dur}min`;

      const minutes = dur % 60;
      const hours = (dur - minutes) / 60;
      if (minutes === 0) return `${hours}h`;

      return `${hours}h ${minutes}min`;
    }
    return '?';
  })();

  return total ? `${total}x${res}` : res;
};

