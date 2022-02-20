import { Product } from 'components/details';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mockShoeStock } from '../products';

type ProductDetails = {
  sizes: number[];
} & Product;

type ErrorResponse = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDetails | ErrorResponse>
) {
  const { id } = req.query;
  const shoeDetails = mockShoeStock.find(
    ({ id: shoeId }) => String(shoeId) === id
  );

  if (shoeDetails) {
    return res.status(200).json({ ...shoeDetails, sizes: mockShoeSizes });
  }

  res.status(404).json({ message: 'Shoe not found' });
}

const mockShoeSizes = [
  7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15,
];
