import { Skeleton } from 'components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';

export type Product = {
  id: string | number;
  name: string;
  originalPrice?: number;
  price: number;
  image: {
    src: string;
    alt: string;
  };
};

type ItemCardProps = {
  product?: Product;
  loading?: boolean;
};

export const ItemCard: VFC<ItemCardProps> = ({
  product,
  loading,
  ...props
}) => (
  <>
    <Link href={`/product/${product?.id}`}>
      <div className="item-card" {...props}>
        {product?.image ? (
          <Image
            src={`${product.image.src}?fit=crop&w=600&h=400`}
            alt={product.image.alt}
          />
        ) : (
          <Skeleton loading={loading} width={220} height={145} mb={16} />
        )}

        {product?.name ? (
          <div className="item-name">{product.name}</div>
        ) : (
          <Skeleton loading={loading} width={180} height={22} mb={8} />
        )}

        {product ? (
          product?.originalPrice && (
            <div className="original-price">
              ${product.originalPrice.toFixed(2)}
            </div>
          )
        ) : (
          <Skeleton loading={loading} width={50} height={16} mb={8} />
        )}

        {product?.price ? (
          <div className="price">${product.price.toFixed(2)}</div>
        ) : (
          <Skeleton loading={loading} width={70} height={18} />
        )}

        {product && <button className="view-product">View Product</button>}
      </div>
    </Link>

    <style jsx>{`
      .item-card {
        display: inline-block;
        border-radius: 3px;
        margin: 24px;
        width: 220px;
        height: 300px;
        text-align: left;
        vertical-align: top;
        cursor: pointer;
        color: #000000;
        flex-direction: column;
      }

      .item-card img {
        width: 100%;
        height: auto;
      }

      .item-card .item-name {
        font-size: 18px;
        font-weight: 500;
        margin-top: 8px;
      }

      .item-card .original-price,
      .item-card .price {
        margin-left: 8px;
        margin-top: 4px;
      }

      .item-card .view-product {
        margin-top: 16px;
        width: 100%;
        opacity: 0;
        transition: opacity 200ms;
      }

      .item-card:hover .view-product {
        opacity: 1;
      }

      .item-card .price {
        font-size: 16px;
      }
    `}</style>
  </>
);
