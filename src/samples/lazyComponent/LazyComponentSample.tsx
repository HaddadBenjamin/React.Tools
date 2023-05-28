import React from 'react';
import LazyComponent from '../../domains/lazyLoad/lazyComponent/components/LazyComponent';

const LazyLoadedComponent = React.lazy(() => import('./LazyComponentExample'));
const LazyComponentSample = () => (
  <div>
    <h2>Lazy Component</h2>
    <div>
      To test : F12 / Network / JS / it will load on visible
    </div>

    <LazyComponent skeleton={<div>Loading skeleton...</div>}>
      <LazyLoadedComponent />
    </LazyComponent>
  </div>
);

export default LazyComponentSample;
