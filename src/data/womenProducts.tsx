import { Product } from "@/components/ProductCard";

export const womenProducts: Product[] = [
  {
    id: "women-1",
    name: "Elegant Summer Dress",
    price: 89,
    originalPrice: 119,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 345,
    category: "Dresses",
    isNew: true,
    deliveryDays: 3,
    description:
      "Embrace the sunshine in this flowy midi dress. Crafted from lightweight viscose with a delicate floral print, it's the perfect piece for garden parties or seaside vacations.",
    specs: [
      { label: "Fabric", value: "100% Viscose" },
      { label: "Length", value: "Midi" },
      { label: "Fit", value: "A-Line / Flowy" },
      { label: "Closure", value: "Back Zipper" },
    ],
    reviewsData: [
      {
        name: "Chloe S.",
        rating: 5,
        text: "Absolutely stunning. The fabric is so breathable!",
      },
    ],
  },
  {
    id: "women-2",
    name: "Designer Handbag",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 278,
    category: "Accessories",
    isSustainable: true,
    deliveryDays: 4,
    description:
      "A statement of luxury and precision. This structured handbag is made from ethically sourced full-grain leather and features gold-plated hardware for a sophisticated touch.",
    specs: [
      { label: "Material", value: "Sustainably Sourced Leather" },
      { label: "Hardware", value: "18k Gold Plated" },
      { label: "Dimensions", value: "30cm x 20cm" },
      { label: "Strap", value: "Detachable Shoulder Strap" },
    ],
    reviewsData: [
      {
        name: "Isabella M.",
        rating: 5,
        text: "The quality is unmatched. I get compliments every time I wear it.",
      },
    ],
  },
  {
    id: "women-3",
    name: "Silk Blouse",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 192,
    category: "Tops",
    deliveryDays: 2,
    description:
      "Pure luxury in every thread. This 100% mulberry silk blouse offers a subtle sheen and a relaxed fit, making it an effortless transition from the office to dinner.",
    specs: [
      { label: "Fabric", value: "100% Mulberry Silk" },
      { label: "Weave", value: "Satin Weave" },
      { label: "Fit", value: "Relaxed / Oversized" },
      { label: "Care", value: "Dry Clean Only" },
    ],
    reviewsData: [
      {
        name: "Sophia L.",
        rating: 5,
        text: "So soft on the skin. Truly a premium product.",
      },
    ],
  },
  {
    id: "women-4",
    name: "High-Waisted Jeans",
    price: 79,
    originalPrice: 99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 234,
    category: "Bottoms",
    deliveryDays: 3,
    description:
      "The perfect denim fit. These high-waisted jeans are designed to contour your body while providing maximum comfort thanks to a hint of elastane for stretch.",
    specs: [
      { label: "Fabric", value: "98% Cotton, 2% Elastane" },
      { label: "Rise", value: "High-Waist" },
      { label: "Wash", value: "Vintage Indigo" }, // FIXED: removed double comma here
      { label: "Fit", value: "Straight Leg" },
    ],
    reviewsData: [
      {
        name: "Grace T.",
        rating: 4,
        text: "Perfect fit, though the waist runs a bit small.",
      },
    ],
  },
  {
    id: "women-5",
    name: "Statement Necklace",
    price: 45,
    image:
      "https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 156,
    category: "Accessories",
    isNew: true,
    deliveryDays: 2,
    description:
      "A bold touch of elegance. This statement piece features intricately carved crystals set in a polished silver-tone alloy, designed to turn heads at any event.",
    specs: [
      { label: "Material", value: "Swarovski-style Crystals" },
      { label: "Metal", value: "Hypoallergenic Alloy" },
      { label: "Length", value: "Adjustable 16-20 inches" },
      { label: "Weight", value: "Lightweight" },
    ],
    reviewsData: [
      {
        name: "Lily W.",
        rating: 5,
        text: "Stunning sparkle! It looks much more expensive than it is.",
      },
    ],
  },
  {
    id: "women-6",
    name: "Comfortable Heels",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 189,
    category: "Footwear",
    deliveryDays: 4,
    description:
      "Style meets comfort. Our block-heel pumps feature a memory foam insole and soft suede upper, allowing you to stay elegant all day without the pain.",
    specs: [
      { label: "Heel Height", value: "3 inches" },
      { label: "Material", value: "Premium Suede" },
      { label: "Insole", value: "Memory Foam" },
      { label: "Toe", value: "Almond Toe" },
    ],
    reviewsData: [
      {
        name: "Ava R.",
        rating: 4,
        text: "Very comfortable heels, though the color is a bit darker than the photo.",
      },
    ],
  },
];
