export default interface IPagination<T> {
  items: T[];
  currentPage: T[];
  page: number;
  pageSize: number;
  thisPageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  lastPage: number;
  itemsCount: number;
  // eslint-disable-next-line
}

export interface IPaginateResponse<T> {
  items: T[];
  lastPage: number;
  itemsCount: number;
}
