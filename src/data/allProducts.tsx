import { Product } from "@/components/ProductCard";

import { collectionsData } from "./collectionsData";
import { menProducts } from "./menProducts";
import { womenProducts } from "./womenProducts";
import { staticProducts } from "./staticProducts";

const allProducts: Product[] = [
  ...collectionsData.flatMap((c) => c.products),
  ...menProducts,
  ...womenProducts,
  ...staticProducts,
];

export const productById = new Map<string, Product>(
  allProducts.map((p) => [p.id, p]),
);

/* Optional – export the flat array if you ever need it elsewhere */
export const allProductsFlat = allProducts;
