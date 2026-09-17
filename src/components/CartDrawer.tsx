import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0d1117] border-l border-slate-800 z-[70] transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#e63946]" />
            <div>
              <h2 className="text-lg font-bold text-white">Tu Carrito</h2>
              <p className="text-xs text-slate-500">{totalItems} {totalItems === 1 ? 'articulo' : 'articulos'}</p>
            </div>
          </div>
          <button onClick={closeCart} className="text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-slate-400 font-medium">Tu carrito esta vacio</p>
              <p className="text-slate-600 text-sm mt-1">Agrega repuestos para continuar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 bg-[#161b22] border border-slate-800 rounded-lg p-3 animate-fade-in">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-slate-800 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white line-clamp-2">{item.product.name}</h4>
                    <p className="text-xs text-slate-500 font-mono mb-2">{item.product.part_number}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[#0d1117] rounded-lg border border-slate-700">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#e63946]">
                        Bs {(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-slate-600 hover:text-[#e63946] transition-colors self-start p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Total:</span>
              <span className="text-2xl font-extrabold text-white">Bs {totalPrice.toFixed(0)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="btn-accent w-full flex items-center justify-center gap-2"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </>
  );
}
