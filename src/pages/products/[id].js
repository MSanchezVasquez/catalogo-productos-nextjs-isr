import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { ChevronRight, ShoppingBag, Heart, Share2, Star } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCartStore } from "@/useCartStore";
import { fallbackProducts } from "../../data/products";

const CartSidebar = dynamic(() => import("../../components/CartSidebar"), {
  ssr: false,
});

export default function ProductPage({ product }) {
  const { addToCart } = useCartStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CartSidebar />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="capitalize">{product.category}</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <Head>
        <title>{product.title} | StorePro</title>
        <meta
          name="description"
          content={product.description.substring(0, 160)}
        />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Columna Imagen */}
            <div className="p-8 md:p-12 bg-gray-50 flex items-center justify-center relative group ">
              <button className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all z-10">
                <Heart className="h-5 w-5" />
              </button>
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full max-w-md h-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                priority={false}
              />
            </div>

            {/* Columna Info */}
            <div className="p-8 md:p-12 lg:pr-16 flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-indigo-600">
                  ${product.price}
                </p>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center text-yellow-400 text-sm font-medium">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  <span className="text-gray-700">4.8 (120 reseñas)</span>
                </div>
              </div>

              <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" /> Añadir al Carrito
                </button>
                <button className="px-6 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  En stock, envío inmediato
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                <div>Garantía de 30 días</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ... getStaticPaths y getStaticProps igual que antes
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) {
      // Si no existe, devolvemos notFound
      return { notFound: true };
    }

    const product = await res.json();

    return {
      props: { product },
      revalidate: 300,
    };
  } catch (error) {
    console.log(`Buscando ID ${id} en datos locales...`);

    // Buscar en el array local
    // Nota: context.params.id es string, por eso usamos == o convertimos a Number
    const localProduct = fallbackProducts.find((p) => p.id == id);

    if (localProduct) {
      return {
        props: { product: localProduct },
        revalidate: 300,
      };
    }

    return { notFound: true };
  }
}
