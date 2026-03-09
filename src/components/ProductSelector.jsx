import { PRODUCT_CATEGORIES, CATEGORY_ORDER, PRODUCTS } from '../data/products';

export default function ProductSelector({ selectedIds, onToggle }) {
  const productsByCategory = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = PRODUCTS.filter((p) => p.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-xl text-atelier-gold border-b border-atelier-gold/30 pb-2">
        Prodotti Consigliati
      </h2>
      {CATEGORY_ORDER.map((categoryKey) => {
        const products = productsByCategory[categoryKey];
        if (!products?.length) return null;
        const subtitle = PRODUCT_CATEGORIES[categoryKey];
        const displayName = categoryKey.replace(/_/g, ' ');

        return (
          <div key={categoryKey} className="space-y-2">
            <h3 className="font-serif text-atelier-sand text-lg">{displayName}</h3>
            <p className="text-sm text-atelier-sand/70 italic">{subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
              {products.map((product) => {
                const isChecked = selectedIds.includes(product.id);
                return (
                  <label
                    key={product.id}
                    className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                      isChecked
                        ? 'border-atelier-gold bg-atelier-gold/10'
                        : 'border-atelier-anthracite bg-atelier-anthracite/50 hover:border-atelier-gold/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggle(product.id)}
                      className="w-4 h-4 accent-atelier-gold"
                    />
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-xs text-atelier-sand/60">({product.brand})</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
