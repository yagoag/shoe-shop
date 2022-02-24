import { VFC } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ProductDetails } from 'pages/api/products/[id]';
import { Cart } from 'models';
import { CART_SIZE_QUERY_KEY, Skeleton } from 'components/shared';
import { CART_ITEMS_QUERY_KEY } from 'pages/cart';

export type Item = {
  id: string | number;
  name: string;
  size: number;
  originalPrice?: number;
  price: number;
  quantity: number;
  image: {
    src: string;
    alt: string;
  };
};

type CartItemProps = {
  productId: string | number;
  quantity: number;
  size: string | number;
};

export const CartItem: VFC<CartItemProps> = ({
  productId,
  quantity,
  size,
  ...props
}) => {
  const queryClient = useQueryClient();
  const { data: product, isLoading } = useQuery<ProductDetails | null>(
    ['product-details', productId],
    () =>
      productId !== undefined
        ? fetch(`/api/products/${productId}`).then((res) => res.json())
        : null
  );
  const removeFromCart = useMutation(
    async ({
      productId,
      size,
    }: {
      productId: string | number;
      size: number;
    }) => {
      Cart.updateCart({ id: productId, size, operation: 'remove' });
      return { productId, size };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CART_ITEMS_QUERY_KEY);
        queryClient.invalidateQueries(CART_SIZE_QUERY_KEY);
      },
    }
  );

  return (
    <>
      <Link href={`/product/${productId}`} passHref>
        <div className="cart-item" {...props}>
          {product?.image ? (
            <img
              src={`${product.image.src}?fit=crop&w=600&h=400`}
              alt={product.image.alt}
            />
          ) : (
            <Skeleton loading={isLoading} width={225} height={150} />
          )}

          <div className="info">
            {product?.name ? (
              <div className="item-name">{product.name}</div>
            ) : (
              <Skeleton loading={isLoading} width={150} height={24} />
            )}

            <div className="quantity">Quantity: {quantity}</div>

            <div className="shoe-size">Size: {size}</div>

            {product ? (
              product.originalPrice && (
                <div className="original-price">
                  ${product.originalPrice.toFixed(2)}
                </div>
              )
            ) : (
              <Skeleton loading={isLoading} width={70} height={18} />
            )}

            {product?.price ? (
              <div className="price">${product.price.toFixed(2)}</div>
            ) : (
              <Skeleton loading={isLoading} width={90} height={20} />
            )}
          </div>

          <div className="actions">
            {product ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart.mutate({ productId, size });
                }}
              >
                Remove
              </button>
            ) : (
              <Skeleton loading={isLoading} width={90} height={43} />
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
};
