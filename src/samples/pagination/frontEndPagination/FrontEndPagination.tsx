import React, { FC, useState } from 'react';
import Pagination from '../../../shared/components/designSystem/Pagination/Pagination';

const FrontEndPaginationSample : FC = () => {
  const [paginatedItems, setPaginatedItems] = useState<number[]>([]);

  return (
    <>
      <h2>New pagination front end</h2>
      <Pagination
        items={new Array(100).fill(0).map((e, i) => i + 1)}
        pageSize={5}
        onPaginatedItemsChange={setPaginatedItems}
      />
      { JSON.stringify(paginatedItems) }
    </>
  );
};

export default FrontEndPaginationSample;
