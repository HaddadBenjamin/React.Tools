import React, { FC } from 'react';
import cn from 'classnames';
import styles from './FadeInOnVisible.module.scss';
import { IBaseAnimationsProps } from '../../animation.model';
import useBaseAnimation from '../../hooks/useBaseAnimation';

const FadeInOnVisible : FC<IBaseAnimationsProps> = (props) => {
  const { className, children } = props;
  const { isVisible, ref } = useBaseAnimation<HTMLDivElement>(props);

  return <span ref={ref} className={cn(className, isVisible && styles.fadeIn)}>{children}</span>;
};

export default FadeInOnVisible;
