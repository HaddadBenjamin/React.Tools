import React, { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import usePagination from '../../../shared/domains/lazyLoad/lazyPagination/hooks/usePagination';
import PaginationFilters
  from '../../../shared/domains/lazyLoad/lazyPagination/components/PaginationFilters/PaginationFilters';
import IdsList from './components/IdList/IdsList';
import PaginationInformation
  from '../../../shared/domains/lazyLoad/lazyPagination/components/PaginationInformation/PaginationInformation';
import PaginationButtons
  from '../../../shared/domains/lazyLoad/lazyPagination/components/PagnationButtons/PaginationButtons';
import selectPaginateResponse from './ids.selector';
import { getIdsRequestAction } from './ids.action';

const SimplePaginationSample: FC = () => {
  const dispatch = useDispatch();
  const {
    pagination,
    setPagination,
    goToPreviousPage,
    goToPage,
    goToNextPage,
  } = usePagination<number>(false, 1, 10, selectPaginateResponse, () => dispatch(getIdsRequestAction()),
  );

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => setPagination({ ...pagination, pageSize: Number(event.target.value) });

  return (
    <>
      <h1>Pagination Front (utiliser plutôt mon nouveau hook usePagination)</h1>
      <div>To test: F12 &gt; Network &gt; XHR &gt; nothing happen</div>
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

export default SimplePaginationSample;
