import productEarbuds from "@/assets/product-earbuds.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productBag from "@/assets/product-bag.jpg";
import productSunglasses from "@/assets/product-sunglasses.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import classicSneaker from "@/assets/classic-sneaker.avif";

import type { Product } from "@/components/ProductCard";

interface ProductWithDetails extends Product {
  description?: string;
  specs?: { label: string; value: string }[];
}

export const staticProducts: ProductWithDetails[] = [
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
    description:
      "High‑fidelity wireless earbuds with ANC, touch controls and a compact charging case.",
    specs: [
      { label: "Driver", value: "12 mm" },
      { label: "Battery Life", value: "5 hrs (ANC on)" },
      { label: "Charge Time", value: "1.5 hrs" },
      { label: "Water Resistance", value: "IPX4" },
    ],
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
    description:
      "All‑day health tracking watch with AMOLED display, GPS and 7‑day battery.",
    specs: [
      { label: "Display", value: "1.4‑inch AMOLED" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "GPS", value: "Built‑in" },
      { label: "Water Resistance", value: "IP68" },
    ],
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
    description:
      "Classic canvas messenger bag with leather trim, laptop sleeve and adjustable shoulder strap.",
    specs: [
      { label: "Material", value: "Waxed canvas + leather" },
      { label: "Capacity", value: "18 L" },
      { label: "Laptop Sleeve", value: "Fits 15″" },
    ],
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
    description:
      "Polarized gradient‑tint sunglasses with UV400 protection and a lightweight acetate frame.",
    specs: [
      { label: "Lens Type", value: "Polarized UV400" },
      { label: "Frame Material", value: "Acetate" },
      { label: "UV Protection", value: "UV400" },
    ],
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
    description:
      "Minimalist LED desk lamp with adjustable arm, touch‑dimmer and USB charging port.",
    specs: [
      { label: "Light Source", value: "LED 5 W" },
      { label: "Color Temperature", value: "3000K–6000K" },
      { label: "USB Port", value: "5 V/1 A" },
    ],
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
    isSustainable: true,
    deliveryDays: 3,
    description:
      "Eco‑friendly running shoe made from recycled polyester and natural rubber outsole.",
    specs: [
      { label: "Upper", value: "Recycled polyester mesh" },
      { label: "Midsole", value: "EVA foam" },
      { label: "Outsole", value: "Natural rubber" },
      { label: "Weight", value: "260 g (men’s 9)" },
    ],
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
    description:
      "Timeless low‑top sneaker with canvas upper, rubber toe cap and vulcanized sole.",
    specs: [
      { label: "Upper", value: "Canvas" },
      { label: "Toe Cap", value: "Rubber" },
      { label: "Sole", value: "Vulcanized rubber" },
    ],
  },
];
