type UpdateCartParams = {
  id: string | number;
  size: number;
  operation?: 'add' | 'remove';
};

type CartItem = {
  id: string | number;
  size: string | number;
  quantity: number;
};

const localStorage = (() => {
  if (typeof window !== 'undefined') return window?.localStorage;
})();

const CART_STORAGE_KEY = 'cart';

export class Cart {
  static updateCart({ id, size, operation = 'add' }: UpdateCartParams): void {
    const items = Cart.loadCart();

    const entry = items.find(
      (prod) => prod.id === id && prod.size === size
    ) || {
      id,
      size,
      quantity: 0,
    };
    const entryIndex = items.indexOf(entry);

    ({
      add: () => {
        entry.quantity += 1;

        if (entryIndex !== -1) {
          items[entryIndex] = entry;
        } else {
          items.push(entry);
        }

        localStorage?.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      },
      remove: () => {
        localStorage?.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(items.filter((_, index) => index !== entryIndex))
        );
      },
    }[operation]());
  }

  static loadCart(): CartItem[] {
    const localStorageCart = localStorage?.getItem(CART_STORAGE_KEY);

    if (!localStorageCart) {
      return [];
    }

    const parsedCart = JSON.parse(localStorageCart);

    const filteredCart = parsedCart.filter(
      (item: { id?: string | number; size?: number }) => item.id && item.size
    );

    if (filteredCart.length !== parsedCart) {
      localStorage?.setItem(CART_STORAGE_KEY, JSON.stringify(filteredCart));
    }

    return filteredCart;
  }

  static getSize(): number {
    return Cart.loadCart().length;
  }
}
