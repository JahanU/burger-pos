import { createContext, useContext, useState } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

const MenuContext = createContext();

export function MenuProvider({ children }) {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

    const filteredItems = MENU_ITEMS.filter(
        (item) => item.category === activeCategory
    );

    return (
        <MenuContext.Provider
            value={{
                categories: CATEGORIES,
                menuItems: MENU_ITEMS,
                activeCategory,
                setActiveCategory,
                filteredItems,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
}
