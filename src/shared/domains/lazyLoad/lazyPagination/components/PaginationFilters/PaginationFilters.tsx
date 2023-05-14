import React, { ChangeEventHandler, FC } from 'react';

interface Props {
  pageSize: number;
  pageSizes?: number[];
  handlePageSizeChange: ChangeEventHandler<HTMLSelectElement>;
}

const PaginationFilters: FC<Props> = ({
  pageSize,
  handlePageSizeChange,
  pageSizes = [10, 25, 50],
}) => (
  <>
    <span>select page size : </span>
    <select value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map((newPageSize) => (
        <option
          key={`PaginationFilterButton-${newPageSize}`}
          value={newPageSize}
        >
          {newPageSize}
        </option>
      ))}
    </select>
  </>
);

export default PaginationFilters;
