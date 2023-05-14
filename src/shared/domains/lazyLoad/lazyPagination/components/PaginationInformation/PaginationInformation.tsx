import React, { FC } from 'react';
import styles from './PaginationInformation.module.scss';
import IPagination from '../../pagination.model';

/* eslint-disable */
const PaginationInformation: FC<IPagination<any>> = ({
   itemsCount,
   page,
   pageSize,
   hasPreviousPage,
   hasNextPage,
   lastPage,
   thisPageSize,
}) => (
  <div className={styles.container}>
    <div>
      items count :
      {itemsCount}
    </div>
    <div>
      page :
      {page}
    </div>
    <div>
      page size :
      {pageSize}
    </div>
    <div>
      has previous page :
      {hasPreviousPage.toString()}
    </div>
    <div>
      has next page :
      {hasNextPage.toString()}
    </div>
    <div>
      last page :
      {lastPage}
    </div>
    <div>
      this page size :
      {thisPageSize}
    </div>
  </div>
);

export default PaginationInformation;
