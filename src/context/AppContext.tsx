import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
}

interface AppContextType {
  data: Product[];
  loading: boolean;
  currentPage: number;
  total: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const result = await response.json();
      setData(result.products);
      setTotal(result.total); // total products available
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        currentPage,
        total,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
