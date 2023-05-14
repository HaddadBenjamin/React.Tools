import React, { forwardRef, ReactNode } from 'react';

interface Props {
  onClick?: () => void,
  className?: string,
  children: ReactNode
}

const ClickableDiv = forwardRef<HTMLDivElement, Props>((
  {
    children,
    className,
    onClick,
  },
  ref,
) => (
  <div
    className={className}
    style={{ cursor: onClick ? 'pointer' : 'auto' }}
    onClick={onClick}
    onKeyPress={onClick}
    ref={ref}
    role='button'
    tabIndex={0}
  >
    {children}
  </div>
));

export default ClickableDiv;
