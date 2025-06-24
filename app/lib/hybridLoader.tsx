export const hybridLoader = ({src}: {src: string}) => {
  if (src.startsWith("/")) {
    // It's a public image, don't use CDN, just return path
    return src;
  }
  // Remote CDN image or Tina media field
  return `https://media.tina.io/${src}`;
};
