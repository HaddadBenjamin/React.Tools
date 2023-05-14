import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../../shared/components/designSystem/Pagination/Pagination';

const PAGE_SIZE = 5;
const BackEndPaginationSample : FC = () => {
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(async () => {
    const { data: items } = await axios.get(`https://jsonplaceholder.typicode.com/todos?_start=${(page - 1) * PAGE_SIZE}&_limit=${PAGE_SIZE}`);

    setPaginatedItems(items);
  }, [page]);

  return (
    <>
      <h2>New pagination back end</h2>
      <Pagination
        pageSize={PAGE_SIZE}
        count={100} /* le nombre total d'éléments doit être renvoyé par l'API */
        onPageChange={setPage}
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      { JSON.stringify(paginatedItems?.map((e : any) => e.id)) }
    </>
  );
};

export default BackEndPaginationSample;
