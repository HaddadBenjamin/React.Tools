import React, { FC } from 'react';
import styles from './RestrictedPage.module.scss';
import useAuthentification from '../../hooks/useAuthentification';
import containsAll from '../../../../shared/utilities/type/array/predicate/containsAll';
import useUserInfo from '../../hooks/useUserInfo';

interface Props
{
  // eslint-disable-next-line react/no-unused-prop-types
  roles? : string[],
  message? : string
}

// Permet de restreindre l'accès d'une page aux utilisateurs connectés ou à ceux qui possèdent certains rôles.
const RestrictedPage : FC<Props> = ({
  children,
  roles,
  message,
}) => {
  const { connected } = useAuthentification();
  const userInfo = useUserInfo(connected);

  return (connected && !roles) || (connected && roles && userInfo?.roles && containsAll(roles, userInfo.roles)) ? <div>{ children }</div> : (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h2 className={styles.title}>{message ?? 'Cette page est restreinte aux utilisateurs connectés'}</h2>
      </div>
    </div>
  );
};

export default RestrictedPage;
