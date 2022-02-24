import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Cart } from 'models';
import { ProductDetails } from 'pages/api/products/[id]';
import { Skeleton } from 'components/shared';

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [recentlyAddedToCard, setRecentlyAddedToCart] = useState(false);

  const [selectedSize, setSelectedSize] = useState<number>();
  const { data: product, isLoading } = useQuery<ProductDetails | null>(
    ['product-details', productId],
    () =>
      productId !== undefined
        ? fetch(`/api/products/${productId}`).then(async (res) => {
            const response = await res.json();

            if (!res.ok) {
              throw new Error(response?.mesage);
            }

            setSelectedSize(response.sizes?.[0]);
            return response;
          })
        : null
  );

  const handleSizeChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => setSelectedSize(e.target.value),
    []
  );

  const addToCart = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    if (product && selectedSize) {
      Cart.updateCart({ id: product.id, size: selectedSize });
      setRecentlyAddedToCart(true);
      setTimeout(() => setRecentlyAddedToCart(false), 3000);
    }
  }, [product, selectedSize]);

  return (
    <>
      {product?.name && (
        <Head>
          <title>{product.name} - Shoe Shop</title>
        </Head>
      )}
      <div className="content item-page">
        {product?.image ? (
          <img
            src={`${product.image.src}?fit=crop&w=600&h=400`}
            alt={product.image.alt}
          />
        ) : (
          <Skeleton width="50%" height={250} loading={isLoading} />
        )}

        <div>
          {product ? (
            <div className="item-name">{product.name}</div>
          ) : (
            <Skeleton mb={16} width={250} height={26} loading={isLoading} />
          )}

          {product?.originalPrice ? (
            <div className="original-price">
              ${product.originalPrice?.toFixed(2)}
            </div>
          ) : (
            isLoading && <Skeleton mb={8} width={70} height={18} loading />
          )}

          {product?.price ? (
            <div className="price">${product.price.toFixed(2)}</div>
          ) : (
            <Skeleton mb={16} width={100} height={26} loading={isLoading} />
          )}

          {product?.sizes ? (
            <div>
              Size:{' '}
              <select value={selectedSize} onChange={handleSizeChange}>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <Skeleton width={120} height={23} mb={32} loading={isLoading} />
          )}

          {product ? (
            <button onClick={addToCart}>
              {recentlyAddedToCard ? 'Added ✓' : 'Add to cart'}
            </button>
          ) : (
            <Skeleton width={110} height={43} loading={isLoading} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
