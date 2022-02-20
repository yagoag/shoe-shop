import { VFC } from 'react';

type SkeletonProps = {
  loading?: boolean;
  width: number | string;
  height?: number | string;
  mb?: number | string;
  marginBottom?: number | string;
  mt?: number | string;
  marginTop?: number | string;
  ml?: number | string;
  marginLeft?: number | string;
  mr?: number | string;
  marginRight?: number | string;
  m?: number | string;
  margin?: number | string;
};

export const Skeleton: VFC<SkeletonProps> = ({
  loading,
  width,
  height,
  mb,
  marginBottom,
  mt,
  marginTop,
  ml,
  marginLeft,
  mr,
  marginRight,
  m,
  margin,
}) => {
  return (
    <>
      <div
        className={`skeleton${loading ? ' loading' : ''}`}
        style={{
          width,
          height: height ?? '1em',
          margin: m ?? margin,
          marginTop: mt ?? marginTop,
          marginBottom: mb ?? marginBottom,
          marginLeft: ml ?? marginLeft,
          marginRight: mr ?? marginRight,
        }}
      ></div>

      <style jsx>{`
        .skeleton {
          margin: 4px 0;
          background-color: #a7a2a9;
          border-radius: 4px;
        }

        .skeleton.loading {
          animation: blink alternate 1s infinite;
        }

        @keyframes blink {
          from {
            opacity: 1;
          }

          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
