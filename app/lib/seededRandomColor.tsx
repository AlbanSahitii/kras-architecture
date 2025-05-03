export const seededRandomColor = seed => {
  const colors = [
    "#FCF259",
    "#4A102A",
    "#85193C",
    "#C5172E",
    "#FFF700",
    "#B80F28",
    "#670E36",
    "#D9230F",
    "#3D0D24",
    "#FFDA61",
    "#A73730",
    "#9B2335",
    "#2E0817",
    "#FFC857",
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
