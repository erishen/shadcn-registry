import React from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;