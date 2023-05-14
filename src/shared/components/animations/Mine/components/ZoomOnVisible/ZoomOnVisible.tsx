import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import styles from './ZoomOnVisible.module.scss';
import { IBaseAnimationsProps } from '../../animation.model';
import useBaseAnimation from '../../hooks/useBaseAnimation';

interface Props extends IBaseAnimationsProps{
  zoom?: number,
}

const ZoomOnVisible : FC<Props> = (props) => {
  const {
    className,
    children,
    zoom,
  } = props;
  const { isVisible, ref } = useBaseAnimation<HTMLDivElement>(props);

  useEffect(() => {
    if (zoom) ref?.current?.style?.setProperty('--zoom', zoom.toString());
  }, []);

  return (
    <div ref={ref} className={cn(className, isVisible && styles.zoom)}>
      {children}
    </div>
  );
};

export default ZoomOnVisible;
