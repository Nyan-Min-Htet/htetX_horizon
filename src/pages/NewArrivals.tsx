import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import minimalJacket from "@/assets/minimal-jacket.webp";
import streetHoodie from "@/assets/street-hoodie.jpg";
import classicSneaker from "@/assets/classic-sneaker.avif";
import casualShirt from "@/assets/casual-shirt.jfif";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Minimal Jacket",
    price: "$89",
    image: minimalJacket,
  },
  {
    id: 2,
    name: "Street Hoodie",
    price: "$59",
    image: streetHoodie,
  },
  {
    id: 3,
    name: "Classic Sneakers",
    price: "$120",
    image: classicSneaker,
  },
  {
    id: 4,
    name: "Casual Shirt",
    price: "$45",
    image: casualShirt,
  },
];

const NewArrivals: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-black text-white py-20 text-center">
          <h2 className="text-5xl font-bold mb-4">Fresh Drops Just Landed</h2>
          <p className="text-gray-300">Explore the latest trends and styles</p>
        </section>

        {/* Product Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default NewArrivals;
