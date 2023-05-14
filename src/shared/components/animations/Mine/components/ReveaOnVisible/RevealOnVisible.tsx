import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import styles from './RevealOnVisible.module.scss';
import { IBaseAnimationsProps } from '../../animation.model';
import useBaseAnimation from '../../hooks/useBaseAnimation';

interface Props extends IBaseAnimationsProps {
  distance?: string,
  backgroundColor?: string,
  direction?: 'up' | 'right' | 'down' | 'left'
}

const RevealOnVisible : FC<Props> = (props) => {
  const {
    className,
    children,
    distance,
    backgroundColor,
    direction,
  } = props;
  const { isVisible, ref } = useBaseAnimation<HTMLDivElement>(props);

  useEffect(() => {
    if (distance) ref?.current?.style?.setProperty('--distance', distance);
    if (backgroundColor) ref?.current?.style?.setProperty('--background-color', backgroundColor);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible && direction === 'up' && styles.revealUp,
        isVisible && direction === 'right' && styles.revealRight,
        isVisible && direction === 'down' && styles.revealDown,
        isVisible && direction === 'left' && styles.revealLeft,
      )}
    >
      {children}
    </div>
  );
};

export default RevealOnVisible;
