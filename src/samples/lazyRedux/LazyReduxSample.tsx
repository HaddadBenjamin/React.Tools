import React, { Suspense, useState } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));
const LazyReduxSample = () => {
  const [componentIsVisible, setComponentIsVisible] = useState(false);
  const showComponent = () => setComponentIsVisible(true);

  return (
    <div>
      <h2>Lazy component with lazy reducer & saga & feature flag & ab test</h2>
      <div>
        To test : F12 / Network / JS and see the chunks loading on click
        {' '}
      </div>
      {!componentIsVisible ? (
        <button type='button' onClick={showComponent}>
          Click to display id
        </button>
      ) : (
        <Suspense fallback={<div>Chargement...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
};

export default LazyReduxSample;
