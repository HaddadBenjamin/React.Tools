import React, {
  FC, MutableRefObject, useRef, Suspense, ReactNode,
} from 'react';
import useOnVisibleOnce from '../../../hooks/styles/useOnVisibleOnce';

interface Props {
  className?: string
  skeleton?: ReactNode // onNotVisible
}

// Rend les composants enfants lorsque ce wrapper est visible
const LazyComponent : FC<Props> = ({ children, className, skeleton }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleOnce({ ref });

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={!isVisible && (skeleton ?? 'Chargement...')}>
        { isVisible && children }
      </Suspense>
    </div>
  );
};

export default LazyComponent;
