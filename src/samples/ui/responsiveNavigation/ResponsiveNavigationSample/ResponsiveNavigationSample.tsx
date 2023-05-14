import React, {
  FC, lazy, MutableRefObject, ReactNode, useRef, useState,
} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useToggle from '../../../../shared/hooks/utilities/useToggle';
import useBreakpoints from '../../../../shared/hooks/styles/useBreakpoints';
import styles from './ResponsiveNavigationSample.module.scss';
import { INavigationElement } from '../responsiveNavigation.model';
import NavigationElement from '../NavigationElement/NavigationElement';
import {
  initialNavigationElements,
  routes,
} from '../responsiveNavigation.configuration';
import useOnClickOutside from '../../../../shared/hooks/events/useOnClickOutside';

const LazyHome = lazy(() => import('../FakeRouterComponents/Home'));
const LazyAbout = lazy(() => import('../FakeRouterComponents/About'));
const LazySkills = lazy(() => import('../FakeRouterComponents/Skills'));
const LazyProjects = lazy(() => import('../FakeRouterComponents/Projects'));
const LazyCV = lazy(() => import('../FakeRouterComponents/CV'));

const ResponsiveNavigationSample: FC = () => {
  const [navigationElements, setNavigationElements] = useState(
    initialNavigationElements,
  );
  const [
    mobileNavigationIsVisible,
    toggleMobileNavigation,
    setMobileNavigationIsVisible,
  ] = useToggle(false);
  const { belowSm } = useBreakpoints();

  const componentReference = useRef() as MutableRefObject<HTMLElement>;
  useOnClickOutside({ ref: componentReference, onClickOutside: () => setMobileNavigationIsVisible(false) });

  const selectNavigationElement = (navigationElement: INavigationElement) => setNavigationElements(
    navigationElements.map((e) => ({
      ...e,
      active: e.title === navigationElement.title,
    })),
  );

  const showNavigationElements = (elements: INavigationElement[]): ReactNode => elements.map((n) => (
    <NavigationElement
      key={n.title}
      {...n}
      selectNavigationElement={selectNavigationElement}
    />
  ));

  return (
    <BrowserRouter>
      <header ref={componentReference}>
        <h2>
          Responsive navigation with lazy components and select of the current
          navigation element
        </h2>
        <nav className={styles.container}>
          {/* Vue PC */}
          {!belowSm && showNavigationElements(navigationElements)}

          {/* Vue Mobile */}
          {belowSm && (
            <>
              <button
                type='button'
                className={styles.navigationButton}
                onClick={toggleMobileNavigation}
              >
                Navigation button
              </button>

              {!mobileNavigationIsVisible
                && showNavigationElements(
                  navigationElements.filter((n) => n.active),
                )}

              {mobileNavigationIsVisible
                && showNavigationElements(navigationElements)}
            </>
          )}
        </nav>
      </header>

      <React.Suspense fallback={<span>Loading...</span>}>
        <Switch>
          <Route path={routes.home} exact component={LazyHome} />
          <Route path={routes.about} exact component={LazyAbout} />
          <Route path={routes.skills} exact component={LazySkills} />
          <Route path={routes.projects} exact component={LazyProjects} />
          <Route path={routes.cv} exact component={LazyCV} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default ResponsiveNavigationSample;
