export type CartItem = {
  id: string;
  title: string;
  price: number;
  size: number;
  type: string;
  imageUrl: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
