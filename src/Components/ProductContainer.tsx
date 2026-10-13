import type { Fruit } from "../data/data";
import type { ProductInfo } from "./FruitsApp";
import type { CartItem } from "./FruitsApp";
import ProductCard from "./ProductCard";

// This component arranges cards and connects catalog items to their current state.
// It forwards actions to FruitsApp rather than implementing state updates itself.
interface ProductContainerProps {
  data: Fruit[];
  productInfo: ProductInfo[];
  // Container callbacks include the ID because they can update any fruit.
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleChangePrice: (id: number, price: number) => void;
  // Unlike quantity/price callbacks, this accepts the complete cart snapshot.
  handleAddToCart: (cartItem: CartItem) => void;
}

// React supplies one props object; destructuring extracts its named properties.
export default function ProductContainer({
  data,
  productInfo,
  handleAdjustQuantity,
  handleChangePrice,
  handleAddToCart,
}: ProductContainerProps) {
  return (
    <div className="ProductContainer">
      {data.map((fruit) => {
        // Match by stable ID rather than assuming the arrays have the same order.
        const info = productInfo.find((info) => info.id === fruit.id);
        // Avoid rendering a card with undefined state if no matching entry exists.
        if (!info) return null;

        // key lets React track each card across list renders; it is not a card prop.
        // {...fruit} forwards catalog fields. The callbacks capture this fruit's ID,
        // so the card only supplies a quantity change or selected price.
        // Add to Cart is forwarded unchanged: the card constructs its snapshot.
        return (
          <ProductCard
            key={fruit.id}
            {...fruit}
            productInfo={info}
            handleQuantityAdjust={(delta) =>
              handleAdjustQuantity(fruit.id, delta)
            }
            handlePriceChange={(price) => handleChangePrice(fruit.id, price)}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}
