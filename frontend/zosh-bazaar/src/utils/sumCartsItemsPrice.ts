interface CartItem {
  sellingPrice: number;
  mrpPrice: number;
  quantity: number;
}

export const sumCartItemSellingPrice = (items: CartItem[] = []): number => {
  return items.reduce(
    (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
    0
  );
};

export const sumCartItemsMrpPrice = (items: CartItem[] = []): number => {
  return items.reduce(
    (total, item) => total + (item.mrpPrice || 0) * (item.quantity || 0),
    0
  );
};

