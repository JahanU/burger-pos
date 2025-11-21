import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CartSidebar() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-gray-400 bg-white border-l border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={48} className="opacity-20" />
                </div>
                <p className="text-lg font-medium text-center">Your basket is empty</p>
                <p className="text-sm text-center mt-2">Start adding some delicious items!</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Current Order</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                    <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    >
                                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                    </button>
                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Tax (10%)</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${(cartTotal * 1.1).toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                        onClick={clearCart}
                        className="px-6 py-4 rounded-xl font-bold text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-4 rounded-xl font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
