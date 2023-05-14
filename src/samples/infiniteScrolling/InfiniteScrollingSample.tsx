import React from 'react';
import useInfiniteScrolling from '../../shared/domains/lazyLoad/infiniteScrolling/hooks/useInfiniteScrolling';

// Pour pouvoir faire de l'infinite scrolling, il faut que votre endpoint en GET gère la pagination.
const InfiniteScrollingSample = () => {
  const computeFetchUrl = (page: number, pageSize: number): string => `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${pageSize}`;

  const { items, isFetching } = useInfiniteScrolling(
    '#infiniteScrollContainerId',
    computeFetchUrl,
  );

  return (
    <>
      <h2>Infinite scrolling</h2>
      <div>
        To test : F12 / Network / XHR / new HTTP call will be done when the last
        element is visible by the user
      </div>

      <div id='infiniteScrollContainerId'>
        {items.map((item) => (
          <img
            key={item.id}
            src={item.url}
            height='100px'
            width='200px'
            alt=''
          />
        ))}
        {isFetching && <span>Loading...</span>}
      </div>
    </>
  );
};

export default InfiniteScrollingSample;
