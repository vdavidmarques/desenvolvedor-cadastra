import React, { useState } from 'react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Produto adicionado ao carrinho:', product);
    
    setIsAddingToCart(false);
    
    alert(`${product.name} adicionado ao carrinho!`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <article className="product-grid--content--card">
      <div className="product-grid--content--card--image">
        {imageError ? (
          <div className="product-image-fallback">
            <span>📷</span>
            <p>Imagem não disponível</p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>

      <div className="product-grid--content--card--info">
        <h3 className="product-grid--content--card--info--name">{product?.name}</h3>
        <div className="product-grid--content--card--info--footer">
          <div className="product-price">
            <p className='product-price--value'>{formatPrice(product?.price)}</p>
            <p>{`até ${product.parcelamento[0]}x de R$${product.parcelamento[1]}`}</p>
          </div>
          
          <button
            className={`add-to-cart-button ${isAddingToCart ? 'loading' : ''}`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            aria-label={`Adicionar ${product?.name} ao carrinho`}
          >
            {isAddingToCart ? (
              <>
                <div className="button-spinner"></div>
                Adicionando...
              </>
            ) : (
              'COMPRAR'
            )}
          </button>
        </div>
      </div>
    </article>
  );
};