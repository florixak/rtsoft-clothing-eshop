import { createProductsQueryOptions } from "@/hooks/query-options";
import useDebounce from "@/hooks/use-debounce";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import Navigation from "../layout/navigation";
import CatalogHeader from "./catalog-header";
import ProductCard from "./product-card";

const Catalog = () => {
  const search = useSearch({ from: "/{-$locale}/" });
  const { debouncedValue: debouncedSearch } = useDebounce<typeof search>({
    value: search,
    delay: 750,
  });
  const navigate = useNavigate({ from: "/{-$locale}/" });
  const page = search.page ?? 1;
  const perPage = search.perPage ?? 12;

  const {
    data: { products, information } = {
      products: [],
      information: { total: 0, maxFilterPrice: 0, minFilterPrice: 0 },
    },
  } = useSuspenseQuery(createProductsQueryOptions(debouncedSearch));

  const totalPages = Math.max(1, Math.ceil((information.total ?? 0) / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  return (
    <section className="container mx-auto flex flex-col items-center">
      <CatalogHeader />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Navigation
        page={safePage}
        pageSize={perPage}
        pagedItems={products}
        totalItemsCount={information.total ?? 0}
        showSummary={true}
        onPageChange={(nextPage) => {
          navigate({
            search: (prev) => ({ ...prev, page: nextPage }),
            replace: true,
          });
        }}
        onPageSizeChange={(nextPageSize) => {
          navigate({
            search: (prev) => ({ ...prev, perPage: nextPageSize, page: 1 }),
            replace: true,
          });
        }}
      />
    </section>
  );
};

export default Catalog;
