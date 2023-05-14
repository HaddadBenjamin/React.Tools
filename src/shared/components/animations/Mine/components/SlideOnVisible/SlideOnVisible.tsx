import React, {
  FC, useEffect,
} from 'react';
import cn from 'classnames';
import styles from './SlideOnVisible.module.scss';
import { IBaseAnimationsProps } from '../../animation.model';
import useBaseAnimation from '../../hooks/useBaseAnimation';

interface Props extends IBaseAnimationsProps {
  distance?: string,
  direction?: 'up' | 'right' | 'down' | 'left'
}

const SlideOnVisible : FC<Props> = (props) => {
  const {
    className,
    children,
    distance,
    direction = 'up',
  } = props;
  const { isVisible, ref } = useBaseAnimation<HTMLDivElement>(props);

  useEffect(() => {
    if (distance) ref?.current?.style?.setProperty('--distance', distance);
  }, []);

  return (
    <div ref={ref} className={cn(className, styles.slideContainer)}>
      <div className={cn(
        className,
        isVisible && direction === 'up' && styles.slideUp,
        isVisible && direction === 'right' && styles.slideRight,
        isVisible && direction === 'down' && styles.slideDown,
        isVisible && direction === 'left' && styles.slideLeft,
      )}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideOnVisible;
