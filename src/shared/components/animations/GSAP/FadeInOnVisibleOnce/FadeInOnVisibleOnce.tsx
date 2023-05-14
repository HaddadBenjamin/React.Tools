import gsap from 'gsap';
import React, { FC } from 'react';
import OnVisibleOnce from '../OnVisibleOnce/OnVisibleOnce';

interface Props {
  vars?: gsap.TweenVars
  children: React.ReactNode
}

const FadeInOnVisibleOnce : FC<Props> = ({ children, vars }) => <OnVisibleOnce vars={{ opacity: 0, duration: 1, ...vars }}>{children}</OnVisibleOnce>;

export default FadeInOnVisibleOnce;
