import { PRODUCTS, CATEGORY_ORDER } from '../data/products';

export default function UsageInstructions({ selectedIds, instructions, onChange }) {
  const selectedProducts = PRODUCTS.filter((p) => selectedIds.includes(p.id))
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));

  if (selectedProducts.length === 0) {
    return (
      <div className="text-atelier-sand/60 italic">
        Seleziona dei prodotti per visualizzare e modificare le istruzioni d'uso.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl text-atelier-gold border-b border-atelier-gold/30 pb-2">
        Istruzioni d'Uso
      </h2>
      <p className="text-sm text-atelier-sand/70">
        Modifica le istruzioni prima di generare il PDF se necessario.
      </p>
      <div className="space-y-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="space-y-1">
            <label className="block text-sm font-medium text-atelier-sand">
              {product.name} ({product.brand})
            </label>
            <textarea
              value={instructions[product.id] ?? product.instructions}
              onChange={(e) => onChange({ ...instructions, [product.id]: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-atelier-anthracite border border-atelier-gold/30 rounded text-white placeholder-atelier-sand/40 focus:outline-none focus:border-atelier-gold resize-y"
              placeholder="Istruzioni d'uso..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
