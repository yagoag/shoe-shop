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

      <style jsx>{`
        header {
          padding: 32px;
          display: flex;
          justify-content: center;
        }

        header .content {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          max-width: 600px;
        }

        header .content button {
          background: none;
          color: #000000;
          font-size: 16px;
        }

        header .content h1 {
          margin: 0;
          padding: 0;
          font-size: 32px;
          font-weight: 500;
          text-transform: uppercase;
          color: #172a3a;
          cursor: pointer;
          text-align: center;
        }

        header .content .cart > span {
          background-color: #000000;
          color: #ffffff;
          padding: 0 4px 0 6px;
          border-radius: 50vh;
          font-size: 14px;
        }

        main,
        footer {
          display: flex;
          justify-content: center;
        }

        footer .content {
          flex: 1;
          max-width: 810px;
          padding: 32px;
          text-align: center;
        }
      `}</style>
    </>
  );
};
