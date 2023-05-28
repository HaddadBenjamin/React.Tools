import useScreenSize from './useScreenSize';

interface Breakpoints {
  xsOrBelow: boolean;
  smOrBelow: boolean;
  mdOrBelow: boolean;
  lgOrBelow: boolean;

  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;

  xsOrAbove: boolean;
  smOrAbove: boolean;
  mdOrAbove: boolean;
  lgOrAbove: boolean;
}

const xsWidth = 360;
const smWidth = 600;
const mdWidth = 1024;
const lgWidth = 1440;

export default (): Breakpoints => {
  const { width: screenWidth } = useScreenSize();

  return {
    xsOrBelow: screenWidth <= xsWidth,
    smOrBelow: screenWidth <= smWidth,
    mdOrBelow: screenWidth <= mdWidth,
    lgOrBelow: screenWidth <= lgWidth,

    xs: screenWidth <= xsWidth,
    sm: screenWidth <= smWidth && screenWidth > xsWidth,
    md: screenWidth <= mdWidth && screenWidth > smWidth,
    lg: screenWidth <= lgWidth && screenWidth > mdWidth,

    xsOrAbove: screenWidth >= xsWidth,
    smOrAbove: screenWidth >= smWidth,
    mdOrAbove: screenWidth >= mdWidth,
    lgOrAbove: screenWidth >= lgWidth,
  } as const;
};
