export type LocalizedString = {
  cs: string;
  en: string;
};

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | (string & {});

export type Category = {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
};

export type Product = {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  categoryId: string;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
};

export type ProductVariant = {
  id: string;
  size: Size;
  stock: number;
};

export type Cart = {
  sessionId: string;
  userId: string | null;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: string;
  variantId: string;
  quantity: number;
  priceSnapshot: number;
};

export type ShippingMethod = {
  id: string;
  name: string;
  price: number;
};

export type PaymentMethod = {
  id: string;
  name: string;
};

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Address = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: string;
  sessionId: string;
  userId: string | null;
  items: OrderItem[];
  customer: Customer;
  address: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  productId: string;
  variantId: string;
  nameSnapshot: string;
  sizeSnapshot: Size;
  quantity: number;
  priceSnapshot: number;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

export type DashboardStats = {
  period: "day" | "week" | "month" | "all";
  totalOrders: number;
  totalRevenue: number;
  topProducts: TopProduct[];
};

export type TopProduct = {
  productId: string;
  name: string;
  sold: number;
};
