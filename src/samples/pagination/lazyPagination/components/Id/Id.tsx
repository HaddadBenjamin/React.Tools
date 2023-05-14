import React, { FC } from 'react';
import styles from './Id.module.scss';

const Id: FC<{ id: number }> = ({ id }) => (
  <div className={styles.container}>
    <div>{id}</div>
  </div>
);

export default Id;
