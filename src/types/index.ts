export type LocalizedString = {
  cs: string;
  en: string;
};

export type SizeCode = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type TypeCode = string;
export type SpecificationKey = "material" | "care" | "origin";
export type SpecificationObject = Record<SpecificationKey, LocalizedString>;

export type SelectionSnapshot = {
  size: SizeCode;
  color: TypeCode;
};

export type Category = {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
};

export type SKU = {
  id: string;
  size: SizeCode;
  color: TypeCode;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
  description: LocalizedString;
  basePrice: number;
  categoryId: string;
  images: string[];
  options: ProductOptions;
  specifications: SpecificationObject;
  skus: SKU[];
  createdAt: string;
  rating: number;
  reviewsCount: number;
};

export type ProductOption<TCode extends string = string> = {
  id: string;
  code: TCode;
  label: LocalizedString;
};

export type ProductOptions = {
  sizes: ProductOption<SizeCode>[];
  colors: ProductOption<TypeCode>[];
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
  productId: string;
  selectionSnapshot: SelectionSnapshot;
  quantity: number;
  priceSnapshot: number;
};

export type ShippingMethod = {
  id: string;
  name: LocalizedString;
  price: number;
  description: LocalizedString;
};

export type PaymentMethod = {
  id: string;
  name: LocalizedString;
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
  nameSnapshot: string;
  selectionSnapshot: SelectionSnapshot;
  quantity: number;
  priceSnapshot: number;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

export type RevenueDataPoint = {
  date: `${number}-${number}-${number}`;
  revenue: number;
};

export type DashboardStats = {
  period: "day" | "week" | "month" | "all";
  totalOrders: number;
  totalRevenue: number;
  topProducts: TopProduct[];
  revenueOverTime: RevenueDataPoint[];
};

export type TopProduct = {
  productId: string;
  name: string;
  sold: number;
};
