import { Product } from "@/components/ProductCard";

export const menProducts: Product[] = [
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
      "A rugged yet refined staple for every wardrobe. This jacket is crafted from heavy-duty denim with a tailored fit that provides both warmth and style for the transitional seasons.",
    specs: [
      { label: "Material", value: "14oz Organic Denim" },
      { label: "Fit", value: "Slim-Straight" },
      { label: "Closure", value: "Stainless Steel Buttons" },
      { label: "Pockets", value: "2 Chest, 2 Side" },
    ],
    reviewsData: [
      {
        name: "Mark S.",
        rating: 5,
        text: "Perfect fit. The denim is thick and feels very high quality.",
      },
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
      "Elevate your formal attire. These oxfords are hand-stitched from full-grain Italian leather, featuring a cushioned insole for all-day comfort and a polished finish.",
    specs: [
      { label: "Leather", value: "Full-Grain Calfskin" },
      { label: "Sole", value: "Hand-stitched Leather" },
      { label: "Lining", value: "Breathable Sheepskin" },
      { label: "Style", value: "Oxford" },
    ],
    reviewsData: [
      {
        name: "Robert H.",
        rating: 5,
        text: "The craftsmanship is unbelievable. Truly a luxury shoe.",
      },
    ],
  },
  {
    id: "men-3",
    name: "Sports Performance T-Shirt",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 89,
    category: "Clothing",
    deliveryDays: 2,
    description:
      "Engineered for athletes. This high-performance tee uses moisture-wicking technology to keep you dry and cool during the most intense workouts.",
    specs: [
      { label: "Fabric", value: "Recycled Polyester Blend" },
      { label: "Tech", value: "Quick-Dry / Anti-Odor" },
      { label: "Fit", value: "Athletic Fit" },
      { label: "Sleeve", value: "Short Sleeve" },
    ],
    reviewsData: [
      {
        name: "Toby G.",
        rating: 4,
        text: "Great for gym sessions. Doesn't hold onto sweat.",
      },
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
      "A bold statement of precision and luxury. Featuring a Swiss-engineered movement and a scratch-resistant sapphire crystal, this watch is designed for the modern leader.",
    specs: [
      { label: "Movement", value: "Automatic Quartz" },
      { label: "Glass", value: "Sapphire Crystal" },
      { label: "Case", value: "316L Stainless Steel" },
      { label: "Waterproof", value: "5 ATM (50m)" },
    ],
    reviewsData: [
      {
        name: "Arthur P.",
        rating: 5,
        text: "Exceeded my expectations. The weight and feel are perfect.",
      },
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
      "The perfect balance between formal and casual. These chinos offer a tapered fit and a slight stretch for maximum comfort throughout the workday.",
    specs: [
      { label: "Fabric", value: "Cotton-Elastane Twill" },
      { label: "Fit", value: "Modern Tapered" },
      { label: "Pockets", value: "4-Pocket Design" },
      { label: "Care", value: "Machine Washable" },
    ],
    reviewsData: [
      {
        name: "Leo W.",
        rating: 5,
        text: "Great fit and the color is exactly as shown online.",
      },
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
      "Maximize your stride with our Cloud-Trek runners. Featuring a responsive foam midsole that absorbs impact and a breathable mesh upper to keep your feet cool.",
    specs: [
      { label: "Midsole", value: "Responsive EVA Foam" },
      { label: "Upper", value: "Engineered Mesh" },
      { label: "Traction", value: "Multi-surface Rubber" },
      { label: "Weight", value: "240g" },
    ],
    reviewsData: [
      {
        name: "Sam H.",
        rating: 4,
        text: "Very lightweight. Good for long distance running.",
      },
    ],
  },
];
