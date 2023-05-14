import useScreenSize from './useScreenSize';

export interface Breakpoints {
  isMobile: boolean; // équivaut à un belowSm

  belowXs: boolean;
  belowSm: boolean;
  belowMd: boolean;
  belowLg: boolean;

  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;

  aboveXs: boolean;
  aboveSm: boolean;
  aboveMd: boolean;
  aboveLg: boolean;

  isBelow: (screenWidth: number) => boolean
  isAbove: (screenWidth: number) => boolean

  isBelowOrEqual: (screenWidth: number) => boolean
  isAboveOrEqual: (screenWidth: number) => boolean
}

const xsWidth = 360;
const smWidth = 700;
const mdWidth = 1240;
const lgWidth = 1440;

export default (): Breakpoints => {
  const { screenWidth } = useScreenSize();

  return {
    // Pour que ce hook fonctionne en SSR, il faut que soit le composant soit monté, soit on se base sur la librairie react-device-detect
    // import { isMobile } from 'react-device-detect'
    isMobile: screenWidth <= smWidth, // équivaut à un belowSm

    belowXs: screenWidth <= xsWidth,
    belowSm: screenWidth <= smWidth,
    belowMd: screenWidth <= mdWidth,
    belowLg: screenWidth <= lgWidth,

    xs: screenWidth <= xsWidth,
    sm: screenWidth <= smWidth && screenWidth > xsWidth,
    md: screenWidth <= mdWidth && screenWidth > smWidth,
    lg: screenWidth <= lgWidth && screenWidth > mdWidth,

    aboveXs: screenWidth >= xsWidth,
    aboveSm: screenWidth >= smWidth,
    aboveMd: screenWidth >= mdWidth,
    aboveLg: screenWidth >= lgWidth,

    isAbove: (width) => screenWidth > width,
    isBelow: (width) => screenWidth < width,

    isBelowOrEqual: (width) => screenWidth >= width,
    isAboveOrEqual: (width) => screenWidth <= width,
  } as const;
};
