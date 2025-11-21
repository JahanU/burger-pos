import { useCart } from '../../context/CartContext';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
        >
            <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-xl text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                    >
                        <Plus size={24} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
