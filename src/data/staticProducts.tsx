import productEarbuds from "@/assets/product-earbuds.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productBag from "@/assets/product-bag.jpg";
import productSunglasses from "@/assets/product-sunglasses.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import classicSneaker from "@/assets/classic-sneaker.avif";

import type { Product } from "@/components/ProductCard";

export const staticProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Pro Earbuds",
    price: 179,
    originalPrice: 229,
    image: productEarbuds,
    rating: 4.8,
    reviews: 2341,
    category: "Audio",
    isNew: true,
    deliveryDays: 2,
  },
  {
    id: "2",
    name: "Chronos Smart Watch",
    price: 449,
    image: productWatch,
    rating: 4.9,
    reviews: 1892,
    category: "Wearables",
    isNew: true,
    deliveryDays: 3,
  },
  {
    id: "3",
    name: "Heritage Messenger Bag",
    price: 289,
    image: productBag,
    rating: 4.7,
    reviews: 856,
    category: "Accessories",
    isSustainable: true,
    deliveryDays: 4,
  },
  {
    id: "4",
    name: "Noir Gradient Sunglasses",
    price: 159,
    originalPrice: 199,
    image: productSunglasses,
    rating: 4.6,
    reviews: 1234,
    category: "Eyewear",
    deliveryDays: 2,
  },
  {
    id: "5",
    name: "Arc Minimal Desk Lamp",
    price: 129,
    image: productLamp,
    rating: 4.8,
    reviews: 678,
    category: "Home",
    isSustainable: true,
    deliveryDays: 5,
  },
  {
    id: "6",
    name: "Cloud Runner Sneakers",
    price: 199,
    image: productSneakers,
    rating: 4.9,
    reviews: 3456,
    category: "Footwear",
    isNew: true,
    deliveryDays: 3,
  },
  {
    id: "7",
    name: "Classic Sneaker",
    price: 199,
    image: classicSneaker,
    rating: 4.9,
    reviews: 456,
    category: "Footwear",
    isNew: true,
    deliveryDays: 5,
  },
];
