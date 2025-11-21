import { MenuProvider } from './context/MenuContext';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </MenuProvider>
  );
}

export default App;
