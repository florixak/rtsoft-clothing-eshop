import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

const CatalogFilter = () => {
  const maxPrice = 100;
  const minPrice = 0;
  return (
    <aside className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">
          Categories
        </h3>
        <ul className="flex flex-row items-center gap-2">
          <Button variant="outline">All</Button>
          <Button variant="outline">Jackets</Button>
          <Button variant="outline">Pants</Button>
          <Button variant="outline">Shirts</Button>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">
          Price Range
        </h3>
        <Slider
          defaultValue={[minPrice, maxPrice]}
          max={maxPrice}
          min={minPrice}
          step={5}
          className="w-full"
        />
        <div className="flex gap-24">
          <Input placeholder="Min" type="number" />
          <Input placeholder="Max" type="number" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">Sort By</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">Rating</h3>
        <RadioGroup className="flex flex-row items-center justify-start">
          <RadioGroupItem
            value="5"
            id="rating-5"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-5"
                className="flex items-center gap-2 cursor-pointer"
              >
                5<Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
          <RadioGroupItem
            value="4"
            id="rating-4"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-4"
                className="flex items-center gap-2 cursor-pointer"
              >
                4+
                <Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
          <RadioGroupItem
            value="3"
            id="rating-3"
            className="peer sr-only absolute"
          />
          <Button
            variant="outline"
            className="w-fit"
            render={
              <Label
                htmlFor="rating-3"
                className="flex items-center gap-2 cursor-pointer"
              >
                3+
                <Star size={16} className="text-yellow-500" />
              </Label>
            }
          />
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">Size</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s">Small</SelectItem>
            <SelectItem value="m">Medium</SelectItem>
            <SelectItem value="l">Large</SelectItem>
            <SelectItem value="xl">X-Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase text-base text-muted-foreground">
          Availability
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Input
              type="checkbox"
              id="in-stock"
              className="size-4 accent-accent-foreground"
            />
            <Label
              htmlFor="in-stock"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>In Stock Only</span>
            </Label>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="checkbox"
              id="pre-order"
              className="size-4 accent-accent-foreground"
            />
            <Label
              htmlFor="pre-order"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>Pre-Order</span>
            </Label>
          </div>
        </div>
      </div>
      <Button variant="outline">Apply Filters</Button>
    </aside>
  );
};

export default CatalogFilter;
