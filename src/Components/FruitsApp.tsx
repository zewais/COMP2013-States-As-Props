// Single source of truth for all cards: values flow down through props, and
// user actions travel back through callbacks. Children do not own copies of state.
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

export interface CartItem {
  id: string;
  product: string;
  quantity: number;
  price: number;
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

  //Cart content State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // delta is the requested change (+1 or -1 from a card), not an absolute quantity.
  function handleAdjustQuantity(id: number, delta: number) {
    // A functional update uses the latest pending state, so successive clicks
    // build on previous updates even when React batches them.
    setProductInfo((previous) =>
      // map creates a new array; spread copies only the matching object.
      // Preserve other entries and clamp the new quantity to zero.
      previous.map((info) =>
        info.id === id
          ? { ...info, quantity: Math.max(0, info.quantity + delta) }
          : info,
      ),
    );
  }

  // Replace only the selected unit price while preserving this fruit's quantity.
  function handleChangePrice(id: number, price: number) {
    setProductInfo((previous) =>
      previous.map((info) => (info.id === id ? { ...info, price } : info)),
    );
  }

  function handleAddToCart(cartItem: CartItem) {
    setCartItems((prevCart) => {
      return [...prevCart, { ...cartItem }];
    });
  }

  // Pass values and domain callbacks instead of exposing the array setter.
  // Calling a callback updates this component and React renders fresh child props.
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
