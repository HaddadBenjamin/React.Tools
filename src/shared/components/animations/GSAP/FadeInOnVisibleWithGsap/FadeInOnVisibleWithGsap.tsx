import gsap from 'gsap';
import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';

interface Props {
  fromVars?: gsap.TweenVars
  toVars?: gsap.TweenVars
  children: React.ReactNode
}

const FadeInOnVisibleWithGsap : FC<Props> = (
  {
    children,
    fromVars,
    toVars,
  }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const tween = gsap.fromTo(ref.current.children,
      { opacity: 0, ...fromVars },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger:
        {
          trigger: ref.current.children,
          toggleActions: 'restart pause restart restart',
        },
        ...toVars,
      });

    return () => { tween.kill(); };
  }, []);

  return <span ref={ref}>{children}</span>;
};

export default FadeInOnVisibleWithGsap;
