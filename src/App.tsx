import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Aos from 'aos';
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from './samples/ui/highlight/HightlightSample';
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from './samples/responsiveImage/ResponsiveImageSample';
// import LazyReduxSample from './samples/lazyRedux/LazyReduxSample';
import BreakpointsSample from './samples/breakpoints/BreakpointsSample';
import ResponsiveNavigationSample
  from './samples/ui/responsiveNavigation/ResponsiveNavigationSample/ResponsiveNavigationSample';
import LazyPaginationSample from './samples/pagination/lazyPagination/LazyPaginationSample';
import SimplePaginationSample from './samples/pagination/lazyPagination/SimplePaginationSample';
import store from './samples/lazyRedux/root.store';
import LocalizationSample from './samples/localization/LocalizationSample';
import WebSocketSample from './samples/websocket/WebSocketSample';
import FrontEndPaginationSample from './samples/pagination/frontEndPagination/FrontEndPagination';
import BackEndPaginationSample from './samples/pagination/backEndPagination/BackEndPagination';
import AnimationSample from './samples/animations/AnimationSample';
import ThrottleAndDebounceSample from './samples/throttleAndDebounce/ThrottleAndDebounceSample';
import LazyComponentSample from './samples/lazyComponent/LazyComponentSample';

import 'aos/dist/aos.css';
import useGetRefreshTokenWhenTokenHasExpired
  from './shared/hooks/authentification/useGetRefreshTokenWhenTokenHasExpired';
import useConditionalHook from './shared/hooks/utilities/useConditionalHook';
import SimplerMapSample from './samples/map/SimplerMapSample';
import NavigationSample from './samples/navigation/NavigationSample';
import useViewportsCssVariables from './shared/hooks/styles/useViewportsCssVariables';

const queryClient = new QueryClient();

const LayoutLogic : FC = () => {
  useEffect(() => { Aos.init(); }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useConditionalHook(false, () => useGetRefreshTokenWhenTokenHasExpired());
  useViewportsCssVariables();

  return null;
};

export default () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LayoutLogic />
      <ThrottleAndDebounceSample />
      <SimplerMapSample />
      <NavigationSample />

      <FrontEndPaginationSample />
      <BackEndPaginationSample />

      <ResponsiveNavigationSample />
      <HightlightSample />
      <LocalizationSample />
      <AnimationSample />
      <SimplePaginationSample />
      <LazyPaginationSample />
      { /* <LazyReduxSample /> */ }
      <LazyComponentSample />
      <LazyImageSample />
      <LazyResponsiveImageSample />
      <ResponsiveImageSample />
      <InfiniteScrollingSample />
      <BreakpointsSample />

      <WebSocketSample />
    </QueryClientProvider>
  </Provider>
);
