import { FC } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Cart as CartModel } from 'models/Cart';

export const CART_SIZE_QUERY_KEY = 'cart-size';

export const Layout: FC = ({ children }) => {
  const { data: cartSize } = useQuery(CART_SIZE_QUERY_KEY, () =>
    CartModel.getSize()
  );

  return (
    <>
      <header>
        <div className="content">
          <Link href="/" passHref>
            <button>Home</button>
          </Link>
          <Link href="/" passHref>
            <h1>Shoe Shop</h1>
          </Link>
          <Link href="/cart" passHref>
            <button className="cart">
              Cart <span>{cartSize}</span>
            </button>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="content">
          Pictures by&nbsp;
          <a
            href="https://unsplash.com/@maksimcul8r"
            target="_blank"
            rel="noreferrer"
          >
            @maksimcul8r
          </a>
          ,&nbsp;
          <a
            href="https://unsplash.com/@hipkicks"
            target="_blank"
            rel="noreferrer"
          >
            @hipkicks
          </a>
          &nbsp;and&nbsp;
          <a
            href="https://unsplash.com/@alinsurdu3"
            target="_blank"
            rel="noreferrer"
          >
            @alinsurdu3
          </a>
          .
        </div>
      </footer>
    </>
  );
};
