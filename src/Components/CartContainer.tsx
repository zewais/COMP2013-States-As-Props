import type { CartItem } from "./FruitsApp";
import CartCard from "./CartCard";

interface CartContainerProps {
  cartData: CartItem[];
}
export default function CartContainer({ cartData }: CartContainerProps) {
  return (
    <div>
      {cartData.map((item) => (
        <CartCard key={item.id} {...item} />
      ))}
      <h2>
        Cart Total:{" "}
        {cartData.reduce((acc, item) => acc + item.total, 0).toFixed(2)}$
      </h2>
    </div>
  );
}
