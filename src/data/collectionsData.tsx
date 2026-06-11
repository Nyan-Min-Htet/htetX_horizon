import { Product } from "@/components/ProductCard";

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
  theme: string;
  products: Product[];
}

export const collectionsData: Collection[] = [
  {
    id: "1",
    name: "New Arrivals",
    description:
      "Stay ahead of the curve with our freshest drops. Featuring the latest in tech, fashion, and sustainable living.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    count: 24,
    theme: "bg-gradient-to-r from-blue-50 to-indigo-50",
    products: [
      {
        id: "new-1",
        name: "Premium Wireless Headphones",
        price: 299,
        original_price: 399,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 124,
        category: "Audio",
        is_new: true,
        is_sustainable: true,
        delivery_days: 2,
        description:
          "Industry-leading noise cancellation paired with an expansive soundstage. Designed for audiophiles who refuse to compromise.",
        specs: [
          { label: "Driver", value: "40mm Titanium" },
          { label: "Noise Control", value: "Hybrid ANC" },
          { label: "Battery", value: "40 Hours" },
        ],
        reviews_data: [
          {
            name: "Leo V.",
            rating: 5,
            text: "The soundstage is massive. Best headphones I've owned.",
          },
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
        is_new: true,
        delivery_days: 3,
        description:
          "Your personal health coach on your wrist. Track everything from sleep quality to blood oxygen with clinical precision.",
        specs: [
          { label: "Display", value: "AMOLED" },
          { label: "Waterproof", value: "5ATM" },
          { label: "Sensors", value: "Heart/Sleep/Stress" },
        ],
        reviews_data: [
          {
            name: "Mia J.",
            rating: 5,
            text: "Sleek design and incredibly accurate health tracking.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Best Sellers",
    description:
      "The gold standard of our store. These products have been voted top-tier by thousands of our global customers.",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    count: 18,
    theme: "bg-gradient-to-r from-amber-50 to-orange-50",
    products: [
      {
        id: "best-1",
        name: "Classic Leather Backpack",
        price: 189,
        original_price: 249,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 256,
        category: "Accessories",
        is_sustainable: true,
        delivery_days: 4,
        description:
          "A perfect blend of utility and elegance. This backpack is designed for the modern professional who values durability and style.",
        specs: [
          { label: "Material", value: "Vegetable Tanned Leather" },
          { label: "Laptop Slot", value: "15-inch" },
          { label: "Weight", value: "1.1kg" },
        ],
        reviews_data: [
          {
            name: "Oscar W.",
            rating: 5,
            text: "Timeless design. The leather is high grade.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Sustainable Picks",
    description:
      "Kind to you, kind to the planet. Our eco-line uses only recycled materials and non-toxic dyes.",
    image:
      "https://images.unsplash.com/photo-1618173745201-8e3bf8978acc?w=800&h=400&fit=crop",
    count: 12,
    theme: "bg-gradient-to-r from-green-50 to-emerald-50",
    products: [
      {
        id: "eco-1",
        name: "Organic Cotton T-Shirt",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 178,
        category: "Clothing",
        is_sustainable: true,
        delivery_days: 3,
        description:
          "Ultra-soft, breathable, and biodegradable. Our organic cotton is grown without pesticides, ensuring a healthier skin-touch.",
        specs: [
          { label: "Fabric", value: "100% Organic Cotton" },
          { label: "Dye", value: "Plant-based" },
          { label: "Weight", value: "180 GSM" },
        ],
        reviews_data: [
          {
            name: "Lily G.",
            rating: 4,
            text: "So soft! Love supporting eco-friendly brands.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Sale",
    description:
      "Premium quality at a fraction of the cost. Limited time offers on our most wanted pieces.",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&h=400&fit=crop",
    count: 8,
    theme: "bg-gradient-to-r from-red-50 to-pink-50",
    products: [
      {
        id: "sale-1",
        name: "Wireless Earbuds",
        price: 79,
        original_price: 129,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 92,
        category: "Audio",
        delivery_days: 2,
        description:
          "High-performance audio at an unbeatable price. Experience deep bass and crisp highs without breaking the bank.",
        specs: [
          { label: "Bluetooth", value: "5.0" },
          { label: "Playtime", value: "6 Hours" },
          { label: "Waterproof", value: "IPX4" },
        ],
        reviews_data: [
          { name: "Zack F.", rating: 4, text: "Great value for the price." },
        ],
      },
    ],
  },
];
