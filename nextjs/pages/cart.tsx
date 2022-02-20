import Head from 'next/head';
import { CartItem } from 'components/cart';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart - Shoe Shop</title>
      </Head>

      <div className="content cart">
        <CartItem loading />
        <CartItem loading />
      </div>
    </>
  );
};

export default Cart;
