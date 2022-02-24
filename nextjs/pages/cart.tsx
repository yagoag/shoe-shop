import Head from 'next/head';
import { useQuery } from 'react-query';
import { Cart as CartModel } from 'models';
import { CartItem } from 'components/cart';

export const CART_ITEMS_QUERY_KEY = 'cart-items';

const Cart = () => {
  const { data: cartItems } = useQuery(CART_ITEMS_QUERY_KEY, () =>
    CartModel.loadCart()
  );

  return (
    <>
      <Head>
        <title>Cart - Shoe Shop</title>
      </Head>

      <div className="content cart">
        {!cartItems || cartItems.length === 0 ? (
          <div className="empty-cart">No items on your cart yet.</div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}`}
              productId={item.id}
              size={item.size}
              quantity={item.quantity}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Cart;
