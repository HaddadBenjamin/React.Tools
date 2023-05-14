/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/restrict-plus-operands,react/button-has-type,@typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';
import clamp from '../../../utilities/type/number/clamp';
import ClickableDiv from '../../utilities/ClickableDiv/ClickableDiv';

const computeButtonsPageRange = (
  page : number,
  pageSize : number,
  lastPage : number,
  numberOfPageToDisplay : number) : [number, number] => {
  let minimumPageRange = Math.ceil(page - (numberOfPageToDisplay / 2));
  let maximumPageRange = minimumPageRange + numberOfPageToDisplay - 1;
  const minimumOffset = minimumPageRange < 1 ? minimumPageRange - 1 : 0;
  const maximumOfsset = maximumPageRange > lastPage ? maximumPageRange - lastPage : 0;

  maximumPageRange = clamp(maximumPageRange - minimumOffset + maximumOfsset, 1, lastPage);
  minimumPageRange = minimumPageRange - minimumOffset + maximumOfsset;
  minimumPageRange = maximumPageRange - minimumPageRange + 1 < numberOfPageToDisplay ? maximumPageRange - numberOfPageToDisplay + 1 : minimumPageRange;
  minimumPageRange = clamp(minimumPageRange, 1, lastPage);

  return [minimumPageRange, maximumPageRange];
};

// quand la page size change : setPage({ page : computePageNumberOnPageSizeChange(pageSize, page, newPageSize)
export const computePageNumberOnPageSizeChange = (pageSize : number, pageNumber: number, newPageSize : number) : number => {
  const itemsCount = pageSize * pageNumber;
  const newPageNumber = Math.floor(itemsCount / newPageSize);

  return newPageNumber;
};

interface Props<TItem>
{
  pageSize: number,
  numberOfPageToDisplay?: number,

  // Props nécéssaires pour gérer une pagination côté client
  items? : TItem[],
  onPaginatedItemsChange? : (paginatedItems : TItem[]) => void,

  // Props nécéssaires pour gérer une pagination côté serveur
  count?: number,
  onPageChange? : (page : number) => void,
}

const Pagination = <TItem, >({
  pageSize = 5,
  numberOfPageToDisplay = 6,

  items,
  onPaginatedItemsChange,

  count = 5,
  onPageChange,
} : Props<TItem>) => {
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  useEffect(() => { setPaginatedItems(items?.slice((page - 1) * pageSize, pageSize * page)); }, [page, pageSize]);
  useEffect(() => { onPaginatedItemsChange?.(paginatedItems!); }, [paginatedItems]);
  useEffect(() => { onPageChange?.(page); }, [page]);

  const lastPage = Math.ceil((items?.length ?? count) / pageSize);
  const [minimumPageRange, maximumPageRange] = computeButtonsPageRange(page, pageSize, lastPage, numberOfPageToDisplay);

  return (
    <div className={styles.container}>
      <button onClick={() => setPage(page > 1 ? page - 1 : page)}>{'<'}</button>
      { new Array(maximumPageRange - minimumPageRange + 1).fill(minimumPageRange).map((p, pageIndex) => (
        <ClickableDiv
          className={cn(styles.page, page === p + pageIndex && styles.currentPage)}
          key={`page-button-${p + pageIndex}`}
          onClick={() => setPage(p + pageIndex)}
        >
          {p + pageIndex}
        </ClickableDiv>
      )) }
      <button onClick={() => setPage(page < lastPage ? page + 1 : page)}>{'>'}</button>
    </div>
  );
};

export default Pagination;
