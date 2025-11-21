import { useMenu } from '../context/MenuContext';
import { CategoryTabs } from '../features/menu/CategoryTabs';
import { ProductCard } from '../features/menu/ProductCard';
import { CartSidebar } from '../features/cart/CartSidebar';
import { motion } from 'framer-motion';

export function MainLayout() {
    const { filteredItems } = useMenu();

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="px-8 py-6 bg-white border-b border-gray-100 flex justify-between items-center z-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                            BURGER<span className="text-red-600">KING</span>
                        </h1>
                        <p className="text-gray-500">Order your favorite meal</p>
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                        Kiosk #042
                    </div>
                </header>

                {/* Categories */}
                <div className="px-8 py-6 bg-white border-b border-gray-100">
                    <CategoryTabs />
                </div>

                {/* Menu Grid */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {filteredItems.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </main>
            </div>

            {/* Right Sidebar (Cart) */}
            <div className="w-[400px] h-full bg-white shadow-2xl z-20">
                <CartSidebar />
            </div>
        </div>
    );
}
