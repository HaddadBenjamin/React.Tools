import React, { FC } from 'react';
import styles from './LazyComponentExample.module.scss';

const LazyComponentExample : FC = () => (
  <div className={styles.container}>
    This component has been loaded lazy loaded when its visible
  </div>
);

export default LazyComponentExample;
