import React from 'react';

export type AnimationEase =
  'linear' |
  'ease' |
  'ease-in' |
  'ease-out' |
  'ease-in-out';

export interface IBaseAnimationsProps {
  children?: React.ReactNode,
  className?: string,

  duration?: number,
  delay?: number,
  offset?: number,
  ease?: AnimationEase,

  animatedOnce?: boolean,
}
