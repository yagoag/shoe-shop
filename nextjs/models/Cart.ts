export enum CartOperations {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  DECREASE = 'DECREASE',
}

type UpdateCartParams = {
  id: string | number;
  size: string | number;
  operation?: CartOperations;
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
  static updateCart({
    id,
    size,
    operation = CartOperations.ADD,
  }: UpdateCartParams): void {
    let items = Cart.loadCart();

    const entry = items.find(
      (prod) => prod.id === id && prod.size === size
    ) || {
      id,
      size,
      quantity: 0,
    };
    const entryIndex = items.indexOf(entry);

    if (
      operation === CartOperations.REMOVE ||
      (operation === CartOperations.DECREASE && entry.quantity <= 1)
    ) {
      items = items.filter((_, index) => index !== entryIndex);
    } else {
      if (operation === CartOperations.DECREASE) {
        entry.quantity -= 1;
      } else {
        entry.quantity += 1;
      }

      if (entryIndex !== -1) {
        items[entryIndex] = entry;
      } else {
        items = [...items, entry];
      }
    }

    localStorage?.setItem(CART_STORAGE_KEY, JSON.stringify(items));
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
