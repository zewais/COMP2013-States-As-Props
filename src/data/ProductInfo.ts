/** Mutable values for one fruit, shared by the state owner and its child props. */
export interface ProductInfo {
  // Links this state entry to the catalog item independently of array order.
  id: number;
  // Current selected quantity, kept nonnegative by FruitsApp's update function.
  quantity: number;
  // Selected unit price, rather than the calculated total.
  price: number;
}
