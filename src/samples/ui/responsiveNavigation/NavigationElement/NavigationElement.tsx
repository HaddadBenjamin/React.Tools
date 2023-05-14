import React, { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './NavigationElement.module.scss';
import { INavigationElement } from '../responsiveNavigation.model';

interface Props extends INavigationElement {
  selectNavigationElement: (navigationElement: INavigationElement) => void;
}

const NavigationElement: FC<Props> = ({
  active,
  href,
  title,
  selectNavigationElement,
}) => {
  const navigationElement = {
    active, href, title, selectNavigationElement,
  };

  return (
    <Link
      to={href}
      className={cn(styles.element, active && styles.active)}
      onClick={() => selectNavigationElement(navigationElement)}
    >
      {title}
    </Link>
  );
};

export default NavigationElement;
