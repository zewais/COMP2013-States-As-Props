import type { fruit } from "../data/data";
import type { ProductInfo } from "../data/ProductInfo";
import type { CartItem } from "./FruitsApp";

// Extend catalog fields with current state and the actions this card can request.
// These callbacks hide how the parent stores and updates its state array.
interface ProductCardProps extends fruit {
  productInfo: ProductInfo;
  onQuantityAdjust: (delta: number) => void;
  onPriceChange: (price: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

// Presentational component: render the supplied values and report interactions.
// Props are inputs; calling a callback asks FruitsApp to supply updated values.
export default function ProductCard({
  product,
  priceOptions,
  img,
  productInfo,
  onQuantityAdjust,
  onPriceChange,
  handleAddToCart,
}: ProductCardProps) {
  return (
    <div className="ProductCard">
      <h2>{product}</h2>
      <img src={img} alt="" height="100px" />
      <br />
      {/* Controlled select: React state determines the selected option.
          DOM input values are strings, so convert the selection to a number. */}
      <select
        name="priceOption"
        value={productInfo.price}
        onChange={(e) => onPriceChange(parseFloat(e.target.value))}
      >
        {/* Keep numeric option values separate from their two-decimal labels.
            Prices serve as keys here, assuming options are unique per fruit. */}
        {priceOptions.map((price) => (
          <option key={price} value={price}>
            {price.toFixed(2)}
          </option>
        ))}
      </select>
      <br />
      {/* Arrow functions defer actions until a click; the parent enforces the floor. */}
      <button onClick={() => onQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => onQuantityAdjust(1)}>{" + "}</button>
      {/* Derive the total instead of storing another state value that could go stale.
          toFixed(2) formats the display and returns a string. */}
      <p>
        Total Price: {(productInfo.quantity * productInfo.price).toFixed(2)}$
      </p>
      <button
        onClick={() =>
          handleAddToCart({
            id: crypto.randomUUID(),
            product,
            price: productInfo.price,
            quantity: productInfo.quantity,
            total: productInfo.quantity * productInfo.price,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
