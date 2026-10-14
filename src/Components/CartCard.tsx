import type { CartItem } from "./FruitsApp";

// Displays one saved cart snapshot. The default export is imported as CartCard
// by the list component.
// Destructuring extracts fields from React's single props object.
export default function CartCard({
  product,
  price,
  quantity,
  total,
}: CartItem) {
  return (
    <div className="CartCard">
      <h2>{product}</h2>
      <p>quantity: {quantity}</p>
      {/* Format each monetary value where it is displayed. toFixed returns a
          string and hides floating-point display artifacts; it does not mutate
          the numeric price or total stored in the cart. */}
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
    </div>
  );
}
