export const ERROR_CODES = {
  invalidCredentials: "INVALID_CREDENTIALS",
  orderNotFound: "ORDER_NOT_FOUND",
  productNotFound: "PRODUCT_NOT_FOUND",
  wishlistNotFound: "WISHLIST_NOT_FOUND",
  wishlistLimitReached: "WISHLIST_LIMIT_REACHED",
  wishlistNameInvalid: "WISHLIST_NAME_INVALID",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ERROR_CODES.invalidCredentials]: "Invalid email or password",
  [ERROR_CODES.orderNotFound]: "Order not found",
  [ERROR_CODES.productNotFound]: "Product not found",
  [ERROR_CODES.wishlistNotFound]: "Wishlist not found",
  [ERROR_CODES.wishlistLimitReached]: "Wishlist limit reached",
  [ERROR_CODES.wishlistNameInvalid]: "Wishlist name is invalid",
};

export class AppError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, message = ERROR_MESSAGES[code]) {
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(ERROR_CODES.invalidCredentials);
  }
}

export class NotFoundError extends AppError {
  constructor(
    code:
      | typeof ERROR_CODES.orderNotFound
      | typeof ERROR_CODES.productNotFound
      | typeof ERROR_CODES.wishlistNotFound,
  ) {
    super(code);
  }
}

export class WishlistLimitError extends AppError {
  constructor() {
    super(ERROR_CODES.wishlistLimitReached);
  }
}

export class WishlistNameError extends AppError {
  constructor() {
    super(ERROR_CODES.wishlistNameInvalid);
  }
}

export const isErrorCode = (
  error: unknown,
  code: ErrorCode,
): error is AppError => {
  return error instanceof AppError && error.code === code;
};