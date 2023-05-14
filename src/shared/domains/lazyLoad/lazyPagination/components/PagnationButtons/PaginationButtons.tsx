import React, { FC } from 'react';
import cn from 'classnames';
import styles from './PaginationButtons.module.scss';
import IPagination from '../../pagination.model';
import computePageRange from '../../pagination.utils';
import range from '../../../../../utilities/type/array/generation/range';

interface Props<T> {
  showFirstAndLastButtons?: boolean;
  showPrevAndNextButtons?: boolean;
  showPageButtons?: boolean;
  numberOfPageToDisplay?: number;

  pagination: IPagination<T>;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationButtons: FC<Props<any>> = ({
  showFirstAndLastButtons,
  showPrevAndNextButtons,
  showPageButtons,

  numberOfPageToDisplay = 9,

  pagination,

  goToPreviousPage,
  goToPage,
  goToNextPage,
}) => {
  const {
    page, hasPreviousPage, hasNextPage, lastPage,
  } = pagination;
  const [minimumPage, maximumPage] = computePageRange(
    page,
    numberOfPageToDisplay,
    lastPage,
  );

  return (
    <div>
      {[undefined, true].includes(showFirstAndLastButtons) && (
      <button
        type='button'
        onClick={() => goToPage(1)}
        className={cn(page === 1 && styles.active)}
      >
        First
      </button>
      )}

      {[undefined, true].includes(showPrevAndNextButtons) && (
      <button
        type='button'
        disabled={!hasPreviousPage}
        onClick={goToPreviousPage}
      >
        Previous
      </button>
      )}

      {[undefined, true].includes(showPageButtons)
          && range(lastPage)
            .filter(
              (pageNumber) => pageNumber >= minimumPage && pageNumber <= maximumPage,
            )
            .map((pageNumber) => (
              <button
                type='button'
                key={`PaginationButton-${pageNumber}`}
                onClick={() => goToPage(pageNumber)}
                className={cn(pageNumber === page && styles.active)}
              >
                {pageNumber}
              </button>
            ))}

      {[undefined, true].includes(showPrevAndNextButtons) && (
      <button type='button' disabled={!hasNextPage} onClick={goToNextPage}>
        Next
      </button>
      )}

      {[undefined, true].includes(showFirstAndLastButtons) && (
      <button
        type='button'
        onClick={() => goToPage(lastPage)}
        className={cn(page === lastPage && styles.active)}
      >
        Last
      </button>
      )}
    </div>
  );
};

export default PaginationButtons;
