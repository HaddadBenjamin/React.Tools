import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import paginate from '../../utilities/type/array/filter/paginate';

interface IUsePaginationParameters<T> {
  defaultItems: T[],
  defaultPageSize?: number
  defaultMoveSize?: number
}

interface IUsePaginationResponse<T> {
  paginatedItems: T[]

  hasPreviousPage: boolean
  hasNextPage: boolean

  pageNumber: number
  pageSize: number,
  moveSize: number, // permet d'utiliser la pagination comme un slider, exemple : on bouge de 1 en 1 au lieu de pageSize
  offset: number

  goToPreviousPage: () => void
  goToNextPage: () => void

  setPageNumber: (page: number) => void
  setPageSize: (pageSize: number) => void
  setMoveSize: (moveSize: number) => void
  setItems: (items: T[]) => void
}

export const computePageNumberOnPageSizeChange = (pageSize: number, pageNumber: number, newPageSize: number, count: number): number => {
  const firstItemIndexOfPage = (((count / (count / pageSize)) * pageNumber) - pageSize);
  const newPageNumber = Math.ceil(count / firstItemIndexOfPage);

  return firstItemIndexOfPage < 1 ? 1 : Math.min(Math.ceil(count / newPageSize), newPageNumber);
};

const usePagination = <T, >(
  {
    defaultItems,
    defaultPageSize = 1,
    defaultMoveSize,
  }: IUsePaginationParameters<T>): IUsePaginationResponse<T> => {
  const [items, setItems] = useState<T[]>(defaultItems);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [paginatedItems, setPaginatedItems] = useState<T[]>(items);
  const [moveSize, setMoveSize] = useState(defaultMoveSize ?? defaultPageSize);

  const hasPreviousPage = useMemo(() => pageNumber > 1, [pageNumber, items]);
  const hasNextPage = useMemo(() => ((pageNumber - 1) * moveSize) + pageSize < items.length, [pageNumber, moveSize, pageSize, items]);
  const offset = useMemo(() => (pageNumber === 1 ? 0 : (pageNumber - 1) * moveSize), [pageNumber, moveSize]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) setPageNumber(pageNumber - 1);
  }, [pageNumber, hasPreviousPage]);
  const goToNextPage = useCallback(() => {
    if (hasNextPage) setPageNumber(pageNumber + 1);
  }, [pageNumber, hasNextPage]);

  useEffect(() => {
    setPaginatedItems(paginate(items, pageNumber, pageSize, moveSize));
  }, [pageSize, pageNumber, moveSize, items]);

  // Pour avoir une pagination fonctionnelle, on doit prendre en compte les changements des paramètres de pagination dès qu'ils surviennent.
  useEffect(() => { setItems(defaultItems); }, [defaultItems]);
  useEffect(() => { setPageSize(defaultPageSize); }, [defaultPageSize]);
  useEffect(() => { setMoveSize(defaultMoveSize ?? defaultPageSize); }, [defaultMoveSize]);

  return {
    paginatedItems,

    hasPreviousPage,
    hasNextPage,

    pageNumber,
    pageSize,
    moveSize,
    offset,

    goToPreviousPage,
    goToNextPage,

    setPageSize,
    setPageNumber,
    setMoveSize,
    setItems,
  };
};

export default usePagination;
