export type fetchPizzasArgs = {
  order: boolean;
  currentPage: number;
  categoryId: number;
  sortBy: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  size: number;
  type: number;
  imageUrl: string;
  count: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzasSliceState {
  status: Status;
  items: Pizza[];
}
