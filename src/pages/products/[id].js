import Link from "next/link";

export default function ProductPage({ product }) {
  return (
    <div style={{ padding: "30px" }}>
      <Link href="/">&larr; Volver a la lista</Link>
      <hr />
      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        <img src={product.image} alt={product.title} width="300" />
        <div>
          <h1>{product.title}</h1>
          <p style={{ fontSize: "1.5rem", color: "green" }}>${product.price}</p>
          <h3>Categoría: {product.category}</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  console.log(`REGENERANDO: Página de producto ID: ${id}`);

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
    revalidate: 300,
  };
}
