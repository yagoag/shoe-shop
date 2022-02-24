import { Product } from 'components/details';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(mockShoeStock);
}

export const mockShoeStock: Product[] = [
  {
    id: 1,
    name: 'ASICS X Mita GEL-Kayano Trainer',
    originalPrice: 99.9,
    price: 74.9,
    image: {
      src: 'https://images.unsplash.com/photo-1560072810-1cffb09faf0f',
      alt: 'blue sneakers over a fishing net',
    },
  },
  {
    id: 2,
    name: 'New Balance X-90',
    originalPrice: 119.9,
    price: 59.9,
    image: {
      src: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
      alt: 'light pink sneakers on a black background',
    },
  },
  {
    id: 3,
    name: 'Nike Air Force 1 x Carhatt WIP',
    price: 119.9,
    image: {
      src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      alt: 'brown sneakers on an orange background',
    },
  },
  {
    id: 4,
    name: "Asics Wmns Gel-Kinsei OG 'White'",
    originalPrice: 149.9,
    price: 129.9,
    image: {
      src: 'https://images.unsplash.com/photo-1575456456278-936c89ccdb7b',
      alt: 'white and blue skeakers on a concrete floor',
    },
  },
  {
    id: 5,
    name: 'PUMA x Karl Lagerfeld',
    originalPrice: 104.9,
    price: 94.9,
    image: {
      src: 'https://images.unsplash.com/photo-1571736772567-3aa763ff559a',
      alt: 'white and pink skeakers on a concrete floor',
    },
  },
  {
    id: 6,
    name: 'Asics Gel Lyte V x Ronnie Fieg "Mint Leaf"',
    originalPrice: 79.9,
    price: 59.9,
    image: {
      src: 'https://images.unsplash.com/photo-1584539696499-bff0b4768e4e',
      alt: 'person holding a turquoise sneaker over a white background',
    },
  },
];
