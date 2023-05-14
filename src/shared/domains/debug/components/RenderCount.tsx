import React, { FC } from 'react';
import cn from 'classnames';
import styles from './RenderCount.module.scss';

interface Props { renderCount: number; // useRenderCount
}

const RenderCount: FC<Props> = ({ renderCount }) => (
  <div className={cn(styles.title)}>
    Render count :
    {' '}
    <span className={styles.red}>{renderCount}</span>
  </div>
);
export default RenderCount;
