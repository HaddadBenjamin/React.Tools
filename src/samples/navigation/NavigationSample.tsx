import React, { FC } from 'react';
import useLocation from '../../shared/hooks/routing/useLocation';

const NavigationSample : FC = () => {
  const location = useLocation();

  return (
    <div>
      <h2>Navigation : use[Location|Route|QueryPamameter|QueriesParameters|Url|UrlHash|useSmoothAnchorFromQueryParameter]</h2>
      <div>{JSON.stringify(location)}</div>
    </div>
  );
};

export default NavigationSample;
