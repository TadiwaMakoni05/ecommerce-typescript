import { Route, Routes } from "react-router";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <main className="flex flex-row w-full h-screen px-10">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
    </main>
  );
};

export default App;
