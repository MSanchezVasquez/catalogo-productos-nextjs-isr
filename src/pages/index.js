import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-center p-4 h-48">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-auto object-contain"
              />
            </div>

            <div className="p-4">
              <h3
                className="text-lg font-semibold truncate"
                title={product.title}
              >
                {product.title}
              </h3>
              <p className="text-xl font-bold text-green-600 my-2">
                ${product.price}
              </p>

              <Link
                href={`/products/${product.id}`}
                className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  console.log("REGENERANDO: Página de inicio (Lista)");
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return {
    props: { products },
    revalidate: 60,
  };
}
