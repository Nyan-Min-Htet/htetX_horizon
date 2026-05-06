import { Product } from "@/components/ProductCard";

interface ProductWithDetails extends Product {
  description?: string;
  specs?: { label: string; value: string }[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  theme: string;
  products: ProductWithDetails[];
}

export const collectionsData: Collection[] = [
  {
    id: "1",
    name: "New Arrivals",
    description: "Latest additions to our collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    count: 24,
    theme: "bg-gradient-to-r from-blue-50 to-indigo-50",
    products: [
      {
        id: "new-1",
        name: "Premium Wireless Headphones",
        price: 299,
        originalPrice: 399,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 124,
        category: "Audio",
        isNew: true,
        isSustainable: true,
        deliveryDays: 2,
        description:
          "Experience crystal‑clear sound with active noise cancellation, 30‑hour battery life, and a comfortable ergonomic fit. Perfect for commutes, workouts, or relaxing at home.",
        specs: [
          { label: "Driver Size", value: "12 mm" },
          { label: "Battery Life", value: "30 hrs (ANC off)" },
          { label: "Charge Time", value: "1.5 hrs" },
          { label: "Water Resistance", value: "IPX4" },
          { label: "Bluetooth", value: "5.2" },
        ],
      },
      {
        id: "new-2",
        name: "Smart Fitness Watch",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 89,
        category: "Wearables",
        isNew: true,
        deliveryDays: 3,
        description:
          "Track your heart‑rate, steps, sleep and more with a sleek AMOLED display and 7‑day battery life.",
        specs: [
          { label: "Display", value: "1.4‑inch AMOLED" },
          { label: "Battery", value: "Up to 7 days" },
          { label: "Water Resistance", value: "IP68" },
          { label: "Sensors", value: "HR, SpO2, Accelerometer, Gyro" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Best Sellers",
    description: "Customer favorites that everyone loves",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    count: 18,
    theme: "bg-gradient-to-r from-amber-50 to-orange-50",
    products: [
      {
        id: "best-1",
        name: "Classic Leather Backpack",
        price: 189,
        originalPrice: 249,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 256,
        category: "Accessories",
        isSustainable: true,
        deliveryDays: 4,
        description:
          "A timeless leather backpack with padded laptop compartment, water‑resistant coating and adjustable straps.",
        specs: [
          { label: "Material", value: "Full‑grain leather" },
          { label: "Capacity", value: "20 L" },
          { label: "Laptop Sleeve", value: "Fits up to 15″" },
          { label: "Weight", value: "1.2 kg" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Sustainable Picks",
    description: "Eco‑friendly choices for conscious living",
    image:
      "https://images.unsplash.com/photo-1618173745201-8e3bf8978acc?w=800&h=400&fit=crop",
    count: 12,
    theme: "bg-gradient-to-r from-green-50 to-emerald-50",
    products: [
      {
        id: "eco-1",
        name: "Organic Cotton T‑Shirt",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 178,
        category: "Clothing",
        isSustainable: true,
        deliveryDays: 3,
        description:
          "Made from 100 % organic cotton, this tee is soft, breathable and dyed with low‑impact, water‑based inks.",
        specs: [
          { label: "Fabric", value: "100 % Organic Cotton" },
          { label: "Fit", value: "Regular" },
          { label: "Care", value: "Machine wash cold" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Sale",
    description: "Special offers and discounted items",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&h=400&fit=crop",
    count: 8,
    theme: "bg-gradient-to-r from-red-50 to-pink-50",
    products: [
      {
        id: "sale-1",
        name: "Wireless Earbuds",
        price: 79,
        originalPrice: 129,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 92,
        category: "Audio",
        deliveryDays: 2,
        description:
          "Enjoy your music on the go with these truly wireless earbuds – 5 hours playtime, quick‑charge case.",
        specs: [
          { label: "Playtime", value: "5 hrs" },
          { label: "Charge Time", value: "1.5 hrs (case)" },
          { label: "Bluetooth", value: "5.0" },
          { label: "Water Resistance", value: "IPX4" },
        ],
      },
    ],
  },
];
