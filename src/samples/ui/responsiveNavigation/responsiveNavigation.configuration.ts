import { INavigationElement } from './responsiveNavigation.model';

export const routes = {
  home: '/',
  about: '/about',
  projects: '/projects',
  skills: '/skills',
  cv: '/cv',
};

export const initialNavigationElements: INavigationElement[] = [
  { title: 'Home', active: true, href: routes.home },
  { title: 'About', href: routes.about },
  { title: 'Skills', href: routes.skills },
  { title: 'Projects', href: routes.projects },
  { title: 'CV', href: routes.cv },
];
