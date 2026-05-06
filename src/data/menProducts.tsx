import { Product } from "@/components/ProductCard";

interface ProductWithDetails extends Product {
  description?: string;
  specs?: { label: string; value: string }[];
}

export const menProducts: ProductWithDetails[] = [
  {
    id: "men-1",
    name: "Classic Denim Jacket",
    price: 129,
    originalPrice: 159,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 234,
    category: "Clothing",
    isNew: true,
    deliveryDays: 3,
    description:
      "A timeless denim jacket with a modern cut, button‑front closure and two chest pockets.",
    specs: [
      { label: "Material", value: "100 % Cotton Denim" },
      { label: "Fit", value: "Regular" },
      { label: "Care", value: "Machine wash cold" },
    ],
  },
  {
    id: "men-2",
    name: "Premium Leather Shoes",
    price: 289,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 156,
    category: "Footwear",
    isSustainable: true,
    deliveryDays: 4,
    description:
      "Hand‑crafted full‑grain leather oxfords with a cushioned insole and Goodyear welt construction.",
    specs: [
      { label: "Upper", value: "Full‑grain leather" },
      { label: "Sole", value: "Leather + Rubber" },
      { label: "Fit", value: "True to size" },
    ],
  },
  {
    id: "men-3",
    name: "Sports Performance T‑Shirt",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 89,
    category: "Clothing",
    deliveryDays: 2,
    description:
      "Moisture‑wicking, four‑way stretch tee designed for high‑intensity workouts.",
    specs: [
      { label: "Fabric", value: "Polyester‑Elastane blend" },
      { label: "Fit", value: "Athletic" },
      { label: "UV Protection", value: "UPF 30+" },
    ],
  },
  {
    id: "men-4",
    name: "Designer Watch",
    price: 449,
    originalPrice: 599,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 312,
    category: "Accessories",
    deliveryDays: 5,
    description:
      "Swiss‑made automatic watch with sapphire crystal, leather strap and a 42 mm case.",
    specs: [
      { label: "Movement", value: "Automatic" },
      { label: "Case Diameter", value: "42 mm" },
      { label: "Crystal", value: "Sapphire" },
      { label: "Water Resistance", value: "100 m" },
    ],
  },
  {
    id: "men-5",
    name: "Casual Chino Pants",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 167,
    category: "Clothing",
    deliveryDays: 3,
    description:
      "Classic chino with a tapered leg, hidden button‑fly and side‑slash pockets.",
    specs: [
      { label: "Fabric", value: "Cotton‑Elastane twill" },
      { label: "Inseam", value: "32 in" },
      { label: "Care", value: "Machine wash warm" },
    ],
  },
  {
    id: "men-6",
    name: "Running Shoes",
    price: 129,
    originalPrice: 149,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 201,
    category: "Footwear",
    isNew: true,
    deliveryDays: 2,
    description:
      "Lightweight neutral‑support running shoe with breathable mesh upper and responsive foam midsole.",
    specs: [
      { label: "Drop", value: "8 mm" },
      { label: "Weight", value: "260 g (men’s 9)" },
      { label: "Terrain", value: "Road" },
    ],
  },
];
