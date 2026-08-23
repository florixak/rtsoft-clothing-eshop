const DEFAULT_NETWORK_DELAY_MS = 200;

const NETWORK_DELAY_MS = {
  default: DEFAULT_NETWORK_DELAY_MS,
  auth: 500,
  category: 100,
  product: 100,
  adminData: 1000,
  ordersList: 1000,
  orders: 500,
  checkoutOrder: 500,
  createOrder: 800,
  payment: 2000,
  orderMutation: 1000,
  userProfile: 500,
  wishlist: 500,
} as const;

type NetworkDelayKey = keyof typeof NETWORK_DELAY_MS;

const delay = (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

export const delayFor = (key: NetworkDelayKey) => {
  const ms = NETWORK_DELAY_MS[key] ?? DEFAULT_NETWORK_DELAY_MS;
  return delay(ms);
};
