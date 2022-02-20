type UpdateCartParams = {
  id: string;
  size: number;
  operation: 'add' | 'remove';
};

type CartItem = {
  id: string;
  size: number;
  quantity: number;
};

export class Cart {
  static updateCart({ id, size, operation = 'add' }: UpdateCartParams): void {
    const items = Cart.getItems();

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

        localStorage.setItem('cart', JSON.stringify(items));

        // loadCartSize();
      },
      remove: () => {
        localStorage.setItem(
          'cart',
          JSON.stringify(items.filter((_, index) => index !== entryIndex))
        );
      },
    }[operation]());
  }

  static getItems(): CartItem[] {
    const localStorageCart = localStorage.getItem('cart');

    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  static getSize(): number {
    return this.getItems().length;
  }
}
