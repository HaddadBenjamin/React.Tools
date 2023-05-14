import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IPagination, { IPaginateResponse } from '../pagination.model';
import { ApplicationState } from '../../../../../samples/lazyRedux/root.state';

/* eslint-disable */
export interface usePaginationResponse<T> {
  pagination: IPagination<T>;
  setPagination: (pagination: IPagination<T>) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
}

const usePagination = <T>(
  callHttpOnSelectPage = true,
  iPage = 1,
  iPageSize = 10,
  selectPaginateResponse: (
    state: ApplicationState
  ) => IPaginateResponse<T> = () => ({ items: [], lastPage: 1, itemsCount: 0 }),
  getPaginateResponse: (page: number, pageSize: number) => void = () => {},
): usePaginationResponse<T> => {
  const paginateResponse = useSelector(selectPaginateResponse);

  const [pagination, setPagination] = useState<IPagination<T>>({
    items: [] as T[],
    currentPage: [] as T[],
    page: iPage,
    pageSize: iPageSize,
    thisPageSize: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    lastPage: 1,
    itemsCount: iPageSize,
  });

  const computePagination = (): void => {
	  const { itemsCount, items, pageSize } = pagination;
	  const clampedPageSize = pageSize > itemsCount ? itemsCount : pageSize;
	  const clampedLastPage = clampedPageSize === 0 ? 1 : Math.ceil(itemsCount / clampedPageSize);
	  const clampedPage = pagination.page > clampedLastPage ? clampedLastPage : pagination.page;

	  const hasPreviousPage = clampedPage - 1 > 0;
	  const hasNextPage = clampedPage < clampedLastPage;

	  setPagination({
		  ...pagination,
		  pageSize: clampedPageSize,
		  page: clampedPage,
		  lastPage: clampedLastPage,
		  currentPage: items
			  .slice(clampedPageSize * (clampedPage - 1))
			  .slice(0, clampedPageSize),
		  hasPreviousPage,
		  hasNextPage,
		  thisPageSize:
			  clampedPage === clampedLastPage
				  ? itemsCount % clampedPageSize
				  : clampedPageSize,
	  });
  };

  useEffect(
    () => setPagination({
      ...pagination,
      lastPage: paginateResponse.lastPage,
      itemsCount: paginateResponse.itemsCount,
      items: paginateResponse.items,
    }),
    [
      paginateResponse.lastPage,
      paginateResponse.itemsCount,
      paginateResponse.items,
    ],
  );

  useEffect(() => getPaginateResponse(iPage, iPageSize), []);
  useEffect(() => {
    if (callHttpOnSelectPage) { getPaginateResponse(pagination.page, pagination.pageSize); }
  }, [pagination.page, pagination.pageSize]);
  useEffect(
    () => computePagination(),
    [pagination.page, pagination.pageSize, pagination.items],
  );

  const goToPreviousPage = (): void => {
    if (pagination.hasPreviousPage) { setPagination({ ...pagination, page: pagination.page - 1 }); }
  };
  const goToNextPage = (): void => {
    if (pagination.hasNextPage) { setPagination({ ...pagination, page: pagination.page + 1 }); }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.lastPage) { setPagination({ ...pagination, page }); }
  };

  return {
    pagination,
    setPagination,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  } as const;
};

export default usePagination;
