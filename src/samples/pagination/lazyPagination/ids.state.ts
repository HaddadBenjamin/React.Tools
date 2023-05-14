export interface IdState {
  items: number[];
  lastPage: number;
  itemsCount: number;
  error?: string;
}

export const initialIdState: IdState = {
  items: [],
  lastPage: 1,
  itemsCount: 0,
};
