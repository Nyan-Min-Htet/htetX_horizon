import { Product } from "@/components/ProductCard";
import productEarbuds from "@/assets/product-earbuds.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productBag from "@/assets/product-bag.jpg";
import productSunglasses from "@/assets/product-sunglasses.jpg";
import productLamp from "@/assets/product-lamp.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import classicSneaker from "@/assets/classic-sneaker.avif";

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
    description:
      "Experience studio-quality sound with our Pro Earbuds. Featuring Advanced Active Noise Cancellation (ANC) and a transparent mode, these earbuds allow you to switch between immersive music and the world around you instantly.",
    specs: [
      { label: "Driver", value: "13mm Dynamic Driver" },
      { label: "Battery", value: "30 Hours total with case" },
      { label: "Charging", value: "USB-C Fast Charge" },
      { label: "Waterproof", value: "IPX4 Splashproof" },
    ],
    reviewsData: [
      {
        name: "James W.",
        rating: 5,
        text: "The noise cancellation is incredible. Perfect for my daily commute!",
      },
      {
        name: "Sarah K.",
        rating: 4,
        text: "Amazing sound quality, though the fit took a few days to get right.",
      },
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
      "A masterpiece of engineering and style. The Chronos Smart Watch tracks your health metrics in real-time with a stunning sapphire crystal AMOLED display that stays visible even under direct sunlight.",
    specs: [
      { label: "Display", value: '1.4" Sapphire AMOLED' },
      { label: "Battery", value: "Up to 10 Days" },
      { label: "Sensors", value: "Heart Rate, SpO2, ECG" },
      { label: "Connectivity", value: "Bluetooth 5.3 & WiFi" },
    ],
    reviewsData: [
      {
        name: "Michael B.",
        rating: 5,
        text: "The battery life is a game changer. I only charge it once a week.",
      },
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
      "Crafted from premium waxed canvas and top-grain leather, the Heritage Bag is designed to age beautifully. It features a dedicated padded compartment for laptops up to 15 inches.",
    specs: [
      { label: "Material", value: "Waxed Canvas & Leather" },
      { label: "Capacity", value: "15L" },
      { label: "Laptop Slot", value: "Fits 15.6 inch" },
      { label: "Weight", value: "1.1 kg" },
    ],
    reviewsData: [
      {
        name: "David L.",
        rating: 5,
        text: "Incredibly durable. The leather trim is high quality.",
      },
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
      "Sleek, lightweight, and timeless. Our Noir Gradient series offers 100% UV protection with a specialized anti-reflective coating to reduce eye strain during long drives.",
    specs: [
      { label: "Lens", value: "Polarized Gradient" },
      { label: "Frame", value: "Hand-polished Acetate" },
      { label: "UV Protection", value: "UV400 Certified" },
      { label: "Weight", value: "28 grams" },
    ],
    reviewsData: [
      {
        name: "Emma S.",
        rating: 4,
        text: "Very stylish, but slightly larger than I expected.",
      },
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
      "Illuminate your workspace with a touch of minimalism. The Arc Lamp features adjustable color temperatures and a flicker-free LED panel to reduce eye fatigue during late-night study sessions.",
    specs: [
      { label: "LED Power", value: "8W Low Energy" },
      { label: "Modes", value: "3 Color Temps" },
      { label: "Brightness", value: "Dimmable (10-100%)" },
      { label: "Material", value: "Recycled Aluminum" },
    ],
    reviewsData: [
      {
        name: "Kevin T.",
        rating: 5,
        text: "Looks beautiful on my desk. The dimming feature is very smooth.",
      },
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
      "Step into the future of comfort. Featuring a proprietary cloud-foam midsole and a breathable recycled mesh upper, these sneakers provide maximum energy return for every stride.",
    specs: [
      { label: "Cushioning", value: "Cloud-Foam Tech" },
      { label: "Upper", value: "Recycled Ocean Plastic" },
      { label: "Outsole", value: "Non-slip Rubber" },
      { label: "Weight", value: "210g per shoe" },
    ],
    reviewsData: [
      {
        name: "Jason M.",
        rating: 5,
        text: "Feels like walking on air. Best running shoes I've had.",
      },
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
      "The definitive everyday sneaker. Combining a vulcanized rubber sole with high-grade canvas, this shoe offers a timeless silhouette that pairs perfectly with any outfit.",
    specs: [
      { label: "Material", value: "Premium Canvas" },
      { label: "Sole", value: "Vulcanized Rubber" },
      { label: "Style", value: "Low-Top" },
      { label: "Fit", value: "Standard" },
    ],
    reviewsData: [
      {
        name: "Chris P.",
        rating: 5,
        text: "Simple, clean, and comfortable. Exactly what I wanted.",
      },
    ],
  },
];
