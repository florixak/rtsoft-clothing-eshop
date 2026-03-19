import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { searchForProducts, normalizeText } from "@/lib/search-utils";
import useDebounce from "@/hooks/use-debounce";
import { useLocation, useNavigate } from "@tanstack/react-router";

type HeaderSearchProps = {
  mode?: "desktop" | "mobile";
};

const HeaderSearch = ({ mode = "desktop" }: HeaderSearchProps) => {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const query = location.search.q ?? "";

  const setQuery = (value: string) => {
    navigate({
      to: location.pathname,
      search: {
        ...location.search,
        q: value || undefined,
      },
      hash: location.hash,
      replace: true,
    });
  };

  const { debouncedValue } = useDebounce({
    value: query,
    delay: 300,
  });

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";
  const normalizedQuery = normalizeText(debouncedValue);
  const matchedProducts = searchForProducts(normalizedQuery, locale);

  const hintPool = [
    ...categories.map((category) => category.name[locale]),
    ...products.map((product) => product.name[locale]),
  ];

  const hintSuggestions = hintPool
    .filter((hint, index, hints) => hints.indexOf(hint) === index)
    .filter(
      (hint) =>
        !normalizedQuery || normalizeText(hint).includes(normalizedQuery),
    )
    .slice(0, normalizedQuery ? 4 : 6);

  const setSelectedEffectFn = useEffectEvent((index: number) => {
    setSelectedIndex(index);
  });

  useEffect(() => {
    setSelectedEffectFn(0);
  }, [matchedProducts.length]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const openSelectedProduct = async () => {
    const product = matchedProducts[selectedIndex];

    if (!product) {
      return;
    }

    setIsOpen(false);
    await navigate({
      to: "/{-$locale}/product/$productSlug",
      params: {
        locale,
        productSlug: product.slug[locale],
      },
      search: { q: product.name[locale] },
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        mode === "desktop" && "hidden md:block flex-1 max-w-md",
        mode === "mobile" && "md:hidden w-full",
      )}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        placeholder={t("header.search.placeholder")}
        className={cn(
          "bg-background pl-9",
          mode === "mobile" && "h-10 rounded-xl text-base",
        )}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            openSelectedProduct();
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((prev) =>
              prev < matchedProducts.length - 1 ? prev + 1 : prev,
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          }

          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        aria-label={t("header.search.placeholder")}
      />
      {query ? (
        <Button
          type="button"
          variant="ghost"
          size={mode === "mobile" ? "icon-sm" : "icon"}
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => {
            setQuery("");
            setIsOpen(true);
          }}
        >
          <X />
        </Button>
      ) : null}

      {isOpen ? (
        <div
          className={cn(
            "absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg",
            mode === "mobile" && "max-h-[65vh] overflow-y-auto",
          )}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {t("header.search.sections.products")}
            </p>
            <div className="mt-2 space-y-1">
              {matchedProducts.length > 0 ? (
                matchedProducts.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent ${selectedIndex === index ? "bg-accent" : ""}`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      navigate({
                        to: "/{-$locale}/product/$productSlug",
                        params: {
                          locale,
                          productSlug: product.slug[locale],
                        },
                        search: { q: product.name[locale] },
                      });
                      setIsOpen(false);
                    }}
                  >
                    {product.images[0] != null ? (
                      <img
                        src={product.images[0]}
                        alt={product.name[locale]}
                        className="size-11 rounded-md object-cover"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {product.name[locale]}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.categoryName}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-foreground">
                      {formatPrice(product.price, locale)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-2 py-2 text-sm text-muted-foreground">
                  {t("empty.noResultsFor", { query })}
                </p>
              )}
            </div>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {t("header.search.sections.hints")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {hintSuggestions.map((hint) => (
                <Button
                  key={hint}
                  type="button"
                  variant="ghost"
                  className={cn(
                    "rounded-full border border-border px-3 py-1 text-sm transition-colors hover:bg-accent",
                    normalizeText(hint) === normalizedQuery && "bg-accent",
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery(hint);
                    setIsOpen(true);
                  }}
                >
                  {hint}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderSearch;
