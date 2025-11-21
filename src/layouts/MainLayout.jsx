import { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { CategoryTabs } from '../features/menu/CategoryTabs';
import { ProductCard } from '../features/menu/ProductCard';
import { CartSidebar } from '../features/cart/CartSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export function MainLayout() {
    const { filteredItems } = useMenu();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
                {/* Header */}
                <header className="px-4 md:px-8 py-4 md:py-6 bg-white border-b border-gray-100 flex justify-between items-center z-10">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                                BURGER<span className="text-red-600">KING</span>
                            </h1>
                            <p className="text-xs md:text-base text-gray-500">Order your favorite meal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-sm font-medium text-gray-400">
                            Kiosk #042
                        </div>
                        <button
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            className="lg:hidden p-2 bg-gray-100 rounded-full relative"
                        >
                            <ShoppingBag size={24} />
                            {/* Optional: Add badge here if needed */}
                        </button>
                    </div>
                </header>

                {/* Categories */}
                <div className="px-4 md:px-8 py-4 md:py-6 bg-white border-b border-gray-100">
                    <CategoryTabs />
                </div>

                {/* Menu Grid */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
                        {filteredItems.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </main>
            </div>

            {/* Mobile Cart Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Right Sidebar (Cart) */}
            <motion.div
                className={`fixed lg:static inset-y-0 right-0 w-[85vw] sm:w-[400px] h-full bg-white shadow-2xl z-40 transform lg:transform-none`}
                initial={false}
                animate={{
                    x: typeof window !== 'undefined' && window.innerWidth < 1024 ? (isCartOpen ? 0 : '100%') : 0
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                style={{ x: undefined }} // Reset style to allow class based control on desktop if needed, but motion handles it mostly
            >
                <CartSidebar onClose={() => setIsCartOpen(false)} />
            </motion.div>
        </div>
    );
}
