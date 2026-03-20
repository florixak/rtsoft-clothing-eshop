import { products } from "@/data";
import CatalogHeader from "./catalog-header";
import ProductCard from "./product-card";

const Catalog = () => {
  return (
    <section className="container mx-auto">
      <CatalogHeader />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
