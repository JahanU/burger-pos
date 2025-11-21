import { useMenu } from '../../context/MenuContext';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function CategoryTabs() {
    const { categories, activeCategory, setActiveCategory } = useMenu();

    return (
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
            {categories.map((category) => {
                const Icon = Icons[category.icon] || Icons.HelpCircle;
                const isActive = activeCategory === category.id;

                return (
                    <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                            'flex flex-col items-center justify-center min-w-[100px] p-4 rounded-2xl transition-colors duration-200',
                            isActive
                                ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                        )}
                    >
                        <Icon size={32} className="mb-2" />
                        <span className="font-medium text-sm">{category.name}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}
