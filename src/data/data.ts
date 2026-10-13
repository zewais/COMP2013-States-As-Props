/** Catalog information and initial quantity; current selections live in ProductInfo. */
export interface Fruit {
  // IDs must be unique: state lookup, updates, and React list keys use them.
  id: number;
  product: string;
  // Each fruit needs at least one price; the first is the initial selection.
  priceOptions: number[];
  img: string;
  // Starting quantity only. User actions update React state, not this catalog.
  quantity: number;
}

// Fixed catalog for this example. FruitsApp assumes it stays fixed while mounted.
const fruits: Fruit[] = [
  {
    id: 1,
    product: "Apple",
    priceOptions: [1.0, 1.5, 2.0, 2.5],
    img: "https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg",
    quantity: 0,
  },
  {
    id: 2,
    product: "Banana",
    priceOptions: [0.5, 0.8, 1.0, 1.2],
    img: "https://cdn.pixabay.com/photo/2017/04/04/17/40/fruits-2202411_1280.jpg",
    quantity: 0,
  },
  {
    id: 3,
    product: "Orange",
    priceOptions: [0.8, 0.9, 1.0, 1.2],
    img: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg",
    quantity: 0,
  },
  {
    id: 4,
    product: "Strawberry",
    priceOptions: [1.5, 2.0, 2.5, 3.0],
    img: "https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg",
    quantity: 0,
  },
  {
    id: 5,
    product: "Grapes",
    priceOptions: [1.2, 1.5, 1.8, 2.0],
    img: "https://images.pexels.com/photos/23042/pexels-photo.jpg",
    quantity: 1,
  },
];
export default fruits;
