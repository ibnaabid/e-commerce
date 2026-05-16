// import ProductCard from "@/components/ProductCard";

import ProductCard from "./ProductCard";

const Products = async () => {
  const res = await fetch("http://localhost:5000/pro", {
    cache: "no-store"
  });

  const products = await res.json();

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        All Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}

      </div>

    </div>
  );
};

export default Products;