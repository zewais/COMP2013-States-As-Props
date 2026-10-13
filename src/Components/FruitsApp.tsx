// Owns two separate collections: live product selections and saved cart entries.
// Values flow down through props; callbacks let children request parent updates.
// Type-only imports describe props and state without adding runtime imports.
import type { fruit } from "../data/data";
import type { ProductInfo } from "../data/ProductInfo";
import CartContainer from "./CartContainer";
import ProductContainer from "./ProductContainer";
import { useState } from "react";

interface FruitData {
  // Catalog entries used to initialize state and supply card labels and options.
  data: fruit[];
}

/** Snapshot of a selection at the moment Add to Cart is clicked. */
export interface CartItem {
  // A new UUID identifies each cart entry, including repeated adds of one fruit.
  id: string;
  product: string;
  quantity: number;
  price: number;
  // Numeric quantity * price captured with the entry; formatting happens in TSX.
  total: number;
}

export default function FruitsApp({ data }: FruitData) {
  // The generic specifies an array of state objects. The lazy initializer derives
  // starting values when mounting rather than rebuilding them on every render.
  // Later changes to data do not reset this state; this example uses a fixed catalog.
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(() =>
    data.map((fruit) => ({
      id: fruit.id,
      quantity: fruit.quantity,
      price: fruit.priceOptions[0],
    })),
  );

  // Start with an empty cart. Cart snapshots are independent of productInfo:
  // changing a product's current quantity or price does not edit saved entries.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // delta is the requested change (+1 or -1 from a card), not an absolute quantity.
  function handleAdjustQuantity(id: number, delta: number) {
    // A functional update uses the latest pending state, so successive clicks
    // build on previous updates even when React batches them.
    setProductInfo((prevData) =>
      // map creates a new array; spread copies only the matching object.
      // Preserve other entries and clamp the new quantity to zero.
      prevData.map((info) =>
        info.id === id
          ? { ...info, quantity: Math.max(0, info.quantity + delta) }
          : info,
      ),
    );
  }

  // Replace only the selected unit price while preserving this fruit's quantity.
  function handleChangePrice(id: number, price: number) {
    setProductInfo((prevData) =>
      prevData.map((info) => (info.id === id ? { ...info, price } : info)),
    );
  }

  // Append a separate entry for every click, rather than merging matching fruits.
  // Functional updates preserve earlier additions when React batches updates.
  function handleAddToCart(cartItem: CartItem) {
    setCartItems((prevCart) => {
      // Spread creates a new array and copies the submitted snapshot without
      // mutating either the previous cart or the object passed by the card.
      return [...prevCart, { ...cartItem }];
    });
  }

  // Pass values and domain callbacks instead of exposing the array setter.
  // React renders fresh props after updates. ProductContainer forwards callbacks;
  // CartContainer only needs the saved entries to render cards and their sum.
  return (
    <div>
      <ProductContainer
        data={data}
        productInfo={productInfo}
        handleAdjustQuantity={handleAdjustQuantity}
        handleChangePrice={handleChangePrice}
        handleAddToCart={handleAddToCart}
      />
      <CartContainer cartData={cartItems} />
    </div>
  );
}
