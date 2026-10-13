import type { Fruit } from "../data/data";
import type { ProductInfo } from "./FruitsApp";
import type { CartItem } from "./FruitsApp";

// Extend catalog fields with current state and the actions this card can request.
// These callbacks hide how the parent stores and updates its state arrays.
interface ProductCardProps extends Fruit {
  productInfo: ProductInfo;
  handleQuantityAdjust: (delta: number) => void;
  handlePriceChange: (price: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

// Presentational component: render the supplied values and report interactions.
// Props are inputs; calling a callback asks FruitsApp to supply updated values.
export default function ProductCard({
  product,
  priceOptions,
  img,
  productInfo,
  handleQuantityAdjust,
  handlePriceChange,
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
        onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
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
      <button onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => handleQuantityAdjust(1)}>{" + "}</button>
      {/* This preview derives its total from the current selection.
          toFixed(2) returns a display string; it does not change the numbers
          or apply formatting to values later passed to another component. */}
      <p>
        Total Price: {(productInfo.quantity * productInfo.price).toFixed(2)}$
      </p>
      {/* Build a snapshot only when clicked. A fresh UUID distinguishes this
          cart entry from both the fruit ID and previous entries of the same fruit.
          Keep price and total numeric for calculations; cart components format
          their own displays. Later selection changes do not alter this snapshot. */}
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
