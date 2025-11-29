import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Star, Plus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCartStore } from "@/useCartStore";

const CartSidebar = dynamic(() => import("../components/CartSidebar"), {
  ssr: false,
});

export default function HomePage({ products }) {
  // Estado para el carrito y el drawer
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
      {/* 1. Header Global */}
      <Header />

      {/* 2. Carrito Deslizante */}
      <CartSidebar />

      {/* 3. Hero Section (Opcional pero recomendado para dar look pro) */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Colección <span className="text-indigo-500">Verano 2025</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Descubre las últimas tendencias con descuentos exclusivos de hasta
            el 50%.
          </p>
          <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
            Ver Ofertas
          </button>
        </div>
      </section>

      <Head>
        <title> StorePro</title>
        <meta name="description" content="Tienda oficial de StorePro" />
      </Head>

      {/* 4. Grid de Productos Mejorado */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Nuestros Productos
          </h2>
          <select className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option>Ordenar por: Destacados</option>
            <option>Precio: Menor a Mayor</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Imagen con badge */}
              <div className="relative aspect-[4/3] p-6 bg-white overflow-hidden ">
                <span className="absolute top-3 left-3 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  priority={index < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />

                {/* Botón flotante 'Añadir rápido' en hover */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 h-10 w-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-700"
                  title="Añadir al carrito"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2 text-yellow-400 text-xs">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <Star className="h-3 w-3 text-gray-300 fill-current" />
                  <span className="text-gray-400 ml-1">(4.0)</span>
                </div>

                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                  <p className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 5. Footer Global */}
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return {
    props: { products },
    revalidate: 60,
  };
}
