import React from 'react';
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  
  // Format currency based on current locale
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  const isInStock = product.stock > 0;
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      
      <div className="product-price">
        {formatCurrency(product.price, product.currency)}
      </div>
      
      <div className="product-stock">
        {isInStock ? (
          <span className="in-stock">
            {t('products.inStock', { count: product.stock })}
          </span>
        ) : (
          <span className="out-of-stock">
            {t('products.outOfStock')}
          </span>
        )}
      </div>
      
      <button 
        disabled={!isInStock}
        aria-label={`${t('products.addToCart')} - ${product.name}`}
      >
        {t('products.addToCart')}
      </button>
    </div>
  );
};
