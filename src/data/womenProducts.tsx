import { Product } from "@/components/ProductCard";

interface ProductWithDetails extends Product {
  description?: string;
  specs?: { label: string; value: string }[];
}

export const womenProducts: ProductWithDetails[] = [
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
      "Flowy midi dress in lightweight viscose with a subtle floral print and adjustable tie‑waist.",
    specs: [
      { label: "Fabric", value: "Viscose‑Elastane blend" },
      { label: "Length", value: "Midi (≈45 in)" },
      { label: "Care", value: "Hand wash cold" },
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
      "Structured top‑handle bag in full‑grain leather with interior zip pocket and gold‑tone hardware.",
    specs: [
      { label: "Material", value: "Full‑grain leather" },
      { label: "Dimensions", value: "30 × 20 × 12 cm" },
      { label: "Weight", value: "0.85 kg" },
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
      "Luxurious 100 % silk blouse with a relaxed fit, hidden button placket and subtle sheen.",
    specs: [
      { label: "Fabric", value: "100 % Silk" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
  {
    id: "women-4",
    name: "High‑Waisted Jeans",
    price: 79,
    originalPrice: 99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 234,
    category: "Bottoms",
    deliveryDays: 3,
    description:
      "High‑waisted, straight‑leg denim with a five‑pocket design and subtle whiskering.",
    specs: [
      { label: "Fabric", value: "99 % Cotton, 1 % Elastane" },
      { label: "Inseam", value: "30 in" },
      { label: "Care", value: "Machine wash cold" },
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
      "Bold statement necklace featuring oversized crystal beads and a adjustable chain.",
    specs: [
      { label: "Main Material", value: "Crystal & Alloy" },
      { label: "Length", value: "16‑24 in (adjustable)" },
      { label: "Care", value: "Wipe with soft cloth" },
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
      "Block‑heel pump with cushioned insole, soft suede upper and a versatile almond toe.",
    specs: [
      { label: "Heel Height", value: "2.5 in" },
      { label: "Upper", value: "Suede" },
      { label: "Fit", value: "True to size" },
    ],
  },
];
