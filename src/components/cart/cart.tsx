import { useCartStore } from "@/stores/cart-store";
import CartItems from "./cart-items";
import OrderSummary from "../order-summary";

const Cart = () => {
  const { itemsCount } = useCartStore();
  return (
    <section className="container mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-heading font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {itemsCount()} ready for checkout
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row w-full md:justify-between">
        <CartItems />
        <OrderSummary />
      </div>
    </section>
  );
};

export default Cart;
