import Image from "next/image";

const DynamicProducts = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/pro/${id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center p-6">

      <div className="max-w-3xl w-full bg-gray-900 rounded-2xl border border-white/10 p-6">

        <h2 className="text-center text-3xl font-bold text-violet-400 mb-6">
          Product Details
        </h2>
   <Image height={200}
        width={200}
          alt="products"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          loading="lazy"
          src={product.imageUrl}
        />

        <h3 className="text-2xl font-bold text-cyan-400">
          {product.productName}
        </h3>

        <p className="text-gray-400 mt-3">
          {product.description}
        </p>

        <div className="flex justify-between mt-6 text-lg">

          <span className="text-green-400 font-bold">
            ${product.price}
          </span>

          <span className="text-gray-400">
            {product.duration}
          </span>

        </div>

      </div>
    </div>
  );
};

export default DynamicProducts;