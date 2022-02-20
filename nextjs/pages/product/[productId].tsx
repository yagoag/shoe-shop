import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <div className="content item-page">
      {/* TODO: remove product id */}
      <p>{productId}</p>
      <div className="skeleton" style={{ width: '50%', height: 250 }}></div>
      <div>
        <div
          className="skeleton"
          style={{ marginBottom: 16, width: 250, height: 26 }}
        ></div>
        <div
          className="skeleton"
          style={{ marginBottom: 8, width: 70, height: 18 }}
        ></div>
        <div
          className="skeleton"
          style={{ width: 100, height: 26, marginBottom: 16 }}
        ></div>
        <div
          className="skeleton"
          style={{ width: 120, height: 23, marginBottom: 32 }}
        ></div>
        <div className="skeleton" style={{ width: 110, height: 43 }}></div>
      </div>
    </div>
  );
};

export default Post;
