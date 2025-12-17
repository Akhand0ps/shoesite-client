import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // API returns "imageUrl" (array) and "title", not "media" and "name"
  const firstImage = product.imageUrl?.[0] || product.media?.[0] || '/placeholder-shoe.jpg';
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price || 0;
  const productName = product.title || product.name || 'Product';

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group block bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={firstImage} 
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.brand && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] sm:text-xs font-semibold rounded-full">
            {product.brand}
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-1">
          {productName}
        </h3>
        {product.description && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ₹{price.toFixed(2)}
          </span>
          {firstVariant && (
            <span className="text-xs sm:text-sm text-gray-500">
              Size {firstVariant.size}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
