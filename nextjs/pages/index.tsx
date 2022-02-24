import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { ItemCard, Product } from 'components/details';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<Product[]>('list-products', () =>
    fetch('/api/products').then((res) => res.json())
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Shoe Shop</title>
      </Head>

      <div className="content home">
        {!isLoading && data ? (
          data?.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))
        ) : (
          <>
            <ItemCard loading={isLoading} />
            <ItemCard loading={isLoading} />
            <ItemCard loading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
