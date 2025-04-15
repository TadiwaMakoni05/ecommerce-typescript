import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  brand: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const loading = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <div className="px-14 my-4">
        <div className="border border-gray-300 p-4 rounded-md animate-pulse space-y-4">
          <div className="w-full h-[200px] bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <p className="p-4 text-center flex justify-center items-center font-semibold m-10">
        LOading
      </p>
    );

  return (
    <div className="px-14 my-4">
      <Link to={"/"} className="py-2 px-4 bg-black text-white ">
        Products
      </Link>

      <div className="border border-gray-300 p-4 rounded-md flex flex-col gap-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[200px] object-contain"
        />
        <h1 className="font-bold">{product.title}</h1>
        <p className="text-gray-500">${product.price}</p>
        <p className="text-black text-sm">{product.category}</p>
        <p className="text-sm mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
