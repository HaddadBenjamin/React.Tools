import { ResponsiveImageData } from '../responsiveImage.models';

const useResponsiveImage = (images: ResponsiveImageData[]) => {
  const largestImage = images.reduce((previous, current) => (current.width > previous.width ? current : previous),
  );
  const sizes = `(max-width: ${largestImage.width}px) 100vw, ${largestImage.width}px`;
  const srcSet = images.map((i) => `${i.src} ${i.width}w`).join(',\n');

  return { src: largestImage.src, sizes, srcSet } as const;
};

export default useResponsiveImage;
