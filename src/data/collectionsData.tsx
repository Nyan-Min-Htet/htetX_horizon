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
      },
    ],
  },
  {
    id: "3",
    name: "Sustainable Picks",
    description: "Eco-friendly choices for conscious living",
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
        isSustainable: true,
        deliveryDays: 3,
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
      },
    ],
  },
];
