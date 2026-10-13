import type { CartItem } from "./FruitsApp";

export default function CartContainer({
  product,
  price,
  quantity,
  total,
}: CartItem) {
  return (
    <div>
      <h2>{product}</h2>
      <p>quantity: {quantity}</p>
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
    </div>
  );
}
