import React, { FC, MutableRefObject, useRef } from 'react';
import gsap from 'gsap';
import useOnVisibleOnce from '../../../../hooks/styles/useOnVisibleOnce';

interface Props {
  vars: gsap.TweenVars
  children?: React.ReactNode
}

const OnVisibleOnce : FC<Props> = ({ children, vars }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useOnVisibleOnce({
    ref,
    onVisibleOnce: () => {
      const tween = gsap.from(ref.current.children, vars);

      return () => {
        tween.kill();
      };
    },
  });

  return <span ref={ref}>{children}</span>;
};

export default OnVisibleOnce;
