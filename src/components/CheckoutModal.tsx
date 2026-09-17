import { useState } from 'react';
import { X, QrCode, Building2, Banknote, CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import type { OrderPayload, OrderItemPayload } from '@/types/database';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentMethods = [
  { id: 'qr' as const, label: 'Pago QR', icon: QrCode, desc: 'Escanea el codigo QR y paga al instante' },
  { id: 'bank_transfer' as const, label: 'Transferencia Bancaria', icon: Building2, desc: 'Transfiere a nuestra cuenta del BNB' },
  { id: 'cash_on_delivery' as const, label: 'Pago en Efectivo', icon: Banknote, desc: 'Paga al recibir tu pedido' },
];

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    payment: 'cash_on_delivery' as 'qr' | 'bank_transfer' | 'cash_on_delivery',
    notes: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Por favor completa tu nombre y telefono.');
      return;
    }

    setStep('processing');

    try {
      const orderPayload: OrderPayload = {
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        customer_email: form.email.trim(),
        delivery_address: form.address.trim(),
        payment_method: form.payment,
        total: totalPrice,
        notes: form.notes.trim(),
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems: OrderItemPayload[] = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        subtotal: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderId(order.id);
      setStep('success');
      clearCart();
    } catch (err) {
      setError('Hubo un error al procesar tu pedido. Intenta nuevamente.');
      setStep('form');
      console.error(err);
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('form');
      setForm({ name: '', phone: '', email: '', address: '', payment: 'cash_on_delivery', notes: '' });
      setOrderId(null);
      closeCart();
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[80] animate-fade-in" onClick={handleClose} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#0d1117] border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto animate-scale-in">
          {step === 'success' ? (
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-[#2a9d8f]/10 rounded-full mx-auto mb-6 animate-scale-in">
                <CheckCircle2 className="w-12 h-12 text-[#2a9d8f]" />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">¡Pedido Confirmado!</h2>
              <p className="text-slate-400 mb-1">Tu pedido ha sido registrado exitosamente.</p>
              <p className="text-slate-500 text-sm mb-6">
                Numero de pedido: <span className="font-mono text-[#00b4d8]">{orderId?.slice(0, 8).toUpperCase()}</span>
              </p>
              <div className="bg-[#161b22] border border-slate-800 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-slate-400">
                  Nos pondremos en contacto al <span className="text-white font-semibold">{form.phone}</span> para coordinar la entrega y el pago.
                </p>
              </div>
              <button onClick={handleClose} className="btn-accent w-full">
                Continuar
              </button>
            </div>
          ) : step === 'processing' ? (
            <div className="p-12 text-center">
              <Loader2 className="w-12 h-12 text-[#e63946] animate-spin mx-auto mb-4" />
              <p className="text-slate-300 font-medium">Procesando tu pedido...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-[#0d1117] z-10">
                <h2 className="text-lg font-bold text-white">Finalizar Compra</h2>
                <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-5">
                {/* Customer info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Datos del Cliente</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre completo *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-dark px-4 py-2.5 text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Telefono / Celular *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-dark px-4 py-2.5 text-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Correo electronico (opcional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-dark w-full px-4 py-2.5 text-sm"
                  />
                  <textarea
                    placeholder="Direccion de entrega (opcional)"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={2}
                    className="input-dark w-full px-4 py-2.5 text-sm resize-none"
                  />
                </div>

                {/* Payment method */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Metodo de Pago</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = form.payment === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setForm({ ...form, payment: method.id })}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isSelected
                              ? 'border-[#e63946] bg-[#e63946]/10'
                              : 'border-slate-800 bg-[#161b22] hover:border-slate-600'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                            isSelected ? 'bg-[#e63946]' : 'bg-[#1a2332]'
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          </div>
                          <div className="text-left flex-1">
                            <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                              {method.label}
                            </p>
                            <p className="text-xs text-slate-500">{method.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-[#e63946] bg-[#e63946]' : 'border-slate-600'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <textarea
                  placeholder="Notas adicionales (opcional)"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="input-dark w-full px-4 py-2.5 text-sm resize-none"
                />

                {/* Order summary */}
                <div className="bg-[#161b22] border border-slate-800 rounded-lg p-4 space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-slate-400">{item.product.name} x{item.quantity}</span>
                      <span className="text-slate-300 font-medium">Bs {(item.product.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-700 pt-2 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-[#e63946] font-extrabold text-lg">Bs {totalPrice.toFixed(0)}</span>
                  </div>
                </div>

                {error && (
                  <p className="text-[#e63946] text-sm text-center">{error}</p>
                )}

                <button type="submit" className="btn-accent w-full">
                  Confirmar Pedido
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
