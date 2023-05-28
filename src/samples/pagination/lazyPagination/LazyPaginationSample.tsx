import React, { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import selectPaginateResponse from './ids.selector';
import PaginationFilters
  from '../../../domains/lazyLoad/lazyPagination/components/PaginationFilters/PaginationFilters';
import IdsList from './components/IdList/IdsList';
import PaginationButtons
  from '../../../domains/lazyLoad/lazyPagination/components/PagnationButtons/PaginationButtons';
import usePagination from '../../../domains/lazyLoad/lazyPagination/hooks/usePagination';
import { getPaginateIdsRequestAction } from './ids.action';
import PaginationInformation
  from '../../../domains/lazyLoad/lazyPagination/components/PaginationInformation/PaginationInformation';

const LazyPaginationSample: FC = () => {
  const dispatch = useDispatch();
  const {
    pagination,
    setPagination,
    goToPreviousPage,
    goToPage,
    goToNextPage,
  } = usePagination<number>(
    true,
    1,
    10,
    selectPaginateResponse,
    (page, pageSize) => dispatch(getPaginateIdsRequestAction(page, pageSize)),
  );

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => setPagination({ ...pagination, pageSize: Number(event.target.value) });

  return (
    <>
      <h1>Pagination back (utiliser plutôt mon nouveau hook usePagination)</h1>
      <div>
        To test: F12 &gt; Network &gt; XHR &gt; there are news HTTPs calls when
        the page number of the number of elements is updated
      </div>
      <PaginationFilters
        pageSize={pagination.pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
      <IdsList ids={pagination.currentPage} />
      <PaginationInformation {...pagination} />
      <PaginationButtons
        pagination={pagination}
        goToPreviousPage={goToPreviousPage}
        goToPage={goToPage}
        goToNextPage={goToNextPage}
      />
    </>
  );
};

export default LazyPaginationSample;
