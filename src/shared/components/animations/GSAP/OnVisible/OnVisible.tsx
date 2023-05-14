import React, { FC, MutableRefObject, useRef } from 'react';
import gsap from 'gsap';
import useOnVisible from '../../../../hooks/styles/useOnVisible';

interface Props {
  fromVars: gsap.TweenVars
  toVars: gsap.TweenVars
  children?: React.ReactNode
}

const OnVisible : FC<Props> = ({ children, fromVars, toVars }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useOnVisible({
    ref,
    onVisible: () => {
      const tween = gsap.fromTo(ref.current.children, fromVars, toVars);

      return () => {
        tween.kill();
      };
    },
  });

  return <span ref={ref}>{children}</span>;
};

export default OnVisible;
