export const seededRandomColor = seed => {
  const colors = ["#222526", "#353A3E", "#1A1A1A", "#BFBFBF"];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
