import { Skeleton } from 'components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';

type Item = {
  id: string;
  name: string;
  size: number;
  originalPrice: number;
  price: number;
  quantity: number;
  image: {
    src: string;
    alt: string;
  };
};

type CartItemProps = {
  item?: Item;
  loading?: boolean;
};

export const CartItem: VFC<CartItemProps> = ({ item, loading, ...props }) => (
  <>
    {/* TODO: remove link if not available */}
    <Link href={`/product/?id=${item?.id}`} passHref>
      <div className="cart-item" {...props}>
        {item?.image ? (
          <Image
            src={`${item.image.src}?fit=crop&w=600&h=400`}
            alt={item.image.alt}
          />
        ) : (
          <Skeleton loading={loading} width={225} height={150} />
        )}

        <div className="info">
          {item?.name ? (
            <div className="item-name">{item.name}</div>
          ) : (
            <Skeleton loading={loading} width={150} height={24} />
          )}
          {item?.quantity ? (
            <div className="quantity">{item.quantity}</div>
          ) : (
            <Skeleton loading={loading} width={100} height={20} />
          )}
          {item?.size ? (
            <div className="shoe-size">Size: {item.size}</div>
          ) : (
            <Skeleton loading={loading} width={90} height={20} />
          )}
          {item ? (
            item.originalPrice && (
              <div className="original-price">
                ${item.originalPrice.toFixed(2)}
              </div>
            )
          ) : (
            <Skeleton loading={loading} width={70} height={18} />
          )}
          {item?.price ? (
            <div className="price">${item.price.toFixed(2)}</div>
          ) : (
            <Skeleton loading={loading} width={90} height={20} />
          )}
        </div>

        <div className="actions">
          {item ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('deleting from cart...');
                // updateCart(item.id, item.size, 'remove');
                // loadCartItems();
              }}
            >
              Remove
            </button>
          ) : (
            <Skeleton loading={loading} width={90} height={43} />
          )}
        </div>
      </div>
    </Link>

    <style jsx>
      {`
        .cart-item {
          border-radius: 3px;
          margin: 36px 0;
          height: 150px;
          flex: 1;
          color: #000000;
          display: flex;
          text-align: left;
          align-items: center;
          cursor: pointer;
        }

        .cart-item img {
          height: 100%;
          width: auto;
        }

        .cart-item .info {
          flex: 1;
          margin: 0 24px;
        }

        .cart-item .info > div {
          line-height: 1.6;
        }

        .cart-item .info .item-name {
          font-size: 18px;
          font-weight: 500;
        }

        .cart-item .actions {
          margin-right: 24px;
        }

        @media screen and (max-width: 560px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
            height: unset;
          }

          .cart-item img {
            width: 100%;
            height: auto;
          }

          .cart-item .info {
            margin: 16px;
          }

          .cart-item .actions {
            margin-right: unset;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `}
    </style>
  </>
);
