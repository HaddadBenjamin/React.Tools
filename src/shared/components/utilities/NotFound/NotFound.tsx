import React, { FC } from 'react';
import styles from './NotFound.module.scss';

interface Props {
  domain: string,
  femalize?: boolean
  pluralize?: boolean
}
const NotFound : FC<Props> = ({ domain, femalize, pluralize }) => (
  <div className={styles.container}>
    <h2>{`${domain} non trouvé${femalize ? 'e' : ''}${pluralize ? 's' : ''}`}</h2>
  </div>
);

export default NotFound;
