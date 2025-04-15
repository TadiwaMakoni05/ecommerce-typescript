// components/Products.tsx
import { Link } from "react-router-dom"; // make sure you're using `react-router-dom`
import { useAppContext } from "../context/AppContext";

const Products = () => {
  const {
    data,
    loading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = useAppContext();

  return (
    <div className="w-[80%] h-screen flex flex-col gap-4 ">
      <h1 className="font-bold text-4xl text-center my-4">
        Welcome to E-Store
      </h1>

      <h1 className="font-bold text-2xl">Products - Page {currentPage}</h1>

      {loading ? (
        (
          <div className="px-14 my-4">
            <div className="border border-gray-300 p-4 rounded-md animate-pulse space-y-4">
              <div className="w-full h-[200px] bg-gray-300 rounded" />
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-full" />
            </div>
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 self-center items-center">
          {data.map((product) => (
            <div key={product.id}>
              <Link
                to={`/${product.id}`}
                className="border border-gray-300 p-4 rounded-md flex flex-col gap-2"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-[200px] object-contain"
                />
                <h1 className="font-bold">{product.title}</h1>
                <p className="text-gray-500">${product.price}</p>
                <p className="text-black text-sm">{product.category}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-wrap gap-2 mt-4 items-center text-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-2 py-1 rounded ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
