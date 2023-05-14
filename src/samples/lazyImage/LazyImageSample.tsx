import React from 'react';
import lazyImageDatas from './lazyImage.mock';
import LazyImage from '../../shared/domains/lazyLoad/lazyImage/components/LazyImage';

const LazyImageSample = () => (
  <div>
    <h2>Lazy Images Load</h2>
    <div>
      To test : F12 / Network / Image / see the image loaded only when it&apos;s
      visible
    </div>

    <section>
      {lazyImageDatas.map((data) => (
        <LazyImage key={data.alt} {...data} />
      ))}
    </section>
  </div>
);

export default LazyImageSample;
